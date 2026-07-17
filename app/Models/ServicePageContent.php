<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServicePageContent extends Model
{
    protected $fillable = [
        'benefits', 'ideal_for', 'faqs',
        'hero_visible', 'hero_title', 'hero_subtitle', 'hero_image', 'hero_image_alt',
        'showcase_visible',
        'closing_visible', 'closing_image', 'closing_image_alt', 'closing_heading', 'closing_body', 'closing_cta_text', 'closing_cta_link',
    ];

    protected $casts = [
        'benefits' => 'array',
        'ideal_for' => 'array',
        'faqs' => 'array',
        'hero_visible' => 'boolean',
        'hero_title' => 'array',
        'hero_subtitle' => 'array',
        'hero_image_alt' => 'array',
        'showcase_visible' => 'boolean',
        'closing_visible' => 'boolean',
        'closing_image_alt' => 'array',
        'closing_heading' => 'array',
        'closing_body' => 'array',
        'closing_cta_text' => 'array',
    ];

    /**
     * The page content is a singleton — always work with the first row.
     */
    public static function current(): self
    {
        return static::first() ?? static::create([
            'benefits' => [],
            'ideal_for' => [],
            'faqs' => [],
        ]);
    }
}
