<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Translatable\HasTranslations;

/**
 * @property-read string $url
 */
class Service extends Model implements HasMedia
{
    use HasFactory, HasTranslations, InteractsWithMedia;

    protected $fillable = [
        'slug', 'name', 'short_description', 'description', 'service_category_id', 'duration', 'price',
        'thumbnail_alt',
        'ingredients', 'steps', 'is_featured', 'is_combo', 'is_active',
        'pillars_heading', 'pillars', 'pillars_image', 'pillars_image_alt', 'treatment_scope_note', 'treatment_scope_image', 'treatment_scope_image_alt', 'tools_used', 'tiers',
        'tiers_heading', 'tiers_subtitle', 'tiers_intensity_label',
        'closing_image', 'closing_image_alt', 'closing_heading', 'closing_body', 'closing_cta_text', 'closing_cta_link',
    ];

    protected $casts = [
        'ingredients' => 'array',
        'steps' => 'array',
        'pillars' => 'array',
        'tools_used' => 'array',
        'tiers' => 'array',
        'is_featured' => 'boolean',
        'is_combo' => 'boolean',
        'is_active' => 'boolean',
        'duration' => 'integer',
        'price' => 'integer',
        'thumbnail_alt' => 'array',
        'pillars_image_alt' => 'array',
        'treatment_scope_image_alt' => 'array',
        'closing_image_alt' => 'array',
        'closing_heading' => 'array',
        'closing_body' => 'array',
        'closing_cta_text' => 'array',
    ];

    public array $translatable = ['name', 'short_description', 'description', 'pillars_heading', 'treatment_scope_note', 'tiers_heading', 'tiers_subtitle', 'tiers_intensity_label'];

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('thumbnail')->singleFile();
        $this->addMediaCollection('images');
    }

    /**
     * Ảnh đại diện được crop sẵn 2 kích thước: 'card' cho thẻ dịch vụ, 'hero' cho banner trang
     * chi tiết. Xuất .webp (không giữ định dạng gốc JPG/PNG) — nhẹ hơn đáng kể ở cùng chất
     * lượng, đây là phần lớn "Improve image delivery" mà Lighthouse/PageSpeed hay báo.
     */
    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('card')
            ->fit(Fit::Crop, 800, 800)
            ->format('webp')
            ->quality(78)
            ->nonQueued()
            ->performOnCollections('thumbnail');

        $this->addMediaConversion('hero')
            ->fit(Fit::Crop, 1920, 960)
            ->format('webp')
            ->quality(78)
            ->nonQueued()
            ->performOnCollections('thumbnail');
    }

    /** URL ảnh thẻ dịch vụ (vuông, tối ưu ~800×800) — ảnh đại diện trước, sau đó ảnh phụ gốc. */
    public function getCardImageUrlsAttribute(): array
    {
        $thumbnail = $this->getFirstMediaUrl('thumbnail', 'card') ?: null;
        $gallery = $this->getMedia('images')->map(fn (Media $media) => $media->getUrl())->all();

        return array_values(array_filter([$thumbnail, ...$gallery]));
    }

    /** URL ảnh banner (ngang, tối ưu ~1920×960) cho hero trang chi tiết dịch vụ. */
    public function getHeroImageUrlAttribute(): ?string
    {
        return $this->getFirstMediaUrl('thumbnail', 'hero') ?: null;
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
