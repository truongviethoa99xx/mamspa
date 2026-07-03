<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomePageContent extends Model
{
    protected $fillable = [
        'hero_title',
        'hero_subtitle',
        'hero_eyebrow',
        'hero_cta_text',
        'hero_cta_link',
        'hero_image',
        'hero_visible',
        'service_list_title',
        'featured_services_visible',
        'branch_intro_title',
        'branch_intro_eyebrow',
        'branch_intro_subheading',
        'branch_intro_heading',
        'branch_intro_body_1',
        'branch_intro_body_2',
        'branch_intro_cta',
        'branch_intro_caption',
        'testimonial_rating',
        'testimonial_review_count',
        'testimonial_source',
        'testimonials',
        'testimonials_visible',
    ];

    protected $casts = [
        'hero_title' => 'array',
        'hero_subtitle' => 'array',
        'hero_eyebrow' => 'array',
        'hero_cta_text' => 'array',
        'hero_visible' => 'boolean',
        'service_list_title' => 'array',
        'featured_services_visible' => 'boolean',
        'branch_intro_title' => 'array',
        'branch_intro_eyebrow' => 'array',
        'branch_intro_subheading' => 'array',
        'branch_intro_heading' => 'array',
        'branch_intro_body_1' => 'array',
        'branch_intro_body_2' => 'array',
        'branch_intro_cta' => 'array',
        'branch_intro_caption' => 'array',
        'testimonial_rating' => 'integer',
        'testimonial_review_count' => 'integer',
        'testimonials' => 'array',
        'testimonials_visible' => 'boolean',
    ];

    public static function current(): self
    {
        return static::first() ?? static::create([
            'testimonials' => [],
        ]);
    }
}
