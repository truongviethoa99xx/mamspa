<?php

namespace App\Filament\Resources;

use App\Filament\Concerns\RestrictsFilamentAccess;
use App\Filament\Resources\VoucherResource\Pages;
use App\Models\User;
use App\Models\Voucher;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class VoucherResource extends Resource
{
    use RestrictsFilamentAccess;

    protected static ?string $model = Voucher::class;

    protected static ?string $navigationIcon = 'heroicon-o-ticket';

    protected static ?string $navigationGroup = 'Bán hàng';

    protected static ?string $navigationLabel = 'Voucher';

    protected static ?string $modelLabel = 'Voucher';

    protected static ?string $pluralModelLabel = 'Voucher';

    protected static function allowedRoles(): array
    {
        return User::adminRoles();
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('code')->label('Mã')->required()->unique(ignoreRecord: true),
            Forms\Components\Select::make('type')->label('Loại')->options([
                'fixed' => 'Số tiền cố định (VND)',
                'percent' => 'Phần trăm (%)',
                'service' => 'Dịch vụ miễn phí',
            ])->required(),
            Forms\Components\TextInput::make('value')->label('Giá trị')->numeric()->required(),
            Forms\Components\TextInput::make('min_order_value')->label('Giá trị đơn tối thiểu')->numeric()->default(0),
            Forms\Components\DateTimePicker::make('expires_at')->label('Hết hạn'),
            Forms\Components\Select::make('source')->label('Nguồn')->options([
                'internal' => 'Nội bộ', 'klook' => 'Klook', 'traveloka' => 'Traveloka',
            ])->default('internal'),
            Forms\Components\Toggle::make('is_active')->label('Kích hoạt')->default(true),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('code')->label('Mã')->searchable(),
            Tables\Columns\TextColumn::make('type')->label('Loại')->badge(),
            Tables\Columns\TextColumn::make('value')->label('Giá trị'),
            Tables\Columns\TextColumn::make('expires_at')->label('Hết hạn')->date(),
            Tables\Columns\TextColumn::make('source')->label('Nguồn')->badge(),
            Tables\Columns\IconColumn::make('is_active')->label('Kích hoạt')->boolean(),
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
