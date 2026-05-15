<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BookingResource\Pages;
use App\Models\Booking;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class BookingResource extends Resource
{
    protected static ?string $model = Booking::class;
    protected static ?string $navigationIcon = 'heroicon-o-calendar-days';
    protected static ?string $navigationGroup = 'Operations';
    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('code')->disabled(),
            Forms\Components\Select::make('status')->options([
                'pending' => 'Chờ xác nhận',
                'confirmed' => 'Đã xác nhận',
                'completed' => 'Hoàn thành',
                'cancelled' => 'Đã huỷ',
            ])->required(),
            Forms\Components\Select::make('branch_id')->relationship('branch', 'slug')->required(),
            Forms\Components\Select::make('service_id')->relationship('service', 'slug')->required(),
            Forms\Components\Select::make('therapist_id')->relationship('therapist', 'name'),
            Forms\Components\DatePicker::make('date')->required(),
            Forms\Components\TextInput::make('time_slot')->required(),
            Forms\Components\TextInput::make('guest_name')->required(),
            Forms\Components\TextInput::make('guest_phone')->tel()->required(),
            Forms\Components\TextInput::make('guest_email')->email(),
            Forms\Components\Textarea::make('note'),
            Forms\Components\TextInput::make('total_price')->numeric(),
            Forms\Components\TextInput::make('voucher_code'),
            Forms\Components\Select::make('payment_method')->options([
                'cash' => 'Cash', 'card' => 'Card', 'vnpay' => 'VNPay', 'momo' => 'MoMo',
            ]),
            Forms\Components\Select::make('payment_status')->options([
                'unpaid' => 'Chưa thanh toán',
                'paid' => 'Đã thanh toán',
                'refunded' => 'Đã hoàn tiền',
            ]),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('code')->searchable(),
            Tables\Columns\TextColumn::make('guest_name')->searchable(),
            Tables\Columns\TextColumn::make('guest_phone'),
            Tables\Columns\TextColumn::make('branch.slug'),
            Tables\Columns\TextColumn::make('service.slug'),
            Tables\Columns\TextColumn::make('date')->date(),
            Tables\Columns\TextColumn::make('time_slot'),
            Tables\Columns\TextColumn::make('status')->badge()->colors([
                'warning' => 'pending',
                'success' => ['confirmed', 'completed'],
                'danger' => 'cancelled',
            ]),
            Tables\Columns\TextColumn::make('total_price')->money('VND'),
            Tables\Columns\TextColumn::make('payment_status')->badge(),
        ])->defaultSort('date', 'desc')
        ->filters([
            Tables\Filters\SelectFilter::make('status')->options([
                'pending' => 'Pending', 'confirmed' => 'Confirmed',
                'completed' => 'Completed', 'cancelled' => 'Cancelled',
            ]),
            Tables\Filters\SelectFilter::make('branch_id')->relationship('branch', 'slug'),
        ])->actions([Tables\Actions\EditAction::make()]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListBookings::route('/'),
            'edit' => Pages\EditBooking::route('/{record}/edit'),
        ];
    }
}
