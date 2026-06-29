<?php

namespace App\Filament\Resources;

use App\Filament\Concerns\RestrictsFilamentAccess;
use App\Filament\Resources\TherapistResource\Pages;
use App\Models\Therapist;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class TherapistResource extends Resource
{
    use RestrictsFilamentAccess;

    protected static ?string $model = Therapist::class;

    protected static ?string $navigationIcon = 'heroicon-o-hand-raised';

    protected static ?string $navigationGroup = 'Vận hành';

    protected static ?string $navigationLabel = 'Kỹ thuật viên';

    protected static ?string $modelLabel = 'Kỹ thuật viên';

    protected static ?string $pluralModelLabel = 'Kỹ thuật viên';

    protected static ?string $slug = 'therapists';

    protected static ?int $navigationSort = 2;

    protected static function allowedRoles(): array
    {
        return User::adminRoles();
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Thông tin kỹ thuật viên')
                ->description('Hồ sơ này chỉ dùng để phân công lịch hẹn, không phải tài khoản đăng nhập CMS.')
                ->schema([
                    Forms\Components\TextInput::make('name')
                        ->label('Họ tên')
                        ->required()
                        ->maxLength(100),
                    Forms\Components\TextInput::make('phone')
                        ->label('Số điện thoại')
                        ->tel()
                        ->maxLength(30),
                    Forms\Components\TextInput::make('email')
                        ->label('Email')
                        ->email()
                        ->rules(['not_regex:/[\r\n]/'])
                        ->maxLength(255),
                    Forms\Components\Toggle::make('is_active')
                        ->label('Đang làm việc')
                        ->default(true),
                    Forms\Components\Textarea::make('specialties')
                        ->label('Chuyên môn')
                        ->placeholder('Ví dụ: Head spa, massage cổ vai gáy, foot spa...')
                        ->rows(3)
                        ->columnSpanFull(),
                    Forms\Components\Textarea::make('notes')
                        ->label('Ghi chú nội bộ')
                        ->rows(4)
                        ->columnSpanFull(),
                ])
                ->columns([
                    'default' => 1,
                    'md' => 2,
                ]),

            Forms\Components\Section::make('Lịch đã được phân công')
                ->schema([
                    Forms\Components\Repeater::make('bookings')
                        ->relationship()
                        ->label('')
                        ->disabled()
                        ->dehydrated(false)
                        ->schema([
                            Forms\Components\TextInput::make('code')->label('Mã')->disabled(),
                            Forms\Components\TextInput::make('guest_name')->label('Khách')->disabled(),
                            Forms\Components\DatePicker::make('date')->label('Ngày')->disabled(),
                            Forms\Components\TextInput::make('time_slot')->label('Giờ')->disabled(),
                            Forms\Components\TextInput::make('status')->label('Trạng thái')->disabled(),
                        ])
                        ->columns([
                            'default' => 1,
                            'md' => 5,
                        ])
                        ->defaultItems(0)
                        ->addable(false)
                        ->deletable(false)
                        ->reorderable(false)
                        ->columnSpanFull(),
                ])
                ->collapsible()
                ->collapsed(fn (?Therapist $record): bool => ! $record?->exists),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\IconColumn::make('is_active')
                ->label('Hoạt động')
                ->boolean(),
            Tables\Columns\TextColumn::make('name')
                ->label('Họ tên')
                ->searchable()
                ->sortable(),
            Tables\Columns\TextColumn::make('phone')
                ->label('Số điện thoại')
                ->searchable()
                ->placeholder('—'),
            Tables\Columns\TextColumn::make('specialties')
                ->label('Chuyên môn')
                ->limit(45)
                ->placeholder('—'),
            Tables\Columns\TextColumn::make('bookings_count')
                ->label('Số lịch')
                ->badge(),
            Tables\Columns\TextColumn::make('updated_at')
                ->label('Cập nhật')
                ->dateTime('d/m/Y H:i')
                ->sortable(),
        ])
            ->defaultSort('is_active', 'desc')
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make()
                    ->hidden(fn (Therapist $record): bool => $record->bookings()->exists()),
            ]);
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
            'index' => Pages\ListTherapists::route('/'),
            'create' => Pages\CreateTherapist::route('/create'),
            'edit' => Pages\EditTherapist::route('/{record}/edit'),
        ];
    }
}
