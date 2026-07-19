<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OfferPageContent extends Model
{
    protected $fillable = [
        'hero_title', 'hero_subtitle', 'hero_body', 'hero_image', 'hero_image_alt', 'hero_visible',
        'branches_heading', 'branches', 'branches_visible',
        'note_text', 'note_image', 'note_image_alt', 'note_visible',
        'closing_title', 'closing_subtitle', 'closing_image', 'closing_image_alt',
        'closing_button_text', 'closing_button_url', 'closing_visible',
    ];

    protected $casts = [
        'hero_title' => 'array',
        'hero_subtitle' => 'array',
        'hero_body' => 'array',
        'hero_image_alt' => 'array',
        'hero_visible' => 'boolean',
        'branches_heading' => 'array',
        'branches' => 'array',
        'branches_visible' => 'boolean',
        'note_text' => 'array',
        'note_image_alt' => 'array',
        'note_visible' => 'boolean',
        'closing_title' => 'array',
        'closing_subtitle' => 'array',
        'closing_image_alt' => 'array',
        'closing_button_text' => 'array',
        'closing_visible' => 'boolean',
    ];

    /**
     * The page content is a singleton — always work with the first row.
     */
    public static function current(): self
    {
        return static::first() ?? static::create([
            'branches' => [],
        ]);
    }
}
