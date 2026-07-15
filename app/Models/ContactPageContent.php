<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactPageContent extends Model
{
    protected $fillable = [
        'seo_description',
        'heading',
        'email',
        'map_embed_url',
    ];

    protected $casts = [
        'seo_description' => 'array',
        'heading' => 'array',
    ];

    public static function current(): self
    {
        return static::first() ?? static::create();
    }
}
