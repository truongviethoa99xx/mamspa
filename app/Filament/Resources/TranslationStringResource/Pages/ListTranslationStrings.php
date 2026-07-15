<?php
namespace App\Filament\Resources\TranslationStringResource\Pages;
use App\Filament\Resources\TranslationStringResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
class ListTranslationStrings extends ListRecords {
    protected static string $resource = TranslationStringResource::class;
    protected function getHeaderActions(): array { return [Actions\CreateAction::make()]; }
}
