<?php

namespace App\Filament\Widgets;

use App\Models\Booking;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;
use Illuminate\Database\Eloquent\Builder;

class TopServicesWidget extends BaseWidget
{
    protected static ?string $heading = 'Top dịch vụ 30 ngày';
    protected static ?int $sort = 3;
    protected int|string|array $columnSpan = 'full';

    public function table(Table $table): Table
    {
        return $table
            ->query(
                Booking::query()
                    ->selectRaw('service_id, COUNT(*) as bookings_count, SUM(total_price) as revenue')
                    ->where('created_at', '>=', now()->subDays(30))
                    ->groupBy('service_id')
                    ->with('service')
                    ->orderByDesc('bookings_count')
                    ->limit(8)
            )
            ->columns([
                Tables\Columns\TextColumn::make('service.slug')->label('Service'),
                Tables\Columns\TextColumn::make('bookings_count')->label('Bookings')->sortable(),
                Tables\Columns\TextColumn::make('revenue')->money('VND')->label('Doanh thu'),
            ]);
    }
}
