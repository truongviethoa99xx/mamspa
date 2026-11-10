<?php

namespace App\Filament\Resources;

use App\Filament\Concerns\RestrictsFilamentAccess;
use App\Filament\Forms\TranslatableField;
use App\Filament\Resources\MenuBranchPageResource\Pages;
use App\Filament\Support\EditablePage;
use App\Models\MenuBranchPage;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

/**
 * Trang menu PDF riêng của từng chi nhánh — URL công khai /menu/{slug}/ (xem routes/web.php
 * + MenuController::renderBranch()). Trước đây các chi nhánh nằm chung 1 repeater trong trang
 * Menu (MenuPageSettings); giờ mỗi chi nhánh là 1 bản ghi riêng để có URL/trang riêng, dễ chia
 * sẻ link hoặc dán QR tại từng cơ sở.
 */
class MenuBranchPageResource extends Resource
{
    use RestrictsFilamentAccess;

    protected static ?string $model = MenuBranchPage::class;

    protected static ?string $navigationIcon = 'heroicon-o-map-pin';

    protected static ?string $navigationGroup = 'Nội dung';

    protected static ?string $modelLabel = 'Chi nhánh menu PDF';

    protected static ?string $pluralModelLabel = 'Chi nhánh menu PDF';

    protected static ?string $navigationLabel = 'Chi nhánh menu PDF';

    protected static ?int $navigationSort = 9;

    protected static function allowedRoles(): array
    {
        return User::contentRoles();
    }

    protected static function pageKey(): ?string
    {
        return EditablePage::MenuBranch->value;
    }

    private static function pdfField(string $locale, string $label): Forms\Components\FileUpload
    {
        return Forms\Components\FileUpload::make("pdf_{$locale}")
            ->label($label)
            ->acceptedFileTypes(['application/pdf'])
            ->maxSize(20480)
            ->disk('public')->directory('menu/pdf');
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Grid::make(3)->schema([
                Forms\Components\Group::make([
                    Forms\Components\Section::make('Thông tin chi nhánh')
                        ->schema([
                            Forms\Components\FileUpload::make('image')->label('Ảnh chi nhánh')
                                ->helperText('Ảnh dọc, khuyến nghị tối thiểu 900×1000px.')
                                ->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                                ->maxSize(5120)->disk('public')->directory('menu/branches')->imageEditor()
                                ->columnSpanFull(),
                            TranslatableField::group('image_alt', label: 'Alt text ảnh'),
                            TranslatableField::group('name', label: 'Tên chi nhánh', required: true, example: 'PHÚ NHUẬN'),
                            TranslatableField::group('street', label: 'Tên đường', example: 'LÊ VĂN SỸ'),
                            TranslatableField::group('desc', as: 'quill', label: 'Mô tả ngắn'),
                        ]),

                    Forms\Components\Section::make('Menu PDF theo ngôn ngữ')
                        ->description('Tải lên tối đa 5 file PDF — thiếu ngôn ngữ nào sẽ không hiện nút ngôn ngữ đó trên trang công khai.')
                        ->schema([
                            self::pdfField('vi', 'PDF · Tiếng Việt'),
                            self::pdfField('en', 'PDF · Tiếng Anh'),
                            self::pdfField('zh', 'PDF · Tiếng Trung'),
                            self::pdfField('ko', 'PDF · Tiếng Hàn'),
                            self::pdfField('ja', 'PDF · Tiếng Nhật'),
                        ])
                        ->columns(2),
                ])->columnSpan(2),

                Forms\Components\Group::make([
                    Forms\Components\Section::make('Xuất bản')
                        ->schema([
                            Forms\Components\TextInput::make('slug')
                                ->label('Slug (đường dẫn)')
                                ->required()
                                ->unique(ignoreRecord: true)
                                ->prefix('/')
                                ->suffix('/')
                                ->helperText('Đường dẫn công khai của trang, vd: menu/le-van-sy — khuyến nghị giữ tiền tố "menu/" để nhất quán với trang Menu chính.'),
                            Forms\Components\Toggle::make('is_published')
                                ->label('Hiển thị trên website')
                                ->default(true)
                                ->helperText('Tắt sẽ trả về 404 khi truy cập URL này, nội dung vẫn được giữ lại để publish sau.'),
                            Forms\Components\TextInput::make('order')
                                ->label('Thứ tự hiển thị')
                                ->numeric()
                                ->default(0)
                                ->helperText('Số nhỏ hơn hiện trước trong danh sách chi nhánh ở trang Menu.'),
                        ]),
                ])->columnSpan(1),
            ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image')->label('Ảnh')->square(),
                Tables\Columns\TextColumn::make('name')
                    ->label('Tên chi nhánh')
                    ->formatStateUsing(fn ($state) => is_array($state) ? ($state['vi'] ?? reset($state) ?: '') : $state)
                    ->weight('medium'),
                Tables\Columns\TextColumn::make('slug')->label('Slug')->searchable()->color('gray'),
                Tables\Columns\IconColumn::make('is_published')->label('Hiển thị')->boolean(),
                Tables\Columns\TextColumn::make('order')->label('Thứ tự')->sortable(),
                Tables\Columns\TextColumn::make('updated_at')->label('Cập nhật lúc')->dateTime()->color('gray'),
            ])
            ->defaultSort('order')
            ->actions([Tables\Actions\EditAction::make()])
            ->defaultPaginationPageOption(50);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListMenuBranchPages::route('/'),
            'create' => Pages\CreateMenuBranchPage::route('/create'),
            'edit' => Pages\EditMenuBranchPage::route('/{record}/edit'),
        ];
    }
}
