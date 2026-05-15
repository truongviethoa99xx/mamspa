<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Promotion extends Model
{
    use HasFactory, HasTranslations;

    protected $fillable = [
        'slug', 'title', 'description', 'image', 'link',
        'starts_at', 'ends_at', 'is_active',
    ];

    protected $casts = [
        'starts_at' => 'datetime',
        'ends_at' => 'datetime',
        'is_active' => 'boolean',
    ];

    public array $translatable = ['title', 'description'];

    public function scopeActive($q)
    {
        return $q->where('is_active', true)
            ->where(fn ($q) => $q->whereNull('ends_at')->orWhere('ends_at', '>=', now()));
    }
}
