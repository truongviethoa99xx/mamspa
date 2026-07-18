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
            'benefits_heading', 'benefits_subtitle', 'benefits', 'benefits_visible',
            'branch_offers_heading', 'branch_offers', 'branch_offers_visible',
            'note_text', 'note_image', 'note_image_alt', 'note_visible',
            'closing_title', 'closing_subtitle',
            'closing_primary_button_text', 'closing_primary_button_url',
            'closing_secondary_button_text', 'closing_secondary_button_url', 'closing_visible',
        ]));
    }

    public function form(Form $form): Form
    {
        // Các khối dưới đây xếp đúng thứ tự xuất hiện trên trang Ưu đãi (bố cục Mầm Spa mới).
        return $form
            ->schema([
                Forms\Components\Section::make('1 · Phần đầu trang (Hero)')
                    ->description('Banner đầu trang — tiêu đề lớn "SPECIAL OFFERS", tiêu đề phụ, đoạn giới thiệu ngắn + ảnh minh hoạ.')
                    ->icon('heroicon-o-photo')
                    ->schema([
                        Forms\Components\Toggle::make('hero_visible')
                            ->label('Hiển thị khối này trên trang Ưu đãi')
                            ->helperText('Tắt sẽ ẩn toàn bộ banner đầu trang khỏi trang công khai.')
                            ->default(true)
                            ->columnSpanFull(),
                        TranslatableField::group('hero_title', label: 'Tiêu đề lớn', example: 'SPECIAL OFFERS'),
                        TranslatableField::group('hero_subtitle', as: 'quill', label: 'Tiêu đề phụ', example: 'Ưu đãi dành cho từng hành trình chăm sóc'),
                        TranslatableField::group('hero_body', as: 'quill', label: 'Đoạn giới thiệu ngắn'),
                        Forms\Components\FileUpload::make('hero_image')->label('Ảnh minh hoạ')
                            ->helperText('Ảnh vuông/gần vuông, chủ thể căn giữa khung hình, khuyến nghị tối thiểu 1200×1200px.')
                            ->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(5120)->disk('public')->directory('offers')->imageEditor(),
                        TranslatableField::group('hero_image_alt', label: 'Alt text ảnh (mô tả ảnh cho SEO/accessibility)', example: 'Bàn trà trị liệu tại Mầm Spa'),
                    ]),

                Forms\Components\Section::make('2 · Quyền lợi toàn hệ thống')
                    ->description('Nhãn khối + tối đa 3 thẻ quyền lợi áp dụng tại tất cả chi nhánh (icon, tiêu đề, mô tả, nút "Tìm hiểu thêm").')
                    ->icon('heroicon-o-sparkles')
                    ->schema([
                        Forms\Components\Toggle::make('benefits_visible')
                            ->label('Hiển thị khối này trên trang Ưu đãi')
                            ->helperText('Tắt sẽ ẩn toàn bộ khối "Quyền lợi toàn hệ thống" khỏi trang công khai.')
                            ->default(true)
                            ->columnSpanFull(),
                        TranslatableField::group('benefits_heading', label: 'Tiêu đề khối', example: 'Quyền lợi toàn hệ thống'),
                        TranslatableField::group('benefits_subtitle', label: 'Mô tả ngắn', example: 'Áp dụng tại tất cả các chi nhánh của Mầm.'),
                        Forms\Components\Repeater::make('benefits')
                            ->label('Danh sách quyền lợi')
                            ->schema([
                                Forms\Components\Select::make('icon')
                                    ->label('Icon')
                                    ->options([
                                        'Leaf' => 'Lá cây (Wellness Credit)',
                                        'Clock' => 'Đồng hồ (Quiet Hours)',
                                        'User' => 'Người dùng (Membership)',
                                        'Gift' => 'Quà tặng',
                                        'HeartHandshake' => 'Bắt tay (hỗ trợ, chăm sóc)',
                                        'ShieldCheck' => 'Khiên bảo vệ (an toàn, bảo mật)',
                                    ])
                                    ->default('Leaf')
                                    ->required(),
                                TranslatableField::group('title', label: 'Tiêu đề', example: 'Wellness Credit'),
                                TranslatableField::group('description', as: 'quill', label: 'Mô tả'),
                                TranslatableField::group('button_label', label: 'Nhãn nút', example: 'Tìm hiểu thêm'),
                                Forms\Components\TextInput::make('button_link')->label('Link nút')->url()->columnSpanFull(),
                            ])
                            ->columns(2)
                            ->defaultItems(0)
                            ->maxItems(3)
                            ->reorderable()
                            ->collapsible()
                            ->itemLabel(fn (array $state): ?string => $state['title']['vi'] ?? null)
                            ->addActionLabel('+ Thêm quyền lợi (tối đa 3)')
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('3 · Ưu đãi nổi bật')
                    ->description('Nhãn khối + danh sách thẻ ưu đãi (ảnh nền, tiêu đề, mô tả, nút "Xem chi tiết").')
                    ->icon('heroicon-o-map-pin')
                    ->schema([
                        Forms\Components\Toggle::make('branch_offers_visible')
                            ->label('Hiển thị khối này trên trang Ưu đãi')
                            ->helperText('Tắt sẽ ẩn toàn bộ khối "Ưu đãi nổi bật" khỏi trang công khai.')
                            ->default(true)
                            ->columnSpanFull(),
                        TranslatableField::group('branch_offers_heading', label: 'Tiêu đề khối', example: 'Ưu đãi nổi bật'),
                        Forms\Components\Repeater::make('branch_offers')
                            ->label('Danh sách ưu đãi')
                            ->schema([
                                Forms\Components\FileUpload::make('image')->label('Ảnh nền thẻ')
                                    ->helperText('Ảnh ngang, tỉ lệ ~4:3, chủ thể căn giữa (ảnh sẽ bị phủ lớp tối để chữ dễ đọc), khuyến nghị tối thiểu 1000×750px.')
                                    ->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(5120)->disk('public')->directory('offers/branches')->imageEditor()
                                    ->columnSpanFull(),
                                TranslatableField::group('image_alt', label: 'Alt text ảnh'),
                                TranslatableField::group('title', label: 'Tiêu đề ưu đãi', example: 'Happy Hours Rituals'),
                                TranslatableField::group('description', as: 'quill', label: 'Mô tả'),
                                TranslatableField::group('button_label', label: 'Nhãn nút', example: 'Xem chi tiết'),
                                Forms\Components\TextInput::make('button_link')->label('Link nút')->url()->columnSpanFull(),
                            ])
                            ->columns(2)
                            ->defaultItems(0)
                            ->reorderable()
                            ->collapsible()
                            ->itemLabel(fn (array $state): ?string => $state['title']['vi'] ?? null)
                            ->addActionLabel('+ Thêm ưu đãi chi nhánh')
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('4 · Khối ghi chú nhỏ')
                    ->description('Icon thông tin cố định + đoạn ghi chú (có thể xuống dòng thành danh sách) + ảnh minh hoạ.')
                    ->icon('heroicon-o-information-circle')
                    ->schema([
                        Forms\Components\Toggle::make('note_visible')
                            ->label('Hiển thị khối này trên trang Ưu đãi')
                            ->helperText('Tắt sẽ ẩn toàn bộ khối ghi chú khỏi trang công khai.')
                            ->default(true)
                            ->columnSpanFull(),
                        TranslatableField::group('note_text', as: 'quill', label: 'Nội dung ghi chú'),
                        Forms\Components\FileUpload::make('note_image')->label('Ảnh minh hoạ')
                            ->helperText('Ảnh ngang, tỉ lệ ~4:3, khuyến nghị tối thiểu 900×675px.')
                            ->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(5120)->disk('public')->directory('offers')->imageEditor(),
                        TranslatableField::group('note_image_alt', label: 'Alt text ảnh'),
                    ]),

                Forms\Components\Section::make('5 · Banner CTA đóng trang')
                    ->description('Banner nền màu đóng trang — tiêu đề + mô tả ngắn + 2 nút (Đặt lịch ngay / Liên hệ với chúng tôi).')
                    ->icon('heroicon-o-megaphone')
                    ->schema([
                        Forms\Components\Toggle::make('closing_visible')
                            ->label('Hiển thị khối này trên trang Ưu đãi')
                            ->helperText('Tắt sẽ ẩn toàn bộ banner CTA đóng trang khỏi trang công khai.')
                            ->default(true)
                            ->columnSpanFull(),
                        TranslatableField::group('closing_title', as: 'quill', label: 'Tiêu đề', example: 'Begin Your Wellness Journey'),
                        TranslatableField::group('closing_subtitle', as: 'quill', label: 'Mô tả ngắn'),
                        Forms\Components\Grid::make(2)->schema([
                            Forms\Components\Group::make([
                                TranslatableField::group('closing_primary_button_text', label: 'Nhãn nút chính', example: 'Đặt lịch ngay'),
                                Forms\Components\TextInput::make('closing_primary_button_url')->label('Link nút chính')->url()->default('/dat-lich'),
                            ]),
                            Forms\Components\Group::make([
                                TranslatableField::group('closing_secondary_button_text', label: 'Nhãn nút phụ', example: 'Liên hệ với chúng tôi'),
                                Forms\Components\TextInput::make('closing_secondary_button_url')->label('Link nút phụ')->url()->default('/lien-he'),
                            ]),
                        ]),
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
