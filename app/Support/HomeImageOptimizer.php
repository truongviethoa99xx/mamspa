<?php

namespace App\Support;

use App\Models\CustomPage;
use App\Models\HomePageContent;
use App\Models\ServiceCategory;
use App\Models\SiteSetting;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Spatie\Image\Image;
use Throwable;

/**
 * Sinh bản .webp đã resize cho ảnh CMS tải lên qua Filament (HomePageContent,
 * ServiceCategory) — hai model này lưu path ảnh dạng string thô, không qua
 * Spatie MediaLibrary như Service::thumbnail, nên không có sẵn conversion.
 *
 * Chỉ TẠO THÊM file .webp cạnh ảnh gốc trên disk 'public'. Không sửa/xoá ảnh
 * gốc, không ghi gì vào DB — an toàn để chạy lại nhiều lần (bỏ qua ảnh đã có
 * bản .webp) và để gọi tự động mỗi khi admin lưu nội dung.
 */
class HomeImageOptimizer
{
    private const QUALITY = 78;

    /** Ảnh hero/banner full-bleed — LCP element, cần thêm bản nhỏ riêng cho mobile
     *  (xem generateResponsivePair()) vì Lighthouse mobile dùng mạng chậm giả lập,
     *  ảnh 1920px dùng chung cho cả điện thoại từng khiến LCP mobile vọt lên >10s. */
    private const HERO_DESKTOP_WIDTH = 1920;

    /**
     * 1280 chứ không phải 1 con số "điện thoại" nhỏ hơn (vd. 800) — vì <img sizes="100vw">
     * khiến trình duyệt tính cỡ cần theo viewport × DPR màn hình thật, và điện thoại hiện
     * đại thường DPR 2-3x. Từng thử 800w: máy giả lập Moto G Power của Lighthouse cần
     * ~1000-1100px thực, "800" bị coi là không đủ nét nên trình duyệt tự rớt về bản 1920w
     * gốc — số liệu "Improve image delivery" trên PageSpeed không hề giảm dù đã có bản
     * mobile. 1280w đủ lớn để luôn được chọn, mà vẫn nhẹ hơn ~50% so với 1920w.
     */
    private const HERO_MOBILE_WIDTH = 1280;

    /** Ảnh "Nghệ thuật trị liệu" (ArtBanner) — full-bleed nửa màn hình, không giới hạn
     *  max-width, nên cũng cần cặp desktop/mobile như hero thay vì 1 cỡ cố định. */
    private const ART_BANNER_DESKTOP_WIDTH = 1600;

    private const ART_BANNER_MOBILE_WIDTH = 900;

    /** Ảnh thẻ "Our Spaces" (Lê Văn Sỹ / Lê Thị Riêng) — nằm trong lưới 2 cột bọc
     *  max-w-7xl, cỡ hiển thị lớn nhất ~628px CSS (desktop) hoặc full viewport (mobile). */
    private const SPACES_ITEM_DESKTOP_WIDTH = 1280;

    private const SPACES_ITEM_MOBILE_WIDTH = 750;

    /** field => chiều rộng tối đa (px) cho ảnh trang chủ (không phải hero/art banner/spaces —
     *  các field này dùng cặp desktop/mobile riêng, xem generateResponsivePair()). */
    private const HOME_PAGE_FIELD_WIDTHS = [
        'story_image' => 1600,
        'final_cta_image' => 1600,
        'testimonial_video_thumbnail' => 960,
    ];

    /** field => chiều rộng tối đa (px) cho ảnh danh mục dịch vụ. */
    private const SERVICE_CATEGORY_FIELD_WIDTHS = [
        'image' => 900,
        'intro_image' => 1400,
        'experience_note_image' => 1400,
        'closing_image' => 1600,
    ];

    /** Logo và icon nút liên hệ nổi thường được admin tải lên nguyên bản (vài trăm KB,
     *  nghìn px) dù hiển thị rất nhỏ (logo: cao tối đa ~160px trên màn hình retina;
     *  icon: khung nút chỉ 48px CSS) — PageSpeed từng báo lãng phí >700KB vì việc này. */
    private const LOGO_WIDTH = 128;

