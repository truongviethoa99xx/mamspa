<?php

namespace App\Filament\Resources\MenuBranchPageResource\Pages;

use App\Filament\Resources\MenuBranchPageResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditMenuBranchPage extends EditRecord
{
    protected static string $resource = MenuBranchPageResource::class;

    protected function getHeaderActions(): array
    {
        return [Actions\DeleteAction::make()];
    }
}
