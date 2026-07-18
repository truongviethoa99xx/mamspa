<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Booking extends Model
{
    use HasFactory;

    /** Chi nhánh cố định hiển thị trong select ở trang đặt lịch — lưu thẳng dạng text, không FK. */
    public const BRANCHES = ['Mầm Spa Lê Văn Sỹ', 'Mầm Spa Lê Thị Riêng'];

    protected $fillable = [
        'code', 'user_id', 'customer_id', 'guest_name', 'guest_phone', 'guest_email', 'note',
        'contact_channel', 'contact_value', 'branch',
        'service_id', 'date', 'time_slot',
        'status', 'total_price', 'voucher_code', 'payment_method', 'payment_status',
    ];

    protected $casts = [
        'date' => 'date',
        'total_price' => 'integer',
    ];

    protected static function booted(): void
    {
        static::creating(function (Booking $booking) {
            if (empty($booking->code)) {
                $booking->code = 'MS'.strtoupper(Str::random(8));
            }
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(BookingItem::class);
    }
}
