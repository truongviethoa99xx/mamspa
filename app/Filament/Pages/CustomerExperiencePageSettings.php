<?php

namespace App\Filament\Pages;

use App\Filament\Concerns\RestrictsFilamentAccess;
use App\Filament\Forms\TranslatableField;
use App\Models\CustomerExperiencePageContent;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Page;

class CustomerExperiencePageSettings extends Page implements HasForms
{
    use InteractsWithForms;
    use RestrictsFilamentAccess;

    protected static ?string $navigationIcon = 'heroicon-o-face-smile';

    protected static ?string $navigationGroup = 'Nội dung';

    protected static ?string $title = 'Nội dung trang Customer Experience';

    protected static ?string $navigationLabel = 'Trang Customer Experience';

    protected static ?int $navigationSort = 6;

    protected static string $view = 'filament.pages.customer-experience-page-settings';

    public ?array $data = [];

    /** Danh mục dịch vụ dùng làm tag lọc cho dải ảnh trải nghiệm — khớp bộ lọc tab ở FE. */
    public const CATEGORY_TAGS = [
        'massage-therapy' => 'Massage Therapy',
        'head-spa' => 'Head Spa',
        'facial-care' => 'Facial Care',
        'signature-rituals' => 'Signature Rituals',
        'khac' => 'Khác',
    ];

    protected static function allowedRoles(): array
    {
        return User::contentRoles();
    }

    public function mount(): void
    {
        $this->form->fill(CustomerExperiencePageContent::current()->only([
            'hero_image', 'hero_image_alt', 'hero_title', 'hero_subtitle', 'hero_visible',
            'stats', 'stats_visible',
            'gallery_title', 'gallery_images', 'featured_stat_title', 'featured_stat_description', 'featured_stat_position', 'gallery_visible',
            'testimonials_title', 'testimonials_intro', 'testimonials', 'testimonials_visible',
            'reasons_title', 'reasons_features', 'reasons_card_title', 'reasons_card_description',
            'reasons_card_stat_text', 'reasons_card_avatars', 'reasons_card_button_text', 'reasons_card_button_url', 'reasons_visible',
            'instagram_title', 'instagram_images', 'instagram_handle', 'instagram_description', 'instagram_url', 'instagram_visible',
            'closing_title', 'closing_button_text', 'closing_button_url', 'closing_visible',
        ]));
    }

