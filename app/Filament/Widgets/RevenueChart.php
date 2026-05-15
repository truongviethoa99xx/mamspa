<?php

namespace App\Filament\Widgets;

use App\Models\Booking;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Carbon;

class RevenueChart extends ChartWidget
{
    protected static ?string $heading = 'Doanh thu 30 ngày';
    protected static ?int $sort = 2;

    protected function getData(): array
    {
        $start = Carbon::today()->subDays(29);
        $rows = Booking::query()
            ->where('payment_status', 'paid')
            ->where('created_at', '>=', $start)
            ->selectRaw('DATE(created_at) as day, SUM(total_price) as total')
            ->groupBy('day')->pluck('total', 'day')->toArray();

        $labels = [];
        $values = [];
        for ($i = 0; $i < 30; $i++) {
            $day = $start->copy()->addDays($i);
            $labels[] = $day->format('d/m');
            $values[] = (int) ($rows[$day->toDateString()] ?? 0);
        }

        return [
            'datasets' => [['label' => 'VND', 'data' => $values, 'borderColor' => '#92653a']],
            'labels' => $labels,
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
}
