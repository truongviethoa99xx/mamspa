<?php

namespace App\Filament\Resources;

use App\Filament\Forms\TranslatableField;
use App\Filament\Resources\ServiceResource\Pages;
use App\Models\Service;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ServiceResource extends Resource
{
    protected static ?string $model = Service::class;
    protected static ?string $navigationIcon = 'heroicon-o-sparkles';
    protected static ?string $navigationGroup = 'Content';
    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Cơ bản')->schema([
                Forms\Components\TextInput::make('slug')->required()->unique(ignoreRecord: true),
                Forms\Components\Select::make('category')->options([
                    'massage' => 'Body Massage',
                    'facial' => 'Facial / Da mặt',
                    'head-spa' => 'Head Spa',
                    'foot-spa' => 'Foot Spa',
                    'combo' => 'Combo',
                ])->required(),
                Forms\Components\TextInput::make('duration')->label('Thời lượng (phút)')->numeric()->required(),
                Forms\Components\TextInput::make('price')->label('Giá (VND)')->numeric()->required(),
                Forms\Components\Toggle::make('is_featured'),
                Forms\Components\Toggle::make('is_active')->default(true),
            ])->columns(2),
            TranslatableField::group('name', label: 'Tên dịch vụ', required: true),
            TranslatableField::group('description', as: 'textarea', label: 'Mô tả', rows: 4),
            Forms\Components\TagsInput::make('ingredients')->label('Nguyên liệu'),
            Forms\Components\Select::make('branches')
                ->relationship('branches', 'slug')
                ->multiple()->preload(),
            Forms\Components\SpatieMediaLibraryFileUpload::make('images')->multiple()->image(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('slug')->searchable()->sortable(),
            Tables\Columns\TextColumn::make('name')->searchable(),
            Tables\Columns\TextColumn::make('category')->badge(),
            Tables\Columns\TextColumn::make('duration')->suffix(' phút'),
            Tables\Columns\TextColumn::make('price')->money('VND'),
            Tables\Columns\IconColumn::make('is_featured')->boolean(),
            Tables\Columns\IconColumn::make('is_active')->boolean(),
        ])->filters([
            Tables\Filters\SelectFilter::make('category')->options([
                'massage' => 'Massage', 'facial' => 'Facial',
                'head-spa' => 'Head Spa', 'foot-spa' => 'Foot Spa', 'combo' => 'Combo',
            ]),
        ])->actions([
            Tables\Actions\EditAction::make(),
        ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListServices::route('/'),
            'create' => Pages\CreateService::route('/create'),
            'edit' => Pages\EditService::route('/{record}/edit'),
        ];
    }
}
