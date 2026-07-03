<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AddTrailingSlash
{
    /**
     * 301 về URL có dấu "/" cuối — bản PHP của rule trong public/.htaccess,
     * để hành vi giống nhau ở mọi môi trường (php artisan serve, nginx, Apache).
     *
     * Chỉ áp dụng cho GET; bỏ qua URL có đuôi file (.xml, .js...) và khu vực
     * admin/livewire — giống hệt điều kiện trong .htaccess.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $path = $request->getPathInfo();

        if (
            $request->isMethod('GET')
            && $path !== '/'
            && ! str_ends_with($path, '/')
            && ! preg_match('#\.[a-zA-Z0-9]+$#', $path)
            && ! preg_match('#^/(admin|livewire)(/|$)#', $path)
        ) {
            $query = $request->getQueryString();

            // redirect()->away() vì UrlGenerator của Laravel tự cắt dấu "/" cuối.
            return redirect()->away(
                $request->getSchemeAndHttpHost().$path.'/'.($query !== null ? '?'.$query : ''),
                301
            );
        }

        return $next($request);
    }
}
