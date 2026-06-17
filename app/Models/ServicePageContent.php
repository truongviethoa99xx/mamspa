<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServicePageContent extends Model
{
    protected $fillable = [
        'happy_hours_title', 'happy_hours_desc', 'benefits', 'ideal_for', 'faqs',
        'listing_categories', 'massage_cards', 'head_spa_cards', 'other_care_items',
        'massage_eyebrow', 'head_spa_eyebrow', 'head_spa_title',
        'other_care_eyebrow', 'other_care_title',
    ];

    protected $casts = [
        'benefits' => 'array',
        'ideal_for' => 'array',
        'faqs' => 'array',
        'listing_categories' => 'array',
        'massage_cards' => 'array',
        'head_spa_cards' => 'array',
        'other_care_items' => 'array',
    ];

    /**
     * The page content is a singleton — always work with the first row.
     */
    public static function current(): self
    {
        return static::first() ?? static::create([
            'benefits' => [],
            'ideal_for' => [],
            'faqs' => [],
            'listing_categories' => [],
            'massage_cards' => [],
            'head_spa_cards' => [],
            'other_care_items' => [],
        ]);
    }
}
