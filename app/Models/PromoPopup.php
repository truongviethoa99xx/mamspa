<?php

namespace App\Models;

use App\Support\OptimizedImageUrl;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

/**
 * Popup quảng cáo duy nhất của website — singleton, luôn thao tác trên bản ghi đầu tiên.
 * Nội dung, vị trí và khung thời gian hiển thị chỉnh trong CMS (Nội dung → Popup quảng cáo).
 */
class PromoPopup extends Model
{
    public const POSITIONS = [
        'center' => 'Giữa màn hình',
        'top-left' => 'Góc trên bên trái',
        'top-right' => 'Góc trên bên phải',
        'bottom-left' => 'Góc dưới bên trái',
        'bottom-right' => 'Góc dưới bên phải',
    ];

    protected $fillable = [
        'name', 'title', 'description', 'button_text', 'button_url',
        'button_background', 'button_text_color', 'image', 'position',
        'delay_seconds', 'starts_at', 'ends_at', 'is_active', 'order',
    ];

    protected $casts = [
        'title' => 'array',
        'description' => 'array',
        'button_text' => 'array',
        'starts_at' => 'datetime',
        'ends_at' => 'datetime',
        'is_active' => 'boolean',
        'delay_seconds' => 'integer',
        'order' => 'integer',
    ];

    /** Mặc định TẮT để chưa cấu hình xong thì không hiện gì ra site. */
    public static function current(): self
    {
        return static::first() ?? static::create(['name' => 'Popup quảng cáo', 'is_active' => false]);
    }

    /** Đang bật và nằm trong khung thời gian hiển thị (đầu/cuối để trống = không giới hạn). */
    public function scopeActive(Builder $query): Builder
    {
        $now = now();

        return $query
            ->where('is_active', true)
            ->where(fn (Builder $q) => $q->whereNull('starts_at')->orWhere('starts_at', '<=', $now))
            ->where(fn (Builder $q) => $q->whereNull('ends_at')->orWhere('ends_at', '>=', $now));
    }

    /** Dữ liệu gửi xuống frontend (Inertia shared prop `promo_popups`). */
    public function toFrontend(): array
    {
        return [
            'id' => $this->id,
            // Đổi khi admin sửa popup → FE dùng để hiện lại popup đã đóng trước đó.
            'version' => $this->updated_at?->timestamp,
            'title' => $this->title,
            'description' => $this->description,
            'button_text' => $this->button_text,
            'button_url' => $this->button_url,
            'button_background' => $this->button_background,
            'button_text_color' => $this->button_text_color,
            'image' => OptimizedImageUrl::resolve($this->image),
            'position' => $this->position,
            'delay_seconds' => $this->delay_seconds,
        ];
    }
}
