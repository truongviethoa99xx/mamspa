<?php

namespace App\Filament\Pages;

use App\Filament\Concerns\RestrictsFilamentAccess;
use App\Filament\Support\EditablePage;
use App\Filament\Forms\TranslatableField;
use App\Models\OfferPageContent;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Page;

class OfferPageSettings extends Page implements HasForms
{
    use InteractsWithForms;
    use RestrictsFilamentAccess;

    protected static ?string $navigationIcon = 'heroicon-o-gift';

    protected static ?string $navigationGroup = 'Nội dung';

    protected static ?string $title = 'Nội dung trang Ưu đãi';

    protected static ?string $navigationLabel = 'Trang Ưu đãi';

    protected static ?int $navigationSort = 5;

    protected static string $view = 'filament.pages.offer-page-settings';

    public ?array $data = [];

    protected static function allowedRoles(): array
    {
        return User::contentRoles();
    }

    protected static function pageKey(): ?string
    {
        return EditablePage::Offer->value;
    }

    public function mount(): void
    {
        $this->form->fill(OfferPageContent::current()->only([
            'hero_title', 'hero_subtitle', 'hero_body', 'hero_image', 'hero_image_alt', 'hero_visible',
            'branches_heading', 'branches', 'branches_visible',
            'note_text', 'note_image', 'note_image_alt', 'note_visible',
            'closing_title', 'closing_subtitle', 'closing_image', 'closing_image_alt',
            'closing_button_text', 'closing_button_url', 'closing_visible',
        ]));
    }

    private static function offerIconOptions(): array
    {
        return [
            'Leaf' => 'Lá cây (Wellness Credit)',
            'Clock' => 'Đồng hồ (Happy Hours, Quiet Hours)',
            'User' => 'Người dùng (First Visit)',
            'Gift' => 'Quà tặng (Membership)',
            'HeartHandshake' => 'Bắt tay (hỗ trợ, chăm sóc)',
            'ShieldCheck' => 'Khiên bảo vệ (an toàn, riêng tư)',
        ];
    }

