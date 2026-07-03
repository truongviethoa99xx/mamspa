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
            'hero_title', 'hero_subtitle', 'hero_eyebrow', 'hero_cta_text', 'hero_cta_link',
            'hero_image', 'hero_visible', 'service_list_title', 'featured_services_visible',
            'testimonial_rating', 'testimonial_review_count',
            'testimonial_source', 'testimonials', 'testimonials_visible',
        ]));
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Phần đầu trang')
                    ->schema([
                        Forms\Components\Toggle::make('hero_visible')
                            ->label('Hiển thị khối này trên trang chủ')
                            ->helperText('Tắt sẽ ẩn toàn bộ banner đầu trang khỏi trang chủ công khai, nội dung bên dưới vẫn được giữ lại để bật lại sau.')
                            ->default(true)
                            ->columnSpanFull(),
                        TranslatableField::group('hero_eyebrow', label: 'Dòng giới thiệu'),
                        TranslatableField::group('hero_title', as: 'textarea', label: 'Tiêu đề', rows: 2),
                        TranslatableField::group('hero_subtitle', as: 'textarea', label: 'Mô tả', rows: 3),
                        TranslatableField::group('hero_cta_text', label: 'Nút CTA'),
                        Forms\Components\TextInput::make('hero_cta_link')->label('Đường dẫn nút')->placeholder('/dat-lich/'),
                        Forms\Components\FileUpload::make('hero_image')->label('Banner trang chủ')
                            ->helperText('Ảnh hoặc video banner toàn màn hình. Ảnh: tỉ lệ ngang 16:9, khuyến nghị tối thiểu 1920×1080px. Video: MP4/WebM, nên nén dưới 15MB để tải nhanh.')
                            ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/webm'])
                            ->maxSize(20480)
                            ->disk('public')->directory('home'),
                    ]),

                Forms\Components\Section::make('Dịch vụ nổi bật')
                    ->schema([
                        Forms\Components\Toggle::make('featured_services_visible')
                            ->label('Hiển thị khối này trên trang chủ')
                            ->helperText('Tắt sẽ ẩn toàn bộ khối "Dịch vụ nổi bật" khỏi trang chủ công khai.')
                            ->default(true)
                            ->columnSpanFull(),
                        TranslatableField::group('service_list_title', label: 'Tiêu đề khối'),
                    ]),

                Forms\Components\Section::make('Đánh giá khách hàng')
                    ->schema([
                        Forms\Components\Toggle::make('testimonials_visible')
                            ->label('Hiển thị khối này trên trang chủ')
                            ->helperText('Tắt sẽ ẩn toàn bộ khối "Đánh giá khách hàng" khỏi trang chủ công khai.')
                            ->default(true)
                            ->columnSpanFull(),
                        Forms\Components\TextInput::make('testimonial_rating')->label('Điểm tổng')->numeric()->minValue(1)->maxValue(5),
                        Forms\Components\TextInput::make('testimonial_review_count')->label('Số lượt đánh giá')->numeric()->minValue(0),
                        Forms\Components\TextInput::make('testimonial_source')->label('Nguồn')->placeholder('google'),
                        Forms\Components\Repeater::make('testimonials')
                            ->label('Danh sách review')
                            ->schema([
                                Forms\Components\TextInput::make('name')->label('Tên')->required(),
                                Forms\Components\TextInput::make('time')->label('Thời gian'),
                                Forms\Components\TextInput::make('rating')->label('Điểm')->numeric()->minValue(1)->maxValue(5),
                                TranslatableField::group('content', as: 'textarea', label: 'Nội dung', rows: 3),
                            ])
                            ->columns(2)
                            ->defaultItems(0)
                            ->reorderable()
                            ->collapsible()
                            ->itemLabel(fn (array $state): ?string => $state['name'] ?? null)
                            ->addActionLabel('+ Thêm review')
                            ->columnSpanFull(),
                    ])
                    ->columns(3),
            ])
            ->statePath('data');
    }

    public function save(): void
    {
        HomePageContent::current()->update($this->form->getState());

        Notification::make()->success()->title('Đã lưu nội dung trang chủ')->send();
    }
}
