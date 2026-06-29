<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Đánh dấu mọi response là noindex để Google/bot không lập chỉ mục.
 * Dùng cho khu vực quản trị (CMS) — không cần và không nên xuất hiện trên kết quả tìm kiếm.
 */
class NoIndex
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        $response->headers->set('X-Robots-Tag', 'noindex, nofollow, noarchive');

        return $response;
    }
}
