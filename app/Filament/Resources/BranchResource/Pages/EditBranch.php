<?php

namespace App\Filament\Resources\BranchResource\Pages;

use App\Filament\Resources\BranchResource;
use App\Filament\Support\DeleteGuard;
use App\Models\Branch;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditBranch extends EditRecord
{
    protected static string $resource = BranchResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteGuard::apply(
                Actions\DeleteAction::make(),
                fn (Branch $record) => BranchResource::deleteBlockReason($record),
            ),
        ];
    }
}
