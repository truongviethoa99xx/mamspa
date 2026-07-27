<?php
namespace App\Filament\Resources\BookingResource\Pages;
use App\Filament\Resources\BookingResource;
use App\Models\User;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
class EditBooking extends EditRecord {
    protected static string $resource = BookingResource::class;
    protected function getHeaderActions(): array {
        return [
            Actions\DeleteAction::make()
                ->visible(fn (): bool => auth()->user()?->hasRole(User::ROLE_SUPERADMIN) ?? false),
        ];
    }
}
