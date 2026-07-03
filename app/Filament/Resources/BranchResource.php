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

    protected static ?int $navigationSort = 7;

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
                                TranslatableField::group('name', label: 'Tên chi nhánh', required: true, example: 'Mầm Spa Lê Văn Sỹ')
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
                                            ->label('Vĩ độ (Latitude)')
                                            ->helperText('Số nhỏ ~ 8–23 cho Việt Nam (vd. 10.7938). Lấy từ Google Maps: số ĐẦU trong "10.7938, 106.6677".')
                                            ->placeholder('10.7938')
                                            ->numeric()
                                            ->minValue(-90)
                                            ->maxValue(90),
                                        Forms\Components\TextInput::make('lng')
                                            ->label('Kinh độ (Longitude)')
                                            ->helperText('Số lớn ~ 102–110 cho Việt Nam (vd. 106.6677). Lấy từ Google Maps: số SAU trong "10.7938, 106.6677".')
                                            ->placeholder('106.6677')
                                            ->numeric()
                                            ->minValue(-180)
                                            ->maxValue(180),
                                    ])
                                    ->columns(2)
                                    ->columnSpanFull(),
                            ])
                            ->columns(2),
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
                                    ->helperText('Ảnh 1 & 2 dùng làm ảnh đại diện chi nhánh (dọc/vuông, khuyến nghị tối thiểu 1000×1200px); các ảnh tiếp theo tự do, khuyến nghị tối thiểu 1200×900px.')
                                    ->collection('images')
                                    ->multiple()
                                    ->image()
                                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                                    ->maxSize(5120)
                                    ->reorderable()
                                    ->panelLayout('grid')
                                    ->columnSpanFull(),
                            ]),
                    ])
                    ->columnSpan([
                        'lg' => 1,
                    ])
                    ->extraAttributes(['style' => 'position: sticky; top: 6rem; align-self: start;']),
            ]),

            Forms\Components\Section::make('Phần đầu trang chi nhánh')
                ->icon('heroicon-o-sparkles')
                ->description('Phần mở đầu của trang /chi-nhanh/{slug}. Để trống sẽ dùng nội dung mặc định.')
                ->schema([
                    TranslatableField::group('page_content.hero_eyebrow', label: 'Dòng giới thiệu', example: 'Một góc Sài Gòn xưa giữa lòng thành phố'),
                    TranslatableField::group('page_content.hero_heading', label: 'Tiêu đề', example: 'Mầm Spa Lê Văn Sỹ'),
                    TranslatableField::group('page_content.hero_body_1', as: 'textarea', label: 'Đoạn 1', rows: 3, example: 'Lạc bước vào không gian Lê Văn Sỹ như trở về một khoảng trời yên tĩnh hiếm hoi.'),
                    TranslatableField::group('page_content.hero_body_2', as: 'textarea', label: 'Đoạn 2', rows: 3, example: 'Một điểm đến lý tưởng để tạm gác lại nhịp sống hối hả và thư giãn sâu.'),
                    TranslatableField::group('page_content.hero_cta_label', label: 'Nút CTA', example: 'Đặt lịch tại chi nhánh'),
                    Forms\Components\TextInput::make('page_content.hero_cta_link')->label('Đường dẫn nút CTA')->placeholder('/dat-lich/'),
                ])
                ->columns(2)
                ->collapsible(),
            Forms\Components\Section::make('Khối không gian trên trang chủ')
                ->icon('heroicon-o-home-modern')
                ->description('Nội dung của chi nhánh này trong khối “Khám phá các không gian Mầm Spa” ở trang chủ. Mỗi chi nhánh có nội dung riêng; bấm tab chi nhánh trên trang chủ sẽ đổi theo. Để trống sẽ dùng nội dung mặc định.')
                ->schema([
                    TranslatableField::group('page_content.home_intro_title', label: 'Tiêu đề khối (hiển thị trên cùng)', example: 'Khám phá các không gian Mầm Spa'),
                    TranslatableField::group('page_content.home_intro_eyebrow', label: 'Dòng giới thiệu', example: 'A retreat for body, mind & soul'),
                    TranslatableField::group('page_content.home_intro_subheading', label: 'Tiêu đề phụ', example: 'Không gian chữa lành'),
                    TranslatableField::group('page_content.home_intro_heading', label: 'Tiêu đề lớn', example: 'Nét đẹp của Sài Gòn xưa.'),
                    TranslatableField::group('page_content.home_intro_body_1', as: 'textarea', label: 'Đoạn mô tả 1', rows: 3, example: 'Lạc bước vào không gian Lê Văn Sỹ như trở về một khoảng trời yên tĩnh hiếm hoi.'),
                    TranslatableField::group('page_content.home_intro_body_2', as: 'textarea', label: 'Đoạn mô tả 2', rows: 3, example: 'Một điểm đến lý tưởng để tạm gác lại nhịp sống hối hả và kết nối lại với chính mình.'),
                    TranslatableField::group('page_content.home_intro_cta', label: 'Nút xem chi tiết', example: 'Khám phá chi tiết'),
                ])
                ->columns(2)
                ->collapsible(),
            Forms\Components\Section::make('Không gian chi nhánh')
                ->icon('heroicon-o-photo')
                ->description('Tiêu đề và nhãn ảnh cho cụm hình ảnh giới thiệu không gian.')
                ->schema([
                    TranslatableField::group('page_content.space_eyebrow', label: 'Dòng giới thiệu', example: 'Không gian kiến trúc Indochine'),
                    TranslatableField::group('page_content.space_heading', label: 'Tiêu đề', example: 'Đắm mình trong vẻ đẹp Đông Dương'),
                    TranslatableField::group('page_content.space_image_1_label', label: 'Nhãn ảnh lớn', example: 'Khu vực tiếp đón'),
                    TranslatableField::group('page_content.space_image_2_label', label: 'Nhãn ảnh phụ 1', example: 'Phòng trị liệu riêng tư'),
                    TranslatableField::group('page_content.space_image_3_label', label: 'Nhãn ảnh phụ 2', example: 'Góc thư giãn trà thảo mộc'),
                ])
                ->columns(2)
                ->collapsible()
                ->collapsed(),
            Forms\Components\Section::make('Đánh giá khách quốc tế')
                ->icon('heroicon-o-chat-bubble-left-right')
                ->description('Các đánh giá hiển thị trong trang chi nhánh.')
                ->schema([
                    Forms\Components\Textarea::make('page_content.review_widget')
                        ->label('Widget đánh giá (Elfsight / Google)')
                        ->helperText('Dán Share Link URL (vd. https://xxxx.elf.site) HOẶC toàn bộ mã nhúng (Embed Code, gồm thẻ <script>). Hiển thị ở mục "Đánh giá khách hàng" trên trang chủ và trang chi tiết chi nhánh. Để trống thì không hiện widget.')
                        ->rows(4)
                        ->columnSpanFull(),
                    TranslatableField::group('page_content.reviews_eyebrow', label: 'Dòng giới thiệu', example: 'Cảm nhận của khách hàng'),
                    TranslatableField::group('page_content.reviews_heading', label: 'Tiêu đề', example: 'Được yêu thích bởi khách quốc tế'),
                    Forms\Components\Repeater::make('page_content.reviews')
                        ->label('Danh sách đánh giá')
                        ->schema([
                            Forms\Components\TextInput::make('country')->label('Quốc gia')->required()->placeholder('VD: Hàn Quốc'),
                            Forms\Components\TextInput::make('flag')->label('Emoji cờ')->maxLength(8)->placeholder('VD: 🇰🇷'),
                            TranslatableField::group('title', label: 'Tiêu đề đánh giá', example: 'Trải nghiệm tuyệt vời')
                                ->columnSpanFull(),
                            TranslatableField::group('content', as: 'textarea', label: 'Nội dung', rows: 3, example: 'Nhân viên thân thiện, không gian yên tĩnh, trị liệu rất chuyên nghiệp.')
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
                    TranslatableField::group('page_content.contact_eyebrow', label: 'Dòng giới thiệu', example: 'Ghé thăm chúng tôi'),
                    TranslatableField::group('page_content.contact_heading', label: 'Tiêu đề', example: 'Liên hệ & đặt lịch'),
                    TranslatableField::group('page_content.address_heading', label: 'Tiêu đề địa chỉ', example: 'Địa chỉ'),
                    TranslatableField::group('page_content.phone_heading', label: 'Tiêu đề hotline', example: 'Hotline'),
                    TranslatableField::group('page_content.phone_note', label: 'Ghi chú hotline', example: 'Gọi để được tư vấn và đặt lịch'),
                    TranslatableField::group('page_content.hours_heading', label: 'Tiêu đề giờ mở cửa', example: 'Giờ mở cửa'),
                    TranslatableField::group('page_content.hours_note', label: 'Ghi chú giờ mở cửa', example: 'Mở cửa tất cả các ngày trong tuần'),
                    TranslatableField::group('page_content.map_road_label', label: 'Tên đường trên bản đồ minh họa', example: 'Đường Lê Văn Sỹ'),
                    TranslatableField::group('page_content.map_pin_label', label: 'Nhãn pin bản đồ', example: 'Mầm Spa'),
                    TranslatableField::group('page_content.map_cta_label', label: 'Nút xem bản đồ', example: 'Xem trên Google Maps'),
                    TranslatableField::group('page_content.services_heading', label: 'Tiêu đề danh sách dịch vụ', example: 'Dịch vụ tại chi nhánh'),
                ])
                ->columns(2)
                ->collapsible()
                ->collapsed(),
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