    private const CONTACT_ICON_WIDTH = 128;

    public static function forHomePageContent(HomePageContent $content, bool $force = false): void
    {
        self::generateResponsivePair($content->hero_image, self::HERO_DESKTOP_WIDTH, self::HERO_MOBILE_WIDTH, $force);
        self::generateResponsivePair($content->art_banner_image, self::ART_BANNER_DESKTOP_WIDTH, self::ART_BANNER_MOBILE_WIDTH, $force);

        foreach (self::HOME_PAGE_FIELD_WIDTHS as $field => $maxWidth) {
            self::generate($content->{$field}, $maxWidth, '', $force);
        }

        foreach ((array) $content->spaces_items as $item) {
            self::generateResponsivePair($item['image'] ?? null, self::SPACES_ITEM_DESKTOP_WIDTH, self::SPACES_ITEM_MOBILE_WIDTH, $force);
        }

        foreach ((array) $content->customer_gallery_images as $item) {
            self::generate($item['image'] ?? null, 800, '', $force);
        }
    }

    public static function forServiceCategory(ServiceCategory $category, bool $force = false): void
    {
        foreach (self::SERVICE_CATEGORY_FIELD_WIDTHS as $field => $maxWidth) {
            self::generate($category->{$field}, $maxWidth, '', $force);
        }

        foreach ((array) $category->experience_images as $item) {
            self::generate($item['image'] ?? null, 900, '', $force);
        }
    }

    /** Banner của trang tuỳ biến dùng chung component Hero.tsx với hero trang chủ — cùng kích cỡ mục tiêu. */
    public static function forCustomPage(CustomPage $page, bool $force = false): void
    {
        self::generateResponsivePair($page->banner_image, self::HERO_DESKTOP_WIDTH, self::HERO_MOBILE_WIDTH, $force);
    }

    public static function forSiteSetting(SiteSetting $site, bool $force = false): void
    {
        self::generate($site->logo_path, self::LOGO_WIDTH, '', $force);

        foreach ((array) $site->floating_contact_buttons as $button) {
            self::generate($button['icon'] ?? null, self::CONTACT_ICON_WIDTH, '', $force);
        }
    }

    /** Sinh cả bản desktop ({path}.webp) lẫn bản mobile ({path}-mobile.webp) cho ảnh
     *  banner full-bleed/gần-full-bleed — dùng với <img srcset> để trình duyệt tự
     *  chọn đúng size theo màn hình thay vì phát 1 cỡ cố định cho mọi viewport. */
    private static function generateResponsivePair(?string $path, int $desktopWidth, int $mobileWidth, bool $force = false): void
    {
        self::generate($path, $desktopWidth, '', $force);
        self::generate($path, $mobileWidth, '-mobile', $force);
    }

    /**
     * Sinh {path}{suffix}.webp resize theo $maxWidth nếu ảnh gốc tồn tại trên disk
     * 'public'. Bỏ qua nếu đã có bản .webp tương ứng, trừ khi $force=true (dùng khi
     * backfill lại sau khi đổi $maxWidth mục tiêu — xem lệnh `images:optimize-home
     * --force`). Không bao giờ ném lỗi ra ngoài — hàm này chạy trong model event
     * `saved`, không được phép làm hỏng thao tác lưu dữ liệu chính của admin.
     */
    public static function generate(?string $path, int $maxWidth, string $suffix = '', bool $force = false): void
    {
        if (! $path || ! preg_match('/\.(png|jpe?g)$/i', $path)) {
            return;
        }

        $disk = Storage::disk('public');
        $webpPath = preg_replace('/\.(png|jpe?g)$/i', $suffix.'.webp', $path);

        if (! $disk->exists($path) || (! $force && $disk->exists($webpPath))) {
            return;
        }

        try {
            Image::load($disk->path($path))
                ->width($maxWidth)
                ->format('webp')
                ->quality(self::QUALITY)
                ->save($disk->path($webpPath));
        } catch (Throwable $e) {
            Log::warning('HomeImageOptimizer: failed to generate webp derivative', [
                'path' => $path,
                'suffix' => $suffix,
                'error' => $e->getMessage(),
            ]);
        }
    }
}
