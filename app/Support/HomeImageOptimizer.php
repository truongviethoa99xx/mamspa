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

    /** field => chiều rộng tối đa (px) cho ảnh trang chủ (không phải hero). */
    private const HOME_PAGE_FIELD_WIDTHS = [
        'story_image' => 1600,
        'art_banner_image' => 1600,
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
     *  nghìn px) dù hiển thị rất nhỏ — PageSpeed từng báo lãng phí >700KB vì việc này. */
    private const LOGO_WIDTH = 256;

    private const CONTACT_ICON_WIDTH = 200;

    public static function forHomePageContent(HomePageContent $content): void
    {
        self::generateResponsivePair($content->hero_image);

        foreach (self::HOME_PAGE_FIELD_WIDTHS as $field => $maxWidth) {
            self::generate($content->{$field}, $maxWidth);
        }

        foreach ((array) $content->spaces_items as $item) {
            self::generate($item['image'] ?? null, 960);
        }

        foreach ((array) $content->customer_gallery_images as $item) {
            self::generate($item['image'] ?? null, 800);
        }
    }

    public static function forServiceCategory(ServiceCategory $category): void
    {
        foreach (self::SERVICE_CATEGORY_FIELD_WIDTHS as $field => $maxWidth) {
            self::generate($category->{$field}, $maxWidth);
        }

        foreach ((array) $category->experience_images as $item) {
            self::generate($item['image'] ?? null, 900);
        }
    }

    /** Banner của trang tuỳ biến dùng chung component Hero.tsx với hero trang chủ — cùng kích cỡ mục tiêu. */
    public static function forCustomPage(CustomPage $page): void
    {
        self::generateResponsivePair($page->banner_image);
    }

    public static function forSiteSetting(SiteSetting $site): void
    {
        self::generate($site->logo_path, self::LOGO_WIDTH);

        foreach ((array) $site->floating_contact_buttons as $button) {
            self::generate($button['icon'] ?? null, self::CONTACT_ICON_WIDTH);
        }
    }

    /** Sinh cả bản desktop ({path}.webp) lẫn bản mobile ({path}-mobile.webp) cho ảnh
     *  hero/banner — dùng với <img srcset> để trình duyệt tự chọn đúng size theo màn hình. */
    private static function generateResponsivePair(?string $path): void
    {
        self::generate($path, self::HERO_DESKTOP_WIDTH);
        self::generate($path, self::HERO_MOBILE_WIDTH, '-mobile');
    }

    /**
     * Sinh {path}{suffix}.webp resize theo $maxWidth nếu ảnh gốc tồn tại trên disk
     * 'public' và chưa có bản .webp tương ứng. Không bao giờ ném lỗi ra ngoài — hàm
     * này chạy trong model event `saved`, không được phép làm hỏng thao tác
     * lưu dữ liệu chính của admin.
     */
    public static function generate(?string $path, int $maxWidth, string $suffix = ''): void
    {
        if (! $path || ! preg_match('/\.(png|jpe?g)$/i', $path)) {
            return;
        }

        $disk = Storage::disk('public');
        $webpPath = preg_replace('/\.(png|jpe?g)$/i', $suffix.'.webp', $path);

        if (! $disk->exists($path) || $disk->exists($webpPath)) {
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
