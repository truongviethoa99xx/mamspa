<?php

namespace App\Filament\Pages;

use App\Filament\Concerns\RestrictsFilamentAccess;
use App\Filament\Forms\TranslatableField;
use App\Models\ContactPageContent;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Page;

class ContactPageSettings extends Page implements HasForms
{
    use InteractsWithForms;
    use RestrictsFilamentAccess;

    protected static ?string $navigationIcon = 'heroicon-o-envelope';

    protected static ?string $navigationGroup = 'Nội dung';

    protected static ?string $title = 'Nội dung trang Liên hệ';

    protected static ?string $navigationLabel = 'Trang Liên hệ';

    protected static ?int $navigationSort = 4;

    protected static string $view = 'filament.pages.contact-page-settings';

    public ?array $data = [];

    protected static function allowedRoles(): array
    {
        return User::contentRoles();
    }

    public function mount(): void
    {
        $this->form->fill(ContactPageContent::current()->only([
            'heading', 'email',
            'hero_subtitle', 'hero_image', 'hero_image_alt', 'hero_visible',
            'branches_title', 'branches_intro', 'branches_directions_label', 'branches_more_label', 'branches_items', 'branches_visible',
            'about_banner_text', 'about_banner_link_text', 'about_banner_link_url', 'about_banner_visible',
            'info_title', 'info_intro', 'hotline', 'hotline_note', 'zalo', 'zalo_note', 'email_note',
            'instagram', 'instagram_note', 'form_title', 'form_intro', 'form_privacy_note', 'contact_form_visible',
            'closing_title', 'closing_image', 'closing_image_alt', 'closing_button_text', 'closing_button_url', 'closing_visible',
            'commitments', 'commitments_visible',
        ]));
    }

