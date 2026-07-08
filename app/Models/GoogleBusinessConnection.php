<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Bảng đơn dòng — luôn dùng row đầu tiên (singleton), 1 kết nối OAuth
 * dùng chung cho mọi chi nhánh vì tất cả nằm dưới cùng 1 tài khoản GBP.
 */
class GoogleBusinessConnection extends Model
{
    protected $fillable = [
        'account_id', 'account_name', 'access_token', 'refresh_token', 'token_expires_at', 'connected_by',
    ];

    protected $casts = [
        'access_token' => 'encrypted',
        'refresh_token' => 'encrypted',
        'token_expires_at' => 'datetime',
    ];

    public static function current(): ?self
    {
        return static::query()->first();
    }

    public function isConnected(): bool
    {
        return ! empty($this->refresh_token);
    }
}
