<?php

namespace App\Filament\Concerns;

use App\Models\User;
use Filament\Facades\Filament;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

trait RestrictsFilamentAccess
{
    protected static function allowedRoles(): array
    {
        return [User::ROLE_SUPERADMIN];
    }

    /**
     * Khoá EditablePage tương ứng (xem App\Filament\Support\EditablePage), dùng để giới hạn
     * theo từng editor cụ thể qua User::canEditPage(). Trả về null nếu trang này không nằm
     * trong danh sách có thể giới hạn (vẫn chỉ gate bởi allowedRoles()).
     */
    protected static function pageKey(): ?string
    {
        return null;
    }

    protected static function userHasAccess(): bool
    {
        $user = Filament::auth()->user() ?? Auth::user();

        if (! $user instanceof User || ! $user->hasAnyRole(static::allowedRoles())) {
            return false;
        }

        $pageKey = static::pageKey();

        return $pageKey === null || $user->canEditPage($pageKey);
    }

    public static function canAccess(): bool
    {
        return static::userHasAccess();
    }

    public static function shouldRegisterNavigation(): bool
    {
        return static::userHasAccess();
    }

    public static function canViewAny(): bool
    {
        return static::userHasAccess();
    }

    public static function canCreate(): bool
    {
        return static::userHasAccess();
    }

    public static function canEdit(Model $record): bool
    {
        return static::userHasAccess();
    }

    public static function canDelete(Model $record): bool
    {
        return static::userHasAccess();
    }

    public static function canDeleteAny(): bool
    {
        return static::userHasAccess();
    }
}
