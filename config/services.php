<?php

return [

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
    ],

    'google' => [
        'client_id' => env('GOOGLE_CLIENT_ID'),
        'client_secret' => env('GOOGLE_CLIENT_SECRET'),
        'redirect' => env('GOOGLE_REDIRECT_URI'),
        // Redirect URI riêng cho luồng admin kết nối Google Business Profile (scope business.manage),
        // khác với redirect URI đăng nhập khách hàng ở trên — phải khai báo thêm trên Google Cloud Console.
        'business_redirect' => env('GOOGLE_BUSINESS_REDIRECT_URI'),
    ],

    'google_places' => [
        'api_key' => env('GOOGLE_PLACES_API_KEY'),
    ],

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'twilio' => [
        'sid' => env('TWILIO_SID'),
        'token' => env('TWILIO_TOKEN'),
        'from' => env('TWILIO_FROM'),
    ],

    'sms' => [
        'provider' => env('SMS_PROVIDER', 'twilio'),
    ],

    'gtm' => [
        'id' => env('GTM_ID'),
    ],

    'ga4' => [
        'id' => env('GA4_ID'),
    ],

    'vnpay' => [
        'tmn_code' => env('VNPAY_TMN_CODE'),
        'hash_secret' => env('VNPAY_HASH_SECRET'),
        'url' => env('VNPAY_URL'),
        'return_url' => env('VNPAY_RETURN_URL'),
    ],

    'momo' => [
        'partner_code' => env('MOMO_PARTNER_CODE'),
        'access_key' => env('MOMO_ACCESS_KEY'),
        'secret_key' => env('MOMO_SECRET_KEY'),
        'endpoint' => env('MOMO_ENDPOINT'),
    ],
];
