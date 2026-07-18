<?php

namespace App\Filament\Resources\UserResource\Pages;

use App\Filament\Resources\UserResource;
use Filament\Actions\Action;
use Filament\Resources\Pages\CreateRecord;
use Filament\Support\Exceptions\Halt;
use Illuminate\Contracts\View\View;

class CreateUser extends CreateRecord
{
    protected static string $resource = UserResource::class;

    protected ?string $plainPassword = null;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        // getState() đã hash password vào $data ở trên; giá trị gốc vẫn còn trong raw
        // form state tại thời điểm này — lưu lại để hiện 1 lần duy nhất trong modal.
        $this->plainPassword = $this->form->getRawState()['password'] ?? null;

        return $data;
    }

    protected function afterCreate(): void
    {
        if (blank($this->plainPassword)) {
            return;
        }

        $this->mountAction('showCredentials', [
            'email' => $this->record->email,
            'password' => $this->plainPassword,
        ]);

        // Dừng flow create() ngay tại đây để KHÔNG redirect — nếu không modal sẽ bị
        // đóng ngay lập tức bởi điều hướng trang. Transaction vẫn commit bình thường
        // (Halt mặc định không rollback).
        throw new Halt;
    }

    protected function showCredentialsAction(): Action
    {
        return Action::make('showCredentials')
            ->label('Thông tin đăng nhập')
            ->modalHeading('Đã tạo nhân sự thành công')
            ->modalDescription('Sao chép thông tin đăng nhập để gửi cho nhân sự mới.')
            ->modalIcon('heroicon-o-key')
            ->modalContent(fn (array $arguments): View => view('filament.modals.user-credentials', [
                'email' => $arguments['email'] ?? '',
                'password' => $arguments['password'] ?? '',
            ]))
            ->modalCancelAction(false)
            ->modalSubmitActionLabel('Đóng')
            ->action(fn () => $this->redirect($this->getRedirectUrl()));
    }
}
