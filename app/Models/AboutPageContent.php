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
    ];

    protected $casts = [
        'team' => 'array',
        'instagram_handles' => 'array',
        'review_cards' => 'array',
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
