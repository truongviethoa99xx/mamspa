<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\Translatable\HasTranslations;

class BlogPost extends Model
{
    use HasFactory, HasTranslations;

    protected $fillable = [
        'slug', 'title', 'excerpt', 'body', 'cover_image',
        'author_id', 'seo_meta', 'is_published', 'published_at',
    ];

    protected $casts = [
        'seo_meta' => 'array',
        'is_published' => 'boolean',
        'published_at' => 'datetime',
    ];

    public array $translatable = ['title', 'excerpt', 'body'];

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function scopePublished($q)
    {
        return $q->where('is_published', true)
            ->where(fn ($q) => $q->whereNull('published_at')->orWhere('published_at', '<=', now()));
    }
}
