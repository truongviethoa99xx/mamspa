<?php

namespace App\Filament\Pages;

use App\Filament\Concerns\RestrictsFilamentAccess;
use App\Filament\Forms\TranslatableField;
use App\Filament\Support\EditablePage;
use App\Models\CustomPage;
use App\Models\MenuPageContent;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Page;

class MenuPageSettings extends Page implements HasForms
{
    use InteractsWithForms;
    use RestrictsFilamentAccess;

    protected static ?string $navigationIcon = 'heroicon-o-document-text';

    protected static ?string $navigationGroup = 'Nội dung';

    protected static ?string $title = 'Nội dung trang Menu';

    protected static ?string $navigationLabel = 'Trang Menu';

    protected static ?int $navigationSort = 8;

    protected static string $view = 'filament.pages.menu-page-settings';

    public ?array $data = [];

    /**
     * Slug đã bị chiếm bởi route tĩnh của site — không cho phép trang Menu dùng trùng,
     * vì trang Menu và "Trang tuỳ biến" (CustomPage) đều được khớp qua route "catch-all"
     * cuối cùng trong routes/web.php, đứng sau toàn bộ các route tĩnh này.
     */
    private const RESERVED_SLUGS = [
        'gioi-thieu', 'dich-vu', 'uu-dai', 'services', 'dat-lich', 'booking',
        'tin-tuc', 'blog', 'gallery', 'trai-nghiem-khach-hang', 'lien-he', 'contact',
        'chinh-sach', 'luu-y-dich-vu', 'huong-dan-thanh-toan', 'login', 'register',
        'sitemap.xml',
    ];

    protected static function allowedRoles(): array
    {
        return User::contentRoles();
    }

    protected static function pageKey(): ?string
    {
        return EditablePage::Menu->value;
    }

    public function mount(): void
    {
        $this->form->fill(MenuPageContent::current()->only([
            'slug', 'is_published',
            'hero_kicker', 'hero_title', 'hero_subtitle', 'hero_image', 'hero_image_alt', 'hero_visible',
            'intro_title', 'intro_note', 'intro_visible',
            'branches', 'branches_visible',
            'contact_title', 'contact_text', 'contact_image', 'contact_image_alt', 'contact_visible',
        ]));
    }

