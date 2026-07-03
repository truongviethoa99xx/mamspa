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
            Forms\Components\Section::make('Cơ bản')->schema([
                Forms\Components\TextInput::make('slug')->label('Slug')->required()->unique(ignoreRecord: true),
                Forms\Components\Select::make('service_category_id')
                    ->label('Danh mục')
                    ->options(fn () => self::categoryOptions())
                    ->searchable()
                    ->native(false)
                    ->required(),
                Forms\Components\TextInput::make('duration')->label('Thời lượng (phút)')->numeric()->required(),
                Forms\Components\Toggle::make('is_featured')->label('Nổi bật'),
                Forms\Components\Toggle::make('is_active')->label('Kích hoạt')->default(true),
            ])->columns(2),
            TranslatableField::group('name', label: 'Tên dịch vụ', required: true),
            TranslatableField::group('description', as: 'textarea', label: 'Mô tả', rows: 4),
            Forms\Components\TagsInput::make('ingredients')->label('Nguyên liệu'),
            Forms\Components\Select::make('branches')
                ->label('Chi nhánh')
                ->relationship('branches', 'slug')
                ->multiple()->preload(),
            Forms\Components\Section::make('Quy trình các bước')
                ->description('Các bước trong liệu trình dịch vụ. Mỗi bước có tên, mô tả và thời gian. Kéo thả để sắp xếp thứ tự.')
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
            Forms\Components\Section::make('Lợi ích dịch vụ')
                ->description('Các lợi ích nổi bật của dịch vụ. Mỗi mục có tiêu đề và mô tả ngắn.')
                ->schema([
                    Forms\Components\Repeater::make('benefits')
                        ->label('')
                        ->schema([
                            TranslatableField::group('title', label: 'Tiêu đề lợi ích', example: 'Giảm căng thẳng, thư giãn sâu')
                                ->columnSpanFull(),
                            TranslatableField::group('description', as: 'textarea', label: 'Mô tả', rows: 2, example: 'Giúp giải tỏa căng cơ, cải thiện tuần hoàn và tinh thần.')
                                ->columnSpanFull(),
                        ])
                        ->columns(1)
                        ->defaultItems(0)
                        ->reorderable()
                        ->collapsible()
                        ->cloneable()
                        ->itemLabel(fn (array $state): ?string => is_array($state['title'] ?? null) ? ($state['title']['vi'] ?? null) : ($state['title'] ?? null))
                        ->addActionLabel('+ Thêm lợi ích')
                        ->columnSpanFull(),
                ]),
            Forms\Components\Section::make('Hình ảnh trải nghiệm khách hàng')
                ->description('Bộ ảnh thực tế khách hàng trải nghiệm dịch vụ. Mỗi ảnh có mô tả (alt) cho SEO/khả năng truy cập.')
                ->schema([
                    Forms\Components\Repeater::make('experience_images')
                        ->label('')
                        ->schema([
                            Forms\Components\FileUpload::make('image')
                                ->label('Ảnh')
                                ->helperText('Ảnh vuông, khuyến nghị tối thiểu 800×800px.')
                                ->image()
                                ->disk('public')
                                ->directory('services/experience')
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
            Forms\Components\Section::make('Hình ảnh')
                ->schema([
                    Forms\Components\SpatieMediaLibraryFileUpload::make('thumbnail')
                        ->label('Ảnh đại diện')
                        ->helperText('Ảnh chính hiển thị trên thẻ dịch vụ ở trang chủ & danh sách. Ảnh vuông/dọc chất lượng cao, khuyến nghị tối thiểu 1200×1200px.')
                        ->collection('thumbnail')
                        ->image()
                        ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                        ->maxSize(5120),
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
                ])
                ->columns(2),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('slug')->label('Slug')->searchable()->sortable(),
            Tables\Columns\TextColumn::make('name')->label('Tên dịch vụ')->searchable(),
            Tables\Columns\TextColumn::make('category.name')->label('Danh mục')->badge(),
            Tables\Columns\TextColumn::make('duration')->label('Thời lượng')->suffix(' phút'),
            Tables\Columns\IconColumn::make('is_featured')->label('Nổi bật')->boolean(),
            Tables\Columns\IconColumn::make('is_active')->label('Kích hoạt')->boolean(),
        ])->filters([
            Tables\Filters\SelectFilter::make('service_category_id')
                ->label('Danh mục')
                ->options(fn () => self::categoryOptions()),
        ])->actions([
            Tables\Actions\EditAction::make(),
        ]);
    }

    /** Options nhóm theo danh mục cấp 1: cho phép chọn chính danh mục cấp 1 hoặc một danh mục con cấp 2. */
    protected static function categoryOptions(): array
    {
        return ServiceCategory::query()
            ->active()
            ->roots()
            ->with(['children' => fn ($q) => $q->active()->orderBy('order')])
            ->orderBy('order')
            ->get()
            ->mapWithKeys(function (ServiceCategory $root) {
                $rootLabel = $root->getTranslation('name', 'vi');
                $options = [$root->id => "{$rootLabel} (danh mục gốc)"];
                foreach ($root->children as $child) {
                    $options[$child->id] = $child->getTranslation('name', 'vi');
                }

                return [$rootLabel => $options];
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
