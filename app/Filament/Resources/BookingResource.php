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

    protected static ?string $navigationGroup = 'Vận hành';

    protected static ?string $navigationLabel = 'Lịch hẹn';

    protected static ?string $modelLabel = 'Lịch hẹn';

    protected static ?string $pluralModelLabel = 'Lịch hẹn';

    protected static ?int $navigationSort = 1;

    protected static function allowedRoles(): array
    {
        return User::frontDeskRoles();
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Tổng quan lịch hẹn')
                ->description('Mã booking, trạng thái xử lý và thời gian khách đã chọn.')
                ->icon('heroicon-o-calendar-days')
                ->schema([
                    Forms\Components\TextInput::make('code')
                        ->label('Mã đặt lịch')
                        ->disabled()
                        ->dehydrated(false),
                    Forms\Components\Select::make('status')
                        ->label('Trạng thái')
                        ->options([
                            'pending' => 'Chờ xác nhận',
                            'confirmed' => 'Đã xác nhận',
                            'completed' => 'Hoàn thành',
                            'cancelled' => 'Đã huỷ',
                        ])
                        ->native(false)
                        ->required(),
                    Forms\Components\DatePicker::make('date')
                        ->label('Ngày hẹn')
                        ->native(false)
                        ->required(),
                    Forms\Components\TextInput::make('time_slot')
                        ->label('Khung giờ')
                        ->placeholder('09:00')
                        ->required(),
                ])
                ->columns([
                    'default' => 1,
                    'md' => 2,
                    'xl' => 3,
                ]),

            Forms\Components\Section::make('Thông tin khách hàng')
                ->description('Thông tin liên hệ được khách nhập khi đặt lịch.')
                ->icon('heroicon-o-user-circle')
                ->schema([
                    Forms\Components\Select::make('customer_id')
                        ->label('Hồ sơ khách hàng')
                        ->relationship('customer', 'name')
                        ->getOptionLabelFromRecordUsing(fn ($record): string => trim(collect([
                            $record->name,
                            $record->phone,
                            $record->email,
                        ])->filter()->join(' - ')))
                        ->searchable(['name', 'phone', 'email'])
                        ->preload()
                        ->native(false)
                        ->helperText('Hồ sơ khách hàng tách biệt với tài khoản nhân viên.'),
                    Forms\Components\TextInput::make('guest_name')
                        ->label('Tên khách')
                        ->required(),
                    Forms\Components\TextInput::make('guest_phone')
                        ->label('Số điện thoại')
                        ->tel()
                        ->required(),
                    Forms\Components\TextInput::make('guest_email')
                        ->label('Email')
                        ->email()
                        ->rules(['not_regex:/[\r\n]/']),
                    Forms\Components\Select::make('contact_channel')
                        ->label('Kênh liên hệ')
                        ->options([
                            'zalo' => 'Zalo',
                            'messenger' => 'Messenger',
                            'whatsapp' => 'WhatsApp',
                            'phone' => 'Điện thoại',
                        ])
                        ->native(false),
                    Forms\Components\TextInput::make('contact_value')
                        ->label('SĐT / ID liên hệ'),
                ])
                ->columns([
                    'default' => 1,
                    'md' => 2,
                    'xl' => 3,
                ]),

            Forms\Components\Section::make('Dịch vụ trong booking')
                ->description('Dịch vụ chính dùng cho các luồng cũ; danh sách bên dưới là chi tiết từng khách.')
                ->icon('heroicon-o-sparkles')
                ->schema([
                    Forms\Components\Select::make('service_id')
                        ->label('Dịch vụ chính')
                        ->relationship('service', 'slug')
                        ->getOptionLabelFromRecordUsing(fn ($record): string => static::displayName($record->name ?? $record->slug))
                        ->searchable()
                        ->preload()
                        ->native(false)
                        ->required()
                        ->helperText('Dịch vụ chính (khách/dịch vụ đầu tiên).'),
                    Forms\Components\Repeater::make('items')
                        ->relationship()
                        ->label('Khách & dịch vụ')
                        ->schema([
                            Forms\Components\Select::make('service_id')
                                ->label('Dịch vụ')
                                ->relationship('service', 'slug')
                                ->getOptionLabelFromRecordUsing(fn ($record): string => static::displayName($record->name ?? $record->slug))
                                ->searchable()
                                ->preload()
                                ->native(false)
                                ->required()
                                ->columnSpan([
                                    'default' => 1,
                                    'md' => 2,
                                ]),
                            Forms\Components\Select::make('gender')
                                ->label('Khách')
                                ->options(['male' => 'Nam', 'female' => 'Nữ'])
                                ->native(false),
                            Forms\Components\TextInput::make('price')
                                ->label('Giá')
                                ->numeric()
                                ->prefix('₫')
                                ->required(),
                        ])
                        ->columns([
                            'default' => 1,
                            'md' => 4,
                        ])
                        ->defaultItems(0)
                        ->addActionLabel('Thêm dịch vụ')
                        ->reorderable(false)
                        ->columnSpanFull(),
                ])
                ->columns(1),

            Forms\Components\Section::make('Thanh toán & ghi chú')
                ->description('Tổng tiền, voucher và trạng thái thanh toán.')
                ->icon('heroicon-o-banknotes')
                ->schema([
                    Forms\Components\TextInput::make('total_price')
                        ->label('Tổng tiền')
                        ->numeric()
                        ->prefix('₫'),
                    Forms\Components\TextInput::make('voucher_code')
                        ->label('Mã voucher'),
                    Forms\Components\Select::make('payment_method')
                        ->label('Phương thức thanh toán')
                        ->options([
                            'cash' => 'Tiền mặt',
                            'card' => 'Thẻ',
                            'vnpay' => 'VNPay',
                            'momo' => 'MoMo',
                        ])
                        ->native(false),
                    Forms\Components\Select::make('payment_status')
                        ->label('Trạng thái thanh toán')
                        ->options([
                            'unpaid' => 'Chưa thanh toán',
                            'paid' => 'Đã thanh toán',
                            'refunded' => 'Đã hoàn tiền',
                        ])
                        ->native(false),
                    Forms\Components\Textarea::make('note')
                        ->label('Ghi chú')
                        ->rows(5)
                        ->columnSpanFull(),
                ])
                ->columns([
                    'default' => 1,
                    'md' => 2,
                    'xl' => 4,
                ]),
        ]);
    }

    private static function displayName(mixed $value): string
    {
        if (is_array($value)) {
            return strip_tags($value['vi'] ?? $value['en'] ?? collect($value)->filter()->first() ?? '');
        }

        return strip_tags((string) $value);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('code')->label('Mã')->searchable(),
            Tables\Columns\TextColumn::make('customer.name')
                ->label('Hồ sơ KH')
                ->searchable()
                ->placeholder('—'),
            Tables\Columns\TextColumn::make('guest_name')->label('Tên khách')->searchable(),
            Tables\Columns\TextColumn::make('guest_phone')->label('Số điện thoại'),
            Tables\Columns\TextColumn::make('service.slug')->label('Dịch vụ'),
            Tables\Columns\TextColumn::make('items_count')->counts('items')->label('Khách')->badge(),
            Tables\Columns\TextColumn::make('date')->label('Ngày')->date(),
            Tables\Columns\TextColumn::make('time_slot')->label('Giờ'),
            Tables\Columns\TextColumn::make('status')->label('Trạng thái')->badge()->colors([
                'warning' => 'pending',
                'success' => ['confirmed', 'completed'],
                'danger' => 'cancelled',
            ]),
            Tables\Columns\TextColumn::make('total_price')->label('Tổng tiền')->money('VND'),
            Tables\Columns\TextColumn::make('payment_status')->label('Thanh toán')->badge(),
        ])->defaultSort('date', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('status')->label('Trạng thái')->options([
                    'pending' => 'Chờ xác nhận', 'confirmed' => 'Đã xác nhận',
                    'completed' => 'Hoàn thành', 'cancelled' => 'Đã huỷ',
                ]),
            ])->actions([Tables\Actions\EditAction::make()])
            ->defaultPaginationPageOption(50);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListBookings::route('/'),
            'edit' => Pages\EditBooking::route('/{record}/edit'),
        ];
    }
}
