<?php

namespace App\Filament\Resources;

use App\Filament\Concerns\RestrictsFilamentAccess;
use App\Filament\Resources\BookingResource\Pages;
use App\Models\Booking;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class BookingResource extends Resource
{
    use RestrictsFilamentAccess;

    protected static ?string $model = Booking::class;

    protected static ?string $navigationIcon = 'heroicon-o-calendar-days';

    protected static ?string $navigationGroup = 'Operations';

    protected static ?int $navigationSort = 1;

    protected static function allowedRoles(): array
    {
        return User::adminRoles();
    }

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
            Forms\Components\Select::make('service_id')->relationship('service', 'slug')
                ->required()->helperText('Dịch vụ chính (khách đầu tiên).'),
            Forms\Components\Select::make('therapist_id')->relationship('therapist', 'name'),
            Forms\Components\Select::make('customer_id')
                ->label('Hồ sơ khách hàng')
                ->relationship('customer', 'name')
                ->searchable(['name', 'phone', 'email'])
                ->preload()
                ->helperText('Hồ sơ khách hàng tách biệt với tài khoản nhân viên.'),
            Forms\Components\DatePicker::make('date')->required(),
            Forms\Components\TextInput::make('time_slot')->required(),
            Forms\Components\Repeater::make('items')
                ->relationship()
                ->label('Khách & dịch vụ')
                ->schema([
                    Forms\Components\Select::make('service_id')->relationship('service', 'slug')->required(),
                    Forms\Components\Select::make('gender')->options(['male' => 'Nam', 'female' => 'Nữ']),
                    Forms\Components\TextInput::make('price')->numeric()->required(),
                ])->columns(3)->columnSpanFull()->defaultItems(0),
            Forms\Components\TextInput::make('guest_name')->required(),
            Forms\Components\TextInput::make('guest_phone')->tel()->required(),
            Forms\Components\TextInput::make('guest_email')->email()->rules(['not_regex:/[\r\n]/']),
            Forms\Components\Select::make('contact_channel')->options([
                'zalo' => 'Zalo', 'messenger' => 'Messenger', 'whatsapp' => 'WhatsApp', 'phone' => 'Điện thoại',
            ]),
            Forms\Components\TextInput::make('contact_value')->label('SĐT / ID liên hệ'),
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
            Tables\Columns\TextColumn::make('customer.name')
                ->label('Hồ sơ KH')
                ->searchable()
                ->placeholder('—'),
            Tables\Columns\TextColumn::make('guest_name')->searchable(),
            Tables\Columns\TextColumn::make('guest_phone'),
            Tables\Columns\TextColumn::make('branch.slug'),
            Tables\Columns\TextColumn::make('service.slug'),
            Tables\Columns\TextColumn::make('items_count')->counts('items')->label('Khách')->badge(),
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
