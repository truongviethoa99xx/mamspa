<?php

namespace App\Filament\Widgets;

use App\Models\Booking;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class BookingStatsWidget extends BaseWidget
{
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        $today = Booking::whereDate('date', today())->whereIn('status', ['pending', 'confirmed'])->count();
        $week = Booking::whereBetween('date', [now()->startOfWeek(), now()->endOfWeek()])->count();
        $month = Booking::whereMonth('date', now()->month)->whereYear('date', now()->year)->count();
        $revenue = (int) Booking::where('payment_status', 'paid')
            ->whereMonth('created_at', now()->month)->sum('total_price');

        return [
            Stat::make('Booking hôm nay', $today)->description('Pending + Confirmed')->color('warning'),
            Stat::make('Booking tuần này', $week)->color('info'),
            Stat::make('Booking tháng này', $month)->color('success'),
            Stat::make('Doanh thu tháng', number_format($revenue / 1000000, 1).' tr')->color('primary'),
        ];
    }
}
