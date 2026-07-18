<?php

namespace App\Filament\Resources;

use App\Filament\Concerns\RestrictsFilamentAccess;
use App\Filament\Forms\TranslatableField;
use App\Filament\Resources\CustomPageResource\Pages;
use App\Filament\Support\EditablePage;
use App\Models\CustomPage;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class CustomPageResource extends Resource
{
    use RestrictsFilamentAccess;

    protected static ?string $model = CustomPage::class;

    protected static ?string $navigationIcon = 'heroicon-o-code-bracket';

    protected static ?string $navigationGroup = 'Nội dung';

    protected static ?string $navigationLabel = 'Trang tuỳ biến';

    protected static ?string $modelLabel = 'Trang tuỳ biến';

    protected static ?string $pluralModelLabel = 'Trang tuỳ biến';

    protected static ?int $navigationSort = 9;

    // Trang này cho phép nhập HTML/CSS/JS thô chạy trực tiếp trên site công khai — rủi ro
    // injection cao hơn các trang nội dung khác. Vẫn giới hạn theo contentRoles() như các
    // trang khác, nhưng superadmin nên cân nhắc kỹ trước khi tick cho một editor cụ thể
    // (xem editable_pages trên UserResource).
    protected static function allowedRoles(): array
    {
        return User::contentRoles();
    }

    protected static function pageKey(): ?string
    {
        return EditablePage::CustomPage->value;
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Xuất bản')
                    ->schema([
                        Forms\Components\TextInput::make('slug')
                            ->label('Slug (đường dẫn)')
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->helperText('Đường dẫn công khai của trang, có thể chứa "/", vd: khuyen-mai-mua-he hoặc dich-vu/cai-nay-cung-duoc. Không trùng với các URL khác trên site.'),
                        Forms\Components\Toggle::make('is_published')
                            ->label('Xuất bản (cho phép truy cập công khai)')
                            ->default(false)
                            ->helperText('Tắt sẽ trả về 404 khi truy cập URL này, nội dung vẫn được giữ lại để publish sau.'),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Banner đầu trang')
                    ->description('Banner full chiều rộng, cùng kiểu với banner trang chủ.')
                    ->schema([
                        Forms\Components\Toggle::make('banner_visible')
                            ->label('Hiển thị banner')
                            ->default(true)
                            ->columnSpanFull(),
                        TranslatableField::group('banner_title', as: 'quill', label: 'Tiêu đề'),
                        TranslatableField::group('banner_subtitle', as: 'quill', label: 'Mô tả'),
                        Forms\Components\FileUpload::make('banner_image')->label('Ảnh/video nền banner')
                            ->helperText('Ảnh: tỉ lệ ngang 16:9, khuyến nghị tối thiểu 1920×1080px. Video: MP4/WebM, nên nén dưới 15MB.')
                            ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/webm'])
                            ->maxSize(20480)
                            ->disk('public')->directory('custom-pages')
                            ->columnSpanFull(),
                        TranslatableField::group('banner_image_alt', label: 'Alt text ảnh (SEO/accessibility)', example: 'Mô tả ảnh banner'),
                    ]),

                Forms\Components\Section::make('Nút chính (Banner)')
                    ->schema([
                        TranslatableField::group('banner_cta_text', label: 'Chữ trên nút'),
                        Forms\Components\TextInput::make('banner_cta_link')->label('Đường dẫn nút')->placeholder('/dat-lich/'),
                        Forms\Components\ColorPicker::make('banner_cta_background_color')->label('Màu nền')->required(),
                        Forms\Components\ColorPicker::make('banner_cta_text_color')->label('Màu chữ')->required(),
                        Forms\Components\ColorPicker::make('banner_cta_border_color')->label('Màu viền')->required(),
                    ])
                    ->columns(3),

                Forms\Components\Section::make('Nút phụ (Banner) — tuỳ chọn')
                    ->schema([
                        TranslatableField::group('banner_secondary_cta_text', label: 'Chữ trên nút'),
                        Forms\Components\TextInput::make('banner_secondary_cta_link')->label('Đường dẫn nút'),
                        Forms\Components\ColorPicker::make('banner_secondary_cta_background_color')
                            ->label('Màu nền')
                            ->helperText('Để trống = nền trong suốt.'),
                        Forms\Components\ColorPicker::make('banner_secondary_cta_text_color')->label('Màu chữ'),
                        Forms\Components\ColorPicker::make('banner_secondary_cta_border_color')->label('Màu viền'),
                    ])
                    ->columns(3),

                Forms\Components\Section::make('Body — tự code')
                    ->description('Nội dung thân trang, admin tự nhập HTML/CSS/JS. Chạy trực tiếp trên trang công khai — chỉ nhập code đã kiểm tra kỹ.')
                    ->schema([
                        Forms\Components\Tabs::make('body')
                            ->columnSpanFull()
                            ->tabs([
                                Forms\Components\Tabs\Tab::make('HTML')
                                    ->schema([
                                        Forms\Components\Textarea::make('body_html')
                                            ->hiddenLabel()
                                            ->rows(24)
                                            ->extraInputAttributes(['style' => 'font-family: ui-monospace, monospace; font-size: 13px;']),
                                    ]),
                                Forms\Components\Tabs\Tab::make('CSS')
                                    ->schema([
                                        Forms\Components\Textarea::make('body_css')
                                            ->hiddenLabel()
                                            ->rows(24)
                                            ->extraInputAttributes(['style' => 'font-family: ui-monospace, monospace; font-size: 13px;']),
                                    ]),
                                Forms\Components\Tabs\Tab::make('JS')
                                    ->schema([
                                        Forms\Components\Textarea::make('body_js')
                                            ->hiddenLabel()
                                            ->rows(24)
                                            ->extraInputAttributes(['style' => 'font-family: ui-monospace, monospace; font-size: 13px;']),
                                    ]),
                            ]),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('slug')->label('Slug')->searchable()->weight('medium'),
            Tables\Columns\IconColumn::make('is_published')->label('Xuất bản')->boolean(),
            Tables\Columns\IconColumn::make('banner_visible')->label('Banner')->boolean(),
            Tables\Columns\TextColumn::make('updated_at')->label('Cập nhật lúc')->dateTime()->color('gray'),
        ])->actions([Tables\Actions\EditAction::make()])
            ->defaultPaginationPageOption(50);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCustomPages::route('/'),
            'create' => Pages\CreateCustomPage::route('/create'),
            'edit' => Pages\EditCustomPage::route('/{record}/edit'),
        ];
    }
}
