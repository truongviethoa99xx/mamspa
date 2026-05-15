<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Translatable\HasTranslations;

class Page extends Model
{
    use HasFactory, HasTranslations;

    protected $fillable = ['slug', 'title', 'is_published', 'seo_meta'];

    protected $casts = [
        'is_published' => 'boolean',
        'seo_meta' => 'array',
    ];

    public array $translatable = ['title'];

    public function blocks(): HasMany
    {
        return $this->hasMany(Block::class)->orderBy('order');
    }

    public function activeBlocks(): HasMany
    {
        return $this->blocks()->where('is_active', true);
    }
}
