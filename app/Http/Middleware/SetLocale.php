<?php

namespace App\Http\Middleware;

use App\Models\SiteSetting;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Schema;

class SetLocale
{
    public function handle(Request $request, Closure $next)
    {
        // Ngôn ngữ admin bật/tắt ở CMS (Thiết lập chung) là nguồn thật — không chỉ dùng
        // config('app.available_locales') như trước, vì giá trị đó cố định qua .env, không
        // đổi được từ admin panel mà không redeploy.
        $supported = Schema::hasTable('site_settings')
            ? SiteSetting::current()->getEnabledLocales()
            : config('app.available_locales', ['vi', 'en']);
        $locale = $request->query('lang')
            ?? $request->session()->get('locale')
            ?? config('app.locale');

        if (! in_array($locale, $supported, true)) {
            $locale = config('app.locale');
        }

        App::setLocale($locale);
        $request->session()->put('locale', $locale);

        return $next($request);
    }
}
