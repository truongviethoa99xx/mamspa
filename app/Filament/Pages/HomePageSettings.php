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
            'testimonial_source', 'testimonials', 'testimonials_visible', 'testimonial_video_url',
            'story_eyebrow', 'story_body', 'story_cta_text', 'story_image', 'story_visible',
            'philosophy_eyebrow', 'philosophy_quote', 'philosophy_visible',
            'art_banner_eyebrow', 'art_banner_heading', 'art_banner_body', 'art_banner_cta_text',
            'art_banner_image', 'art_banner_visible',
            'why_us_items', 'why_us_visible',
            'gallery_visible',
            'final_cta_heading', 'final_cta_cta_text', 'final_cta_cta_link', 'final_cta_image', 'final_cta_visible',
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

                Forms\Components\Section::make('A Place To Pause — giới thiệu thương hiệu')
                    ->schema([
                        Forms\Components\Toggle::make('story_visible')
                            ->label('Hiển thị khối này trên trang chủ')
                            ->default(true)
                            ->columnSpanFull(),
                        TranslatableField::group('story_eyebrow', label: 'Dòng giới thiệu'),
                        TranslatableField::group('story_body', as: 'textarea', label: 'Đoạn giới thiệu', rows: 3),
                        TranslatableField::group('story_cta_text', label: 'Nút liên kết (dẫn tới trang Về Mầm Spa)'),
                        Forms\Components\FileUpload::make('story_image')->label('Ảnh minh hoạ')
                            ->image()->disk('public')->directory('home'),
                    ]),

                Forms\Components\Section::make('Our Philosophy — triết lý trị liệu')
                    ->schema([
                        Forms\Components\Toggle::make('philosophy_visible')
                            ->label('Hiển thị khối này trên trang chủ')
                            ->default(true)
                            ->columnSpanFull(),
                        TranslatableField::group('philosophy_eyebrow', label: 'Dòng giới thiệu'),
                        TranslatableField::group('philosophy_quote', as: 'textarea', label: 'Câu trích dẫn', rows: 2),
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

                Forms\Components\Section::make('The Art of Vietnamese Healing — banner')
                    ->schema([
                        Forms\Components\Toggle::make('art_banner_visible')
                            ->label('Hiển thị khối này trên trang chủ')
                            ->default(true)
                            ->columnSpanFull(),
                        TranslatableField::group('art_banner_eyebrow', label: 'Dòng giới thiệu'),
                        TranslatableField::group('art_banner_heading', label: 'Tiêu đề'),
                        TranslatableField::group('art_banner_body', as: 'textarea', label: 'Đoạn mô tả', rows: 3),
                        TranslatableField::group('art_banner_cta_text', label: 'Nút liên kết (dẫn tới trang Về Mầm Spa)'),
                        Forms\Components\FileUpload::make('art_banner_image')->label('Ảnh banner')
                            ->image()->disk('public')->directory('home'),
                    ]),

                Forms\Components\Section::make('Why Mầm Spa — điểm nổi bật')
                    ->schema([
                        Forms\Components\Toggle::make('why_us_visible')
                            ->label('Hiển thị khối này trên trang chủ')
                            ->default(true)
                            ->columnSpanFull(),
                        Forms\Components\Repeater::make('why_us_items')
                            ->label('Danh sách điểm nổi bật')
                            ->schema([
                                Forms\Components\Select::make('icon')
                                    ->label('Icon')
                                    ->options([
                                        'Leaf' => 'Leaf (lá cây)',
                                        'HeartHandshake' => 'HeartHandshake (chăm sóc)',
                                        'Sprout' => 'Sprout (thảo mộc)',
                                        'GraduationCap' => 'GraduationCap (chuyên môn)',
                                        'Sparkles' => 'Sparkles (tận tâm)',
                                        'ShieldCheck' => 'ShieldCheck (an toàn)',
                                        'Coffee' => 'Coffee (hiếu khách)',
                                    ])
                                    ->required(),
                                TranslatableField::group('title', label: 'Tiêu đề'),
                                TranslatableField::group('description', as: 'textarea', label: 'Mô tả ngắn', rows: 2),
                            ])
                            ->columns(3)
                            ->defaultItems(0)
                            ->reorderable()
                            ->collapsible()
                            ->itemLabel(fn (array $state): ?string => $state['icon'] ?? null)
                            ->addActionLabel('+ Thêm điểm nổi bật')
                            ->columnSpanFull(),
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
                        Forms\Components\TextInput::make('testimonial_video_url')
                            ->label('Video review (không bắt buộc)')
                            ->helperText('URL video (YouTube/MP4). Để trống nếu chưa có, khối video sẽ tự ẩn.')
                            ->url()
                            ->columnSpanFull(),
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

                Forms\Components\Section::make('Thư viện ảnh xem trước')
                    ->schema([
                        Forms\Components\Toggle::make('gallery_visible')
                            ->label('Hiển thị khối này trên trang chủ')
                            ->helperText('Ảnh lấy tự động từ thư viện ảnh của các chi nhánh (mục Chi nhánh → Media). Tắt sẽ ẩn dải ảnh xem trước khỏi trang chủ.')
                            ->default(true)
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('CTA cuối trang')
                    ->schema([
                        Forms\Components\Toggle::make('final_cta_visible')
                            ->label('Hiển thị khối này trên trang chủ')
                            ->default(true)
                            ->columnSpanFull(),
                        TranslatableField::group('final_cta_heading', as: 'textarea', label: 'Tiêu đề', rows: 2),
                        TranslatableField::group('final_cta_cta_text', label: 'Nút CTA'),
                        Forms\Components\TextInput::make('final_cta_cta_link')->label('Đường dẫn nút')->placeholder('/dat-lich/'),
                        Forms\Components\FileUpload::make('final_cta_image')->label('Ảnh nền')
                            ->image()->disk('public')->directory('home'),
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
