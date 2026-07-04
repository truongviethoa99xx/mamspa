<?php

namespace App\Filament\Resources;

use App\Filament\Concerns\RestrictsFilamentAccess;
use App\Filament\Resources\CustomerResource\Pages;
use App\Models\Customer;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class CustomerResource extends Resource
{
    use RestrictsFilamentAccess;

    protected static ?string $model = Customer::class;

    protected static ?string $navigationIcon = 'heroicon-o-user-group';

    protected static ?string $navigationGroup = 'Khách hàng';

    protected static ?string $navigationLabel = 'Khách hàng';

    protected static ?string $modelLabel = 'Khách hàng';

    protected static ?string $pluralModelLabel = 'Khách hàng';

    protected static ?string $slug = 'customers';

    protected static ?int $navigationSort = 1;

    protected static function allowedRoles(): array
    {
        return User::adminRoles();
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Thông tin khách hàng')
                ->schema([
                    Forms\Components\TextInput::make('name')
                        ->label('Họ tên')
                        ->required()
                        ->maxLength(100),
                    Forms\Components\TextInput::make('email')
                        ->label('Email')
                        ->email()
                        ->rules(['not_regex:/[\r\n]/'])
                        ->maxLength(255),
                    Forms\Components\TextInput::make('phone')
                        ->label('Số điện thoại')
                        ->tel()
                        ->maxLength(30),
                    Forms\Components\Select::make('preferred_lang')
                        ->label('Ngôn ngữ')
                        ->options([
                            'vi' => 'Tiếng Việt',
                            'en' => 'Tiếng Anh',
                            'ja' => 'Tiếng Nhật',
                            'ko' => 'Tiếng Hàn',
                            'zh' => 'Tiếng Trung',
                        ])
                        ->default('vi'),
                    Forms\Components\Textarea::make('notes')
                        ->label('Ghi chú nội bộ')
                        ->rows(3)
                        ->columnSpanFull(),
                ])
                ->columns(2),

            Forms\Components\Section::make('Lịch sử đặt lịch')
                ->schema([
                    Forms\Components\Repeater::make('bookings')
                        ->relationship()
                        ->label('')
                        ->disabled()
                        ->dehydrated(false)
                        ->schema([
                            Forms\Components\TextInput::make('code')->label('Mã')->disabled(),
                            Forms\Components\TextInput::make('guest_name')->label('Tên trên booking')->disabled(),
                            Forms\Components\TextInput::make('guest_phone')->label('SĐT')->disabled(),
                            Forms\Components\DatePicker::make('date')->label('Ngày')->disabled(),
                            Forms\Components\TextInput::make('time_slot')->label('Giờ')->disabled(),
                            Forms\Components\TextInput::make('status')->label('Trạng thái')->disabled(),
                            Forms\Components\TextInput::make('total_price')->label('Tổng tiền')->disabled(),
                        ])
                        ->columns(3)
                        ->defaultItems(0)
                        ->addable(false)
                        ->deletable(false)
                        ->reorderable(false)
                        ->columnSpanFull(),
                ])
                ->collapsible()
                ->collapsed(fn (?Customer $record): bool => ! $record?->exists),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('name')
                ->label('Họ tên')
                ->searchable()
                ->sortable(),
            Tables\Columns\TextColumn::make('phone')
                ->label('Số điện thoại')
                ->searchable(),
            Tables\Columns\TextColumn::make('email')
                ->label('Email')
                ->searchable()
                ->placeholder('—'),
            Tables\Columns\TextColumn::make('bookings_count')
                ->label('Số booking')
                ->badge(),
            Tables\Columns\TextColumn::make('created_at')
                ->label('Ngày tạo')
                ->dateTime('d/m/Y H:i')
                ->sortable(),
        ])
            ->defaultSort('created_at', 'desc')
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make()
                    ->hidden(fn (Customer $record): bool => $record->bookings()->exists()),
            ])
            ->defaultPaginationPageOption(50);
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()->withCount('bookings');
    }

    public static function canDelete(Model $record): bool
    {
        return static::userHasAccess() && ! $record->bookings()->exists();
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCustomers::route('/'),
            'create' => Pages\CreateCustomer::route('/create'),
            'edit' => Pages\EditCustomer::route('/{record}/edit'),
        ];
    }
}
