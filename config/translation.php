<?php

return [
    /**
     * Provider auto-translate: 'google', 'deepl', 'openai', 'null'
     * null = chỉ trả về string gốc, không gọi API ngoài.
     */
    'provider' => env('TRANSLATE_PROVIDER', 'null'),

    'google' => [
        'key' => env('GOOGLE_TRANSLATE_KEY'),
        'endpoint' => 'https://translation.googleapis.com/language/translate/v2',
    ],

    'deepl' => [
        'key' => env('DEEPL_KEY'),
        'endpoint' => env('DEEPL_ENDPOINT', 'https://api-free.deepl.com/v2/translate'),
    ],

    'openai' => [
        'key' => env('OPENAI_KEY'),
        'model' => env('OPENAI_TRANSLATE_MODEL', 'gpt-4o-mini'),
        'endpoint' => 'https://api.openai.com/v1/chat/completions',
    ],

    'cache_ttl' => 60 * 60 * 24 * 7, // 7 ngày
];
