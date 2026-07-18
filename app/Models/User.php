<?php

namespace App\Models;

use Filament\Models\Contracts\FilamentUser;
use Filament\Models\Contracts\HasAvatar;
use Filament\Models\Contracts\HasName;
use Filament\Panel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements FilamentUser, HasAvatar, HasName
{
    use HasApiTokens, HasFactory, HasRoles, Notifiable;

    public const ROLE_SUPERADMIN = 'superadmin';

    public const ROLE_ADMIN = 'admin';

    public const ROLE_EDITOR = 'editor';

    public const ROLE_STAFF = 'staff';

    public const ROLE_RECEPTIONIST = 'receptionist';

    public const ROLE_CUSTOMER = 'customer';

    public const MANAGEABLE_ROLES = [
        self::ROLE_SUPERADMIN,
        self::ROLE_ADMIN,
        self::ROLE_EDITOR,
        self::ROLE_RECEPTIONIST,
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

    public function getFilamentName(): string
    {
        return $this->name ?: $this->email;
    }

    /**
     * Avatar SVG data-URI tự sinh (chữ cái đầu + màu thương hiệu) —
     * không phụ thuộc dịch vụ ngoài như ui-avatars.com, tránh vỡ ảnh trên server bị chặn outbound.
     */
    public function getFilamentAvatarUrl(): ?string
    {
        $svg = sprintf(
            '<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">'
            .'<rect width="96" height="96" rx="48" fill="#556B3F"/>'
            .'<text x="48" y="48" dy="0.35em" text-anchor="middle" '
            .'font-family="Quicksand, ui-sans-serif, sans-serif" font-size="40" font-weight="700" '
            .'fill="#fffdfa">%s</text></svg>',
            htmlspecialchars($this->avatarInitials(), ENT_QUOTES, 'UTF-8'),
        );

        return 'data:image/svg+xml;base64,'.base64_encode($svg);
    }

    private function avatarInitials(): string
    {
        $source = trim((string) ($this->name ?: $this->email));

        if ($source === '') {
            return '?';
        }

        $words = preg_split('/\s+/u', $source, -1, PREG_SPLIT_NO_EMPTY) ?: [];
        $first = mb_substr($words[0] ?? '', 0, 1);
        $second = count($words) > 1 ? mb_substr($words[count($words) - 1], 0, 1) : '';

        return mb_strtoupper($first.$second);
    }

    public function canAccessPanel(Panel $panel): bool
    {
        return $this->hasAnyRole([
            self::ROLE_SUPERADMIN,
            self::ROLE_ADMIN,
            self::ROLE_EDITOR,
            self::ROLE_STAFF,
            self::ROLE_RECEPTIONIST,
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

    /**
     * Vận hành hằng ngày (lịch hẹn, lời nhắn liên hệ, đăng ký nhận tin) —
     * phạm vi lễ tân, không bao gồm voucher/khách hàng như adminRoles().
     */
    public static function frontDeskRoles(): array
    {
        return [...self::adminRoles(), self::ROLE_RECEPTIONIST];
    }

    public static function contentRoles(): array
    {
        return [self::ROLE_SUPERADMIN, self::ROLE_ADMIN, self::ROLE_EDITOR];
    }

    public static function internalRoles(): array
    {
        return [self::ROLE_SUPERADMIN, self::ROLE_ADMIN, self::ROLE_EDITOR, self::ROLE_STAFF, self::ROLE_RECEPTIONIST];
    }

    public static function roleOptions(): array
    {
        return [
            self::ROLE_SUPERADMIN => 'Superadmin',
            self::ROLE_ADMIN => 'Admin',
            self::ROLE_EDITOR => 'Biên tập viên',
            self::ROLE_RECEPTIONIST => 'Lễ tân',
        ];
    }
}
