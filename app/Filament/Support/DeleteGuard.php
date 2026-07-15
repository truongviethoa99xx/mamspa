<?php

namespace App\Filament\Support;

use Closure;
use Filament\Notifications\Notification;
use Illuminate\Database\Eloquent\Model;

/**
 * Chặn xóa bản ghi còn dữ liệu liên quan (FK restrictOnDelete) —
 * hiển thị thông báo thay vì để DB ném lỗi 500.
 */
class DeleteGuard
{
    /**
     * @param  \Filament\Actions\DeleteAction|\Filament\Tables\Actions\DeleteAction  $action
     * @param  Closure(Model): ?string  $blockReason  trả về lý do chặn, hoặc null nếu được phép xóa
     */
    public static function apply($action, Closure $blockReason)
    {
        return $action->before(function ($action, Model $record) use ($blockReason) {
            $reason = $blockReason($record);

            if ($reason === null) {
                return;
            }

            Notification::make()
                ->danger()
                ->title('Không thể xóa')
                ->body($reason)
                ->persistent()
                ->send();

            $action->cancel();
        });
    }
}
