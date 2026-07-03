<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Translatable\HasTranslations;

class Service extends Model implements HasMedia
{
    use HasFactory, HasTranslations, InteractsWithMedia;

    protected $fillable = [
        'slug', 'name', 'description', 'service_category_id', 'duration', 'price',
        'ingredients', 'steps', 'benefits', 'experience_images', 'is_featured', 'is_active',
    ];

    protected $casts = [
        'ingredients' => 'array',
        'steps' => 'array',
        'benefits' => 'array',
        'experience_images' => 'array',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'duration' => 'integer',
        'price' => 'integer',
    ];

    public array $translatable = ['name', 'description'];

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('thumbnail')->singleFile();
        $this->addMediaCollection('images');
    }

    public function branches(): BelongsToMany
    {
        return $this->belongsToMany(Branch::class, 'service_branch');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(ServiceCategory::class, 'service_category_id');
    }

    public function scopeActive($q)
    {
        return $q->where('is_active', true);
    }

    public function scopeFeatured($q)
    {
        return $q->where('is_featured', true);
    }

    /** Dịch vụ thuộc danh mục có slug $slug — khớp chính danh mục đó hoặc danh mục cấp 1 của nó. */
    public function scopeInCategorySlug($q, string $slug)
    {
        return $q->whereHas('category', function ($categoryQuery) use ($slug) {
            $categoryQuery->where('slug', $slug)
                ->orWhereHas('parent', fn ($parentQuery) => $parentQuery->where('slug', $slug));
        });
    }
}
