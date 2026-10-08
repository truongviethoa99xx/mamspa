<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Công tắc tắt khẩn cấp cho toàn bộ /admin — IS_ACTIVE_ADMIN=0 trong .env khiến mọi route
 * trong panel Filament (kể cả /admin/login) trả về 404 thay vì redirect sang trang đăng nhập,
 * để không lộ ra rằng khu vực quản trị tồn tại. Đặt đầu tiên trong middleware stack của panel
 * (xem AdminPanelProvider) để chặn sớm nhất, trước session/CSRF/auth.
 */
class EnsureAdminEnabled
{
    public function handle(Request $request, Closure $next): Response
    {
        abort_unless(config('app.admin_enabled', true), 404);

        return $next($request);
    }
}
