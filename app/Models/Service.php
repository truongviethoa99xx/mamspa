<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Translatable\HasTranslations;

/**
 * @property-read string $url
 */
class Service extends Model implements HasMedia
{
    use HasFactory, HasTranslations, InteractsWithMedia;

    protected $fillable = [
        'slug', 'name', 'short_description', 'description', 'service_category_id', 'duration', 'price',
        'ingredients', 'steps', 'benefits', 'experience_images', 'faqs', 'ideal_for', 'is_featured', 'is_combo', 'is_active',
    ];

    protected $casts = [
        'ingredients' => 'array',
        'steps' => 'array',
        'benefits' => 'array',
        'experience_images' => 'array',
        'faqs' => 'array',
        'ideal_for' => 'array',
        'is_featured' => 'boolean',
        'is_combo' => 'boolean',
        'is_active' => 'boolean',
        'duration' => 'integer',
        'price' => 'integer',
    ];

    public array $translatable = ['name', 'short_description', 'description'];

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

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    public function bookingItems(): HasMany
    {
        return $this->hasMany(BookingItem::class);
    }

    public function scopeActive($q)
    {
        return $q->where('is_active', true);
    }

    public function scopeFeatured($q)
    {
        return $q->where('is_featured', true);
    }

    /** Dịch vụ là gói combo — qua cờ is_combo hoặc gán vào danh mục có slug "combo". */
    public function scopeCombo($q)
    {
        return $q->where(function ($query) {
            $query->where('is_combo', true)
                ->orWhereHas('category', fn ($categoryQuery) => $categoryQuery->where('slug', 'combo')
                    ->orWhereHas('parent', fn ($parentQuery) => $parentQuery->where('slug', 'combo')));
        });
    }

    /** URL công khai của dịch vụ: /dich-vu/{category}/{slug}/ (yêu cầu category.parent đã eager-load). */
    public function getUrlAttribute(): string
    {
        if (! $this->category) {
            return "/dich-vu/{$this->slug}/";
        }

        return "{$this->category->url}{$this->slug}/";
    }
}
