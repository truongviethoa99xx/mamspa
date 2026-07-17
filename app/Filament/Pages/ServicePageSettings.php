<?php

namespace App\Filament\Pages;

use App\Filament\Concerns\RestrictsFilamentAccess;
use App\Filament\Forms\TranslatableField;
use App\Models\ServicePageContent;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Page;

class ServicePageSettings extends Page implements HasForms
{
    use InteractsWithForms;
    use RestrictsFilamentAccess;

    protected static ?string $navigationIcon = 'heroicon-o-document-text';

    protected static ?string $navigationGroup = 'Nội dung';

    protected static ?string $title = 'Nội dung trang Dịch vụ';

    protected static ?string $navigationLabel = 'Trang Dịch vụ';

    protected static ?int $navigationSort = 3;

    protected static string $view = 'filament.pages.service-page-settings';

    public ?array $data = [];

    protected static function allowedRoles(): array
    {
        return User::contentRoles();
    }

    public function mount(): void
    {
        $this->form->fill(ServicePageContent::current()->only([
            'hero_visible', 'hero_title', 'hero_subtitle', 'hero_image', 'hero_image_alt',
            'showcase_visible',
            'closing_visible', 'closing_image', 'closing_image_alt', 'closing_heading', 'closing_body', 'closing_cta_text', 'closing_cta_link',
        ]));
    }

    public function form(Form $form): Form
    {
        // Trang danh sách dịch vụ (/dich-vu) — bố cục mới: hero + 4 khối dịch vụ nổi bật (showcase)
        // + banner CTA khép lại trang. Field chữ để trống → FE fallback về nội dung mặc định.
        return $form
            ->schema([
                Forms\Components\Section::make('1 · Trang danh sách dịch vụ - Phần đầu trang (Hero)')
                    ->description('Banner đầu trang /dich-vu — cùng kiểu dáng với banner 1 ở trang Giới thiệu (ảnh full-bleed, tiêu đề lớn).')
                    ->icon('heroicon-o-photo')
                    ->schema([
                        Forms\Components\Toggle::make('hero_visible')
                            ->label('Hiển thị khối này trên trang Dịch vụ')
                            ->helperText('Tắt sẽ ẩn toàn bộ phần đầu trang khỏi trang công khai.')
                            ->default(true)
                            ->columnSpanFull(),
                        Forms\Components\FileUpload::make('hero_image')->label('Ảnh nền banner')
                            ->helperText('Ảnh phủ theo chiều cao trình duyệt nên trên desktop bị crop khá rộng (~21:9) — chọn ảnh ngang, chủ thể căn giữa khung hình, khuyến nghị tối thiểu 2400×1000px.')
                            ->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(20480)->disk('public')->directory('services')->imageEditor()
                            ->columnSpanFull(),
                        TranslatableField::group('hero_image_alt', label: 'Alt text ảnh'),
                        TranslatableField::group('hero_title', as: 'quill', label: 'Tiêu đề'),
                        TranslatableField::group('hero_subtitle', as: 'quill', label: 'Mô tả'),
                    ]),

                Forms\Components\Section::make('2 · Trang danh sách dịch vụ - Dịch vụ nổi bật')
                    ->description('Khối này hiển thị các danh mục dịch vụ cấp 1 (ảnh, tên, mô tả) — quản lý nội dung từng danh mục tại menu "Danh mục dịch vụ", không chỉnh ở đây.')
                    ->icon('heroicon-o-squares-2x2')
                    ->schema([
                        Forms\Components\Toggle::make('showcase_visible')
                            ->label('Hiển thị khối này trên trang Dịch vụ')
                            ->helperText('Tắt sẽ ẩn toàn bộ khối dịch vụ nổi bật khỏi trang công khai.')
                            ->default(true)
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('3 · Trang danh sách dịch vụ - Banner khép lại trang')
                    ->description('Banner CTA cuối trang /dich-vu, mời khách đặt lịch.')
                    ->icon('heroicon-o-envelope-open')
                    ->schema([
                        Forms\Components\Toggle::make('closing_visible')
                            ->label('Hiển thị khối này trên trang Dịch vụ')
                            ->helperText('Tắt sẽ ẩn toàn bộ banner khép lại trang khỏi trang công khai.')
                            ->default(true)
                            ->columnSpanFull(),
                        Forms\Components\FileUpload::make('closing_image')->label('Ảnh nền (tuỳ chọn)')
                            ->helperText('Ảnh nền banner CTA hiển thị rõ nét, không có lớp phủ — nên chọn ảnh tông sáng để chữ tối vẫn đọc rõ. Chiều cao tự co theo nội dung chữ, chọn ảnh ngang chủ thể căn giữa, khuyến nghị tối thiểu 1600×900px.')
                            ->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(5120)->disk('public')->directory('services')->imageEditor(),
                        TranslatableField::group('closing_image_alt', label: 'Alt text ảnh (bỏ trống nếu ảnh chỉ mang tính trang trí)'),
                        TranslatableField::group('closing_heading', as: 'quill', label: 'Tiêu đề'),
                        TranslatableField::group('closing_body', as: 'quill', label: 'Mô tả'),
                        TranslatableField::group('closing_cta_text', as: 'quill', label: 'Nhãn nút CTA'),
                        Forms\Components\TextInput::make('closing_cta_link')->label('Link nút CTA')->url(),
                    ]),
            ])
            ->statePath('data');
    }

    public function save(): void
    {
        ServicePageContent::current()->update($this->form->getState());

        Notification::make()->success()->title('Đã lưu nội dung trang Dịch vụ')->send();
    }
}
