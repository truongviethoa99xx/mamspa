<?php

namespace App\Support;

use Illuminate\Support\Facades\Storage;

/**
 * Ảnh CMS (HomePageContent, ServiceCategory) được Filament lưu nguyên bản,
 * không qua Spatie MediaLibrary. HomeImageOptimizer sinh thêm bản .webp đã
 * resize cạnh file gốc trên disk — lớp này chỉ chọn URL nào để trả về, ưu
 * tiên bản .webp nếu đã tồn tại, nếu chưa thì fallback về ảnh gốc.
 */
class OptimizedImageUrl
{
    public static function resolve(?string $path): ?string
    {
        if (! $path || str_starts_with($path, '/') || str_starts_with($path, 'http')) {
            return $path;
        }

        $webpPath = preg_replace('/\.(png|jpe?g)$/i', '.webp', $path);

        if ($webpPath !== $path && Storage::disk('public')->exists($webpPath)) {
            return Storage::disk('public')->url($webpPath);
        }

        return Storage::disk('public')->url($path);
    }

    /**
     * URL bản .webp cỡ nhỏ dành riêng cho mobile (xem HomeImageOptimizer::generateResponsivePair) —
     * chỉ tồn tại cho ảnh hero/banner. Trả null nếu chưa sinh (ảnh cũ chưa backfill, hoặc field
     * này vốn không có bản mobile riêng) — component gọi hàm này tự fallback về bản desktop.
     */
    public static function resolveMobile(?string $path): ?string
    {
        return self::resolveVariant($path, '-mobile');
    }

    /**
     * URL một bản .webp phái sinh cụ thể (theo $suffix), khi cùng 1 field ảnh gốc cần nhiều
     * cỡ khác nhau cho nhiều nơi hiển thị khác nhau (vd. ServiceCategory::image vừa dùng làm
     * ảnh thẻ nhỏ trong lưới, vừa dùng làm banner full-bleed ở CategoryHero — xem
     * HomeImageOptimizer::CATEGORY_HERO_DESKTOP_WIDTH). Trả null nếu chưa sinh — nơi gọi tự
     * fallback về bản mặc định (resolve()).
     */
    public static function resolveVariant(?string $path, string $suffix): ?string
    {
        if (! $path || str_starts_with($path, '/') || str_starts_with($path, 'http')) {
            return null;
        }

        $variantPath = preg_replace('/\.(png|jpe?g)$/i', $suffix.'.webp', $path);

        if ($variantPath === $path || ! Storage::disk('public')->exists($variantPath)) {
            return null;
        }

        return Storage::disk('public')->url($variantPath);
    }
}
