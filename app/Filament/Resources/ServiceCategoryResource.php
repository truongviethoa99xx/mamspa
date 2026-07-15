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
                    ->live()
                    ->options(fn (?ServiceCategory $record) => ServiceCategory::query()
                        ->roots()
                        ->when($record, fn ($query) => $query->whereKeyNot($record->getKey()))
                        ->orderBy('order')
                        ->get()
                        ->mapWithKeys(fn (ServiceCategory $category) => [$category->id => $category->getTranslation('name', 'vi')]))
                    ->native(false)
                    ->searchable()
                    ->disabled(fn (?ServiceCategory $record) => $record && $record->children()->exists())
                    ->helperText(fn (?ServiceCategory $record) => $record && $record->children()->exists()
                        ? 'Danh mục này đang có danh mục con nên phải giữ ở cấp 1.'
                        : 'Để trống nếu đây là danh mục cấp 1. Chỉ chọn được danh mục cấp 1 khác làm cha (tối đa 2 cấp).'),
                Forms\Components\TextInput::make('order')->label('Thứ tự')->numeric()->default(0),
                Forms\Components\Toggle::make('is_active')->label('Kích hoạt')->default(true),
                Forms\Components\Toggle::make('show_in_menu')
                    ->label('Hiện ở menu')
                    ->default(true)
                    ->helperText('Ẩn thì trang danh mục vẫn hoạt động bình thường, chỉ không xuất hiện trong menu header.')
                    ->visible(fn (Forms\Get $get) => blank($get('parent_id'))),
            ])->columns(2),
            TranslatableField::group('name', label: 'Tên danh mục', required: true, example: 'Body Massage'),
            TranslatableField::group('description', as: 'textarea', label: 'Mô tả danh mục', rows: 3, example: 'Liệu pháp massage toàn thân giúp thư giãn sâu và phục hồi năng lượng.'),
            Forms\Components\Section::make('Ảnh đại diện')
                ->schema([
                    Forms\Components\FileUpload::make('image')
                        ->label('')
                        ->helperText('Ảnh đại diện của danh mục. Khuyến nghị tối thiểu 1200×900px.')
                        ->image()
                        ->disk('public')
                        ->directory('service-categories')
                        ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                        ->maxSize(5120),
                ]),
            Forms\Components\Section::make('Lợi ích dịch vụ')
                ->description('Các lợi ích nổi bật của nhóm dịch vụ này. Hiển thị trên trang chi tiết các dịch vụ thuộc danh mục.')
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
                ->schema([
                    Forms\Components\TagsInput::make('ideal_for')
                        ->label('')
                        ->placeholder('Nhập một đối tượng rồi nhấn Enter')
                        ->columnSpanFull(),
                ]),
            Forms\Components\Section::make('Hình ảnh trải nghiệm khách hàng')
                ->description('Bộ ảnh thực tế khách hàng trải nghiệm nhóm dịch vụ này. Mỗi ảnh có mô tả (alt) cho SEO/khả năng truy cập.')
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
                ->schema([
                    Forms\Components\Repeater::make('faqs')
                        ->label('')
                        ->schema([
                            TranslatableField::group('question', label: 'Câu hỏi', required: true, example: 'Dịch vụ này có phù hợp với da nhạy cảm không?')
                                ->columnSpanFull(),
                            TranslatableField::group('answer', as: 'textarea', label: 'Trả lời', rows: 8, required: true, example: 'Có, liệu trình sử dụng nguyên liệu dịu nhẹ phù hợp với da nhạy cảm.')
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
                    ->formatStateUsing(fn (ServiceCategory $record, $state) => $record->isRoot() ? $state : '— '.$state),
                Tables\Columns\TextColumn::make('slug')->label('Slug')->searchable(),
                Tables\Columns\TextColumn::make('parent.slug')->label('Thuộc danh mục')->placeholder('— Cấp 1 —'),
                Tables\Columns\TextColumn::make('order')->label('Thứ tự')->sortable(),
                Tables\Columns\IconColumn::make('is_active')->label('Kích hoạt')->boolean(),
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
