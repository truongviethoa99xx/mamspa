<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomPage extends Model
{
    protected $fillable = [
        'slug',
        'is_published',
        'banner_title',
        'banner_subtitle',
        'banner_image',
        'banner_image_alt',
        'banner_cta_text',
        'banner_cta_link',
        'banner_cta_background_color',
        'banner_cta_text_color',
        'banner_cta_border_color',
        'banner_secondary_cta_text',
        'banner_secondary_cta_link',
        'banner_secondary_cta_background_color',
        'banner_secondary_cta_text_color',
        'banner_secondary_cta_border_color',
        'banner_visible',
        'body_html',
        'body_css',
        'body_js',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'banner_title' => 'array',
        'banner_subtitle' => 'array',
        'banner_image_alt' => 'array',
        'banner_cta_text' => 'array',
        'banner_secondary_cta_text' => 'array',
        'banner_visible' => 'boolean',
    ];

    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }
}
