<?php

namespace App\Filament\Pages;

use App\Filament\Concerns\RestrictsFilamentAccess;
use App\Filament\Forms\TranslatableField;
use App\Models\PromoPopup;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Page;

/** Popup quảng cáo DUY NHẤT của website (singleton) — xem App\Models\PromoPopup. */
class PromoPopupSettings extends Page implements HasForms
{
    use InteractsWithForms;
    use RestrictsFilamentAccess;

    protected static ?string $navigationIcon = 'heroicon-o-megaphone';

    protected static ?string $navigationGroup = 'Nội dung';

    protected static ?string $title = 'Popup quảng cáo';

    protected static ?string $navigationLabel = 'Popup quảng cáo';

    protected static ?int $navigationSort = 20;

    protected static ?string $slug = 'promo-popup';

    protected static string $view = 'filament.pages.promo-popup-settings';

    public ?array $data = [];

    protected static function allowedRoles(): array
    {
        return User::contentRoles();
    }

    public function mount(): void
    {
        $this->form->fill(PromoPopup::current()->only([
            'is_active', 'title', 'description', 'image',
            'button_text', 'button_url', 'button_background', 'button_text_color',
            'position', 'delay_seconds', 'reshow_after_hours', 'starts_at', 'ends_at',
        ]));
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Hiển thị')
                    ->description('Website chỉ có 1 popup quảng cáo. Tắt công tắc để ẩn popup mà vẫn giữ lại nội dung.')
                    ->schema([
                        Forms\Components\Toggle::make('is_active')
                            ->label('Bật popup')
                            ->columnSpanFull(),
                        Forms\Components\Select::make('position')
                            ->label('Vị trí xuất hiện')
                            ->options(PromoPopup::POSITIONS)
                            ->default('center')
                            ->required()
                            ->native(false),
                        Forms\Components\TextInput::make('delay_seconds')
                            ->label('Hiện sau (giây)')
                            ->helperText('Số giây chờ sau khi khách mở trang, tính từ lần khách được thấy popup gần nhất (xem "Hiện lại sau khi đóng" bên dưới). Sửa nội dung popup ở đây thì popup hiện lại ngay cho mọi khách.')
                            ->numeric()
                            ->integer()
                            ->minValue(0)
                            ->maxValue(600)
                            ->default(3)
                            ->required(),
                        Forms\Components\TextInput::make('reshow_after_hours')
                            ->label('Hiện lại sau khi đóng (giờ)')
                            ->helperText('Khách đã bấm đóng popup thì sau bao nhiêu giờ mới thấy lại. 0 = hiện lại ngay ở lượt truy cập kế tiếp.')
                            ->numeric()
                            ->integer()
                            ->minValue(0)
                            ->maxValue(8760)
                            ->default(24)
                            ->required(),
                        Forms\Components\DateTimePicker::make('starts_at')
                            ->label('Bắt đầu từ')
                            ->helperText('Để trống = hiện ngay. Giờ theo múi giờ Việt Nam.')
                            ->seconds(false),
                        Forms\Components\DateTimePicker::make('ends_at')
                            ->label('Kết thúc lúc')
                            ->helperText('Để trống = không giới hạn.')
                            ->seconds(false)
                            ->afterOrEqual('starts_at'),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Nội dung popup')
                    ->schema([
                        TranslatableField::group('title', as: 'quill', label: 'Tiêu đề', required: true, example: 'Ưu đãi tháng 12'),
                        TranslatableField::group('description', as: 'quill', label: 'Mô tả', example: 'Giảm 20% liệu trình Head Spa cho khách đặt lịch trước ngày 31/12.'),
                        Forms\Components\FileUpload::make('image')
                            ->label('Ảnh (tuỳ chọn)')
                            ->helperText('Hiện phía trên tiêu đề. Ảnh ngang tỉ lệ 16:9, tối thiểu 800px.')
                            ->image()
                            ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                            ->maxSize(2048)
                            ->disk('public')
                            ->directory('popups')
                            ->imageEditor(),
                    ]),

                Forms\Components\Section::make('Nút bấm')
                    ->description('Để trống chữ trên nút thì popup không có nút.')
                    ->schema([
                        TranslatableField::group('button_text', label: 'Chữ trên nút', example: 'Đặt lịch ngay'),
                        Forms\Components\TextInput::make('button_url')
                            ->label('Link khi bấm nút')
                            ->helperText('Chọn gợi ý bên dưới hoặc tự nhập (trang trong site bắt đầu bằng /, link ngoài bắt đầu bằng https://). Bắt buộc khi đã nhập chữ trên nút.')
                            ->placeholder('/dat-lich')
                            ->datalist([
                                '/dat-lich' => 'Đặt lịch',
                                '/dich-vu' => 'Dịch vụ',
                                '/uu-dai' => 'Ưu đãi',
                                '/tin-tuc' => 'Tin tức',
                                '/trai-nghiem-khach-hang' => 'Trải nghiệm khách hàng',
                                '/lien-he' => 'Liên hệ',
                                '/gioi-thieu' => 'Giới thiệu',
                            ])
                            ->required(fn (Forms\Get $get): bool => collect($get('button_text') ?? [])->filter(fn ($text) => filled($text))->isNotEmpty())
                            ->rules(['nullable', 'regex:/\A(#|\/|https?:\/\/|tel:|mailto:)/i'])
                            ->validationMessages(['regex' => 'Link phải bắt đầu bằng /, #, http(s)://, tel: hoặc mailto:.']),
                        Forms\Components\ColorPicker::make('button_background')
                            ->label('Màu nền nút')
                            ->default('#556B3F')
                            ->required(),
                        Forms\Components\ColorPicker::make('button_text_color')
                            ->label('Màu chữ trên nút')
                            ->default('#FFFFFF')
                            ->required(),
                    ])
                    ->columns(2),
            ])
            ->statePath('data');
    }

    public function save(): void
    {
        PromoPopup::current()->update($this->form->getState());

        Notification::make()->success()->title('Đã lưu popup quảng cáo')->send();
    }
}
