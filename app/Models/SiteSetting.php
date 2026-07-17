<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    protected $fillable = [
        'brand_name',
        'logo_path',
        'header_background_color',
        'header_text_color',
        'header_transparent',
        'header_cta_text',
        'header_cta_background_color',
        'header_cta_text_color',
        'tagline',
        'meta_description',
        'hotline',
        'email',
        'chat_url',
        'floating_contact_buttons',
        'social_links',
        'service_menu',
        'address',
        'phone',
        'open_hours',
        'lat',
        'lng',
    ];

    protected $casts = [
        'floating_contact_buttons' => 'array',
        'social_links' => 'array',
        'service_menu' => 'array',
        'header_transparent' => 'boolean',
        'lat' => 'float',
        'lng' => 'float',
    ];

    public static function current(): self
    {
        return static::first() ?? static::create([
            'floating_contact_buttons' => [],
            'social_links' => [],
            'service_menu' => [],
        ]);
    }
}
