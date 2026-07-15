<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class TranslationString extends Model
{
    protected $fillable = ['group', 'key', 'values', 'is_auto_translated'];

    protected $casts = [
        'values' => 'array',
        'is_auto_translated' => 'boolean',
    ];

    protected static function booted(): void
    {
        static::saved(fn () => Cache::forget('translations.all'));
        static::deleted(fn () => Cache::forget('translations.all'));
    }

    /**
     * @return array<string, array<string, string>>  ['vi' => ['nav.home' => '...'], 'en' => [...]]
     */
    public static function allByLocale(): array
    {
        return Cache::remember('translations.all', 3600, function () {
            $locales = config('app.available_locales', ['vi', 'en']);
            $out = array_fill_keys($locales, []);
            foreach (self::all() as $row) {
                foreach ($locales as $lang) {
                    $out[$lang][$row->group.'.'.$row->key] = $row->values[$lang] ?? '';
                }
            }
            return $out;
        });
    }
}
