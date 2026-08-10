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
        if (! $path || str_starts_with($path, '/') || str_starts_with($path, 'http')) {
            return null;
        }

        $mobileWebpPath = preg_replace('/\.(png|jpe?g)$/i', '-mobile.webp', $path);

        if ($mobileWebpPath === $path || ! Storage::disk('public')->exists($mobileWebpPath)) {
            return null;
        }

        return Storage::disk('public')->url($mobileWebpPath);
    }
}
