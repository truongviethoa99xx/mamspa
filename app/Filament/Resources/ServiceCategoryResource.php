<?php

namespace App\Filament\Resources;

use App\Filament\Concerns\RestrictsFilamentAccess;
use App\Filament\Forms\TranslatableField;
use App\Filament\Resources\ServiceCategoryResource\Pages;
use App\Filament\Support\DeleteGuard;
use App\Models\ServiceCategory;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ServiceCategoryResource extends Resource
{
    use RestrictsFilamentAccess;

    protected static ?string $model = ServiceCategory::class;

    protected static ?string $navigationIcon = 'heroicon-o-tag';

    protected static ?string $navigationGroup = 'Nội dung';

    protected static ?string $navigationLabel = 'Danh mục dịch vụ';

    protected static ?string $modelLabel = 'Danh mục dịch vụ';

    protected static ?string $pluralModelLabel = 'Danh mục dịch vụ';

    protected static ?int $navigationSort = 5;

    protected static function allowedRoles(): array
    {
        return User::contentRoles();
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Cơ bản')->schema([
                Forms\Components\TextInput::make('slug')
                    ->label('Slug')
                    ->helperText('Định danh trong URL/bộ lọc, ví dụ: massage, head-spa. Chỉ chữ thường, số và dấu gạch ngang.')
                    ->required()
                    ->maxLength(191)
                    ->alphaDash()
                    ->unique(ignoreRecord: true),
                Forms\Components\Select::make('parent_id')
                    ->label('Danh mục cấp 1')
                    ->options(fn (?ServiceCategory $record) => ServiceCategory::query()
                        ->roots()
                        ->when($record, fn ($query) => $query->whereKeyNot($record->getKey()))
                        ->orderBy('order')
                        ->get()
                        ->mapWithKeys(fn (ServiceCategory $category) => [$category->id => strip_tags($category->getTranslation('name', 'vi'))]))
                    ->native(false)
                    ->searchable()
                    ->disabled(fn (?ServiceCategory $record) => $record && $record->children()->exists())
                    ->helperText(fn (?ServiceCategory $record) => $record && $record->children()->exists()
                        ? 'Danh mục này đang có danh mục con nên phải giữ ở cấp 1.'
                        : 'Để trống nếu đây là danh mục cấp 1. Chỉ chọn được danh mục cấp 1 khác làm cha (tối đa 2 cấp).'),
                Forms\Components\TextInput::make('order')->label('Thứ tự')->numeric()->default(0),
                Forms\Components\Toggle::make('is_active')
                    ->label('Kích hoạt')
                    ->helperText('Tắt sẽ ẩn hoàn toàn danh mục — cả trong danh sách lẫn khi truy cập trực tiếp URL (404).')
                    ->default(true),
                Forms\Components\Toggle::make('is_listed')
                    ->label('Hiển thị trong danh sách')
                    ->helperText('Tắt sẽ ẩn danh mục khỏi các danh sách/menu công khai (trang chủ, trang dịch vụ, danh mục liên quan...) nhưng trang chi tiết vẫn xem được nếu khách gõ thẳng URL.')
                    ->default(true),
            ])->columns(2),
            TranslatableField::group('name', as: 'quill', label: 'Tên danh mục', required: true),
            TranslatableField::group('description', as: 'textarea', label: 'Mô tả danh mục', rows: 3, example: 'Liệu pháp massage toàn thân giúp thư giãn sâu và phục hồi năng lượng.'),
            Forms\Components\Section::make('Ảnh đại diện')
                ->description('Ảnh dùng làm ảnh banner (hero) ở đầu trang danh mục.')
                ->schema([
                    Forms\Components\FileUpload::make('image')
                        ->label('')
                        ->helperText('Tỉ lệ ngang 4:3, khuyến nghị tối thiểu 1200×900px.')
                        ->image()
                        ->disk('public')
                        ->directory('service-categories')
                        ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                        ->maxSize(5120),
                    TranslatableField::group('image_alt', label: 'Alt text ảnh (mô tả ảnh cho SEO/accessibility)', example: 'Massage trị liệu tại Mầm Spa'),
                ]),
            Forms\Components\Section::make('Giới thiệu chăm sóc theo nhu cầu')
                ->description('Khối giới thiệu ngay dưới banner — ảnh minh hoạ bên trái, tiêu đề + đoạn giới thiệu + 3 điểm nổi bật (pillars) bên phải.')
                ->schema([
                    Forms\Components\FileUpload::make('intro_image')
                        ->label('Ảnh minh hoạ')
                        ->helperText('Tỉ lệ ngang 4:3, khuyến nghị tối thiểu 1200×900px.')
                        ->image()
                        ->disk('public')
                        ->directory('service-categories/intro')
                        ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                        ->maxSize(5120),
                    TranslatableField::group('intro_image_alt', label: 'Alt text ảnh'),
                    TranslatableField::group('intro_heading', as: 'quill', label: 'Tiêu đề khối', example: 'Chăm sóc theo nhu cầu, không theo khuôn mẫu'),
                    TranslatableField::group('intro_body', as: 'quill', label: 'Đoạn giới thiệu'),
                    Forms\Components\Repeater::make('pillars')
                        ->label('3 điểm nổi bật')
                        ->schema([
                            Forms\Components\Select::make('icon')
                                ->label('Icon')
                                ->options([
                                    'HandHeart' => 'Bàn tay ôm trái tim (Lắng nghe cơ thể)',
                                    'Leaf' => 'Lá cây (Thảo mộc thiên nhiên)',
                                    'GraduationCap' => 'Mũ tốt nghiệp (Đội ngũ được đào tạo)',
                                    'Sprout' => 'Mầm cây (Sprout)',
                                    'Heart' => 'Trái tim (Heart)',
                                    'ShieldCheck' => 'Khiên xác nhận (Trusted)',
                                    'Sparkles' => 'Lấp lánh (Thoughtful)',
                                ])
                                ->required()
                                ->native(false),
                            TranslatableField::group('title', as: 'quill', label: 'Tiêu đề', example: 'Lắng nghe cơ thể'),
                        ])
                        ->columns(2)
                        ->defaultItems(0)
                        ->maxItems(3)
                        ->reorderable()
                        ->collapsible()
                        ->itemLabel(fn (array $state): ?string => strip_tags($state['title']['vi'] ?? '') ?: null)
                        ->addActionLabel('+ Thêm điểm nổi bật (tối đa 3)')
                        ->columnSpanFull(),
                ]),
            Forms\Components\Section::make('Trích dẫn nổi bật')
                ->description('Khối trích dẫn lớn chính giữa trang, phía trên khối "Trải nghiệm theo tầng".')
                ->schema([
                    TranslatableField::group('quote', as: 'quill', label: 'Nội dung trích dẫn', example: 'Massage không đơn thuần là kỹ thuật. Đó là sự thấu hiểu cơ thể thông qua từng chuyển động.'),
                ]),
            Forms\Components\Section::make('Trải nghiệm theo tầng')
                ->description('Khối "Mỗi tầng trải nghiệm được thiết kế khác nhau về" — ảnh minh hoạ bên trái, tiêu đề + checklist + đoạn mô tả bên phải.')
                ->schema([
                    Forms\Components\FileUpload::make('experience_note_image')
                        ->label('Ảnh minh hoạ')
                        ->helperText('Tỉ lệ ngang 4:3, khuyến nghị tối thiểu 1200×900px.')
                        ->image()
                        ->disk('public')
                        ->directory('service-categories/experience-note')
                        ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                        ->maxSize(5120),
                    TranslatableField::group('experience_note_image_alt', label: 'Alt text ảnh'),
                    TranslatableField::group('experience_note_title', as: 'quill', label: 'Tiêu đề khối', example: 'Mỗi tầng trải nghiệm được thiết kế khác nhau về'),
                    Forms\Components\Repeater::make('experience_checklist')
                        ->label('Checklist (mỗi dòng 1 ý ngắn)')
                        ->schema([
                            TranslatableField::group('text', label: 'Nội dung', example: 'Mức độ thư giãn')
                                ->columnSpanFull(),
                        ])
                        ->columns(1)
                        ->defaultItems(0)
                        ->reorderable()
                        ->collapsible()
                        ->itemLabel(fn (array $state): ?string => is_array($state['text'] ?? null) ? ($state['text']['vi'] ?? null) : ($state['text'] ?? null))
                        ->addActionLabel('+ Thêm dòng')
                        ->columnSpanFull(),
                    TranslatableField::group('experience_note_body', as: 'quill', label: 'Đoạn mô tả'),
                ]),
            Forms\Components\Section::make('Lưới liệu pháp con')
                ->description('Tiêu đề khối lưới các dịch vụ con.')
                ->schema([
                    TranslatableField::group('therapy_heading', as: 'quill', label: 'Tiêu đề khối', example: 'Nhóm liệu pháp'),
                ]),
            Forms\Components\Section::make('Banner khép lại trang (riêng cho danh mục này)')
                ->description('Tuỳ chọn — để trống toàn bộ thì dùng chung banner mặc định ở /admin/service-page-settings. Điền vào đây nếu muốn danh mục này có banner CTA riêng.')
                ->collapsed()
                ->schema([
                    Forms\Components\FileUpload::make('closing_image')->label('Ảnh nền (tuỳ chọn)')
                        ->helperText('Ảnh nền banner CTA hiển thị rõ nét, không có lớp phủ — nên chọn ảnh tông sáng để chữ tối vẫn đọc rõ. Chiều cao tự co theo nội dung chữ, chọn ảnh ngang chủ thể căn giữa, khuyến nghị tối thiểu 1600×900px.')
                        ->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(5120)->disk('public')->directory('service-categories/closing')->imageEditor(),
                    TranslatableField::group('closing_image_alt', label: 'Alt text ảnh (bỏ trống nếu ảnh chỉ mang tính trang trí)'),
                    TranslatableField::group('closing_heading', as: 'quill', label: 'Tiêu đề'),
                    TranslatableField::group('closing_body', as: 'quill', label: 'Mô tả'),
                    TranslatableField::group('closing_cta_text', as: 'quill', label: 'Nhãn nút CTA'),
                    Forms\Components\TextInput::make('closing_cta_link')->label('Link nút CTA')->url(),
                ]),
            Forms\Components\Section::make('Lợi ích dịch vụ')
                ->description('Các lợi ích nổi bật của nhóm dịch vụ này. Hiển thị trên trang chi tiết các dịch vụ thuộc danh mục.')
                ->hidden()
                ->schema([
                    Forms\Components\Repeater::make('benefits')
                        ->label('')
                        ->schema([
                            TranslatableField::group('title', label: 'Tiêu đề lợi ích', example: 'Giảm căng thẳng, thư giãn sâu')
                                ->columnSpanFull(),
                        ])
                        ->columns(1)
                        ->defaultItems(0)
                        ->reorderable()
                        ->collapsible()
                        ->cloneable()
                        ->itemLabel('Lợi ích')
                        ->itemNumbers()
                        ->addActionLabel('+ Thêm lợi ích')
                        ->columnSpanFull(),
                ]),
            Forms\Components\Section::make('Đối tượng phù hợp')
                ->description('Nhóm khách hàng đặc biệt phù hợp với nhóm dịch vụ này. Hiển thị cùng khối "Lợi ích & đối tượng phù hợp" ở trang chi tiết dịch vụ.')
                ->hidden()
                ->schema([
                    Forms\Components\TagsInput::make('ideal_for')
                        ->label('')
                        ->placeholder('Nhập một đối tượng rồi nhấn Enter')
                        ->columnSpanFull(),
                ]),
            Forms\Components\Section::make('Hình ảnh trải nghiệm khách hàng')
                ->description('Bộ ảnh thực tế khách hàng trải nghiệm nhóm dịch vụ này. Mỗi ảnh có mô tả (alt) cho SEO/khả năng truy cập.')
                ->hidden()
                ->schema([
                    Forms\Components\Repeater::make('experience_images')
                        ->label('')
                        ->schema([
                            Forms\Components\FileUpload::make('image')
                                ->label('Ảnh')
                                ->helperText('Ảnh vuông, khuyến nghị tối thiểu 800×800px.')
                                ->image()
                                ->disk('public')
                                ->directory('service-categories/experience')
                                ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                                ->maxSize(5120)
                                ->required(),
                            Forms\Components\TextInput::make('alt')
                                ->label('Mô tả ảnh (alt)')
                                ->placeholder('VD: Khách hàng thư giãn trong phòng trị liệu'),
                        ])
                        ->columns(2)
                        ->defaultItems(0)
                        ->reorderable()
                        ->collapsible()
                        ->grid(2)
                        ->addActionLabel('+ Thêm ảnh')
                        ->columnSpanFull(),
                ]),
            Forms\Components\Section::make('Câu hỏi thường gặp (FAQ)')
                ->description('FAQ chung của nhóm dịch vụ này, hiển thị ở cuối trang chi tiết các dịch vụ thuộc danh mục.')
                ->hidden()
                ->schema([
                    Forms\Components\Repeater::make('faqs')
                        ->label('')
                        ->schema([
                            TranslatableField::group('question', label: 'Câu hỏi', required: true, example: 'Dịch vụ này có phù hợp với da nhạy cảm không?')
                                ->columnSpanFull(),
                            TranslatableField::group('answer', as: 'textarea', label: 'Trả lời', rows: 3, required: true, example: 'Có, liệu trình sử dụng nguyên liệu dịu nhẹ phù hợp với da nhạy cảm.')
                                ->columnSpanFull(),
                        ])
                        ->columns(1)
                        ->defaultItems(0)
                        ->reorderable()
                        ->collapsible()
                        ->cloneable()
                        ->itemLabel(fn (array $state): ?string => is_array($state['question'] ?? null) ? ($state['question']['vi'] ?? null) : ($state['question'] ?? null))
                        ->addActionLabel('+ Thêm câu hỏi')
                        ->columnSpanFull(),
                ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->modifyQueryUsing(fn ($query) => $query
                ->orderByRaw('COALESCE(parent_id, id)')
                ->orderByRaw('parent_id IS NOT NULL')
                ->orderBy('order'))
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label('Tên danh mục')
                    ->searchable()
                    ->formatStateUsing(fn (ServiceCategory $record, $state) => ($record->isRoot() ? '' : '— ').strip_tags($state)),
                Tables\Columns\TextColumn::make('slug')->label('Slug')->searchable(),
                Tables\Columns\TextColumn::make('parent.slug')->label('Thuộc danh mục')->placeholder('— Cấp 1 —'),
                Tables\Columns\TextColumn::make('order')->label('Thứ tự')->sortable(),
                Tables\Columns\IconColumn::make('is_active')->label('Kích hoạt')->boolean(),
                Tables\Columns\IconColumn::make('is_listed')->label('Hiển thị DS')->boolean(),
                Tables\Columns\TextColumn::make('services_count')->label('Số dịch vụ')->counts('services'),
            ])
            ->filters([
                Tables\Filters\Filter::make('roots_only')
                    ->label('Chỉ danh mục cấp 1')
                    ->query(fn ($query) => $query->roots()),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                DeleteGuard::apply(
                    Tables\Actions\DeleteAction::make(),
                    fn (ServiceCategory $record) => static::deleteBlockReason($record),
                ),
            ])
            ->defaultPaginationPageOption(50);
    }

    public static function deleteBlockReason(ServiceCategory $record): ?string
    {
        $childCount = $record->children()->count();

        if ($childCount > 0) {
            return "Danh mục này đang có {$childCount} danh mục con. Vui lòng xóa hoặc chuyển các danh mục con sang danh mục khác trước.";
        }

        $serviceCount = $record->services()->count();

        if ($serviceCount > 0) {
            return "Danh mục này đang có {$serviceCount} dịch vụ. Vui lòng chuyển các dịch vụ sang danh mục khác trước khi xóa.";
        }

        return null;
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListServiceCategories::route('/'),
            'create' => Pages\CreateServiceCategory::route('/create'),
            'edit' => Pages\EditServiceCategory::route('/{record}/edit'),
        ];
    }
}