    public function form(Form $form): Form
    {
        // Các khối dưới đây xếp đúng thứ tự xuất hiện trên trang Ưu đãi (bố cục Mầm Spa mới).
        return $form
            ->schema([
                Forms\Components\Section::make('1 · Phần đầu trang (Hero)')
                    ->description('Banner đầu trang — ảnh full-bleed bên phải, tiêu đề lớn "ƯU ĐÃI TẠI MẦM", tiêu đề phụ, ghi chú nhỏ.')
                    ->icon('heroicon-o-photo')
                    ->schema([
                        Forms\Components\Toggle::make('hero_visible')
                            ->label('Hiển thị khối này trên trang Ưu đãi')
                            ->helperText('Tắt sẽ ẩn toàn bộ banner đầu trang khỏi trang công khai.')
                            ->default(true)
                            ->columnSpanFull(),
                        TranslatableField::group('hero_title', label: 'Tiêu đề lớn', example: 'Ưu đãi tại Mầm'),
                        TranslatableField::group('hero_subtitle', as: 'quill', label: 'Tiêu đề phụ', example: 'Mỗi chi nhánh đều có những chương trình được thiết kế riêng.'),
                        TranslatableField::group('hero_body', as: 'quill', label: 'Ghi chú nhỏ (cạnh biểu tượng lá)'),
                        Forms\Components\FileUpload::make('hero_image')->label('Ảnh nền')
                            ->helperText('Ảnh chiều dọc, chủ thể lệch phải khung hình, khuyến nghị tối thiểu 1400×1000px.')
                            ->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(5120)->disk('public')->directory('offers')->imageEditor(),
                        TranslatableField::group('hero_image_alt', label: 'Alt text ảnh (mô tả ảnh cho SEO/accessibility)', example: 'Không gian đón tiếp tại Mầm'),
                    ]),

                Forms\Components\Section::make('2 · Chi nhánh & ưu đãi')
                    ->description('Nhãn khối + danh sách chi nhánh, mỗi chi nhánh có ảnh, tên, câu giới thiệu ngắn và danh sách ưu đãi riêng.')
                    ->icon('heroicon-o-map-pin')
                    ->schema([
                        Forms\Components\Toggle::make('branches_visible')
                            ->label('Hiển thị khối này trên trang Ưu đãi')
                            ->helperText('Tắt sẽ ẩn toàn bộ khối "Chi nhánh & ưu đãi" khỏi trang công khai.')
                            ->default(true)
                            ->columnSpanFull(),
                        TranslatableField::group('branches_heading', label: 'Tiêu đề khối', example: 'Bạn sẽ trải nghiệm tại chi nhánh nào?'),
                        Forms\Components\Repeater::make('branches')
                            ->label('Danh sách chi nhánh')
                            ->schema([
                                Forms\Components\FileUpload::make('image')->label('Ảnh chi nhánh')
                                    ->helperText('Ảnh dọc/vuông, khuyến nghị tối thiểu 900×1000px.')
                                    ->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(5120)->disk('public')->directory('offers/branches')->imageEditor()
                                    ->columnSpanFull(),
                                TranslatableField::group('image_alt', label: 'Alt text ảnh'),
                                TranslatableField::group('name', label: 'Tên chi nhánh', example: 'PHÚ NHUẬN'),
                                TranslatableField::group('tagline', label: 'Câu giới thiệu ngắn', example: 'Một khoảng lặng giữa lòng thành phố.'),
                                Forms\Components\Repeater::make('offers')
                                    ->label('Danh sách ưu đãi của chi nhánh')
                                    ->schema([
                                        Forms\Components\Select::make('icon')
                                            ->label('Icon')
                                            ->options(self::offerIconOptions())
                                            ->default('Leaf')
                                            ->required(),
                                        TranslatableField::group('title', label: 'Tiêu đề ưu đãi', example: 'Happy Hours Rituals'),
                                        TranslatableField::group('description', as: 'quill', label: 'Mô tả'),
                                        TranslatableField::group('button_label', label: 'Nhãn nút', example: 'Xem chi tiết'),
                                        Forms\Components\TextInput::make('button_link')->label('Link nút')->url()->columnSpanFull(),
                                    ])
                                    ->columns(2)
                                    ->defaultItems(0)
                                    ->maxItems(4)
                                    ->reorderable()
                                    ->collapsible()
                                    ->itemLabel(fn (array $state): ?string => $state['title']['vi'] ?? null)
                                    ->addActionLabel('+ Thêm ưu đãi (tối đa 4)')
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

                Forms\Components\Section::make('3 · Khối ghi chú nhỏ')
                    ->description('Icon thông tin cố định + đoạn ghi chú (danh sách gạch đầu dòng) + ảnh minh hoạ.')
                    ->icon('heroicon-o-information-circle')
                    ->schema([
                        Forms\Components\Toggle::make('note_visible')
                            ->label('Hiển thị khối này trên trang Ưu đãi')
                            ->helperText('Tắt sẽ ẩn toàn bộ khối ghi chú khỏi trang công khai.')
                            ->default(true)
                            ->columnSpanFull(),
                        TranslatableField::group('note_text', as: 'quill', label: 'Nội dung ghi chú (dùng danh sách để hiện gạch đầu dòng)'),
                        Forms\Components\FileUpload::make('note_image')->label('Ảnh minh hoạ')
                            ->helperText('Ảnh ngang, tỉ lệ ~4:3, khuyến nghị tối thiểu 900×675px.')
                            ->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(5120)->disk('public')->directory('offers')->imageEditor(),
                        TranslatableField::group('note_image_alt', label: 'Alt text ảnh'),
                    ]),

                Forms\Components\Section::make('4 · Banner CTA đóng trang')
                    ->description('Banner nền ảnh đóng trang — tiêu đề + mô tả ngắn + 1 nút hành động.')
                    ->icon('heroicon-o-megaphone')
                    ->schema([
                        Forms\Components\Toggle::make('closing_visible')
                            ->label('Hiển thị khối này trên trang Ưu đãi')
                            ->helperText('Tắt sẽ ẩn toàn bộ banner CTA đóng trang khỏi trang công khai.')
                            ->default(true)
                            ->columnSpanFull(),
                        TranslatableField::group('closing_title', as: 'quill', label: 'Tiêu đề', example: 'Chưa biết nên chọn chi nhánh nào?'),
                        TranslatableField::group('closing_subtitle', as: 'quill', label: 'Mô tả ngắn'),
                        Forms\Components\FileUpload::make('closing_image')->label('Ảnh nền')
                            ->helperText('Ảnh ngang, tỉ lệ ~16:11, khuyến nghị tối thiểu 1000×700px.')
                            ->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(5120)->disk('public')->directory('offers')->imageEditor(),
                        TranslatableField::group('closing_image_alt', label: 'Alt text ảnh'),
                        TranslatableField::group('closing_button_text', label: 'Nhãn nút', example: 'Đặt lịch ngay'),
                        Forms\Components\TextInput::make('closing_button_url')->label('Link nút')->url()->default('/dat-lich'),
                    ]),
            ])
            ->statePath('data');
    }

    public function save(): void
    {
        OfferPageContent::current()->update($this->form->getState());

        Notification::make()->success()->title('Đã lưu nội dung trang Ưu đãi')->send();
    }
}