    private static function pdfField(string $locale, string $label): Forms\Components\FileUpload
    {
        return Forms\Components\FileUpload::make("pdf_{$locale}")
            ->label($label)
            ->acceptedFileTypes(['application/pdf'])
            ->maxSize(20480)
            ->disk('public')->directory('menu/pdf');
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Xuất bản')
                    ->schema([
                        Forms\Components\TextInput::make('slug')
                            ->label('Slug (đường dẫn)')
                            ->required()
                            ->rule('regex:/^[a-z0-9\-\/]+$/')
                            ->helperText('Đường dẫn công khai của trang Menu, vd: menu hoặc thuc-don. Chỉ chữ thường, số, "-" và "/". Không trùng với các URL khác trên site.'),
                        Forms\Components\Toggle::make('is_published')
                            ->label('Xuất bản (cho phép truy cập công khai)')
                            ->default(true)
                            ->helperText('Tắt sẽ trả về 404 khi truy cập URL này, nội dung vẫn được giữ lại để publish sau.'),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('1 · Phần đầu trang (Hero)')
                    ->description('Banner đầu trang — ảnh nền, kicker "SERVICE MENU", tên thương hiệu, tiêu đề phụ.')
                    ->icon('heroicon-o-photo')
                    ->schema([
                        Forms\Components\Toggle::make('hero_visible')
                            ->label('Hiển thị khối này trên trang Menu')
                            ->default(true)
                            ->columnSpanFull(),
                        TranslatableField::group('hero_kicker', label: 'Kicker nhỏ trên tiêu đề', example: 'SERVICE MENU'),
                        TranslatableField::group('hero_title', label: 'Tiêu đề lớn', example: 'MẦM SPA'),
                        TranslatableField::group('hero_subtitle', label: 'Tiêu đề phụ', example: 'Rooted in Vietnamese Healing Traditions'),
                        Forms\Components\FileUpload::make('hero_image')->label('Ảnh nền')
                            ->helperText('Ảnh ngang, khuyến nghị tối thiểu 1600×900px.')
                            ->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(5120)->disk('public')->directory('menu')->imageEditor(),
                        TranslatableField::group('hero_image_alt', label: 'Alt text ảnh (mô tả ảnh cho SEO/accessibility)', example: 'Nến thơm và thảo mộc tại Mầm'),
                    ]),

                Forms\Components\Section::make('2 · Giới thiệu')
                    ->description('Đoạn giới thiệu ngắn phía trên danh sách chi nhánh.')
                    ->icon('heroicon-o-sparkles')
                    ->schema([
                        Forms\Components\Toggle::make('intro_visible')
                            ->label('Hiển thị khối này trên trang Menu')
                            ->default(true)
                            ->columnSpanFull(),
                        TranslatableField::group('intro_title', as: 'quill', label: 'Tiêu đề giới thiệu', example: 'Hai không gian. Một triết lý chăm sóc.'),
                        TranslatableField::group('intro_note', as: 'quill', label: 'Ghi chú nhỏ bên dưới'),
                    ]),

                Forms\Components\Section::make('3 · Chi nhánh & Menu dịch vụ (PDF)')
                    ->description('Mỗi chi nhánh có ảnh, thông tin giới thiệu và bộ 5 file PDF menu dịch vụ theo ngôn ngữ (Việt, Anh, Trung, Hàn, Nhật).')
                    ->icon('heroicon-o-map-pin')
                    ->schema([
                        Forms\Components\Toggle::make('branches_visible')
                            ->label('Hiển thị khối này trên trang Menu')
                            ->default(true)
                            ->columnSpanFull(),
                        Forms\Components\Repeater::make('branches')
                            ->label('Danh sách chi nhánh')
                            ->schema([
                                Forms\Components\FileUpload::make('image')->label('Ảnh chi nhánh')
                                    ->helperText('Ảnh dọc, khuyến nghị tối thiểu 900×1000px.')
                                    ->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(5120)->disk('public')->directory('menu/branches')->imageEditor()
                                    ->columnSpanFull(),
                                TranslatableField::group('image_alt', label: 'Alt text ảnh'),
                                TranslatableField::group('name', label: 'Tên chi nhánh', example: 'PHÚ NHUẬN'),
                                TranslatableField::group('street', label: 'Tên đường', example: 'LÊ VĂN SỸ'),
                                TranslatableField::group('desc', as: 'quill', label: 'Mô tả ngắn'),
                                Forms\Components\Section::make('Menu PDF theo ngôn ngữ')
                                    ->description('Tải lên tối đa 5 file PDF — thiếu ngôn ngữ nào sẽ không hiện nút ngôn ngữ đó trên trang công khai.')
                                    ->schema([
                                        self::pdfField('vi', 'PDF · Tiếng Việt'),
                                        self::pdfField('en', 'PDF · Tiếng Anh'),
                                        self::pdfField('zh', 'PDF · Tiếng Trung'),
                                        self::pdfField('ko', 'PDF · Tiếng Hàn'),
                                        self::pdfField('ja', 'PDF · Tiếng Nhật'),
                                    ])
                                    ->columns(2)
                                    ->columnSpanFull(),
                            ])
                            ->columns(2)
                            ->defaultItems(0)
                            ->reorderable()
                            ->collapsible()
                            ->itemLabel(fn (array $state): ?string => $state['name']['vi'] ?? null)
                            ->addActionLabel('+ Thêm chi nhánh')
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('4 · Dải liên hệ')
                    ->description('Dải thông tin liên hệ ở cuối trang, cạnh ảnh minh hoạ.')
                    ->icon('heroicon-o-phone')
                    ->schema([
                        Forms\Components\Toggle::make('contact_visible')
                            ->label('Hiển thị khối này trên trang Menu')
                            ->default(true)
                            ->columnSpanFull(),
                        TranslatableField::group('contact_title', label: 'Tiêu đề', example: 'Mầm luôn sẵn sàng đồng hành cùng bạn'),
                        TranslatableField::group('contact_text', as: 'quill', label: 'Nội dung'),
                        Forms\Components\FileUpload::make('contact_image')->label('Ảnh minh hoạ')
                            ->helperText('Ảnh ngang, tỉ lệ ~4:3, khuyến nghị tối thiểu 900×675px.')
                            ->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(5120)->disk('public')->directory('menu')->imageEditor(),
                        TranslatableField::group('contact_image_alt', label: 'Alt text ảnh'),
                    ]),
            ])
            ->statePath('data');
    }

    public function save(): void
    {
        $state = $this->form->getState();

        $slug = trim((string) $state['slug'], '/');

        if (in_array($slug, self::RESERVED_SLUGS, true)) {
            Notification::make()->danger()->title('Slug không hợp lệ')
                ->body('Slug này đã được dùng bởi một trang cố định của site, vui lòng chọn slug khác.')
                ->send();

            return;
        }

        if (CustomPage::where('slug', $slug)->exists()) {
            Notification::make()->danger()->title('Slug đã tồn tại')
                ->body('Slug này đang được dùng bởi một "Trang tuỳ biến" khác, vui lòng chọn slug khác.')
                ->send();

            return;
        }

        $state['slug'] = $slug;

        MenuPageContent::current()->update($state);

        Notification::make()->success()->title('Đã lưu nội dung trang Menu')->send();
    }
}
