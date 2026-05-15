<?php

namespace App\Filament\Resources;

use App\Filament\Forms\TranslatableField;
use App\Filament\Resources\PromotionResource\Pages;
use App\Models\Promotion;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class PromotionResource extends Resource
{
    protected static ?string $model = Promotion::class;
    protected static ?string $navigationIcon = 'heroicon-o-megaphone';
    protected static ?string $navigationGroup = 'Content';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('slug')->required()->unique(ignoreRecord: true),
            TranslatableField::group('title', label: 'Tiêu đề', required: true),
            TranslatableField::group('description', as: 'textarea', label: 'Mô tả'),
            Forms\Components\FileUpload::make('image')->image(),
            Forms\Components\TextInput::make('link'),
            Forms\Components\DateTimePicker::make('starts_at'),
            Forms\Components\DateTimePicker::make('ends_at'),
            Forms\Components\Toggle::make('is_active')->default(true),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('slug')->searchable(),
            Tables\Columns\TextColumn::make('title'),
            Tables\Columns\TextColumn::make('ends_at')->dateTime(),
            Tables\Columns\IconColumn::make('is_active')->boolean(),
        ])->actions([Tables\Actions\EditAction::make()]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPromotions::route('/'),
            'create' => Pages\CreatePromotion::route('/create'),
            'edit' => Pages\EditPromotion::route('/{record}/edit'),
        ];
    }
}
