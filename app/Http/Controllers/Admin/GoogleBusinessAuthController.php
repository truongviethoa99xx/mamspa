<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GoogleBusinessConnection;
use App\Models\User;
use App\Services\GoogleBusinessService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

/**
 * Kết nối OAuth giữa Admin (chủ Google Business Profile) và app — tách biệt
 * hoàn toàn với đăng nhập khách hàng (Auth\GoogleAuthController): khác scope,
 * khác redirect URI, chỉ admin/staff mới gọi được.
 */
class GoogleBusinessAuthController extends Controller
{
    public function __construct(private readonly GoogleBusinessService $google)
    {
    }

    public function redirect(Request $request): RedirectResponse
    {
        abort_unless($request->user()->hasAnyRole(User::adminRoles()), 403);

        $state = Str::random(40);
        $request->session()->put('google_business_oauth_state', $state);

        return redirect()->away($this->google->buildAuthUrl($state));
    }

    public function callback(Request $request): RedirectResponse
    {
        abort_unless($request->user()->hasAnyRole(User::adminRoles()), 403);

        $expectedState = $request->session()->pull('google_business_oauth_state');
        $redirectTo = route('filament.admin.pages.google-business-settings');

        if (! $request->filled('code') || ! $request->filled('state') || $request->query('state') !== $expectedState) {
            return redirect($redirectTo)->with('google_business_error', 'Xác thực không hợp lệ, vui lòng thử kết nối lại.');
        }

        $tokens = $this->google->exchangeCode($request->query('code'));

        if (empty($tokens['refresh_token'])) {
            // Google chỉ cấp refresh_token ở lần cấp quyền đầu tiên (hoặc khi prompt=consent) —
            // nếu thiếu, yêu cầu thu hồi quyền truy cập cũ tại myaccount.google.com rồi kết nối lại.
            return redirect($redirectTo)->with(
                'google_business_error',
                'Không nhận được refresh token. Vào myaccount.google.com/permissions gỡ quyền của app này rồi thử kết nối lại.',
            );
        }

        $connection = GoogleBusinessConnection::current() ?? new GoogleBusinessConnection;
        $connection->fill([
            'access_token' => $tokens['access_token'],
            'refresh_token' => $tokens['refresh_token'],
            'token_expires_at' => now()->addSeconds($tokens['expires_in'] ?? 3600),
            'connected_by' => $request->user()->id,
        ])->save();

        return redirect($redirectTo)->with('google_business_status', 'Kết nối Google Business Profile thành công.');
    }
}
