<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactPageContent extends Model
{
    protected $fillable = [
        'seo_description', 'heading', 'email', 'map_embed_url',
        'hero_subtitle', 'hero_image', 'hero_image_alt', 'hero_visible',
        'branches_title', 'branches_intro', 'branches_directions_label', 'branches_more_label', 'branches_items', 'branches_visible',
        'about_banner_text', 'about_banner_link_text', 'about_banner_link_url', 'about_banner_visible',
        'info_title', 'info_intro', 'hotline', 'hotline_note', 'zalo', 'zalo_note', 'email_note',
        'instagram', 'instagram_note', 'form_title', 'form_intro', 'form_privacy_note', 'contact_form_visible',
        'closing_title', 'closing_image', 'closing_image_alt', 'closing_button_text', 'closing_button_url', 'closing_visible',
        'commitments', 'commitments_visible',
    ];

    protected $casts = [
        'seo_description' => 'array',
        'heading' => 'array',
        'hero_subtitle' => 'array',
        'hero_image_alt' => 'array',
        'hero_visible' => 'boolean',
        'branches_title' => 'array',
        'branches_intro' => 'array',
        'branches_directions_label' => 'array',
        'branches_more_label' => 'array',
        'branches_items' => 'array',
        'branches_visible' => 'boolean',
        'about_banner_text' => 'array',
        'about_banner_link_text' => 'array',
        'about_banner_visible' => 'boolean',
        'info_title' => 'array',
        'info_intro' => 'array',
        'hotline_note' => 'array',
        'zalo_note' => 'array',
        'email_note' => 'array',
        'instagram_note' => 'array',
        'form_title' => 'array',
        'form_intro' => 'array',
        'form_privacy_note' => 'array',
        'contact_form_visible' => 'boolean',
        'closing_title' => 'array',
        'closing_image_alt' => 'array',
        'closing_button_text' => 'array',
        'closing_visible' => 'boolean',
        'commitments' => 'array',
        'commitments_visible' => 'boolean',
    ];

    /**
     * The page content is a singleton — always work with the first row.
     */
    public static function current(): self
    {
        return static::first() ?? static::create(['commitments' => []]);
    }
}
