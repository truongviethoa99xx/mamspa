<?php

namespace App\Filament\Resources\ServiceCategoryResource\Pages;

use App\Filament\Resources\ServiceCategoryResource;
use App\Filament\Support\DeleteGuard;
use App\Models\ServiceCategory;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditServiceCategory extends EditRecord
{
    protected static string $resource = ServiceCategoryResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteGuard::apply(
                Actions\DeleteAction::make(),
                fn (ServiceCategory $record) => ServiceCategoryResource::deleteBlockReason($record),
            ),
        ];
    }
}
