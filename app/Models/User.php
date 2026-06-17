<?php

namespace App\Models;

use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements FilamentUser
{
    use HasApiTokens, HasFactory, HasRoles, Notifiable;

    public const ROLE_SUPERADMIN = 'superadmin';

    public const ROLE_ADMIN = 'admin';

    public const ROLE_EDITOR = 'editor';

    public const ROLE_STAFF = 'staff';

    public const ROLE_CUSTOMER = 'customer';

    public const MANAGEABLE_ROLES = [
        self::ROLE_SUPERADMIN,
        self::ROLE_ADMIN,
        self::ROLE_EDITOR,
    ];

    protected $fillable = [
        'name',
        'email',
        'phone',
        'password',
        'preferred_lang',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function canAccessPanel(Panel $panel): bool
    {
        return $this->hasAnyRole([
            self::ROLE_SUPERADMIN,
            self::ROLE_ADMIN,
            self::ROLE_EDITOR,
            self::ROLE_STAFF,
        ]);
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    public static function superAdminRoles(): array
    {
        return [self::ROLE_SUPERADMIN];
    }

    public static function adminRoles(): array
    {
        return [self::ROLE_SUPERADMIN, self::ROLE_ADMIN, self::ROLE_STAFF];
    }

    public static function contentRoles(): array
    {
        return [self::ROLE_SUPERADMIN, self::ROLE_ADMIN, self::ROLE_EDITOR];
    }

    public static function internalRoles(): array
    {
        return [self::ROLE_SUPERADMIN, self::ROLE_ADMIN, self::ROLE_EDITOR, self::ROLE_STAFF];
    }

    public static function roleOptions(): array
    {
        return [
            self::ROLE_SUPERADMIN => 'Superadmin',
            self::ROLE_ADMIN => 'Admin',
            self::ROLE_EDITOR => 'Biên tập viên',
        ];
    }
}
