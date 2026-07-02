<?php

namespace App\Filament\Widgets;

use App\Models\Booking;
use App\Models\User;
use Filament\Widgets\Widget;

class RecentBookings extends Widget
{
    protected static string $view = 'filament.widgets.recent-bookings';

    protected int|string|array $columnSpan = 'full';

    protected static ?int $sort = 5;

    // Dữ liệu booking khách hàng — ẩn với biên tập viên (chỉ quản lý nội dung).
    public static function canView(): bool
    {
        $user = auth()->user();

        return $user instanceof User && $user->hasAnyRole(User::adminRoles());
    }

    private const STATUS_LABEL = [
        'pending' => 'Chờ duyệt',
        'confirmed' => 'Đã xác nhận',
        'completed' => 'Hoàn tất',
        'cancelled' => 'Đã huỷ',
    ];

    private const AVATAR_COLORS = ['#556B3F', '#a8754a', '#7a8c5a', '#8a6d8b', '#5f8c7a', '#b0823a'];

    protected function getViewData(): array
    {
        $locale = app()->getLocale();

        $rows = Booking::with('service', 'branch', 'user')
            ->latest()
            ->limit(6)
            ->get()
            ->map(function (Booking $b) use ($locale) {
                $name = $b->guest_name ?: ($b->user?->name ?? 'Khách lẻ');

                return [
                    'code' => $b->code,
                    'name' => $name,
                    'initials' => $this->initials($name),
                    'color' => $this->avatarColor($name),
                    'service' => $b->service ? (string) $b->service->getTranslation('name', $locale) : '—',
                    'branch' => $b->branch ? (string) $b->branch->getTranslation('name', $locale) : null,
                    'price' => number_format((int) $b->total_price, 0, ',', '.').'đ',
                    'status' => $b->status,
                    'statusLabel' => self::STATUS_LABEL[$b->status] ?? $b->status,
                ];
            });

        return ['rows' => $rows];
    }

    private function initials(string $name): string
    {
        $parts = preg_split('/\s+/u', trim($name)) ?: [];
        $first = mb_substr($parts[0] ?? '', 0, 1);
        $last = count($parts) > 1 ? mb_substr((string) end($parts), 0, 1) : '';

        return mb_strtoupper($first.$last);
    }

    private function avatarColor(string $name): string
    {
        $hash = 0;
        foreach (str_split($name) as $ch) {
            $hash = ord($ch) + (($hash << 5) - $hash);
        }

        return self::AVATAR_COLORS[abs($hash) % count(self::AVATAR_COLORS)];
    }
}
