<?php

namespace App\Filament\Resources\ServiceResource\Pages;

use App\Filament\Resources\ServiceResource;
use App\Filament\Support\DeleteGuard;
use App\Models\Service;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditService extends EditRecord
{
    protected static string $resource = ServiceResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteGuard::apply(
                Actions\DeleteAction::make(),
                fn (Service $record) => ServiceResource::deleteBlockReason($record),
            ),
        ];
    }
}