    public function form(Form $form): Form
    {
        // Các khối dưới đây xếp đúng thứ tự xuất hiện trên trang Liên hệ (bố cục Mầm Spa mới).
        // Field chữ để trống → FE tự dùng nội dung mặc định tương ứng.
        return $form
            ->schema([
                Forms\Components\Section::make('1 · Banner đầu trang (Hero)')
                    ->description('Banner mở đầu trang Liên hệ — cùng kiểu dáng với banner trang Giới thiệu (ảnh nền full-bleed, tiêu đề lớn đè lên ảnh).')
                    ->icon('heroicon-o-photo')
                    ->schema([
                        Forms\Components\Toggle::make('hero_visible')
                            ->label('Hiển thị khối này trên trang Liên hệ')
                            ->helperText('Tắt sẽ ẩn toàn bộ banner đầu trang khỏi trang công khai.')
                            ->default(true)
                            ->columnSpanFull(),
                        TranslatableField::group('heading', as: 'quill', label: 'Tiêu đề', example: 'Liên hệ'),
                        TranslatableField::group('hero_subtitle', as: 'quill', label: 'Mô tả ngắn'),
                        Forms\Components\FileUpload::make('hero_image')->label('Ảnh nền banner')
                            ->helperText('Ảnh banner toàn màn hình. Tỉ lệ ngang 16:9, khuyến nghị tối thiểu 1920×1080px.')
                            ->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(5120)->disk('public')->directory('contact')->imageEditor(),
                        TranslatableField::group('hero_image_alt', label: 'Alt text ảnh (mô tả ảnh cho SEO/accessibility)', example: 'Không gian Mầm Spa'),
                    ]),

                Forms\Components\Section::make('2 · Hệ thống chi nhánh')
                    ->description('Tiêu đề khối + danh sách thẻ chi nhánh. Danh sách này nhập tay riêng tại đây — không còn lấy từ mục "Chi nhánh" cũ. Link "Xem đường đi"/"Tìm hiểu thêm" của mỗi thẻ có thể để trống, hoặc trỏ sang một bài blog giới thiệu chi nhánh khi được tạo sau này.')
                    ->icon('heroicon-o-building-storefront')
                    ->schema([
                        Forms\Components\Toggle::make('branches_visible')
                            ->label('Hiển thị khối này trên trang Liên hệ')
                            ->helperText('Tắt sẽ ẩn toàn bộ khối "Hệ thống chi nhánh" khỏi trang công khai.')
                            ->default(true)
                            ->columnSpanFull(),
                        TranslatableField::group('branches_title', as: 'quill', label: 'Tiêu đề khối', example: 'Hệ thống chi nhánh'),
                        TranslatableField::group('branches_intro', as: 'quill', label: 'Mô tả ngắn', example: 'Chọn chi nhánh gần bạn nhất để ghé thăm Mầm.'),
                        TranslatableField::group('branches_directions_label', label: 'Nhãn nút "Xem đường đi"', example: 'Xem đường đi'),
                        TranslatableField::group('branches_more_label', label: 'Nhãn nút "Tìm hiểu thêm về chi nhánh"', example: 'Tìm hiểu thêm về chi nhánh'),

                        Forms\Components\Repeater::make('branches_items')
                            ->label('Danh sách thẻ chi nhánh')
                            ->schema([
                                Forms\Components\FileUpload::make('image')->label('Ảnh')
                                    ->helperText('Tỉ lệ ngang 4:3, khuyến nghị tối thiểu 1000×750px.')
                                    ->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(5120)->disk('public')->directory('contact/branches')->imageEditor()
                                    ->columnSpanFull(),
                                TranslatableField::group('image_alt', label: 'Alt text ảnh', example: 'Mầm Spa Phú Nhuận'),
                                TranslatableField::group('name', as: 'quill', label: 'Tên chi nhánh', example: 'Mầm Spa Phú Nhuận'),
                                TranslatableField::group('address', as: 'quill', label: 'Địa chỉ', example: '12 Lê Văn Sỹ, Phường Phú Nhuận, TP. Hồ Chí Minh'),
                                Forms\Components\TextInput::make('phone')->label('Số điện thoại')->tel(),
                                Forms\Components\TextInput::make('open_hours')->label('Giờ mở cửa')->default('09:00 - 21:00'),
                                TranslatableField::group('hours_note', label: 'Ghi chú giờ mở cửa (dòng phụ, tuỳ chọn)', example: '(Last booking 21:00)'),
                                Forms\Components\TextInput::make('directions_url')->label('Link "Xem đường đi"')->url()
                                    ->helperText('VD: link Google Maps.'),
                                Forms\Components\TextInput::make('link_url')->label('Link "Tìm hiểu thêm về chi nhánh"')->url()
                                    ->helperText('Để trống nếu chưa có. Có thể trỏ sang bài blog giới thiệu chi nhánh sau này.'),
                            ])
                            ->columns(2)
                            ->defaultItems(0)
                            ->reorderable()
                            ->collapsible()
                            ->itemLabel(fn (array $state): ?string => isset($state['name']['vi']) ? strip_tags($state['name']['vi']) : null)
                            ->addActionLabel('+ Thêm chi nhánh')
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('3 · Banner ngang (link sang trang Giới thiệu)')
                    ->description('Dải banner mảnh, nội dung ngắn + 1 nút link.')
                    ->icon('heroicon-o-arrow-top-right-on-square')
                    ->schema([
                        Forms\Components\Toggle::make('about_banner_visible')
                            ->label('Hiển thị khối này trên trang Liên hệ')
                            ->helperText('Tắt sẽ ẩn toàn bộ banner ngang khỏi trang công khai.')
                            ->default(true)
                            ->columnSpanFull(),
                        TranslatableField::group('about_banner_text', as: 'quill', label: 'Nội dung', example: 'Xem chi tiết về không gian, triết lý và đội ngũ tại Mầm.'),
                        TranslatableField::group('about_banner_link_text', label: 'Nhãn nút', example: 'Khám phá về Mầm'),
                        Forms\Components\TextInput::make('about_banner_link_url')->label('Link nút')->url()->default('/gioi-thieu'),
                    ]),

                Forms\Components\Section::make('4 · Đặt lịch & Liên hệ + Form "Gửi cho chúng tôi"')
                    ->description('Khối 2 cột — bên trái là thông tin liên hệ nhanh (Hotline/Zalo/Email/Instagram), bên phải là form liên hệ của khách.')
                    ->icon('heroicon-o-chat-bubble-left-right')
                    ->schema([
                        Forms\Components\Toggle::make('contact_form_visible')
                            ->label('Hiển thị khối này trên trang Liên hệ')
                            ->helperText('Tắt sẽ ẩn toàn bộ khối "Đặt lịch & Liên hệ" + form khỏi trang công khai.')
                            ->default(true)
                            ->columnSpanFull(),
                        TranslatableField::group('info_title', as: 'quill', label: 'Tiêu đề cột trái', example: 'Đặt lịch & Liên hệ'),
                        TranslatableField::group('info_intro', as: 'quill', label: 'Mô tả cột trái', example: 'Chọn cách thuận tiện nhất để kết nối với chúng tôi.'),
                        Forms\Components\Fieldset::make('Hotline')
                            ->schema([
                                Forms\Components\TextInput::make('hotline')->label('Số hotline')->tel()->placeholder('098 166 06 00'),
                                TranslatableField::group('hotline_note', label: 'Ghi chú', example: 'Hỗ trợ đặt lịch & tư vấn 10:00 - 21:00 (hàng ngày)'),
                            ])->columns(2),
                        Forms\Components\Fieldset::make('Zalo')
                            ->schema([
                                Forms\Components\TextInput::make('zalo')->label('Tên hiển thị Zalo')->placeholder('Mầm Integrative Therapy'),
                                TranslatableField::group('zalo_note', label: 'Ghi chú', example: 'Nhắn tin nhanh, phản hồi trong ngày'),
                            ])->columns(2),
                        Forms\Components\Fieldset::make('Email')
                            ->schema([
                                Forms\Components\TextInput::make('email')->label('Email hiển thị')->email()->rules(['not_regex:/[\r\n]/']),
                                TranslatableField::group('email_note', label: 'Ghi chú', example: 'Phản hồi trong vòng 24 giờ'),
                            ])->columns(2),
                        Forms\Components\Fieldset::make('Instagram')
                            ->schema([
                                Forms\Components\TextInput::make('instagram')->label('Tên hiển thị Instagram')->placeholder('@mam.spa.therapy'),
                                TranslatableField::group('instagram_note', label: 'Ghi chú', example: 'Cập nhật ưu đãi và thông tin mới nhất'),
                            ])->columns(2),
                        TranslatableField::group('form_title', as: 'quill', label: 'Tiêu đề cột phải (form)', example: 'Gửi cho chúng tôi'),
                        TranslatableField::group('form_intro', as: 'quill', label: 'Mô tả cột phải (form)', example: 'Điền thông tin, chúng tôi sẽ liên hệ lại với bạn sớm nhất.'),
                        TranslatableField::group('form_privacy_note', label: 'Ghi chú bảo mật dưới nút gửi', example: 'Thông tin của bạn được bảo mật tuyệt đối'),
                    ]),

                Forms\Components\Section::make('5 · Banner CTA đóng trang')
                    ->description('Banner ảnh nền khép lại trang + tiêu đề + nút CTA.')
                    ->icon('heroicon-o-sparkles')
                    ->schema([
                        Forms\Components\Toggle::make('closing_visible')
                            ->label('Hiển thị khối này trên trang Liên hệ')
                            ->helperText('Tắt sẽ ẩn toàn bộ banner CTA đóng trang khỏi trang công khai.')
                            ->default(true)
                            ->columnSpanFull(),
                        Forms\Components\FileUpload::make('closing_image')->label('Ảnh nền banner')
                            ->helperText('Ảnh ngang full-bleed, khuyến nghị tối thiểu 1600×900px.')
                            ->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(10240)->disk('public')->directory('contact')->imageEditor()
                            ->columnSpanFull(),
                        TranslatableField::group('closing_image_alt', label: 'Alt text ảnh'),
                        TranslatableField::group('closing_title', as: 'quill', label: 'Tiêu đề'),
                        TranslatableField::group('closing_button_text', label: 'Nhãn nút CTA', example: 'Đặt lịch ngay'),
                        Forms\Components\TextInput::make('closing_button_url')->label('Link nút CTA')->url()->default('/dat-lich'),
                    ]),

                Forms\Components\Section::make('6 · Dải icon cam kết cuối trang')
                    ->description('Danh sách 4 cam kết dạng icon, xếp hàng ngang cuối trang.')
                    ->icon('heroicon-o-shield-check')
                    ->schema([
                        Forms\Components\Toggle::make('commitments_visible')
                            ->label('Hiển thị khối này trên trang Liên hệ')
                            ->helperText('Tắt sẽ ẩn toàn bộ dải icon cam kết khỏi trang công khai.')
                            ->default(true)
                            ->columnSpanFull(),
                        Forms\Components\Repeater::make('commitments')
                            ->label('Danh sách cam kết')
                            ->schema([
                                Forms\Components\Select::make('icon')
                                    ->label('Icon')
                                    ->options([
                                        'Clock' => 'Đồng hồ (giờ hoạt động)',
                                        'Gift' => 'Quà tặng (không yêu cầu tip)',
                                        'Leaf' => 'Lá cây (sản phẩm thiên nhiên)',
                                        'HeartHandshake' => 'Bắt tay (hỗ trợ, chăm sóc)',
                                        'ShieldCheck' => 'Khiên bảo vệ (an toàn, bảo mật)',
                                        'Sparkles' => 'Lấp lánh (trải nghiệm)',
                                    ])
                                    ->default('Leaf')
                                    ->required(),
                                TranslatableField::group('title', as: 'quill', label: 'Tiêu đề', example: 'Giờ hoạt động'),
                                TranslatableField::group('description', as: 'quill', label: 'Mô tả', example: '10:00 - 21:00 hàng ngày (Last booking 21:00)'),
                            ])
                            ->columns(3)
                            ->defaultItems(0)
                            ->maxItems(4)
                            ->reorderable()
                            ->collapsible()
                            ->itemLabel(fn (array $state): ?string => isset($state['title']['vi']) ? strip_tags($state['title']['vi']) : null)
                            ->addActionLabel('+ Thêm cam kết (tối đa 4)')
                            ->columnSpanFull(),
                    ]),
            ])
            ->statePath('data');
    }

    public function save(): void
    {
        ContactPageContent::current()->update($this->form->getState());

        Notification::make()->success()->title('Đã lưu nội dung trang Liên hệ')->send();
    }
}
