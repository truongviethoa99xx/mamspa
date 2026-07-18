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
            'hero_subtitle', 'hero_eyebrow', 'hero_image', 'hero_image_alt', 'hero_visible',
            'hero_cta_text', 'hero_cta_link', 'hero_cta_background_color', 'hero_cta_text_color', 'hero_cta_border_color',
            'hero_secondary_cta_text', 'hero_secondary_cta_link', 'hero_secondary_cta_background_color',
            'hero_secondary_cta_text_color', 'hero_secondary_cta_border_color',
            'story_eyebrow', 'story_body', 'story_image', 'story_image_alt', 'story_visible',
            'story_cta_text', 'story_cta_link', 'story_cta_text_color',
            'philosophy_eyebrow', 'philosophy_quote', 'philosophy_visible',
            'service_list_title', 'featured_services_heading', 'featured_services_visible',
            'art_banner_eyebrow', 'art_banner_body', 'art_banner_image', 'art_banner_image_alt', 'art_banner_visible',
            'art_banner_cta_text', 'art_banner_cta_link', 'art_banner_cta_text_color',
            'spaces_title', 'spaces_items', 'spaces_visible',
            'why_us_title', 'why_us_items', 'why_us_visible',
            'testimonials', 'testimonials_visible', 'testimonials_cta_link',
            'reviews_google_rating', 'reviews_google_count', 'reviews_google_link',
            'reviews_tripadvisor_rating', 'reviews_tripadvisor_count', 'reviews_tripadvisor_link',
            'testimonial_video_thumbnail', 'testimonial_video_file', 'testimonial_video_url',
            'gallery_visible', 'customer_gallery_images',
            'final_cta_heading', 'final_cta_cta_text', 'final_cta_cta_link', 'final_cta_image', 'final_cta_visible',
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
                        TranslatableField::group('hero_image_alt', label: 'Alt text ảnh (mô tả ảnh cho SEO/accessibility)', example: 'Không gian trị liệu Mầm Spa'),
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

                Forms\Components\Section::make('Banner 2 — "A Place To Pause"')
                    ->description('Banner giới thiệu thương hiệu, ảnh tràn full-bleed toàn bộ banner; khối chữ đè lên bên trái (~1/3 chiều rộng) trên nền gradient mờ dần sang phải.')
                    ->schema([
                        Forms\Components\Toggle::make('story_visible')
                            ->label('Hiển thị khối này trên trang chủ')
                            ->default(true)
                            ->columnSpanFull(),
                        TranslatableField::group('story_eyebrow', as: 'quill', label: 'Heading 2'),
                        TranslatableField::group('story_body', as: 'quill', label: 'Chú thích'),
                        Forms\Components\FileUpload::make('story_image')->label('Ảnh minh hoạ')
                            ->helperText('Ảnh nền full-bleed toàn bộ banner. Khuyến nghị tối thiểu 1920×1080px.')
                            ->image()->disk('public')->directory('home')
                            ->columnSpanFull(),
                        TranslatableField::group('story_image_alt', label: 'Alt text ảnh (mô tả ảnh cho SEO/accessibility)', example: 'Không gian Mầm Spa'),
                    ]),

                Forms\Components\Section::make('Nút "Về Mầm Spa" (Banner 2)')
                    ->schema([
                        TranslatableField::group('story_cta_text', label: 'Chữ trên nút'),
                        Forms\Components\TextInput::make('story_cta_link')->label('Đường dẫn nút')->placeholder('/gioi-thieu/'),
                        Forms\Components\ColorPicker::make('story_cta_text_color')->label('Màu chữ')->required(),
                    ])
                    ->columns(3),

                Forms\Components\Section::make('Triết lý — "Our Philosophy"')
                    ->description('Trích dẫn triết lý trị liệu, căn giữa trang, nền màu trơn.')
                    ->schema([
                        Forms\Components\Toggle::make('philosophy_visible')
                            ->label('Hiển thị khối này trên trang chủ')
                            ->default(true)
                            ->columnSpanFull(),
                        TranslatableField::group('philosophy_eyebrow', as: 'quill', label: 'Nhãn nhỏ phía trên'),
                        TranslatableField::group('philosophy_quote', as: 'quill', label: 'Câu trích dẫn'),
                    ]),

                Forms\Components\Section::make('Dịch vụ nổi bật')
                    ->schema([
                        Forms\Components\Toggle::make('featured_services_visible')
                            ->label('Hiển thị khối này trên trang chủ')
                            ->helperText('Tắt sẽ ẩn toàn bộ khối "Dịch vụ nổi bật" khỏi trang chủ công khai.')
                            ->default(true)
                            ->columnSpanFull(),
                        TranslatableField::group('featured_services_heading', as: 'quill', label: 'Tiêu đề lớn (căn giữa)'),
                        TranslatableField::group('service_list_title', label: 'Nhãn nhỏ phía trên'),
                    ]),

                Forms\Components\Section::make('Banner "The Art of Vietnamese Healing"')
                    ->description('Banner ảnh + đoạn giới thiệu ngắn, nút "Tìm hiểu thêm" có thể trỏ tới bất kỳ đâu (vd: 1 bài blog cụ thể).')
                    ->schema([
                        Forms\Components\Toggle::make('art_banner_visible')
                            ->label('Hiển thị khối này trên trang chủ')
                            ->default(true)
                            ->columnSpanFull(),
                        TranslatableField::group('art_banner_eyebrow', as: 'quill', label: 'Nhãn nhỏ phía trên'),
                        TranslatableField::group('art_banner_body', as: 'quill', label: 'Đoạn giới thiệu'),
                        Forms\Components\FileUpload::make('art_banner_image')->label('Ảnh minh hoạ')
                            ->helperText('Chiếm 1/2 chiều rộng banner (full-bleed, sát mép trái). Tỉ lệ ngang ~4:3, khuyến nghị tối thiểu 1200×900px.')
                            ->image()->disk('public')->directory('home')
                            ->columnSpanFull(),
                        TranslatableField::group('art_banner_image_alt', label: 'Alt text ảnh (mô tả ảnh cho SEO/accessibility)', example: 'Nghệ thuật trị liệu Việt'),
                    ]),

                Forms\Components\Section::make('Nút "Tìm hiểu thêm" (Art Banner)')
                    ->schema([
                        TranslatableField::group('art_banner_cta_text', label: 'Chữ trên nút'),
                        Forms\Components\TextInput::make('art_banner_cta_link')->label('Đường dẫn nút')->placeholder('/blog/bai-viet-vi-du/'),
                        Forms\Components\ColorPicker::make('art_banner_cta_text_color')->label('Màu chữ')->required(),
                    ])
                    ->columns(3),

                Forms\Components\Section::make('Không gian của chúng tôi — "Our Spaces"')
                    ->description('Mặc định 2 thẻ theo chi nhánh hiện có, có thể thêm/bớt tự do. 1 hàng tối đa 2 thẻ; nếu tổng số lẻ, thẻ cuối tự chiếm full width.')
                    ->schema([
                        Forms\Components\Toggle::make('spaces_visible')
                            ->label('Hiển thị khối này trên trang chủ')
                            ->default(true)
                            ->columnSpanFull(),
                        TranslatableField::group('spaces_title', label: 'Nhãn nhỏ phía trên'),
                        Forms\Components\Repeater::make('spaces_items')
                            ->label('Danh sách không gian')
                            ->schema([
                                Forms\Components\FileUpload::make('image')->label('Ảnh')
                                    ->helperText('Tỉ lệ ngang 4:3, khuyến nghị tối thiểu 1200×900px.')
                                    ->image()->disk('public')->directory('home')
                                    ->columnSpanFull(),
                                TranslatableField::group('image_alt', label: 'Alt text ảnh (mô tả ảnh cho SEO/accessibility)', example: 'Không gian Mầm Spa'),
                                TranslatableField::group('title', as: 'quill', label: 'Tên không gian'),
                                TranslatableField::group('description', as: 'quill', label: 'Mô tả ngắn'),
                                TranslatableField::group('link_text', label: 'Chữ trên nút'),
                                Forms\Components\TextInput::make('link_url')->label('Đường dẫn')->placeholder('/chi-nhanh/ten-chi-nhanh'),
                            ])
                            ->itemLabel(fn (array $state): ?string => strip_tags($state['title']['vi'] ?? '') ?: null)
                            ->reorderable()
                            ->collapsible()
                            ->addActionLabel('Thêm không gian')
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('Vì sao chọn Mầm — "Why Mầm"')
                    ->description('5 điểm nổi bật dạng icon, admin quản lý tự do qua repeater.')
                    ->schema([
                        Forms\Components\Toggle::make('why_us_visible')
                            ->label('Hiển thị khối này trên trang chủ')
                            ->default(true)
                            ->columnSpanFull(),
                        TranslatableField::group('why_us_title', label: 'Nhãn nhỏ phía trên'),
                        Forms\Components\Repeater::make('why_us_items')
                            ->label('Danh sách điểm nổi bật')
                            ->schema([
                                Forms\Components\Select::make('icon')
                                    ->label('Icon')
                                    ->options([
                                        'Leaf' => 'Lá cây (Leaf)',
                                        'Sprout' => 'Mầm cây (Sprout)',
                                        'Flower2' => 'Hoa (Flower)',
                                        'HeartHandshake' => 'Trái tim bắt tay (Personalized care)',
                                        'Heart' => 'Trái tim (Heart)',
                                        'Users' => 'Đội ngũ (Team)',
                                        'GraduationCap' => 'Mũ tốt nghiệp (Trained)',
                                        'ShieldCheck' => 'Khiên xác nhận (Trusted)',
                                        'Sparkles' => 'Lấp lánh (Thoughtful)',
                                        'Sun' => 'Mặt trời (Sun)',
                                        'Droplet' => 'Giọt nước (Droplet)',
                                        'Star' => 'Ngôi sao (Star)',
                                    ])
                                    ->required()
                                    ->native(false),
                                TranslatableField::group('title', as: 'quill', label: 'Tiêu đề'),
                                TranslatableField::group('description', as: 'quill', label: 'Mô tả ngắn'),
                            ])
                            ->itemLabel(fn (array $state): ?string => strip_tags($state['title']['vi'] ?? '') ?: null)
                            ->reorderable()
                            ->collapsible()
                            ->addActionLabel('Thêm điểm nổi bật')
                            ->columns(3)
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('Đánh giá khách hàng')
                    ->description('Thẻ Google & TripAdvisor nhập tay (không tự đồng bộ). Trích dẫn khách hàng quản lý tự do qua repeater — thẻ đầu tiên hiển thị trên trang chủ.')
                    ->schema([
                        Forms\Components\Toggle::make('testimonials_visible')
                            ->label('Hiển thị khối này trên trang chủ')
                            ->default(true)
                            ->columnSpanFull(),

                        Forms\Components\TextInput::make('reviews_google_rating')->label('Điểm Google')->placeholder('4.9'),
                        Forms\Components\TextInput::make('reviews_google_count')->label('Số lượt đánh giá Google')->numeric()->placeholder('328'),
                        Forms\Components\TextInput::make('reviews_google_link')->label('Link "Xem trên Google"')->placeholder('https://g.page/...'),

                        Forms\Components\TextInput::make('reviews_tripadvisor_rating')->label('Điểm TripAdvisor')->placeholder('5.0'),
                        Forms\Components\TextInput::make('reviews_tripadvisor_count')->label('Số lượt đánh giá TripAdvisor')->numeric()->placeholder('156'),
                        Forms\Components\TextInput::make('reviews_tripadvisor_link')->label('Link "Xem trên TripAdvisor"')->placeholder('https://tripadvisor.com/...'),

                        Forms\Components\TextInput::make('testimonials_cta_link')
                            ->label('Link "Xem thêm đánh giá"')
                            ->placeholder('/danh-gia/')
                            ->columnSpanFull(),

                        Forms\Components\Repeater::make('testimonials')
                            ->label('Danh sách trích dẫn khách hàng')
                            ->helperText('Trang chủ sẽ tự động trượt qua lần lượt các trích dẫn trong danh sách này.')
                            ->schema([
                                Forms\Components\TextInput::make('name')->label('Tên khách hàng'),
                                Forms\Components\Select::make('rating')
                                    ->label('Số sao')
                                    ->options(['5' => '5 sao', '4' => '4 sao', '3' => '3 sao', '2' => '2 sao', '1' => '1 sao'])
                                    ->default('5')
                                    ->native(false),
                                TranslatableField::group('content', as: 'quill', label: 'Nội dung đánh giá'),
                            ])
                            ->itemLabel(fn (array $state): ?string => $state['name'] ?? null)
                            ->reorderable()
                            ->collapsible()
                            ->addActionLabel('Thêm đánh giá')
                            ->columns(2)
                            ->columnSpanFull(),
                    ])
                    ->columns(3),

                Forms\Components\Section::make('Video trải nghiệm khách hàng')
                    ->description('Chọn 1 trong 2 cách: tải video lên trực tiếp, hoặc dán link YouTube/Vimeo. Nếu có cả 2, video tải lên sẽ được ưu tiên hiển thị.')
                    ->schema([
                        Forms\Components\FileUpload::make('testimonial_video_thumbnail')
                            ->label('Ảnh đại diện (thumbnail)')
                            ->helperText('Ảnh hiển thị phía sau nút play. Tỉ lệ ngang 4:3, khuyến nghị tối thiểu 1200×900px.')
                            ->image()->disk('public')->directory('home')
                            ->columnSpanFull(),
                        Forms\Components\FileUpload::make('testimonial_video_file')
                            ->label('Tải video lên')
                            ->helperText('MP4/WebM, nên nén dưới 30MB để tải nhanh.')
                            ->acceptedFileTypes(['video/mp4', 'video/webm'])
                            ->maxSize(51200)
                            ->disk('public')->directory('home')
                            ->columnSpanFull(),
                        Forms\Components\TextInput::make('testimonial_video_url')
                            ->label('Hoặc dán link YouTube/Vimeo')
                            ->placeholder('https://youtube.com/watch?v=...')
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('Thư viện ảnh')
                    ->description('Dải ảnh xem trước ở trang chủ, quản lý ngay tại đây. Nút "Xem thêm hình ảnh" dẫn tới trang thư viện ảnh đầy đủ (cùng danh sách ảnh này).')
                    ->schema([
                        Forms\Components\Toggle::make('gallery_visible')
                            ->label('Hiển thị khối này trên trang chủ')
                            ->default(true),
                        Forms\Components\Repeater::make('customer_gallery_images')
                            ->label('Ảnh gallery')
                            ->schema([
                                Forms\Components\FileUpload::make('image')
                                    ->label('Ảnh')
                                    ->helperText('Ảnh không gian/khách hàng thực tế, khuyến nghị tối thiểu 1200×900px.')
                                    ->image()
                                    ->imageEditor()
                                    ->imageEditorAspectRatios(['1:1'])
                                    ->imagePreviewHeight('200')
                                    ->disk('public')
                                    ->directory('home/customer-gallery')
                                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                                    ->maxSize(5120)
                                    ->required(),
                                TranslatableField::group('image_alt', label: 'Alt text ảnh'),
                            ])
                            ->columns(2)
                            ->defaultItems(0)
                            ->reorderable()
                            ->collapsible()
                            ->grid(2)
                            ->addActionLabel('+ Thêm ảnh')
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('CTA cuối trang — "Take a moment for yourself"')
                    ->description('Dải CTA mảnh (~100px cao) ngay trên footer, có ảnh nền tải lên.')
                    ->schema([
                        Forms\Components\Toggle::make('final_cta_visible')
                            ->label('Hiển thị khối này trên trang chủ')
                            ->default(true)
                            ->columnSpanFull(),
                        Forms\Components\FileUpload::make('final_cta_image')->label('Ảnh nền')
                            ->helperText('Ảnh nền ngang cho dải CTA mảnh, khuyến nghị tối thiểu 1600×400px.')
                            ->image()->disk('public')->directory('home')
                            ->columnSpanFull(),
                        TranslatableField::group('final_cta_heading', label: 'Tiêu đề'),
                        TranslatableField::group('final_cta_cta_text', label: 'Chữ trên nút'),
                        Forms\Components\TextInput::make('final_cta_cta_link')->label('Đường dẫn nút')->placeholder('/dat-lich/'),
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
