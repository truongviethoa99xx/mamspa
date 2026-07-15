<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class PolicyPage extends Model
{
    use HasTranslations;

    protected $fillable = ['slug', 'name', 'content', 'featured_image', 'is_published'];

    protected $casts = [
        'is_published' => 'boolean',
    ];

    public array $translatable = ['name', 'content'];

    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }
}
