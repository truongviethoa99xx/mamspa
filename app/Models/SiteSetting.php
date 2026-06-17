<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    protected $fillable = [
        'brand_name',
        'tagline',
        'hotline',
        'email',
        'chat_url',
        'floating_contact_buttons',
        'social_links',
        'service_menu',
    ];

    protected $casts = [
        'floating_contact_buttons' => 'array',
        'social_links' => 'array',
        'service_menu' => 'array',
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
