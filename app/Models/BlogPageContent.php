<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BlogPageContent extends Model
{
    protected $fillable = [
        'hero_title', 'hero_subtitle', 'hero_image', 'hero_image_alt', 'hero_visible',
    ];

    protected $casts = [
        'hero_title' => 'array',
        'hero_subtitle' => 'array',
        'hero_image_alt' => 'array',
        'hero_visible' => 'boolean',
    ];

    /**
     * The page content is a singleton — always work with the first row.
     * Refreshes after create() so DB-level column defaults (e.g. hero_visible)
     * are hydrated into the in-memory instance instead of staying null/false.
     */
    public static function current(): self
    {
        return static::first() ?? tap(static::create())->refresh();
    }
}
