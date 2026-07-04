<?php

namespace App\Support;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;

/**
 * Lưu mã booking của khách chưa đăng nhập vào cookie
 * để trang "Lịch của tôi" hiển thị được mà không cần tài khoản.
 */
final class GuestBookings
{
    public const COOKIE = 'guest_bookings';

    private const MAX_CODES = 20;

    private const LIFETIME_MINUTES = 60 * 24 * 365; // 1 năm

    /** @return string[] */
    public static function codes(Request $request): array
    {
        $raw = $request->cookie(self::COOKIE);
        if (! is_string($raw) || $raw === '') {
            return [];
        }

        $codes = json_decode($raw, true);
        if (! is_array($codes)) {
            return [];
        }

        return array_values(array_filter($codes, 'is_string'));
    }

    public static function remember(Request $request, string $code): void
    {
        $codes = array_values(array_unique([...self::codes($request), $code]));
        $codes = array_slice($codes, -self::MAX_CODES);

        Cookie::queue(cookie(
            name: self::COOKIE,
            value: json_encode($codes),
            minutes: self::LIFETIME_MINUTES,
        ));
    }

    public static function owns(Request $request, string $code): bool
    {
        return in_array($code, self::codes($request), true);
    }
}
