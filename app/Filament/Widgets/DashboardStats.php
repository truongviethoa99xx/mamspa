<?php

namespace App\Filament\Widgets;

use App\Models\Booking;
use App\Models\User;
use Filament\Widgets\Widget;
use Illuminate\Support\Carbon;

class DashboardStats extends Widget
{
    protected static string $view = 'filament.widgets.dashboard-stats';

    protected int|string|array $columnSpan = 'full';

    protected static ?int $sort = 2;

    // Chứa doanh thu & số liệu booking — ẩn với biên tập viên (chỉ quản lý nội dung).
    public static function canView(): bool
    {
        $user = auth()->user();

        return $user instanceof User && $user->hasAnyRole(User::adminRoles());
    }

    protected function getViewData(): array
    {
        $today = Carbon::today();
        $yesterday = $today->copy()->subDay();

        // Doanh thu (đã thanh toán) hôm nay vs hôm qua.
        $revToday = (int) Booking::where('payment_status', 'paid')->whereDate('created_at', $today)->sum('total_price');
        $revYest = (int) Booking::where('payment_status', 'paid')->whereDate('created_at', $yesterday)->sum('total_price');

        // Số booking theo ngày hẹn.
        $bookToday = Booking::whereDate('date', $today)->count();
        $bookYest = Booking::whereDate('date', $yesterday)->count();

        // Khách mới đăng ký trong tuần vs tuần trước.
        $custWeek = User::whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()])->count();
        $custLast = User::whereBetween('created_at', [now()->subWeek()->startOfWeek(), now()->subWeek()->endOfWeek()])->count();

        // Booking đang chờ xử lý.
        $pending = Booking::where('status', 'pending')->count();

        return [
            'stats' => [
                [
                    'label' => 'Doanh thu hôm nay',
                    'value' => $this->money($revToday),
                    'icon' => 'heroicon-o-banknotes',
                    'iconMod' => '',
                    'trend' => $this->trend($revToday, $revYest, 'so với hôm qua'),
                ],
                [
                    'label' => 'Booking hôm nay',
                    'value' => (string) $bookToday,
                    'icon' => 'heroicon-o-calendar-days',
                    'iconMod' => 'maha-stat__icon--green',
                    'trend' => $this->trend($bookToday, $bookYest, 'so với hôm qua'),
                ],
                [
                    'label' => 'Khách mới tuần này',
                    'value' => (string) $custWeek,
                    'icon' => 'heroicon-o-user-plus',
                    'iconMod' => 'maha-stat__icon--sand',
                    'trend' => $this->trend($custWeek, $custLast, 'so với tuần trước'),
                ],
                [
                    'label' => 'Đang chờ xử lý',
                    'value' => (string) $pending,
                    'icon' => 'heroicon-o-clock',
                    'iconMod' => 'maha-stat__icon--amber',
                    'note' => $pending > 0
                        ? ['mod' => 'warn', 'text' => 'Cần xác nhận sớm']
                        : ['mod' => 'flat', 'text' => 'Đã xử lý hết'],
                ],
            ],
        ];
    }

    /** % thay đổi giữa hai kỳ → hướng + nhãn. */
    private function trend(float $cur, float $prev, string $suffix): array
    {
        if ($prev <= 0) {
            return $cur > 0
                ? ['dir' => 'up', 'text' => 'tăng mới '.$suffix]
                : ['dir' => 'flat', 'text' => '— '.$suffix];
        }

        $pct = ($cur - $prev) / $prev * 100;
        $dir = $pct > 0.05 ? 'up' : ($pct < -0.05 ? 'down' : 'flat');
        $sign = $pct > 0 ? '+' : '';

        return ['dir' => $dir, 'text' => $sign.number_format($pct, 1, ',', '.').'% '.$suffix];
    }

    /** VND rút gọn: 248,5tr · 320k · 0. */
    private function money(int $v): string
    {
        if ($v >= 1_000_000) {
            return number_format($v / 1_000_000, 1, ',', '.').'tr';
        }
        if ($v >= 1_000) {
            return number_format($v / 1_000, 0, ',', '.').'k';
        }

        return number_format($v, 0, ',', '.');
    }
}
