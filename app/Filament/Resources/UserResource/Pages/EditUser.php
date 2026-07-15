<?php

namespace App\Filament\Resources\UserResource\Pages;

use App\Filament\Resources\UserResource;
use Filament\Actions;
use Filament\Forms;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Support\Facades\Hash;

class EditUser extends EditRecord
{
    protected static string $resource = UserResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\Action::make('resetPassword')
                ->label('Reset mật khẩu')
                ->icon('heroicon-o-key')
                ->color('warning')
                ->form([
                    Forms\Components\TextInput::make('password')
                        ->label('Mật khẩu mới')
                        ->password()
                        ->revealable()
                        ->required()
                        ->minLength(8)
                        ->confirmed(),
                    Forms\Components\TextInput::make('password_confirmation')
                        ->label('Nhập lại mật khẩu')
                        ->password()
                        ->revealable()
                        ->required(),
                ])
                ->modalHeading('Reset mật khẩu nhân sự')
                ->modalSubmitActionLabel('Cập nhật mật khẩu')
                ->action(function (array $data): void {
                    $this->record->forceFill([
                        'password' => Hash::make($data['password']),
                    ])->save();

                    Notification::make()
                        ->success()
                        ->title('Đã reset mật khẩu')
                        ->body('Mật khẩu mới đã được cập nhật cho '.$this->record->email.'.')
                        ->send();
                }),
            Actions\DeleteAction::make()
                ->hidden(fn (): bool => auth()->id() === $this->record->id),
        ];
    }
}
