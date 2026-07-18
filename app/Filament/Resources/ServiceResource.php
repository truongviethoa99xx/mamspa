<?php

namespace App\Filament\Resources;

use App\Filament\Concerns\RestrictsFilamentAccess;
use App\Filament\Forms\TranslatableField;
use App\Filament\Resources\ServiceResource\Pages;
use App\Models\Service;
use App\Models\ServiceCategory;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ServiceResource extends Resource
{
    use RestrictsFilamentAccess;

    protected static ?string $model = Service::class;

    public static function deleteBlockReason(Service $record): ?string
    {
        $bookingCount = $record->bookings()->count() + $record->bookingItems()->count();

        if ($bookingCount > 0) {
            return "Dịch vụ này đang được dùng trong {$bookingCount} lịch đặt. Vui lòng xử lý hết lịch đặt trước khi xóa, hoặc tắt \"Kích hoạt\" để ẩn dịch vụ.";
        }

        return null;
    }

    protected static ?string $navigationIcon = 'heroicon-o-sparkles';

    protected static ?string $navigationGroup = 'Nội dung';

    protected static ?string $navigationLabel = 'Dịch vụ';

    protected static ?string $modelLabel = 'Dịch vụ';

    protected static ?string $pluralModelLabel = 'Dịch vụ';

    protected static ?int $navigationSort = 6;

    protected static function allowedRoles(): array
    {
        return User::contentRoles();
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Ảnh đại diện')
                ->schema([
                    Forms\Components\SpatieMediaLibraryFileUpload::make('thumbnail')
                        ->label('Ảnh đại diện')
                        ->helperText('Ảnh chính hiển thị trên thẻ dịch vụ ở trang chủ & danh sách. Ảnh vuông/dọc chất lượng cao, khuyến nghị tối thiểu 1200×1200px.')
                        ->collection('thumbnail')
                        ->image()
                        ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                        ->maxSize(5120),
                    TranslatableField::group('thumbnail_alt', label: 'Alt text ảnh đại diện'),
                ]),
            Forms\Components\Section::make('Cơ bản')->schema([
                Forms\Components\TextInput::make('slug')->label('Slug')->required()->unique(ignoreRecord: true),
                Forms\Components\Select::make('service_category_id')
                    ->label('Danh mục')
                    ->options(fn () => self::categoryOptions())
                    ->native()
                    ->required()
                    ->exists('service_categories', 'id'),
                Forms\Components\TextInput::make('duration')->label('Thời lượng (phút)')->numeric()->required()->columnSpanFull(),
                Forms\Components\Toggle::make('is_featured')->label('Nổi bật')->hidden(),
                Forms\Components\Toggle::make('is_combo')->label('Combo')->hidden(),
                Forms\Components\Toggle::make('is_active')->label('Kích hoạt')->default(true),
            ])->columns(2),
            TranslatableField::group('name', as: 'quill', label: 'Tên dịch vụ', required: true),
            TranslatableField::group('short_description', as: 'quill', label: 'Mô tả ngắn', example: 'Liệu pháp massage thư giãn với tinh dầu thiên nhiên.'),
            TranslatableField::group('description', as: 'quill', label: 'Mô tả'),
            Forms\Components\Section::make('Điểm nổi bật chuyên môn')
                ->description('Đoạn giới thiệu + các điểm nổi bật dạng icon, hiển thị ngay dưới banner đầu trang chi tiết dịch vụ.')
                ->schema([
                    Forms\Components\FileUpload::make('pillars_image')
                        ->label('Ảnh minh hoạ')
                        ->helperText('Ảnh vuông/hơi ngang, khuyến nghị tối thiểu 1000×800px.')
                        ->image()
                        ->disk('public')
                        ->directory('services/pillars')
                        ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                        ->maxSize(5120)
                        ->imageEditor(),
                    TranslatableField::group('pillars_image_alt', label: 'Alt text ảnh'),
                    TranslatableField::group('pillars_heading', as: 'quill', label: 'Đoạn giới thiệu', example: 'Phát triển từ tinh hoa trị liệu Việt, kết hợp chuyên môn hiện đại.')
                        ->columnSpanFull(),
                    Forms\Components\Repeater::make('pillars')
                        ->label('Điểm nổi bật')
                        ->schema([
                            Forms\Components\Select::make('icon')
                                ->label('Icon')
                                ->options(self::iconOptions())
                                ->native(false)
                                ->required(),
                            TranslatableField::group('title', as: 'quill', label: 'Nội dung', example: 'Liệu trình được thiết kế theo thể trạng và nhu cầu riêng.')
                                ->columnSpanFull(),
                        ])
                        ->columns(1)
                        ->defaultItems(0)
                        ->reorderable()
                        ->collapsible()
                        ->cloneable()
                        ->itemLabel(fn (array $state): ?string => is_array($state['title'] ?? null) ? strip_tags($state['title']['vi'] ?? '') : null)
                        ->addActionLabel('+ Thêm điểm nổi bật')
                        ->columnSpanFull(),
                ]),
            Forms\Components\TagsInput::make('ingredients')->label('Nguyên liệu')->hidden(),
            Forms\Components\Section::make('Quy trình các bước')
                ->description('Các bước trong liệu trình dịch vụ. Mỗi bước có tên, mô tả và thời gian. Kéo thả để sắp xếp thứ tự.')
                ->hidden()
                ->schema([
                    Forms\Components\Repeater::make('steps')
                        ->label('')
                        ->schema([
                            TranslatableField::group('name', label: 'Tên bước', example: 'Làm sạch & tẩy tế bào chết')
                                ->columnSpanFull(),
                            TranslatableField::group('description', as: 'textarea', label: 'Mô tả', rows: 2, example: 'Làm sạch sâu, loại bỏ bụi bẩn và tế bào chết.')
                                ->columnSpanFull(),
                            Forms\Components\TextInput::make('duration')
                                ->label('Thời gian (phút)')
                                ->numeric()
                                ->minValue(0)
                                ->placeholder('15'),
                            Forms\Components\FileUpload::make('image')
                                ->label('Ảnh của bước')
                                ->helperText('Ảnh vuông nhỏ, khuyến nghị tối thiểu 400×400px.')
                                ->image()
                                ->disk('public')
                                ->directory('services/steps')
                                ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                                ->maxSize(5120),
                        ])
                        ->columns(2)
                        ->defaultItems(0)
                        ->reorderable()
                        ->collapsible()
                        ->cloneable()
                        ->itemLabel(fn (array $state): ?string => is_array($state['name'] ?? null) ? ($state['name']['vi'] ?? null) : ($state['name'] ?? null))
                        ->addActionLabel('+ Thêm bước')
                        ->columnSpanFull(),
                ]),
            Forms\Components\Section::make('Đặc điểm chung & dụng cụ sử dụng')
                ->description('Hiển thị 2 cột: vùng áp dụng chung của liệu trình (trái) và sản phẩm/dụng cụ sử dụng (phải).')
                ->schema([
                    Forms\Components\Fieldset::make('Đặc điểm chung của liệu trình')
                        ->schema([
                            Forms\Components\Select::make('treatment_scope_image')
                                ->label('Icon minh hoạ')
                                ->options(self::iconOptions())
                                ->native(false),
                            TranslatableField::group('treatment_scope_note', as: 'quill', label: 'Mô tả vùng áp dụng', example: 'Chăm sóc toàn bộ các vùng cơ chính trên cơ thể.')
                                ->columnSpanFull(),
                        ]),
                    Forms\Components\Fieldset::make('Sản phẩm & dụng cụ sử dụng')
                        ->schema([
                            Forms\Components\Repeater::make('tools_used')
                                ->label('')
                                ->schema([
                                    Forms\Components\Select::make('icon')
                                        ->label('Icon')
                                        ->options(self::iconOptions())
                                        ->native(false)
                                        ->required(),
                                    TranslatableField::group('label', as: 'quill', label: 'Tên sản phẩm/dụng cụ', example: 'Tinh dầu thiên nhiên')
                                        ->columnSpanFull(),
                                ])
                                ->columns(1)
                                ->defaultItems(0)
                                ->reorderable()
                                ->collapsible()
                                ->cloneable()
                                ->grid(2)
                                ->itemLabel(fn (array $state): ?string => is_array($state['label'] ?? null) ? strip_tags($state['label']['vi'] ?? '') : null)
                                ->addActionLabel('+ Thêm sản phẩm/dụng cụ')
                                ->columnSpanFull(),
                        ]),
                ])
                ->columns(2),
            Forms\Components\Section::make('04 tầng trải nghiệm')
                ->description('Các tầng trải nghiệm của liệu trình (VD: thư giãn / cân bằng / phục hồi / chuyên sâu). Kéo thả để sắp xếp thứ tự hiển thị. Số thứ tự (VD "04") gõ trực tiếp trong tiêu đề khối, không tự tính — thêm/bớt tầng thì tự sửa số cho khớp.')
                ->schema([
                    TranslatableField::group('tiers_heading', as: 'quill', label: 'Tiêu đề khối', example: '04 Tầng trải nghiệm'),
                    TranslatableField::group('tiers_subtitle', as: 'quill', label: 'Mô tả khối', example: 'Mỗi tầng trải nghiệm được thiết kế với tỷ lệ thư giãn, kỹ thuật day ấn huyệt và mức độ tác động khác nhau, giúp bạn dễ dàng lựa chọn liệu trình phù hợp.'),
                    Forms\Components\Repeater::make('tiers')
                        ->label('')
                        ->schema([
                            Forms\Components\FileUpload::make('image')
                                ->label('Ảnh')
                                ->helperText('Ảnh ngang, khuyến nghị tối thiểu 800×600px.')
                                ->image()
                                ->disk('public')
                                ->directory('services/tiers')
                                ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                                ->maxSize(5120),
                            TranslatableField::group('image_alt', label: 'Mô tả ảnh (alt)', example: 'Khách hàng thư giãn với liệu trình massage lưng'),
                            TranslatableField::group('name', as: 'quill', label: 'Tên tầng', example: 'Thư giãn')
                                ->columnSpanFull(),
                            TranslatableField::group('description', as: 'quill', label: 'Mô tả ngắn', example: 'Dành cho những cơ thể cần được nghỉ ngơi.')
                                ->columnSpanFull(),
                            Forms\Components\TextInput::make('relaxation_percent')
                                ->label('Tỷ lệ thư giãn (%)')
                                ->numeric()->minValue(0)->maxValue(100),
                            Forms\Components\TextInput::make('acupressure_percent')
                                ->label('Tỷ lệ day ấn huyệt (%)')
                                ->numeric()->minValue(0)->maxValue(100),
                            TranslatableField::group('intensity_label', as: 'quill', label: 'Mức độ tác động', example: 'Nhẹ, Nhẹ đến Vừa'),
                            TranslatableField::group('duration_label', as: 'quill', label: 'Thời lượng', example: '60 phút / 90 phút (kết hợp đá nóng vùng lưng)'),
                            Forms\Components\TagsInput::make('suitable_for')
                                ->label('Phù hợp với')
                                ->placeholder('Nhập một đối tượng rồi nhấn Enter')
                                ->columnSpanFull(),
                        ])
                        ->columns(2)
                        ->defaultItems(0)
                        ->reorderable()
                        ->collapsible()
                        ->cloneable()
                        ->itemLabel(fn (array $state): ?string => is_array($state['name'] ?? null) ? strip_tags($state['name']['vi'] ?? '') : null)
                        ->addActionLabel('+ Thêm tầng trải nghiệm')
                        ->columnSpanFull(),
                ]),
            Forms\Components\Section::make('Ảnh khác')
                ->hidden()
                ->schema([
                    Forms\Components\SpatieMediaLibraryFileUpload::make('images')
                        ->label('Danh sách ảnh khác')
                        ->helperText('Các ảnh phụ hiển thị trong trang chi tiết dịch vụ. Kéo thả để sắp xếp. Khuyến nghị tối thiểu 1200×900px mỗi ảnh.')
                        ->collection('images')
                        ->multiple()
                        ->reorderable()
                        ->panelLayout('grid')
                        ->image()
                        ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                        ->maxSize(5120),
                ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('slug')->label('Slug')->searchable()->sortable(),
            Tables\Columns\TextColumn::make('name')->label('Tên dịch vụ')->searchable()
                ->formatStateUsing(fn ($state) => strip_tags($state)),
            Tables\Columns\TextColumn::make('category.name')->label('Danh mục')->badge()
                ->formatStateUsing(fn ($state) => strip_tags($state)),
            Tables\Columns\TextColumn::make('duration')->label('Thời lượng')->suffix(' phút'),
            Tables\Columns\IconColumn::make('is_active')->label('Kích hoạt')->boolean(),
        ])->filters([
            Tables\Filters\SelectFilter::make('service_category_id')
                ->label('Danh mục')
                ->options(fn () => self::categoryOptions()),
            Tables\Filters\TernaryFilter::make('is_combo')->label('Combo'),
        ])->actions([
            Tables\Actions\EditAction::make(),
        ])
            ->defaultPaginationPageOption(50);
    }

    /** Icon dùng chung cho "Điểm nổi bật", "Đặc điểm chung của liệu trình" và "Sản phẩm & dụng cụ sử dụng" — khớp tên với ICONS map ở resources/js/Components/Services/ServicePillars.tsx và ServiceScopeAndTools.tsx. */
    protected static function iconOptions(): array
    {
        return [
            'HandHeart' => 'Bàn tay ôm trái tim (Lắng nghe cơ thể)',
            'Leaf' => 'Lá cây (Leaf)',
            'Sprout' => 'Mầm cây (Sprout)',
            'Flower2' => 'Hoa (Flower)',
            'HeartHandshake' => 'Trái tim bắt tay (Personalized)',
            'Heart' => 'Trái tim (Heart)',
            'Users' => 'Đội ngũ (Team)',
            'GraduationCap' => 'Mũ tốt nghiệp (Trained)',
            'ShieldCheck' => 'Khiên xác nhận (Trusted)',
            'Sparkles' => 'Lấp lánh (Thoughtful)',
            'Sun' => 'Mặt trời (Sun)',
            'Droplet' => 'Giọt nước (Droplet/Oil)',
            'Flame' => 'Ngọn lửa (Flame/Heat)',
            'Soup' => 'Bát bốc khói (Cao nóng/Steam)',
            'ShoppingBag' => 'Túi (Bag)',
            'Gem' => 'Đá quý (Stone/Gem)',
            'Layers' => 'Xếp lớp (Đá nóng/Stacked stones)',
            'PersonStanding' => 'Người (Body/Scope)',
            'Star' => 'Ngôi sao (Star)',
        ];
    }

    /** Danh sách phẳng: cho phép chọn chính danh mục cấp 1 hoặc một danh mục con cấp 2 (thụt vào để thấy phân cấp). */
    protected static function categoryOptions(): array
    {
        return ServiceCategory::query()
            ->active()
            ->roots()
            ->with(['children' => fn ($q) => $q->active()->orderBy('order')])
            ->orderBy('order')
            ->get()
            ->mapWithKeys(function (ServiceCategory $root) {
                $options = [$root->id => strip_tags($root->getTranslation('name', 'vi'))];
                foreach ($root->children as $child) {
                    $options[$child->id] = '— '.strip_tags($child->getTranslation('name', 'vi'));
                }

                return $options;
            })
            ->all();
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListServices::route('/'),
            'create' => Pages\CreateService::route('/create'),
            'edit' => Pages\EditService::route('/{record}/edit'),
        ];
    }
}
