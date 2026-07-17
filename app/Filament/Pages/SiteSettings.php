<?php

namespace App\Filament\Pages;

use App\Filament\Concerns\RestrictsFilamentAccess;
use App\Models\SiteSetting;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Page;

class SiteSettings extends Page implements HasForms
{
    use InteractsWithForms;
    use RestrictsFilamentAccess;

    protected static ?string $navigationIcon = 'heroicon-o-cog-6-tooth';

    protected static ?string $navigationGroup = 'Hệ thống';

    protected static ?string $title = 'Thiết lập chung';

    protected static ?string $navigationLabel = 'Thiết lập chung';

    protected static ?int $navigationSort = 1;

    protected static string $view = 'filament.pages.site-settings';

    public ?array $data = [];

    protected static function allowedRoles(): array
    {
        return User::adminRoles();
    }

    public function mount(): void
    {
        $this->form->fill(SiteSetting::current()->only([
            'brand_name', 'logo_path', 'tagline', 'meta_description', 'hotline', 'email', 'chat_url', 'floating_contact_buttons', 'social_links',
            'address', 'phone', 'open_hours', 'lat', 'lng',
        ]));
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Thông tin toàn site')
                    ->schema([
                        Forms\Components\TextInput::make('brand_name')
                            ->label('Tên thương hiệu')
                            ->helperText('Hiển thị ở navbar, footer, tiêu đề trình duyệt (SEO title) và dữ liệu có cấu trúc Organization.')
                            ->maxLength(70)
                            ->columnSpanFull(),
                        Forms\Components\FileUpload::make('logo_path')
                            ->label('Logo website')
                            ->helperText('Ảnh vuông, nền trong suốt, tối thiểu 512×512px. Định dạng SVG hoặc PNG cho chất lượng tốt nhất. Dùng ở navbar, admin panel và schema.org Organization.')
                            ->image()
                            ->acceptedFileTypes(['image/svg+xml', 'image/png', 'image/webp'])
                            ->maxSize(2048)
                            ->disk('public')
                            ->directory('branding')
                            ->columnSpanFull(),
                        Forms\Components\TextInput::make('tagline')->label('Tagline footer')->columnSpanFull(),
                        Forms\Components\Textarea::make('meta_description')
                            ->label('Mô tả SEO mặc định (meta description)')
                            ->helperText('Dùng cho các trang chưa khai báo mô tả riêng. Nên viết 120-160 ký tự, chứa từ khóa chính (spa, massage, Đà Nẵng...).')
                            ->rows(3)
                            ->maxLength(160)
                            ->live(onBlur: true)
                            ->hint(fn (?string $state): string => mb_strlen($state ?? '').'/160 ký tự')
                            ->columnSpanFull(),
                        Forms\Components\TextInput::make('hotline')->label('Hotline'),
                        Forms\Components\TextInput::make('email')->label('Email')->email()->rules(['not_regex:/[\r\n]/']),
                        Forms\Components\TextInput::make('chat_url')->label('Link nút chat / Zalo')->url()->columnSpanFull(),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Địa điểm')
                    ->description('Thông tin duy nhất của Mầm Spa — dùng cho form đặt lịch, liên hệ và dữ liệu bản đồ.')
                    ->icon('heroicon-o-map-pin')
                    ->schema([
                        Forms\Components\TextInput::make('phone')
                            ->label('Số điện thoại')
                            ->tel(),
                        Forms\Components\TextInput::make('open_hours')
                            ->label('Giờ mở cửa')
                            ->default('09:00 - 21:00'),
                        Forms\Components\Textarea::make('address')
                            ->label('Địa chỉ')
                            ->rows(2)
                            ->columnSpanFull(),
                        Forms\Components\Fieldset::make('Tọa độ bản đồ')
                            ->schema([
                                Forms\Components\TextInput::make('lat')
                                    ->label('Vĩ độ (Latitude)')
                                    ->helperText('Số nhỏ ~ 8–23 cho Việt Nam (vd. 10.7938). Lấy từ Google Maps: số ĐẦU trong "10.7938, 106.6677".')
                                    ->placeholder('10.7938')
                                    ->numeric()
                                    ->minValue(-90)
                                    ->maxValue(90),
                                Forms\Components\TextInput::make('lng')
                                    ->label('Kinh độ (Longitude)')
                                    ->helperText('Số lớn ~ 102–110 cho Việt Nam (vd. 106.6677). Lấy từ Google Maps: số SAU trong "10.7938, 106.6677".')
                                    ->placeholder('106.6677')
                                    ->numeric()
                                    ->minValue(-180)
                                    ->maxValue(180),
                            ])
                            ->columns(2)
                            ->columnSpanFull(),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Mạng xã hội')
                    ->schema([
                        Forms\Components\Repeater::make('social_links')
                            ->label('')
                            ->schema([
                                Forms\Components\TextInput::make('label')->label('Tên')->required(),
                                Forms\Components\TextInput::make('href')->label('Link')->url()->required(),
                            ])
                            ->columns(2)
                            ->defaultItems(0)
                            ->reorderable()
                            ->collapsible()
                            ->itemLabel(fn (array $state): ?string => $state['label'] ?? null)
                            ->addActionLabel('+ Thêm mạng xã hội'),
                    ]),

                Forms\Components\Section::make('Nút liên hệ nổi')
                    ->description('Các nút tròn cố định bên phải website: Zalo, Google Maps, gọi điện, WhatsApp, KakaoTalk...')
                    ->icon('heroicon-o-chat-bubble-left-right')
                    ->schema([
                        Forms\Components\Repeater::make('floating_contact_buttons')
                            ->label('')
                            ->schema([
                                Forms\Components\Grid::make(3)
                                    ->schema([
                                        Forms\Components\TextInput::make('label')
                                            ->label('Tên')
                                            ->required(),
                                        Forms\Components\TextInput::make('href')
                                            ->label('Link')
                                            ->helperText('Ví dụ: https://zalo.me/0865806166, tel:0865806166, https://wa.me/84865806166. Chưa có link thì để "#".')
                                            ->rules(['regex:/\A(#|https?:\/\/|tel:|mailto:|sms:)/i'])
                                            ->required(),
                                        Forms\Components\Toggle::make('enabled')
                                            ->label('Hiển thị')
                                            ->default(true)
                                            ->inline(false),
                                    ]),
                                Forms\Components\Grid::make(3)
                                    ->schema([
                                        Forms\Components\Select::make('type')
                                            ->label('Icon mặc định')
                                            ->options([
                                                'zalo' => 'Zalo',
                                                'map' => 'Google Maps',
                                                'phone' => 'Điện thoại',
                                                'whatsapp' => 'WhatsApp',
                                                'kakao' => 'KakaoTalk',
                                                'custom' => 'Custom',
                                            ])
                                            ->default('custom')
                                            ->required(),
                                        Forms\Components\ColorPicker::make('background')
                                            ->label('Màu nền')
                                            ->default('#ffffff'),
                                        Forms\Components\ColorPicker::make('color')
                                            ->label('Màu icon/chữ')
                                            ->default('#0d8bff'),
                                    ]),
                                Forms\Components\FileUpload::make('icon')
                                    ->label('Icon tự tải lên')
                                    ->helperText('Nếu có ảnh ở đây, website sẽ dùng ảnh này thay cho icon mặc định. Ảnh vuông, nền trong suốt, tối thiểu 128×128px.')
                                    ->image()
                                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                                    ->maxSize(2048)
                                    ->disk('public')
                                    ->directory('contact-icons')
                                    ->imageEditor()
                                    ->columnSpanFull(),
                            ])
                            ->columns(1)
                            ->defaultItems(0)
                            ->reorderable()
                            ->collapsible()
                            ->itemLabel(fn (array $state): ?string => $state['label'] ?? null)
                            ->addActionLabel('+ Thêm nút liên hệ'),
                    ]),
            ])
            ->statePath('data');
    }

    public function save(): void
    {
        SiteSetting::current()->update($this->form->getState());

        Notification::make()->success()->title('Đã lưu thiết lập chung')->send();
    }
}
