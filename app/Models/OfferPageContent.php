<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OfferPageContent extends Model
{
    protected $fillable = [
        'hero_title', 'hero_subtitle', 'hero_body', 'hero_image', 'hero_image_alt', 'hero_visible',
        'benefits_heading', 'benefits_subtitle', 'benefits', 'benefits_visible',
        'branch_offers_heading', 'branch_offers', 'branch_offers_visible',
        'note_text', 'note_image', 'note_image_alt', 'note_visible',
        'closing_title', 'closing_subtitle',
        'closing_primary_button_text', 'closing_primary_button_url',
        'closing_secondary_button_text', 'closing_secondary_button_url', 'closing_visible',
    ];

    protected $casts = [
        'hero_title' => 'array',
        'hero_subtitle' => 'array',
        'hero_body' => 'array',
        'hero_image_alt' => 'array',
        'hero_visible' => 'boolean',
        'benefits_heading' => 'array',
        'benefits_subtitle' => 'array',
        'benefits' => 'array',
        'benefits_visible' => 'boolean',
        'branch_offers_heading' => 'array',
        'branch_offers' => 'array',
        'branch_offers_visible' => 'boolean',
        'note_text' => 'array',
        'note_image_alt' => 'array',
        'note_visible' => 'boolean',
        'closing_title' => 'array',
        'closing_subtitle' => 'array',
        'closing_primary_button_text' => 'array',
        'closing_secondary_button_text' => 'array',
        'closing_visible' => 'boolean',
    ];

    /**
     * The page content is a singleton — always work with the first row.
     */
    public static function current(): self
    {
        return static::first() ?? static::create([
            'benefits' => [],
            'branch_offers' => [],
        ]);
    }
}
