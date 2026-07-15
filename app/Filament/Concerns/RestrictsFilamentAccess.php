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

    protected static function userHasAccess(): bool
    {
        $user = Filament::auth()->user() ?? Auth::user();

        return $user instanceof User && $user->hasAnyRole(static::allowedRoles());
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
