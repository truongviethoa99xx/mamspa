<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomerExperiencePageContent extends Model
{
    protected $fillable = [
        'hero_image', 'hero_image_alt', 'hero_title', 'hero_subtitle', 'hero_visible',
        'stats', 'stats_visible',
        'gallery_title', 'gallery_images', 'featured_stat_title', 'featured_stat_description', 'featured_stat_position', 'gallery_visible',
        'testimonials_title', 'testimonials_intro', 'testimonials', 'testimonials_visible',
        'reasons_title', 'reasons_features', 'reasons_card_title', 'reasons_card_description',
        'reasons_card_stat_text', 'reasons_card_avatars', 'reasons_card_button_text', 'reasons_card_button_url', 'reasons_visible',
        'instagram_title', 'instagram_images', 'instagram_handle', 'instagram_description', 'instagram_url', 'instagram_visible',
        'closing_title', 'closing_image', 'closing_image_alt', 'closing_button_text', 'closing_button_url', 'closing_visible',
    ];

    protected $casts = [
        'hero_image_alt' => 'array',
        'hero_title' => 'array',
        'hero_subtitle' => 'array',
        'hero_visible' => 'boolean',
        'stats' => 'array',
        'stats_visible' => 'boolean',
        'gallery_title' => 'array',
        'gallery_images' => 'array',
        'featured_stat_title' => 'array',
        'featured_stat_description' => 'array',
        'gallery_visible' => 'boolean',
        'testimonials_title' => 'array',
        'testimonials_intro' => 'array',
        'testimonials' => 'array',
        'testimonials_visible' => 'boolean',
        'reasons_title' => 'array',
        'reasons_features' => 'array',
        'reasons_card_title' => 'array',
        'reasons_card_description' => 'array',
        'reasons_card_avatars' => 'array',
        'reasons_card_button_text' => 'array',
        'reasons_visible' => 'boolean',
        'instagram_title' => 'array',
        'instagram_images' => 'array',
        'instagram_description' => 'array',
        'instagram_visible' => 'boolean',
        'closing_title' => 'array',
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
            'stats' => [],
            'gallery_images' => [],
            'testimonials' => [],
            'reasons_features' => [],
            'reasons_card_avatars' => [],
            'instagram_images' => [],
        ]);
    }
}
