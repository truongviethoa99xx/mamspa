<?php

return [
    'name' => env('APP_NAME', 'Mầm Spa'),
    'env' => env('APP_ENV', 'production'),
    'debug' => (bool) env('APP_DEBUG', false),
    'url' => env('APP_URL', 'http://localhost'),
    'asset_url' => env('ASSET_URL'),
    'timezone' => env('APP_TIMEZONE', 'Asia/Ho_Chi_Minh'),
    'locale' => env('APP_LOCALE', 'vi'),
    'fallback_locale' => env('APP_FALLBACK_LOCALE', 'en'),
    'available_locales' => explode(',', env('APP_AVAILABLE_LOCALES', 'vi,en')),
    'registration_enabled' => (bool) env('AUTH_REGISTRATION_ENABLED', false),
    // Công tắc tắt khẩn cấp cho /admin — xem App\Http\Middleware\EnsureAdminEnabled. Mặc định
    // true (không đổi hành vi hiện tại) nếu .env chưa khai báo IS_ACTIVE_ADMIN.
    'admin_enabled' => (bool) env('IS_ACTIVE_ADMIN', true),
    'faker_locale' => env('APP_FAKER_LOCALE', 'vi_VN'),
    'cipher' => 'AES-256-CBC',
    'key' => env('APP_KEY'),
    'previous_keys' => [
        ...array_filter(
            explode(',', env('APP_PREVIOUS_KEYS', ''))
        ),
    ],
    'maintenance' => [
        'driver' => env('APP_MAINTENANCE_DRIVER', 'file'),
        'store' => env('APP_MAINTENANCE_STORE', 'database'),
    ],
];
