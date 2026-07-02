<?php

namespace App\Filament\Widgets;

use App\Models\Booking;
use App\Models\User;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Carbon;

class RevenueChart extends ChartWidget
{
    protected static ?string $heading = 'Doanh thu 7 ngày';

    protected int|string|array $columnSpan = 2;

    protected static ?int $sort = 3;

    protected static ?string $maxHeight = '260px';

    // Dữ liệu doanh thu — ẩn với biên tập viên (chỉ quản lý nội dung).
    public static function canView(): bool
    {
        $user = auth()->user();

        return $user instanceof User && $user->hasAnyRole(User::adminRoles());
    }

    protected function getData(): array
    {
        $start = Carbon::today()->subDays(6);

        $rows = Booking::query()
            ->where('payment_status', 'paid')
            ->where('created_at', '>=', $start)
            ->selectRaw('DATE(created_at) as day, SUM(total_price) as total')
            ->groupBy('day')
            ->pluck('total', 'day')
            ->toArray();

        $weekday = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
        $labels = [];
        $values = [];

        for ($i = 0; $i < 7; $i++) {
            $day = $start->copy()->addDays($i);
            $labels[] = $weekday[$day->dayOfWeek];
            $values[] = (int) ($rows[$day->toDateString()] ?? 0);
        }

        return [
            'datasets' => [[
                'label' => 'Doanh thu (VND)',
                'data' => $values,
                'backgroundColor' => '#c1664a',
                'hoverBackgroundColor' => '#a8513a',
                'borderRadius' => 8,
                'borderSkipped' => false,
                'maxBarThickness' => 36,
            ]],
            'labels' => $labels,
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }

    protected function getOptions(): array
    {
        return [
            'plugins' => [
                'legend' => ['display' => false],
            ],
            'scales' => [
                'y' => [
                    'beginAtZero' => true,
                    'grid' => ['color' => 'rgba(74,65,56,0.06)'],
                    'ticks' => ['color' => '#9c8f80'],
                ],
                'x' => [
                    'grid' => ['display' => false],
                    'ticks' => ['color' => '#9c8f80'],
                ],
            ],
        ];
    }
}
