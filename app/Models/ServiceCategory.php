<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Translatable\HasTranslations;

/**
 * @property-read string $url
 */
class ServiceCategory extends Model
{
    use HasTranslations;

    protected $fillable = [
        'slug', 'name', 'description', 'image', 'parent_id', 'order', 'is_active', 'show_in_menu',
        'benefits', 'experience_images', 'faqs', 'ideal_for',
    ];

    protected $casts = [
        'order' => 'integer',
        'is_active' => 'boolean',
        'show_in_menu' => 'boolean',
        'benefits' => 'array',
        'experience_images' => 'array',
        'faqs' => 'array',
        'ideal_for' => 'array',
    ];

    public array $translatable = ['name', 'description'];

    /** Danh mục cấp 1 (null nếu chính nó là cấp 1). */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(self::class, 'parent_id');
    }

    /** Danh mục con cấp 2. */
    public function children(): HasMany
    {
        return $this->hasMany(self::class, 'parent_id')->orderBy('order');
    }

    public function services(): HasMany
    {
        return $this->hasMany(Service::class);
    }

    public function scopeRoots($query)
    {
        return $query->whereNull('parent_id');
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeShowInMenu($query)
    {
        return $query->where('show_in_menu', true);
    }

    public function isRoot(): bool
    {
        return $this->parent_id === null;
    }

    /** URL công khai của danh mục: /dich-vu/{root}/ hoặc /dich-vu/{root}/{child}/. */
    public function getUrlAttribute(): string
    {
        return $this->parent
            ? "/dich-vu/{$this->parent->slug}/{$this->slug}/"
            : "/dich-vu/{$this->slug}/";
    }
}
