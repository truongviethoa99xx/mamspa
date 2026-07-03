<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Translatable\HasTranslations;

class ServiceCategory extends Model
{
    use HasTranslations;

    protected $fillable = ['slug', 'name', 'parent_id', 'order', 'is_active'];

    protected $casts = [
        'order' => 'integer',
        'is_active' => 'boolean',
    ];

    public array $translatable = ['name'];

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

    public function isRoot(): bool
    {
        return $this->parent_id === null;
    }
}
