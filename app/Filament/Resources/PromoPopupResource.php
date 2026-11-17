<?php

namespace App\Filament\Resources;

use App\Filament\Concerns\RestrictsFilamentAccess;
use App\Filament\Forms\TranslatableField;
use App\Filament\Resources\PromoPopupResource\Pages;
use App\Models\PromoPopup;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class PromoPopupResource extends Resource
{
    use RestrictsFilamentAccess;

    protected static ?string $model = PromoPopup::class;

    protected static ?string $navigationIcon = 'heroicon-o-megaphone';

    protected static ?string $navigationGroup = 'Nội dung';

    protected static ?string $navigationLabel = 'Popup quảng cáo';

    protected static ?string $modelLabel = 'Popup quảng cáo';

    protected static ?string $pluralModelLabel = 'Popup quảng cáo';

    protected static ?int $navigationSort = 20;

    protected static function allowedRoles(): array
    {
        return User::contentRoles();
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Grid::make(3)->schema([
                Forms\Components\Group::make([
                    Forms\Components\Section::make('Nội dung popup')
                        ->schema([
                            Forms\Components\TextInput::make('name')
                                ->label('Tên gọi nội bộ')
                                ->helperText('Chỉ để bạn phân biệt trong danh sách, không hiện ra website.')
                                ->required()
                                ->maxLength(120),
                            TranslatableField::group('title', label: 'Tiêu đề', required: true, example: 'Ưu đãi tháng 12'),
                            TranslatableField::group('description', as: 'textarea', label: 'Mô tả', example: 'Giảm 20% liệu trình Head Spa cho khách đặt lịch trước ngày 31/12.'),
                            Forms\Components\FileUpload::make('image')
                                ->label('Ảnh (tuỳ chọn)')
                                ->helperText('Hiện phía trên tiêu đề. Ảnh ngang tỉ lệ 16:9, tối thiểu 800px.')
                                ->image()
                                ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                                ->maxSize(2048)
                                ->disk('public')
                                ->directory('popups')
                                ->imageEditor(),
                        ]),

                    Forms\Components\Section::make('Nút bấm')
                        ->description('Để trống chữ trên nút thì popup không có nút.')
                        ->schema([
                            TranslatableField::group('button_text', label: 'Chữ trên nút', example: 'Đặt lịch ngay'),
                            Forms\Components\TextInput::make('button_url')
                                ->label('Link khi bấm nút')
                                ->placeholder('/booking hoặc https://...')
                                ->rules(['nullable', 'regex:/\A(#|\/|https?:\/\/|tel:|mailto:)/i'])
                                ->validationMessages(['regex' => 'Link phải bắt đầu bằng /, #, http(s)://, tel: hoặc mailto:.']),
                            Forms\Components\ColorPicker::make('button_background')
                                ->label('Màu nền nút')
                                ->default('#556B3F')
                                ->required(),
                            Forms\Components\ColorPicker::make('button_text_color')
                                ->label('Màu chữ trên nút')
                                ->default('#FFFFFF')
                                ->required(),
                        ])->columns(2),
                ])->columnSpan(2),

                Forms\Components\Group::make([
                    Forms\Components\Section::make('Hiển thị')
                        ->schema([
                            Forms\Components\Toggle::make('is_active')
                                ->label('Bật popup')
                                ->default(true),
                            Forms\Components\Select::make('position')
                                ->label('Vị trí xuất hiện')
                                ->options(PromoPopup::POSITIONS)
                                ->default('center')
                                ->required()
                                ->native(false),
                            Forms\Components\TextInput::make('delay_seconds')
                                ->label('Hiện sau (giây)')
                                ->helperText('Số giây chờ sau khi khách mở trang. Mỗi khách chỉ thấy 1 lần mỗi phiên truy cập (sau khi đóng popup sẽ không hiện lại cho tới phiên sau).')
                                ->numeric()
                                ->integer()
                                ->minValue(0)
                                ->maxValue(600)
                                ->default(3)
                                ->required(),
                        ]),

                    Forms\Components\Section::make('Thời gian xuất hiện')
                        ->description('Để trống = không giới hạn. Giờ theo múi giờ Việt Nam.')
                        ->schema([
                            Forms\Components\DateTimePicker::make('starts_at')
                                ->label('Bắt đầu từ')
                                ->seconds(false),
                            Forms\Components\DateTimePicker::make('ends_at')
                                ->label('Kết thúc lúc')
                                ->seconds(false)
                                ->afterOrEqual('starts_at'),
                        ]),
                ])->columnSpan(1),
            ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')->label('Tên')->searchable(),
                Tables\Columns\TextColumn::make('position')
                    ->label('Vị trí')
                    ->formatStateUsing(fn (string $state) => PromoPopup::POSITIONS[$state] ?? $state)
                    ->badge(),
                Tables\Columns\TextColumn::make('starts_at')->label('Bắt đầu')->dateTime('d/m/Y H:i')->placeholder('Ngay'),
                Tables\Columns\TextColumn::make('ends_at')->label('Kết thúc')->dateTime('d/m/Y H:i')->placeholder('Không giới hạn'),
                Tables\Columns\TextColumn::make('status')
                    ->label('Trạng thái')
                    ->state(fn (PromoPopup $record) => match (true) {
                        ! $record->is_active => 'Đang tắt',
                        $record->starts_at?->isFuture() => 'Chờ bắt đầu',
                        $record->ends_at?->isPast() => 'Đã kết thúc',
                        default => 'Đang hiển thị',
                    })
                    ->badge()
                    ->color(fn (string $state) => $state === 'Đang hiển thị' ? 'success' : 'gray'),
                Tables\Columns\ToggleColumn::make('is_active')->label('Bật'),
            ])
            ->defaultSort('created_at', 'desc')
            ->actions([Tables\Actions\EditAction::make(), Tables\Actions\DeleteAction::make()])
            ->defaultPaginationPageOption(25);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPromoPopups::route('/'),
            'create' => Pages\CreatePromoPopup::route('/create'),
            'edit' => Pages\EditPromoPopup::route('/{record}/edit'),
        ];
    }
}
