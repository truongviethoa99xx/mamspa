<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MenuPageContent extends Model
{
    protected $fillable = [
        'slug', 'is_published',
        'hero_kicker', 'hero_title', 'hero_subtitle', 'hero_image', 'hero_image_alt', 'hero_visible',
        'intro_title', 'intro_note', 'intro_visible',
        'branches', 'branches_visible',
        'contact_title', 'contact_text', 'contact_image', 'contact_image_alt', 'contact_visible',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'hero_kicker' => 'array',
        'hero_title' => 'array',
        'hero_subtitle' => 'array',
        'hero_image_alt' => 'array',
        'hero_visible' => 'boolean',
        'intro_title' => 'array',
        'intro_note' => 'array',
        'intro_visible' => 'boolean',
        'branches' => 'array',
        'branches_visible' => 'boolean',
        'contact_title' => 'array',
        'contact_text' => 'array',
        'contact_image_alt' => 'array',
        'contact_visible' => 'boolean',
    ];

    /**
     * Nội dung trang Menu là singleton — luôn thao tác trên bản ghi đầu tiên.
     */
    public static function current(): self
    {
        return static::first() ?? static::create([
            'slug' => 'menu',
            'is_published' => true,
            'branches' => [],
        ]);
    }

    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }
}
