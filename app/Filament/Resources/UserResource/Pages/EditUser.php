<?php

namespace App\Filament\Resources\UserResource\Pages;

use App\Filament\Resources\UserResource;
use Filament\Actions;
use Filament\Forms;
use Filament\Forms\Set;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

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
                        ->suffixAction(
                            Forms\Components\Actions\Action::make('generatePassword')
                                ->icon('heroicon-m-arrow-path')
                                ->tooltip('Tạo mật khẩu ngẫu nhiên 10 ký tự')
                                ->action(function (Set $set) {
                                    $random = Str::password(10);
                                    $set('password', $random);
                                    $set('password_confirmation', $random);
                                }),
                        )
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

                    $this->mountAction('showCredentials', [
                        'email' => $this->record->email,
                        'password' => $data['password'],
                    ]);
                }),
            Actions\DeleteAction::make()
                ->hidden(fn (): bool => auth()->id() === $this->record->id),
        ];
    }

    protected function showCredentialsAction(): Actions\Action
    {
        return Actions\Action::make('showCredentials')
            ->label('Thông tin đăng nhập')
            ->modalHeading('Đã cập nhật mật khẩu')
            ->modalDescription('Sao chép thông tin đăng nhập để gửi cho nhân sự.')
            ->modalIcon('heroicon-o-key')
            ->modalContent(fn (array $arguments): View => view('filament.modals.user-credentials', [
                'email' => $arguments['email'] ?? '',
                'password' => $arguments['password'] ?? '',
            ]))
            ->modalCancelAction(false)
            ->modalSubmitActionLabel('Đóng');
    }
}
