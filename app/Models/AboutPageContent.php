<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutPageContent extends Model
{
    protected $fillable = [
        'contact_phone', 'contact_address', 'contact_website',
        'hero_image', 'story_image', 'vision_image',
        'value1_image', 'value2_image', 'value3_image',
        'team', 'instagram_handles',
        'review_video_url', 'review_video_image', 'review_cards',
        // Text đa ngôn ngữ theo section (JSON {vi,en,...}) — trống thì FE fallback nhóm dịch about.*
        'hero_eyebrow', 'hero_title', 'hero_subtitle', 'hero_retreat',
        'features',
        'story_eyebrow', 'story_heading', 'story_p1', 'story_p2',
        'vision_eyebrow', 'vision_title', 'vision_p1', 'vision_p2', 'vision_bullets',
        'values_eyebrow', 'values_title',
        'value1_title', 'value1_desc', 'value2_title', 'value2_desc', 'value3_title', 'value3_desc',
        'team_eyebrow', 'team_title',
        'reviews_eyebrow', 'reviews_title', 'review_video_caption', 'review_quote', 'review_quote_author',
    ];

    protected $casts = [
        'team' => 'array',
        'instagram_handles' => 'array',
        'review_cards' => 'array',
        'hero_eyebrow' => 'array',
        'hero_title' => 'array',
        'hero_subtitle' => 'array',
        'hero_retreat' => 'array',
        'features' => 'array',
        'story_eyebrow' => 'array',
        'story_heading' => 'array',
        'story_p1' => 'array',
        'story_p2' => 'array',
        'vision_eyebrow' => 'array',
        'vision_title' => 'array',
        'vision_p1' => 'array',
        'vision_p2' => 'array',
        'vision_bullets' => 'array',
        'values_eyebrow' => 'array',
        'values_title' => 'array',
        'value1_title' => 'array',
        'value1_desc' => 'array',
        'value2_title' => 'array',
        'value2_desc' => 'array',
        'value3_title' => 'array',
        'value3_desc' => 'array',
        'team_eyebrow' => 'array',
        'team_title' => 'array',
        'reviews_eyebrow' => 'array',
        'reviews_title' => 'array',
        'review_video_caption' => 'array',
        'review_quote' => 'array',
        'review_quote_author' => 'array',
    ];

    /**
     * The page content is a singleton — always work with the first row.
     */
    public static function current(): self
    {
        return static::first() ?? static::create([
            'team' => [],
            'instagram_handles' => [],
            'review_cards' => [],
        ]);
    }
}
