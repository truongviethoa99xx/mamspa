<?php

use App\Filament\Forms\TranslatableField;
use App\Models\TranslationString;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('stores auto translated cms fields in ui translations for every target locale', function () {
    $key = TranslatableField::rememberAutoTranslation(
        'page_content.hero_heading',
        'Không gian thư giãn tại Mầm Spa',
        'Relaxing space at Mam Spa',
        'en',
    );
    TranslatableField::rememberAutoTranslation(
        'page_content.hero_heading',
        'Không gian thư giãn tại Mầm Spa',
        'Mầm Spaのリラックス空間',
        'ja',
    );

    $row = TranslationString::where('group', 'cms_auto.page_content')
        ->where('key', str($key)->after('cms_auto.page_content.')->toString())
        ->firstOrFail();

    expect($row->values)->toBe([
        'vi' => 'Không gian thư giãn tại Mầm Spa',
        'en' => 'Relaxing space at Mam Spa',
        'ja' => 'Mầm Spaのリラックス空間',
    ])->and($row->is_auto_translated)->toBeTrue();

    TranslatableField::rememberAutoTranslation(
        'page_content.hero_heading',
        'Không gian thư giãn tại Mầm Spa',
        'A relaxing space at Mam Spa',
        'en',
    );

    expect($row->fresh()->values['en'])->toBe('A relaxing space at Mam Spa');
});
