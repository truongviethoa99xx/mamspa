<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Voucher extends Model
{
    use HasFactory;

    protected $fillable = [
        'code', 'type', 'value', 'min_order_value',
        'expires_at', 'used_at', 'used_by', 'source', 'is_active',
    ];

    protected $casts = [
        'expires_at' => 'datetime',
        'used_at' => 'datetime',
        'is_active' => 'boolean',
        'value' => 'integer',
        'min_order_value' => 'integer',
    ];

    public function isUsable(?int $orderValue = null): bool
    {
        if (! $this->is_active || $this->used_at) {
            return false;
        }
        if ($this->expires_at && $this->expires_at->isPast()) {
            return false;
        }
        if ($orderValue !== null && $orderValue < $this->min_order_value) {
            return false;
        }
        return true;
    }

    public function discountFor(int $orderValue): int
    {
        return match ($this->type) {
            'fixed' => min($this->value, $orderValue),
            'percent' => (int) floor($orderValue * $this->value / 100),
            default => 0,
        };
    }
}
