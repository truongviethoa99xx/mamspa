<?php

namespace App\Filament\Resources;

use App\Filament\Concerns\RestrictsFilamentAccess;
use App\Filament\Forms\TranslatableField;
use App\Filament\Resources\BlogPostResource\Pages;
use App\Models\BlogPost;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\Get;
use Filament\Forms\Set;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class BlogPostResource extends Resource
{
    use RestrictsFilamentAccess;

    protected static ?string $model = BlogPost::class;

    protected static ?string $navigationIcon = 'heroicon-o-newspaper';

    protected static ?string $navigationGroup = 'Nội dung';

    protected static ?string $navigationLabel = 'Bài viết';

    protected static ?string $modelLabel = 'Bài viết';

    protected static ?string $pluralModelLabel = 'Bài viết';

    protected static ?int $navigationSort = 8;

    protected static function allowedRoles(): array
    {
        return User::contentRoles();
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Grid::make(3)->schema([
                Forms\Components\Group::make([
                    Forms\Components\Section::make('Nội dung bài viết')
                        ->description('Tiêu đề, mô tả ngắn và nội dung đầy đủ — hỗ trợ đa ngôn ngữ.')
                        ->schema([
                            TranslatableField::group(
                                'title',
                                label: 'Tiêu đề',
                                required: true,
                                example: 'Vì sao massage trị liệu giúp cơ thể phục hồi hiệu quả hơn',
                            ),
                            TranslatableField::group(
                                'excerpt',
                                as: 'quill',
                                label: 'Mô tả ngắn',
                                example: 'Hiểu đúng về sự khác biệt giữa massage thư giãn và massage trị liệu.',
                            ),
                            TranslatableField::group('body', as: 'rich', label: 'Nội dung'),
                        ]),

                    Forms\Components\Section::make('SEO')
                        ->description('Tối ưu hiển thị trên Google và khi chia sẻ mạng xã hội. Để trống các ô bên dưới sẽ tự dùng Tiêu đề/Mô tả ngắn.')
                        ->icon('heroicon-o-magnifying-glass')
                        ->collapsible()
                        ->schema([
                            TranslatableField::group(
                                'seo_title',
                                label: 'Tiêu đề SEO (thẻ title)',
                                example: 'Vì sao massage trị liệu giúp cơ thể phục hồi hiệu quả hơn | Mầm Spa',
                            ),
                            TranslatableField::group(
                                'seo_description',
                                as: 'textarea',
                                label: 'Mô tả SEO (meta description)',
                                rows: 3,
                                example: 'Hiểu đúng về sự khác biệt giữa massage thư giãn và massage trị liệu để chọn liệu trình phù hợp.',
                            ),
                            TranslatableField::group(
                                'seo_focus_keyword',
                                label: 'Từ khoá chính (focus keyword)',
                                example: 'massage trị liệu',
                            ),
                            Forms\Components\KeyValue::make('seo_meta')
                                ->label('Thẻ meta khác (nâng cao)')
                                ->keyLabel('Khoá')
                                ->valueLabel('Giá trị')
                                ->helperText('Chỉ dùng khi cần khai báo thêm thẻ meta đặc biệt — hiếm khi cần thiết.')
                                ->columnSpanFull(),
                        ]),
                ])->columnSpan(2),

                Forms\Components\Group::make([
                    Forms\Components\Section::make('Xuất bản')
                        ->schema([
                            Forms\Components\TextInput::make('slug')
                                ->required()
                                ->unique(ignoreRecord: true)
                                ->helperText('Dùng trong đường dẫn, vd: vi-sao-massage-tri-lieu-giup-phuc-hoi')
                                ->suffixAction(
                                    Forms\Components\Actions\Action::make('generateSlug')
                                        ->icon('heroicon-m-arrow-path')
                                        ->tooltip('Tạo slug từ Tiêu đề (VI)')
                                        ->action(function (Get $get, Set $set) {
                                            $title = strip_tags((string) $get('title.vi'));
                                            if ($title !== '') {
                                                $set('slug', Str::slug($title));
                                            }
                                        }),
                                ),
                            Forms\Components\TextInput::make('category')
                                ->label('Chuyên mục')
                                ->datalist(fn () => BlogPost::query()
                                    ->whereNotNull('category')
                                    ->distinct()
                                    ->orderBy('category')
                                    ->pluck('category')
                                    ->all())
                                ->placeholder('VD: Trị liệu & Sức khỏe')
                                ->helperText('Gõ tự do — chọn gợi ý có sẵn để tránh tạo trùng chuyên mục.'),
                            Forms\Components\Toggle::make('is_published')
                                ->label('Đã xuất bản'),
                            Forms\Components\DateTimePicker::make('published_at')
                                ->label('Ngày xuất bản'),
                            Forms\Components\Select::make('author_id')
                                ->label('Tác giả')
                                ->relationship('author', 'name')
                                ->searchable()
                                ->preload()
                                ->default(fn () => Auth::id()),
                        ]),

                    Forms\Components\Section::make('Ảnh bìa')
                        ->description('Hiển thị ở đầu trang chi tiết và các danh sách bài viết.')
                        ->schema([
                            Forms\Components\FileUpload::make('cover_image')
                                ->hiddenLabel()
                                ->helperText('Ảnh ngang, tỉ lệ 16:9, khuyến nghị tối thiểu 1600×900px.')
                                ->image()
                                ->imageEditor()
                                ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                                ->maxSize(5120),
                            TranslatableField::group(
                                'cover_image_alt',
                                label: 'Mô tả ảnh (alt)',
                                example: 'Khách hàng thư giãn với liệu trình massage tại Mầm Spa',
                            ),
                        ]),
                ])->columnSpan(1),
            ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('slug')->label('Slug')->searchable(),
            Tables\Columns\TextColumn::make('title')->label('Tiêu đề'),
            Tables\Columns\TextColumn::make('category')->label('Chuyên mục')->badge()->placeholder('—'),
            Tables\Columns\TextColumn::make('author.name')->label('Tác giả')->placeholder('—'),
            Tables\Columns\IconColumn::make('is_published')->label('Đã xuất bản')->boolean(),
            Tables\Columns\TextColumn::make('published_at')->label('Ngày xuất bản')->dateTime(),
        ])->actions([Tables\Actions\EditAction::make()])
            ->defaultPaginationPageOption(50);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListBlogPosts::route('/'),
            'create' => Pages\CreateBlogPost::route('/create'),
            'edit' => Pages\EditBlogPost::route('/{record}/edit'),
        ];
    }
}
