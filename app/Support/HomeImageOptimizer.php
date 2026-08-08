<?php

namespace App\Support;

use App\Models\CustomPage;
use App\Models\HomePageContent;
use App\Models\ServiceCategory;
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

    /** field => chiều rộng tối đa (px) cho ảnh trang chủ. */
    private const HOME_PAGE_FIELD_WIDTHS = [
        'hero_image' => 1920,
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

    public static function forHomePageContent(HomePageContent $content): void
    {
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
        self::generate($page->banner_image, 1920);
    }

    /**
     * Sinh {path}.webp resize theo $maxWidth nếu ảnh gốc tồn tại trên disk
     * 'public' và chưa có bản .webp. Không bao giờ ném lỗi ra ngoài — hàm
     * này chạy trong model event `saved`, không được phép làm hỏng thao tác
     * lưu dữ liệu chính của admin.
     */
    public static function generate(?string $path, int $maxWidth): void
    {
        if (! $path || ! preg_match('/\.(png|jpe?g)$/i', $path)) {
            return;
        }

        $disk = Storage::disk('public');
        $webpPath = preg_replace('/\.(png|jpe?g)$/i', '.webp', $path);

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
                'error' => $e->getMessage(),
            ]);
        }
    }
}
