<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Block extends Model
{
    use HasFactory;

    public const TYPES = [
        'hero', 'service_list', 'gallery', 'testimonial',
        'cta', 'text', 'branches', 'promo_banner',
    ];

    protected $fillable = ['page_id', 'type', 'order', 'data', 'is_active'];

    protected $casts = [
        'data' => 'array',
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    public function page(): BelongsTo
    {
        return $this->belongsTo(Page::class);
    }
}
