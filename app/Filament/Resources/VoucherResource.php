<?php

namespace App\Filament\Resources;

use App\Filament\Resources\VoucherResource\Pages;
use App\Models\Voucher;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class VoucherResource extends Resource
{
    protected static ?string $model = Voucher::class;
    protected static ?string $navigationIcon = 'heroicon-o-ticket';
    protected static ?string $navigationGroup = 'Commerce';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('code')->required()->unique(ignoreRecord: true),
            Forms\Components\Select::make('type')->options([
                'fixed' => 'Fixed amount (VND)',
                'percent' => 'Percent (%)',
                'service' => 'Free service',
            ])->required(),
            Forms\Components\TextInput::make('value')->numeric()->required(),
            Forms\Components\TextInput::make('min_order_value')->numeric()->default(0),
            Forms\Components\DateTimePicker::make('expires_at'),
            Forms\Components\Select::make('source')->options([
                'internal' => 'Internal', 'klook' => 'Klook', 'traveloka' => 'Traveloka',
            ])->default('internal'),
            Forms\Components\Toggle::make('is_active')->default(true),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('code')->searchable(),
            Tables\Columns\TextColumn::make('type')->badge(),
            Tables\Columns\TextColumn::make('value'),
            Tables\Columns\TextColumn::make('expires_at')->date(),
            Tables\Columns\TextColumn::make('source')->badge(),
            Tables\Columns\IconColumn::make('is_active')->boolean(),
        ])->actions([Tables\Actions\EditAction::make()]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListVouchers::route('/'),
            'create' => Pages\CreateVoucher::route('/create'),
            'edit' => Pages\EditVoucher::route('/{record}/edit'),
        ];
    }
}
