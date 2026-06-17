<?php

namespace App\Filament\Pages;

use App\Filament\Concerns\RestrictsFilamentAccess;
use App\Filament\Widgets\DashboardGreeting;
use App\Filament\Widgets\DashboardStats;
use App\Filament\Widgets\RecentBookings;
use App\Filament\Widgets\RevenueChart;
use App\Filament\Widgets\UpcomingAppointments;
use App\Models\User;
use Filament\Pages\Dashboard as BaseDashboard;

class Dashboard extends BaseDashboard
{
    use RestrictsFilamentAccess;

    protected static ?string $navigationIcon = 'heroicon-o-squares-2x2';

    protected static function allowedRoles(): array
    {
        return User::internalRoles();
    }

    public function getColumns(): int|string|array
    {
        // Lưới 3 cột để biểu đồ (span 2) đứng cạnh panel lịch hẹn (span 1).
        return 3;
    }

    public function getWidgets(): array
    {
        return [
            DashboardGreeting::class,
            DashboardStats::class,
            RevenueChart::class,
            UpcomingAppointments::class,
            RecentBookings::class,
        ];
    }

    public function getTitle(): string
    {
        return 'Bảng điều khiển';
    }

    public static function getNavigationLabel(): string
    {
        return 'Bảng điều khiển';
    }
}
