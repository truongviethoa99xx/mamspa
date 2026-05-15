<?php

namespace App\Http\Controllers;

use App\Models\TranslationString;

class TranslationController extends Controller
{
    /**
     * Trả về tất cả translation strings dạng flat keys cho react-i18next.
     * Cấu trúc: { "nav.home": "Trang chủ", "common.submit": "Gửi", ... }
     */
    public function show(string $lang)
    {
        $supported = config('app.available_locales', ['vi', 'en']);
        if (! in_array($lang, $supported, true)) {
            abort(404);
        }

        $all = TranslationString::allByLocale();

        return response()->json($all[$lang] ?? [])
            ->header('Cache-Control', 'public, max-age=300');
    }
}
