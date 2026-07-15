<?php

namespace App\Filament\Pages;

use App\Filament\Concerns\RestrictsFilamentAccess;
use App\Filament\Forms\TranslatableField;
use App\Models\HomePageContent;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Page;

class HomePageSettings extends Page implements HasForms
{
    use InteractsWithForms;
    use RestrictsFilamentAccess;

    protected static ?string $navigationIcon = 'heroicon-o-home';

    protected static ?string $navigationGroup = 'Nội dung';

    protected static ?string $title = 'Nội dung trang chủ';

    protected static ?string $navigationLabel = 'Trang chủ';

    protected static ?int $navigationSort = 1;

    protected static string $view = 'filament.pages.home-page-settings';

    public ?array $data = [];

    protected static function allowedRoles(): array
    {
        return User::contentRoles();
    }

    public function mount(): void
    {
        $this->form->fill(HomePageContent::current()->only([
            'hero_subtitle', 'hero_eyebrow', 'hero_image', 'hero_visible',
            'hero_cta_text', 'hero_cta_link', 'hero_cta_background_color', 'hero_cta_text_color', 'hero_cta_border_color',
            'hero_secondary_cta_text', 'hero_secondary_cta_link', 'hero_secondary_cta_background_color',
            'hero_secondary_cta_text_color', 'hero_secondary_cta_border_color',
            'service_list_title', 'featured_services_visible',
        ]));
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Banner trang chủ')
                    ->description('Banner đầu trang chủ — nằm ngay dưới header, full chiều rộng.')
                    ->schema([
                        Forms\Components\Toggle::make('hero_visible')
                            ->label('Hiển thị khối này trên trang chủ')
                            ->helperText('Tắt sẽ ẩn toàn bộ banner đầu trang khỏi trang chủ công khai, nội dung bên dưới vẫn được giữ lại để bật lại sau.')
                            ->default(true)
                            ->columnSpanFull(),
                        TranslatableField::group('hero_eyebrow', as: 'quill', label: 'Heading 1'),
                        TranslatableField::group('hero_subtitle', as: 'quill', label: 'Mô tả'),
                        Forms\Components\FileUpload::make('hero_image')->label('Ảnh/video nền banner')
                            ->helperText('Ảnh hoặc video banner toàn màn hình. Ảnh: tỉ lệ ngang 16:9, khuyến nghị tối thiểu 1920×1080px. Video: MP4/WebM, nên nén dưới 15MB để tải nhanh.')
                            ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/webm'])
                            ->maxSize(20480)
                            ->disk('public')->directory('home')
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('Nút "Đặt lịch ngay" (Banner)')
                    ->schema([
                        TranslatableField::group('hero_cta_text', label: 'Chữ trên nút'),
                        Forms\Components\TextInput::make('hero_cta_link')->label('Đường dẫn nút')->placeholder('/dat-lich/'),
                        Forms\Components\ColorPicker::make('hero_cta_background_color')->label('Màu nền')->required(),
                        Forms\Components\ColorPicker::make('hero_cta_text_color')->label('Màu chữ')->required(),
                        Forms\Components\ColorPicker::make('hero_cta_border_color')->label('Màu viền')->required(),
                    ])
                    ->columns(3),

                Forms\Components\Section::make('Nút "Khám phá dịch vụ" (Banner)')
                    ->schema([
                        TranslatableField::group('hero_secondary_cta_text', label: 'Chữ trên nút'),
                        Forms\Components\TextInput::make('hero_secondary_cta_link')->label('Đường dẫn nút')->placeholder('/dich-vu/'),
                        Forms\Components\ColorPicker::make('hero_secondary_cta_background_color')
                            ->label('Màu nền')
                            ->helperText('Để trống = nền trong suốt (chỉ hiện viền + chữ).'),
                        Forms\Components\ColorPicker::make('hero_secondary_cta_text_color')->label('Màu chữ')->required(),
                        Forms\Components\ColorPicker::make('hero_secondary_cta_border_color')->label('Màu viền')->required(),
                    ])
                    ->columns(3),

                Forms\Components\Section::make('Dịch vụ nổi bật')
                    ->schema([
                        Forms\Components\Toggle::make('featured_services_visible')
                            ->label('Hiển thị khối này trên trang chủ')
                            ->helperText('Tắt sẽ ẩn toàn bộ khối "Dịch vụ nổi bật" khỏi trang chủ công khai.')
                            ->default(true)
                            ->columnSpanFull(),
                        TranslatableField::group('service_list_title', label: 'Tiêu đề khối'),
                    ]),
            ])
            ->statePath('data');
    }

    public function save(): void
    {
        HomePageContent::current()->update($this->form->getState());

        Notification::make()->success()->title('Đã lưu nội dung trang chủ')->send();
    }
}
