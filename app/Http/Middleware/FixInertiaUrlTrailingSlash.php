<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class FixInertiaUrlTrailingSlash
{
    /**
     * inertia-laravel tính prop `url` từ Request::fullUrl(), mà Laravel luôn
     * rtrim dấu "/" cuối path. Client Inertia lại dùng prop này để gọi
     * history.replaceState/pushState → dấu "/" hiện lên rồi biến mất trên
     * thanh địa chỉ. Middleware này trả lại đúng URL có "/" cuối trong cả
     * response JSON (SPA navigation) lẫn data-page của HTML (full page load).
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        $path = $request->getPathInfo();
        if ($path === '/' || ! str_ends_with($path, '/')) {
            return $response;
        }

        $query = $request->getQueryString();
        $stripped = rtrim($path, '/').($query !== null ? '?'.$query : '');
        $correct = $path.($query !== null ? '?'.$query : '');

        // SPA navigation: response JSON của Inertia.
        if ($response instanceof JsonResponse && $request->headers->has('X-Inertia')) {
            $data = $response->getData(true);
            if (($data['url'] ?? null) === $stripped) {
                $data['url'] = $correct;
                $response->setData($data);
            }

            return $response;
        }

        // Full page load: JSON nằm trong attribute data-page (đã html-escape).
        $content = $response->getContent();
        if (is_string($content) && str_contains($content, 'data-page=')) {
            $search = '&quot;url&quot;:'.e(json_encode($stripped));
            $replace = '&quot;url&quot;:'.e(json_encode($correct));
            if (str_contains($content, $search)) {
                $response->setContent(str_replace($search, $replace, $content));
            }
        }

        return $response;
    }
}