    public function form(Form $form): Form
    {
        // Các khối dưới đây xếp đúng thứ tự xuất hiện trên trang Customer Experience (image 9.png).
        return $form
            ->schema([
                Forms\Components\Section::make('1 · Phần đầu trang (Hero)')
                    ->description('Banner đầu trang — tiêu đề "CUSTOMER EXPERIENCE", mô tả ngắn và ảnh nền không gian spa.')
                    ->icon('heroicon-o-photo')
                    ->schema([
                        Forms\Components\Toggle::make('hero_visible')
                            ->label('Hiển thị khối này trên trang Customer Experience')
                            ->helperText('Tắt sẽ ẩn toàn bộ banner đầu trang khỏi trang công khai.')
                            ->default(true)
                            ->columnSpanFull(),
                        Forms\Components\FileUpload::make('hero_image')->label('Ảnh nền banner')
                            ->helperText('Ảnh phủ toàn bộ banner nên bị crop khá rộng (~21:9) trên desktop — chọn ảnh ngang, chủ thể căn giữa khung hình, khuyến nghị tối thiểu 2400×1000px.')
                            ->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(10240)
                            ->disk('public')->directory('customer-experience')
                            ->columnSpanFull(),
                        TranslatableField::group('hero_image_alt', label: 'Alt text ảnh (mô tả ảnh cho SEO/accessibility)', example: 'Không gian Mầm Spa'),
                        TranslatableField::group('hero_title', as: 'quill', label: 'Tiêu đề lớn'),
                        TranslatableField::group('hero_subtitle', as: 'quill', label: 'Mô tả ngắn'),
                    ]),

                Forms\Components\Section::make('2 · Dải số liệu thống kê')
                    ->description('Bốn ô số liệu ngay dưới banner (10.000+ lượt khách / 4.9/5 đánh giá / 50+ quốc gia / trải nghiệm chân thật).')
                    ->icon('heroicon-o-chart-bar')
                    ->schema([
                        Forms\Components\Toggle::make('stats_visible')
                            ->label('Hiển thị khối này trên trang Customer Experience')
                            ->helperText('Tắt sẽ ẩn toàn bộ dải số liệu thống kê khỏi trang công khai.')
                            ->default(true)
                            ->columnSpanFull(),
                        Forms\Components\Repeater::make('stats')
                            ->label('Danh sách số liệu')
                            ->schema([
                                Forms\Components\Select::make('icon')
                                    ->label('Biểu tượng')
                                    ->options(self::iconOptions())
                                    ->default('leaf')
                                    ->required(),
                                Forms\Components\TextInput::make('value')->label('Số liệu')->placeholder('VD: 10.000+')->required(),
                                TranslatableField::group('description', label: 'Mô tả ngắn', example: 'Lượt khách tin chọn'),
                            ])
                            ->columns(2)
                            ->defaultItems(0)
                            ->maxItems(4)
                            ->reorderable()
                            ->collapsible()
                            ->itemLabel(fn (array $state): ?string => $state['value'] ?? null)
                            ->addActionLabel('+ Thêm số liệu (tối đa 4)')
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('3 · Khoảng lặng mà khách hàng cảm nhận')
                    ->description('Tiêu đề khối + dải ảnh trải nghiệm khách hàng, mỗi ảnh gắn 1 danh mục dịch vụ để lọc ở FE, cộng 1 thẻ số liệu nổi bật chèn vào giữa lưới ảnh.')
                    ->icon('heroicon-o-squares-2x2')
                    ->schema([
                        Forms\Components\Toggle::make('gallery_visible')
                            ->label('Hiển thị khối này trên trang Customer Experience')
                            ->helperText('Tắt sẽ ẩn toàn bộ khối "Khoảng lặng mà khách hàng cảm nhận" khỏi trang công khai.')
                            ->default(true)
                            ->columnSpanFull(),
                        TranslatableField::group('gallery_title', label: 'Tiêu đề khối', example: 'Khoảng lặng mà khách hàng cảm nhận'),
                        Forms\Components\Repeater::make('gallery_images')
                            ->label('Dải ảnh trải nghiệm')
                            ->schema([
                                Forms\Components\FileUpload::make('image')->label('Ảnh')
                                    ->helperText('Ảnh vuông, khuyến nghị tối thiểu 800×800px.')
                                    ->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(5120)
                                    ->disk('public')->directory('customer-experience/gallery')->imageEditor()
                                    ->required(),
                                TranslatableField::group('image_alt', label: 'Alt text ảnh'),
                                Forms\Components\Select::make('category_tag')
                                    ->label('Danh mục dịch vụ (dùng để lọc ở trang công khai)')
                                    ->options(self::CATEGORY_TAGS)
                                    ->default('khac')
                                    ->required(),
                            ])
                            ->columns(2)
                            ->defaultItems(0)
                            ->reorderable()
                            ->collapsible()
                            ->addActionLabel('+ Thêm ảnh')
                            ->columnSpanFull(),
                        Forms\Components\Fieldset::make('Thẻ số liệu nổi bật (chèn vào giữa lưới ảnh)')
                            ->schema([
                                TranslatableField::group('featured_stat_title', as: 'quill', label: 'Tiêu đề', example: 'Hơn 10.000+ khách hàng'),
                                TranslatableField::group('featured_stat_description', as: 'quill', label: 'Mô tả'),
                                Forms\Components\TextInput::make('featured_stat_position')
                                    ->label('Vị trí chèn trong lưới ảnh (đếm từ 1)')
                                    ->helperText('VD: 9 sẽ chèn thẻ số liệu vào ô thứ 9 của lưới ảnh, khớp bố cục thiết kế gốc.')
                                    ->numeric()->minValue(1)->default(9),
                            ])
                            ->columns(1)
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('4 · Dải đánh giá / trích dẫn khách hàng')
                    ->description('Carousel gồm 1 trích dẫn lớn + các thẻ rating sao — cấu trúc tương tự khối Customer Experiences ở trang Giới thiệu nhưng là nội dung riêng của trang này.')
                    ->icon('heroicon-o-star')
                    ->schema([
                        Forms\Components\Toggle::make('testimonials_visible')
                            ->label('Hiển thị khối này trên trang Customer Experience')
                            ->helperText('Tắt sẽ ẩn toàn bộ dải đánh giá khỏi trang công khai.')
                            ->default(true)
                            ->columnSpanFull(),
                        TranslatableField::group('testimonials_title', label: 'Tiêu đề khối (tuỳ chọn)'),
                        TranslatableField::group('testimonials_intro', as: 'quill', label: 'Mô tả chung (tuỳ chọn)'),
                        Forms\Components\Repeater::make('testimonials')
                            ->label('Danh sách đánh giá / trích dẫn')
                            ->schema([
                                Forms\Components\Select::make('source')
                                    ->label('Nguồn')
                                    ->options([
                                        'google' => 'Google',
                                        'tripadvisor' => 'TripAdvisor',
                                        'quote' => 'Trích dẫn khách hàng',
                                    ])
                                    ->default('quote')
                                    ->required(),
                                Forms\Components\Select::make('rating')
                                    ->label('Số sao (tuỳ chọn)')
                                    ->options([1 => '1 sao', 2 => '2 sao', 3 => '3 sao', 4 => '4 sao', 5 => '5 sao']),
                                TranslatableField::group('quote', as: 'quill', label: 'Nội dung đánh giá'),
                                Forms\Components\TextInput::make('author_name')->label('Tên khách hàng')->required()->columnSpanFull(),
                                TranslatableField::group('author_meta', as: 'quill', label: 'Ghi chú (VD: quốc gia)'),
                            ])
                            ->columns(2)
                            ->defaultItems(0)
                            ->reorderable()
                            ->collapsible()
                            ->itemLabel(fn (array $state): ?string => $state['author_name'] ?? null)
                            ->addActionLabel('+ Thêm đánh giá')
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('5 · Vì sao khách hàng quay lại Mầm')
                    ->description('Tiêu đề khối + bốn biểu tượng tính năng + thẻ nhỏ "Lịch hẹn luôn đông" (avatar nhóm, số liệu, nút đặt lịch).')
                    ->icon('heroicon-o-heart')
                    ->schema([
                        Forms\Components\Toggle::make('reasons_visible')
                            ->label('Hiển thị khối này trên trang Customer Experience')
                            ->helperText('Tắt sẽ ẩn toàn bộ khối "Vì sao khách hàng quay lại Mầm" khỏi trang công khai.')
                            ->default(true)
                            ->columnSpanFull(),
                        TranslatableField::group('reasons_title', label: 'Tiêu đề khối', example: 'Vì sao khách hàng quay lại Mầm?'),
                        Forms\Components\Repeater::make('reasons_features')
                            ->label('Bốn biểu tượng tính năng')
                            ->schema([
                                Forms\Components\Select::make('icon')
                                    ->label('Biểu tượng')
                                    ->options(self::iconOptions())
                                    ->default('leaf')
                                    ->required(),
                                TranslatableField::group('title', label: 'Tiêu đề', example: 'Liệu pháp chuẩn Việt'),
                                TranslatableField::group('description', as: 'quill', label: 'Mô tả ngắn'),
                            ])
                            ->columns(2)
                            ->defaultItems(0)
                            ->maxItems(4)
                            ->reorderable()
                            ->collapsible()
                            ->itemLabel(fn (array $state): ?string => $state['title']['vi'] ?? null)
                            ->addActionLabel('+ Thêm biểu tượng (tối đa 4)')
                            ->columnSpanFull(),
                        Forms\Components\Fieldset::make('Thẻ "Lịch hẹn luôn đông"')
                            ->schema([
                                TranslatableField::group('reasons_card_title', label: 'Tiêu đề thẻ', example: 'Lịch hẹn luôn đông!'),
                                TranslatableField::group('reasons_card_description', as: 'quill', label: 'Mô tả'),
                                Forms\Components\TextInput::make('reasons_card_stat_text')->label('Số liệu hiển thị cạnh avatar')->placeholder('VD: +999'),
                                Forms\Components\Repeater::make('reasons_card_avatars')
                                    ->label('Avatar nhóm khách hàng')
                                    ->schema([
                                        Forms\Components\FileUpload::make('image')->label('Ảnh')
                                            ->helperText('Ảnh vuông nhỏ, khuyến nghị tối thiểu 200×200px.')
                                            ->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(2048)
                                            ->disk('public')->directory('customer-experience/avatars')->imageEditor(),
                                        Forms\Components\TextInput::make('alt')->label('Mô tả ảnh (alt)'),
                                    ])
                                    ->columns(2)
                                    ->defaultItems(0)
                                    ->maxItems(6)
                                    ->reorderable()
                                    ->collapsible()
                                    ->addActionLabel('+ Thêm avatar (tối đa 6)')
                                    ->columnSpanFull(),
                                TranslatableField::group('reasons_card_button_text', label: 'Nhãn nút', example: 'Đặt lịch ngay'),
                                Forms\Components\TextInput::make('reasons_card_button_url')->label('Link nút')->default('/dat-lich/'),
                            ])
                            ->columns(1)
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('6 · Theo dõi Mầm trên Instagram')
                    ->description('Tiêu đề khối + dải ảnh Instagram + thẻ thông tin tài khoản @mam.spa.therapy.')
                    ->icon('heroicon-o-camera')
                    ->schema([
                        Forms\Components\Toggle::make('instagram_visible')
                            ->label('Hiển thị khối này trên trang Customer Experience')
                            ->helperText('Tắt sẽ ẩn toàn bộ khối Instagram khỏi trang công khai.')
                            ->default(true)
                            ->columnSpanFull(),
                        TranslatableField::group('instagram_title', label: 'Tiêu đề khối', example: 'Theo dõi Mầm trên Instagram'),
                        Forms\Components\Repeater::make('instagram_images')
                            ->label('Dải ảnh Instagram')
                            ->schema([
                                Forms\Components\FileUpload::make('image')->label('Ảnh')
                                    ->helperText('Ảnh vuông, khuyến nghị tối thiểu 600×600px.')
                                    ->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(5120)
                                    ->disk('public')->directory('customer-experience/instagram')->imageEditor()
                                    ->required(),
                                TranslatableField::group('image_alt', label: 'Alt text ảnh'),
                            ])
                            ->columns(2)
                            ->defaultItems(0)
                            ->reorderable()
                            ->collapsible()
                            ->addActionLabel('+ Thêm ảnh')
                            ->columnSpanFull(),
                        Forms\Components\Fieldset::make('Thẻ thông tin tài khoản')
                            ->schema([
                                Forms\Components\TextInput::make('instagram_handle')->label('Tên tài khoản')->placeholder('@mam.spa.therapy'),
                                TranslatableField::group('instagram_description', as: 'quill', label: 'Mô tả ngắn'),
                                Forms\Components\TextInput::make('instagram_url')->label('Link Instagram')->url()->placeholder('https://instagram.com/mam.spa.therapy'),
                            ])
                            ->columns(1)
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('7 · Banner CTA đóng trang')
                    ->description('Banner khép lại trang — tiêu đề + nút Đặt lịch ngay. Số hotline hiển thị tự động lấy từ Thiết lập chung (site-wide), không cần nhập lại ở đây.')
                    ->icon('heroicon-o-phone')
                    ->schema([
                        Forms\Components\Toggle::make('closing_visible')
                            ->label('Hiển thị khối này trên trang Customer Experience')
                            ->helperText('Tắt sẽ ẩn toàn bộ banner CTA khỏi trang công khai.')
                            ->default(true)
                            ->columnSpanFull(),
                        TranslatableField::group('closing_title', as: 'quill', label: 'Tiêu đề banner'),
                        TranslatableField::group('closing_button_text', label: 'Nhãn nút', example: 'Đặt lịch ngay'),
                        Forms\Components\TextInput::make('closing_button_url')->label('Link nút')->default('/dat-lich/'),
                    ]),
            ])
            ->statePath('data');
    }

    public function save(): void
    {
        CustomerExperiencePageContent::current()->update($this->form->getState());

        Notification::make()->success()->title('Đã lưu nội dung trang Customer Experience')->send();
    }

    private static function iconOptions(): array
    {
        return [
            'leaf' => 'Chiếc lá',
            'heart' => 'Trái tim',
            'heart-hands' => 'Bàn tay ôm trái tim',
            'globe' => 'Địa cầu',
            'sparkles' => 'Lấp lánh (trải nghiệm chân thật)',
            'shield' => 'Khiên (an yên)',
            'droplet' => 'Giọt nước',
            'flower' => 'Hoa',
            'graduation-cap' => 'Mũ tốt nghiệp',
            'star' => 'Ngôi sao',
        ];
    }
}
