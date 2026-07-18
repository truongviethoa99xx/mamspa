<?php

namespace App\Filament\Widgets;

use App\Models\Booking;
use App\Models\User;
use Filament\Widgets\Widget;
use Illuminate\Support\Carbon;

class UpcomingAppointments extends Widget
{
    protected static string $view = 'filament.widgets.upcoming-appointments';

    protected int|string|array $columnSpan = 1;

    protected static ?int $sort = 4;

    // Lịch hẹn khách hàng — ẩn với biên tập viên (chỉ quản lý nội dung).
    public static function canView(): bool
    {
        $user = auth()->user();

        return $user instanceof User && $user->hasAnyRole(User::frontDeskRoles());
    }

    protected function getViewData(): array
    {
        $locale = app()->getLocale();

        $appts = Booking::with('service', 'user')
            ->whereDate('date', Carbon::today())
            ->whereIn('status', ['pending', 'confirmed'])
            ->orderBy('time_slot')
            ->limit(5)
            ->get()
            ->map(fn (Booking $b) => [
                'time' => $b->time_slot ?: '--:--',
                'name' => $b->guest_name ?: ($b->user?->name ?? 'Khách lẻ'),
                'service' => $b->service ? strip_tags((string) $b->service->getTranslation('name', $locale)) : '—',
                'pending' => $b->status === 'pending',
            ]);

        return [
            'appts' => $appts,
            'count' => $appts->count(),
            'today' => Carbon::now()->format('d/m'),
        ];
    }
}
