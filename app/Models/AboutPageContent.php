<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutPageContent extends Model
{
    protected $fillable = [
        'hero_image', 'hero_image_alt',
        // Text đa ngôn ngữ theo section (JSON {vi,en,...}) — trống thì FE fallback nhóm dịch about.*
        'hero_eyebrow', 'hero_title', 'hero_subtitle', 'hero_visible',
        'features', 'features_eyebrow', 'features_visible',
        'story_image', 'story_image_alt', 'story_heading', 'story_p1', 'story_visible',
        'philosophy_heading', 'philosophy_title', 'philosophy_p1', 'philosophy_image', 'philosophy_image_alt', 'philosophy_visible',
        'approach_image', 'approach_image_alt', 'approach_title', 'approach_p1', 'approach_features', 'approach_visible',
        'spaces_title', 'spaces_intro', 'spaces', 'spaces_visible',
        'people_image', 'people_image_alt', 'people_title', 'people_p1', 'people_visible',
        'experiences_title', 'experiences_intro', 'testimonials', 'experiences_visible',
        'mission_vision_title', 'mission_title', 'mission_desc', 'vision_title', 'vision_desc', 'mission_vision_visible',
        'journey_title', 'journey_intro', 'journey_images', 'journey_visible',
        'invitation_image', 'invitation_image_alt', 'invitation_title', 'invitation_p1', 'invitation_p2',
        'invitation_button_text', 'invitation_button_url', 'invitation_visible',
    ];

    protected $casts = [
        'hero_eyebrow' => 'array',
        'hero_title' => 'array',
        'hero_subtitle' => 'array',
        'hero_image_alt' => 'array',
        'hero_visible' => 'boolean',
        'features' => 'array',
        'features_eyebrow' => 'array',
        'features_visible' => 'boolean',
        'story_image_alt' => 'array',
        'story_heading' => 'array',
        'story_p1' => 'array',
        'story_visible' => 'boolean',
        'philosophy_heading' => 'array',
        'philosophy_title' => 'array',
        'philosophy_p1' => 'array',
        'philosophy_image_alt' => 'array',
        'philosophy_visible' => 'boolean',
        'approach_image_alt' => 'array',
        'approach_title' => 'array',
        'approach_p1' => 'array',
        'approach_features' => 'array',
        'approach_visible' => 'boolean',
        'spaces_title' => 'array',
        'spaces_intro' => 'array',
        'spaces' => 'array',
        'spaces_visible' => 'boolean',
        'people_image_alt' => 'array',
        'people_title' => 'array',
        'people_p1' => 'array',
        'people_visible' => 'boolean',
        'experiences_title' => 'array',
        'experiences_intro' => 'array',
        'testimonials' => 'array',
        'experiences_visible' => 'boolean',
        'mission_vision_title' => 'array',
        'mission_title' => 'array',
        'mission_desc' => 'array',
        'vision_title' => 'array',
        'vision_desc' => 'array',
        'mission_vision_visible' => 'boolean',
        'journey_title' => 'array',
        'journey_intro' => 'array',
        'journey_images' => 'array',
        'journey_visible' => 'boolean',
        'invitation_image_alt' => 'array',
        'invitation_title' => 'array',
        'invitation_p1' => 'array',
        'invitation_p2' => 'array',
        'invitation_button_text' => 'array',
        'invitation_visible' => 'boolean',
    ];

    /**
     * The page content is a singleton — always work with the first row.
     */
    public static function current(): self
    {
        return static::first() ?? static::create([
            'spaces' => [],
            'testimonials' => [],
            'journey_images' => [],
        ]);
    }
}
