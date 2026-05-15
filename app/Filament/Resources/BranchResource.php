<?php

namespace App\Filament\Resources;

use App\Filament\Forms\TranslatableField;
use App\Filament\Resources\BranchResource\Pages;
use App\Models\Branch;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class BranchResource extends Resource
{
    protected static ?string $model = Branch::class;
    protected static ?string $navigationIcon = 'heroicon-o-building-storefront';
    protected static ?string $navigationGroup = 'Content';
    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Thông tin chi nhánh')->schema([
                Forms\Components\TextInput::make('slug')
                    ->required()->unique(ignoreRecord: true)
                    ->live(onBlur: true),
                TranslatableField::group('name', label: 'Tên chi nhánh', required: true),
                Forms\Components\Textarea::make('address')->required()->rows(2),
                Forms\Components\TextInput::make('phone')->tel()->required(),
                Forms\Components\TextInput::make('open_hours')->default('09:00 - 21:00'),
                Forms\Components\TextInput::make('lat')->numeric(),
                Forms\Components\TextInput::make('lng')->numeric(),
                Forms\Components\Toggle::make('is_active')->default(true),
            ])->columns(2),
            Forms\Components\SpatieMediaLibraryFileUpload::make('images')
                ->multiple()->image()->reorderable(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('slug')->searchable()->sortable(),
            Tables\Columns\TextColumn::make('name')->searchable(),
            Tables\Columns\TextColumn::make('phone'),
            Tables\Columns\IconColumn::make('is_active')->boolean(),
        ])->actions([
            Tables\Actions\EditAction::make(),
            Tables\Actions\DeleteAction::make(),
        ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListBranches::route('/'),
            'create' => Pages\CreateBranch::route('/create'),
            'edit' => Pages\EditBranch::route('/{record}/edit'),
        ];
    }
}
