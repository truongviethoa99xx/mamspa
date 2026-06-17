<?php

namespace App\Filament\Widgets;

use Filament\Widgets\Widget;
use Illuminate\Support\Carbon;

class DashboardGreeting extends Widget
{
    protected static string $view = 'filament.widgets.dashboard-greeting';

    protected int|string|array $columnSpan = 'full';

    protected static ?int $sort = 1;

    protected function getViewData(): array
    {
        $name = auth()->user()?->name ?? 'bạn';
        // Lấy tên gọi ngắn (từ cuối) cho thân mật.
        $shortName = trim((string) preg_replace('/.*\s/u', '', $name)) ?: $name;

        return [
            'name' => $shortName,
            'today' => Carbon::now()->format('d/m/Y'),
        ];
    }
}
