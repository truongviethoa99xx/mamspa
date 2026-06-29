<?php

namespace App\Filament\Resources;

use App\Filament\Concerns\RestrictsFilamentAccess;
use App\Filament\Forms\TranslatableField;
use App\Filament\Resources\BranchResource\Pages;
use App\Models\Branch;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class BranchResource extends Resource
{
    use RestrictsFilamentAccess;

    protected static ?string $model = Branch::class;

    protected static ?string $navigationIcon = 'heroicon-o-building-storefront';

    protected static ?string $navigationGroup = 'Nội dung';

    protected static ?string $navigationLabel = 'Chi nhánh';

    protected static ?string $modelLabel = 'Chi nhánh';

    protected static ?string $pluralModelLabel = 'Chi nhánh';

    protected static ?int $navigationSort = 1;

    protected static function allowedRoles(): array
    {
        return User::contentRoles();
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Grid::make([
                'default' => 1,
                'lg' => 3,
            ])->schema([
                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Thông tin chi nhánh')
                            ->icon('heroicon-o-building-storefront')
                            ->description('Thông tin chính dùng cho trang chi nhánh, liên hệ và dữ liệu bản đồ.')
                            ->schema([
                                TranslatableField::group('name', label: 'Tên chi nhánh', required: true)
                                    ->columnSpanFull(),
                                Forms\Components\TextInput::make('slug')
                                    ->label('Slug')
                                    ->required()
                                    ->unique(ignoreRecord: true)
                                    ->live(onBlur: true),
                                Forms\Components\TextInput::make('phone')
                                    ->label('Số điện thoại')
                                    ->tel()
                                    ->required(),
                                Forms\Components\Textarea::make('address')
                                    ->label('Địa chỉ')
                                    ->required()
                                    ->rows(2)
                                    ->columnSpanFull(),
                                Forms\Components\TextInput::make('open_hours')
                                    ->label('Giờ mở cửa')
                                    ->default('09:00 - 21:00'),
                                Forms\Components\Fieldset::make('Tọa độ bản đồ')
                                    ->schema([
                                        Forms\Components\TextInput::make('lat')
                                            ->label('Vĩ độ')
                                            ->numeric(),
                                        Forms\Components\TextInput::make('lng')
                                            ->label('Kinh độ')
                                            ->numeric(),
                                    ])
                                    ->columns(2)
                                    ->columnSpanFull(),
                            ])
                            ->columns(2),
                        Forms\Components\Section::make('Phần đầu trang chi nhánh')
                            ->icon('heroicon-o-sparkles')
                            ->description('Phần mở đầu của trang /chi-nhanh/{slug}. Để trống sẽ dùng nội dung mặc định.')
                            ->schema([
                                TranslatableField::group('page_content.hero_eyebrow', label: 'Dòng giới thiệu'),
                                TranslatableField::group('page_content.hero_heading', label: 'Tiêu đề'),
                                TranslatableField::group('page_content.hero_body_1', as: 'textarea', label: 'Đoạn 1', rows: 3),
                                TranslatableField::group('page_content.hero_body_2', as: 'textarea', label: 'Đoạn 2', rows: 3),
                                TranslatableField::group('page_content.hero_cta_label', label: 'Nút CTA'),
                            ])
                            ->columns(2)
                            ->collapsible(),
                        Forms\Components\Section::make('Không gian chi nhánh')
                            ->icon('heroicon-o-photo')
                            ->description('Tiêu đề và nhãn ảnh cho cụm hình ảnh giới thiệu không gian.')
                            ->schema([
                                TranslatableField::group('page_content.space_eyebrow', label: 'Dòng giới thiệu'),
                                TranslatableField::group('page_content.space_heading', label: 'Tiêu đề'),
                                TranslatableField::group('page_content.space_image_1_label', label: 'Nhãn ảnh lớn'),
                                TranslatableField::group('page_content.space_image_2_label', label: 'Nhãn ảnh phụ 1'),
                                TranslatableField::group('page_content.space_image_3_label', label: 'Nhãn ảnh phụ 2'),
                            ])
                            ->columns(2)
                            ->collapsible()
                            ->collapsed(),
                        Forms\Components\Section::make('Đánh giá khách quốc tế')
                            ->icon('heroicon-o-chat-bubble-left-right')
                            ->description('Các đánh giá hiển thị trong trang chi nhánh.')
                            ->schema([
                                TranslatableField::group('page_content.reviews_eyebrow', label: 'Dòng giới thiệu'),
                                TranslatableField::group('page_content.reviews_heading', label: 'Tiêu đề'),
                                Forms\Components\Repeater::make('page_content.reviews')
                                    ->label('Danh sách đánh giá')
                                    ->schema([
                                        Forms\Components\TextInput::make('country')->label('Quốc gia')->required(),
                                        Forms\Components\TextInput::make('flag')->label('Emoji cờ')->maxLength(8),
                                        TranslatableField::group('title', label: 'Tiêu đề đánh giá')
                                            ->columnSpanFull(),
                                        TranslatableField::group('content', as: 'textarea', label: 'Nội dung', rows: 3)
                                            ->columnSpanFull(),
                                    ])
                                    ->columns(2)
                                    ->defaultItems(0)
                                    ->reorderable()
                                    ->collapsible()
                                    ->itemLabel(fn (array $state): ?string => $state['country'] ?? null)
                                    ->addActionLabel('+ Thêm đánh giá')
                                    ->columnSpanFull(),
                            ])
                            ->columns(2)
                            ->collapsible()
                            ->collapsed(),
                        Forms\Components\Section::make('Liên hệ & bản đồ')
                            ->icon('heroicon-o-map-pin')
                            ->description('Nội dung khối liên hệ, bản đồ minh họa và danh sách dịch vụ trên trang chi nhánh.')
                            ->schema([
                                TranslatableField::group('page_content.contact_eyebrow', label: 'Dòng giới thiệu'),
                                TranslatableField::group('page_content.contact_heading', label: 'Tiêu đề'),
                                TranslatableField::group('page_content.address_heading', label: 'Tiêu đề địa chỉ'),
                                TranslatableField::group('page_content.phone_heading', label: 'Tiêu đề hotline'),
                                TranslatableField::group('page_content.phone_note', label: 'Ghi chú hotline'),
                                TranslatableField::group('page_content.hours_heading', label: 'Tiêu đề giờ mở cửa'),
                                TranslatableField::group('page_content.hours_note', label: 'Ghi chú giờ mở cửa'),
                                TranslatableField::group('page_content.map_road_label', label: 'Tên đường trên bản đồ minh họa'),
                                TranslatableField::group('page_content.map_pin_label', label: 'Nhãn pin bản đồ'),
                                TranslatableField::group('page_content.map_cta_label', label: 'Nút xem bản đồ'),
                                TranslatableField::group('page_content.services_heading', label: 'Tiêu đề danh sách dịch vụ'),
                            ])
                            ->columns(2)
                            ->collapsible()
                            ->collapsed(),
                    ])
                    ->columnSpan([
                        'lg' => 2,
                    ]),
                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Hiển thị')
                            ->icon('heroicon-o-eye')
                            ->schema([
                                Forms\Components\Toggle::make('is_active')
                                    ->label('Đang hoạt động')
                                    ->helperText('Bật để chi nhánh xuất hiện trên website.')
                                    ->default(true),
                            ]),
                        Forms\Components\Section::make('Ảnh chi nhánh')
                            ->icon('heroicon-o-photo')
                            ->description('Ảnh đầu tiên thường được dùng làm ảnh đại diện hoặc ảnh đầu trang. Có thể kéo thả để sắp xếp lại.')
                            ->schema([
                                Forms\Components\SpatieMediaLibraryFileUpload::make('images')
                                    ->label('Thư viện ảnh')
                                    ->multiple()
                                    ->image()
                                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                                    ->maxSize(5120)
                                    ->reorderable()
                                    ->columnSpanFull(),
                            ]),
                    ])
                    ->columnSpan([
                        'lg' => 1,
                    ]),
            ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('slug')->label('Slug')->searchable()->sortable(),
            Tables\Columns\TextColumn::make('name')->label('Tên chi nhánh')->searchable(),
            Tables\Columns\TextColumn::make('phone')->label('Số điện thoại'),
            Tables\Columns\IconColumn::make('is_active')->label('Hiển thị')->boolean(),
        ])->actions([
            Tables\Actions\EditAction::make(),
            Tables\Actions\DeleteAction::make(),
        ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListBranches::route('/'),
            'create' => Pages\CreateBranch::route('/create'),
            'edit' => Pages\EditBranch::route('/{record}/edit'),
        ];
    }
}
