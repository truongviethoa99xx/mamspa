<?php

return [
    /*
     * Khi locale hiện tại không có bản dịch, fallback về EN trước rồi mới về VI.
     * Spatie\Translatable đọc config này qua App::getFallbackLocale().
     */
    'fallback_locale' => 'en',
];
