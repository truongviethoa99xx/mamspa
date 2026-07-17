<?php

namespace App\Filament\Pages;

use App\Filament\Concerns\RestrictsFilamentAccess;
use App\Filament\Forms\TranslatableField;
use App\Models\AboutPageContent;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Page;

class AboutPageSettings extends Page implements HasForms
{
    use InteractsWithForms;
    use RestrictsFilamentAccess;

    protected static ?string $navigationIcon = 'heroicon-o-identification';

    protected static ?string $navigationGroup = 'Nội dung';

    protected static ?string $title = 'Nội dung trang Giới thiệu';

    protected static ?string $navigationLabel = 'Trang Giới thiệu';

    protected static ?int $navigationSort = 2;

    protected static string $view = 'filament.pages.about-page-settings';

    public ?array $data = [];

    protected static function allowedRoles(): array
    {
        return User::contentRoles();
    }

    public function mount(): void
    {
        $this->form->fill(AboutPageContent::current()->only([
            'hero_image', 'hero_image_alt', 'hero_eyebrow', 'hero_title', 'hero_subtitle', 'hero_visible',
            'features', 'features_eyebrow', 'features_visible',
            'story_image', 'story_image_alt', 'story_heading', 'story_p1', 'story_visible',
            'philosophy_heading', 'philosophy_title', 'philosophy_p1', 'philosophy_image', 'philosophy_image_alt', 'philosophy_visible',
            'approach_image', 'approach_image_alt', 'approach_title', 'approach_p1', 'approach_features', 'approach_visible',
            'spaces_title', 'spaces_intro', 'spaces', 'spaces_visible',
            'people_image', 'people_image_alt', 'people_title', 'people_p1', 'people_visible',
            'experiences_title', 'experiences_intro', 'testimonials', 'experiences_visible',
            'mission_vision_title', 'mission_title', 'mission_desc', 'vision_title', 'vision_desc', 'mission_vision_visible',
            'journey_title', 'journey_intro', 'journey_images', 'journey_visible',
            'invitation_image', 'invitation_image_alt', 'invitation_title', 'invitation_p1', 'invitation_p2',
            'invitation_button_text', 'invitation_button_url', 'invitation_visible',
        ]));
    }

    public function form(Form $form): Form
    {
        // Các khối dưới đây xếp đúng thứ tự xuất hiện trên trang Giới thiệu (bố cục Mầm Spa mới).
        // Field chữ để trống → FE fallback về chuỗi dịch nhóm about.* như cũ.
        return $form
            ->schema([
                Forms\Components\Section::make('1 · Phần đầu trang (Hero)')
                    ->description('Banner đầu trang — cùng kiểu dáng với banner trang chủ (ảnh/video full-bleed, tiêu đề lớn, không nút CTA).')
                    ->icon('heroicon-o-photo')
                    ->schema([
                        Forms\Components\Toggle::make('hero_visible')
                            ->label('Hiển thị khối này trên trang Giới thiệu')
                            ->helperText('Tắt sẽ ẩn toàn bộ banner đầu trang khỏi trang công khai.')
                            ->default(true)
                            ->columnSpanFull(),
                        TranslatableField::group('hero_title', as: 'quill', label: 'Heading 1'),
                        TranslatableField::group('hero_subtitle', as: 'quill', label: 'Mô tả'),
                        Forms\Components\FileUpload::make('hero_image')->label('Ảnh/video nền banner')
                            ->helperText('Ảnh phủ theo chiều cao trình duyệt nên trên desktop bị crop khá rộng (~21:9) — chọn ảnh ngang, chủ thể căn giữa khung hình, khuyến nghị tối thiểu 2400×1000px. Video: MP4/WebM, nên nén dưới 15MB để tải nhanh.')
                            ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/webm'])
                            ->maxSize(20480)
                            ->disk('public')->directory('about')
                            ->columnSpanFull(),
                        TranslatableField::group('hero_image_alt', label: 'Alt text ảnh (mô tả ảnh cho SEO/accessibility)', example: 'Về Mầm Spa'),
                        TranslatableField::group('hero_eyebrow', label: 'Dòng giới thiệu (eyebrow, chưa dùng ở banner mới)', example: 'Chào mừng đến với Mầm Spa'),
                    ]),

                Forms\Components\Section::make('2 · Our Story')
                    ->description('Khối "Our Story" — ảnh bên phải, chữ bên trái.')
                    ->icon('heroicon-o-book-open')
                    ->schema([
                        Forms\Components\Toggle::make('story_visible')
                            ->label('Hiển thị khối này trên trang Giới thiệu')
                            ->helperText('Tắt sẽ ẩn toàn bộ khối "Our Story" khỏi trang công khai.')
                            ->default(true)
                            ->columnSpanFull(),
                        Forms\Components\FileUpload::make('story_image')->label('Ảnh câu chuyện')
                            ->helperText('Trên điện thoại hiển thị tỉ lệ 4:3; trên desktop ảnh giãn ngang hơn (~2:1) để lấp đầy cột ảnh cao 360px — chủ thể nên căn giữa khung hình, khuyến nghị tối thiểu 1600×900px.')
                            ->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(5120)->disk('public')->directory('about')->imageEditor(),
                        TranslatableField::group('story_image_alt', label: 'Alt text ảnh', example: 'Không gian trị liệu tại Mầm Spa'),
                        TranslatableField::group('story_heading', label: 'Tiêu đề khối', example: 'Our Story'),
                        TranslatableField::group('story_p1', as: 'quill', label: 'Đoạn văn'),
                    ]),

                Forms\Components\Section::make('3 · Our Philosophy')
                    ->description('Khối nhãn nhỏ "Our Philosophy" + tiêu đề lớn kiểu triết lý + 1 đoạn văn. Chiều cao section co giãn theo nội dung, có thể thêm ảnh nền.')
                    ->icon('heroicon-o-sparkles')
                    ->schema([
                        Forms\Components\Toggle::make('philosophy_visible')
                            ->label('Hiển thị khối này trên trang Giới thiệu')
                            ->helperText('Tắt sẽ ẩn toàn bộ khối "Our Philosophy" khỏi trang công khai.')
                            ->default(true)
                            ->columnSpanFull(),
                        Forms\Components\FileUpload::make('philosophy_image')->label('Ảnh nền (tuỳ chọn)')
                            ->helperText('Ảnh nền phủ toàn bộ section, chiều cao tự co theo nội dung chữ nên tỉ lệ thực tế sẽ thay đổi tuỳ nội dung — chọn ảnh ngang, chủ thể căn giữa để không bị crop mất phần quan trọng, khuyến nghị tối thiểu 1920×1080px.')
                            ->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(10240)->disk('public')->directory('about')
                            ->columnSpanFull(),
                        TranslatableField::group('philosophy_image_alt', label: 'Alt text ảnh (bỏ trống nếu ảnh chỉ mang tính trang trí)'),
                        TranslatableField::group('philosophy_heading', label: 'Nhãn nhỏ', example: 'Our Philosophy'),
                        TranslatableField::group('philosophy_title', as: 'quill', label: 'Tiêu đề lớn'),
                        TranslatableField::group('philosophy_p1', as: 'quill', label: 'Đoạn văn'),
                    ]),

                Forms\Components\Section::make('4 · 4 Healing Journeys')
                    ->description('Nhãn khối + bốn hành trình chữa lành — mỗi thẻ gồm ảnh, tiêu đề, mô tả ngắn.')
                    ->icon('heroicon-o-squares-2x2')
                    ->schema([
                        Forms\Components\Toggle::make('features_visible')
                            ->label('Hiển thị khối này trên trang Giới thiệu')
                            ->helperText('Tắt sẽ ẩn toàn bộ khối "4 Healing Journeys" khỏi trang công khai.')
                            ->default(true)
                            ->columnSpanFull(),
                        TranslatableField::group('features_eyebrow', label: 'Tiêu đề khối', example: '4 Healing Journeys'),
                        Forms\Components\Repeater::make('features')
                            ->label('')
                            ->schema([
                                Forms\Components\FileUpload::make('image')->label('Ảnh')
                                    ->helperText('Ảnh NGANG, tỉ lệ 4:3, khuyến nghị tối thiểu 1000×750px.')
                                    ->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(5120)->disk('public')->directory('about/journeys')->imageEditor(),
                                TranslatableField::group('image_alt', label: 'Alt text ảnh'),
                                TranslatableField::group('title', label: 'Tiêu đề', example: 'Vietnamese Healing Therapy'),
                                TranslatableField::group('description', as: 'textarea', label: 'Mô tả', rows: 2),
                            ])
                            ->defaultItems(0)
                            ->maxItems(4)
                            ->reorderable()
                            ->collapsible()
                            ->itemLabel(fn (array $state): ?string => $state['title']['vi'] ?? null)
                            ->addActionLabel('+ Thêm hành trình (tối đa 4)')
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('5 · Our Approach')
                    ->description('Khối "Our Approach" — ảnh bên trái, chữ bên phải.')
                    ->icon('heroicon-o-hand-raised')
                    ->schema([
                        Forms\Components\Toggle::make('approach_visible')
                            ->label('Hiển thị khối này trên trang Giới thiệu')
                            ->helperText('Tắt sẽ ẩn toàn bộ khối "Our Approach" khỏi trang công khai.')
                            ->default(true)
                            ->columnSpanFull(),
                        Forms\Components\FileUpload::make('approach_image')->label('Ảnh minh hoạ')
                            ->helperText('Ảnh VUÔNG (tỉ lệ 1:1), khuyến nghị tối thiểu 900×900px.')
                            ->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(5120)->disk('public')->directory('about')->imageEditor(),
                        TranslatableField::group('approach_image_alt', label: 'Alt text ảnh'),
                        TranslatableField::group('approach_title', as: 'quill', label: 'Tiêu đề khối'),
                        TranslatableField::group('approach_p1', as: 'quill', label: 'Đoạn văn chính'),
                        Forms\Components\Repeater::make('approach_features')
                            ->label('Hàng biểu tượng bên dưới đoạn văn')
                            ->schema([
                                Forms\Components\Select::make('icon')
                                    ->label('Biểu tượng')
                                    ->options([
                                        'heart-hands' => 'Bàn tay ôm trái tim',
                                        'leaf' => 'Chiếc lá',
                                        'graduation-cap' => 'Mũ tốt nghiệp',
                                        'flower' => 'Hoa',
                                        'sparkles' => 'Lấp lánh',
                                        'droplet' => 'Giọt nước',
                                    ])
                                    ->default('leaf')
                                    ->required(),
                                TranslatableField::group('title', label: 'Nhãn', example: 'Lắng nghe cơ thể'),
                            ])
                            ->columns(2)
                            ->defaultItems(0)
                            ->maxItems(3)
                            ->reorderable()
                            ->collapsible()
                            ->itemLabel(fn (array $state): ?string => $state['title']['vi'] ?? null)
                            ->addActionLabel('+ Thêm biểu tượng (tối đa 3)')
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('6 · Our Spaces')
                    ->description('Khối "Our Spaces" — tiêu đề chung + danh sách không gian/chi nhánh (ảnh, tên, mô tả, link).')
                    ->icon('heroicon-o-building-storefront')
                    ->schema([
                        Forms\Components\Toggle::make('spaces_visible')
                            ->label('Hiển thị khối này trên trang Giới thiệu')
                            ->helperText('Tắt sẽ ẩn toàn bộ khối "Our Spaces" khỏi trang công khai.')
                            ->default(true)
                            ->columnSpanFull(),
                        TranslatableField::group('spaces_title', as: 'quill', label: 'Tiêu đề khối'),
                        TranslatableField::group('spaces_intro', as: 'quill', label: 'Mô tả chung'),
                        Forms\Components\Repeater::make('spaces')
                            ->label('Danh sách không gian')
                            ->schema([
                                Forms\Components\FileUpload::make('image')->label('Ảnh')
                                    ->helperText('Tỉ lệ ngang 4:3, khuyến nghị tối thiểu 900×675px.')
                                    ->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(5120)->disk('public')->directory('about/spaces')->imageEditor()
                                    ->columnSpanFull(),
                                TranslatableField::group('image_alt', label: 'Alt text ảnh'),
                                TranslatableField::group('title', as: 'quill', label: 'Tên không gian'),
                                TranslatableField::group('description', as: 'quill', label: 'Mô tả'),
                                TranslatableField::group('link_text', label: 'Nhãn nút xem thêm', example: 'Xem chi nhánh'),
                                Forms\Components\TextInput::make('link_url')->label('Link')->url()->columnSpanFull(),
                            ])
                            ->defaultItems(0)
                            ->reorderable()
                            ->collapsible()
                            ->itemLabel(fn (array $state): ?string => $state['title']['vi'] ?? null)
                            ->addActionLabel('+ Thêm không gian')
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('7 · Our People')
                    ->description('Khối tiêu đề lớn "Đội ngũ Mầm", ảnh nhóm + đoạn giới thiệu đội ngũ.')
                    ->icon('heroicon-o-user-group')
                    ->schema([
                        Forms\Components\Toggle::make('people_visible')
                            ->label('Hiển thị khối này trên trang Giới thiệu')
                            ->helperText('Tắt sẽ ẩn toàn bộ khối "Our People" khỏi trang công khai.')
                            ->default(true)
                            ->columnSpanFull(),
                        Forms\Components\FileUpload::make('people_image')->label('Ảnh nhóm')
                            ->helperText('Ảnh ngang, tỉ lệ rộng ~21:10, khuyến nghị tối thiểu 1680×800px.')
                            ->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(5120)->disk('public')->directory('about')->imageEditor(),
                        TranslatableField::group('people_image_alt', label: 'Alt text ảnh', example: 'Đội ngũ Mầm Spa'),
                        TranslatableField::group('people_title', as: 'quill', label: 'Tiêu đề lớn'),
                        TranslatableField::group('people_p1', as: 'quill', label: 'Đoạn văn giới thiệu'),
                    ]),

                Forms\Components\Section::make('8 · Customer Experiences')
                    ->description('Khối "Customer Experiences" — mô tả chung + danh sách đánh giá/trích dẫn khách hàng.')
                    ->icon('heroicon-o-star')
                    ->schema([
                        Forms\Components\Toggle::make('experiences_visible')
                            ->label('Hiển thị khối này trên trang Giới thiệu')
                            ->helperText('Tắt sẽ ẩn toàn bộ khối "Customer Experiences" khỏi trang công khai.')
                            ->default(true)
                            ->columnSpanFull(),
                        TranslatableField::group('experiences_title', as: 'quill', label: 'Tiêu đề khối'),
                        TranslatableField::group('experiences_intro', as: 'quill', label: 'Mô tả chung'),
                        Forms\Components\Repeater::make('testimonials')
                            ->label('Danh sách đánh giá / trích dẫn')
                            ->schema([
                                Forms\Components\Select::make('source')
                                    ->label('Nguồn')
                                    ->options([
                                        'google' => 'Google',
                                        'tripadvisor' => 'TripAdvisor',
                                        'quote' => 'Trích dẫn khách hàng',
                                    ])
                                    ->default('quote')
                                    ->required(),
                                Forms\Components\Select::make('rating')
                                    ->label('Số sao (tuỳ chọn)')
                                    ->options([
                                        1 => '1 sao',
                                        2 => '2 sao',
                                        3 => '3 sao',
                                        4 => '4 sao',
                                        5 => '5 sao',
                                    ]),
                                TranslatableField::group('quote', as: 'quill', label: 'Nội dung đánh giá'),
                                Forms\Components\TextInput::make('author_name')->label('Tên khách hàng')->required()->columnSpanFull(),
                                TranslatableField::group('author_meta', as: 'quill', label: 'Ghi chú'),
                            ])
                            ->columns(2)
                            ->defaultItems(0)
                            ->reorderable()
                            ->collapsible()
                            ->itemLabel(fn (array $state): ?string => $state['author_name'] ?? null)
                            ->addActionLabel('+ Thêm đánh giá')
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('9 · Mission & Vision')
                    ->description('Khối "Mission & Vision" — hai khối nhỏ song song, không cần ảnh.')
                    ->icon('heroicon-o-eye')
                    ->schema([
                        Forms\Components\Toggle::make('mission_vision_visible')
                            ->label('Hiển thị khối này trên trang Giới thiệu')
                            ->helperText('Tắt sẽ ẩn toàn bộ khối "Mission & Vision" khỏi trang công khai.')
                            ->default(true)
                            ->columnSpanFull(),
                        TranslatableField::group('mission_vision_title', as: 'quill', label: 'Tiêu đề khối'),
                        Forms\Components\Grid::make(2)->schema([
                            Forms\Components\Group::make([
                                TranslatableField::group('mission_title', as: 'quill', label: 'Tiêu đề Mission'),
                                TranslatableField::group('mission_desc', as: 'quill', label: 'Mô tả Mission'),
                            ]),
                            Forms\Components\Group::make([
                                TranslatableField::group('vision_title', as: 'quill', label: 'Tiêu đề Vision'),
                                TranslatableField::group('vision_desc', as: 'quill', label: 'Mô tả Vision'),
                            ]),
                        ]),
                    ]),

                Forms\Components\Section::make('10 · Our Journey')
                    ->description('Khối "Our Journey" — mô tả chung + dải ảnh hành trình (ảnh + chú thích).')
                    ->icon('heroicon-o-map')
                    ->schema([
                        Forms\Components\Toggle::make('journey_visible')
                            ->label('Hiển thị khối này trên trang Giới thiệu')
                            ->helperText('Tắt sẽ ẩn toàn bộ khối "Our Journey" khỏi trang công khai.')
                            ->default(true)
                            ->columnSpanFull(),
                        TranslatableField::group('journey_title', as: 'quill', label: 'Tiêu đề khối'),
                        TranslatableField::group('journey_intro', as: 'quill', label: 'Mô tả chung'),
                        Forms\Components\Repeater::make('journey_images')
                            ->label('Dải ảnh hành trình')
                            ->schema([
                                Forms\Components\FileUpload::make('image')->label('Ảnh')
                                    ->helperText('Ảnh dọc, tỉ lệ 3:4, khuyến nghị tối thiểu 900×1200px.')
                                    ->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(5120)->disk('public')->directory('about/journey')->imageEditor(),
                                TranslatableField::group('image_alt', label: 'Alt text ảnh'),
                                TranslatableField::group('caption', as: 'quill', label: 'Chú thích (tuỳ chọn)'),
                            ])
                            ->columns(2)
                            ->defaultItems(0)
                            ->reorderable()
                            ->collapsible()
                            ->addActionLabel('+ Thêm ảnh')
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('11 · A Gentle Invitation')
                    ->description('Khối "A Gentle Invitation" — banner ảnh full-bleed khép lại trang (cùng kiểu banner đầu trang, chiều cao khác) + lời mời + câu kết ngắn + nút CTA.')
                    ->icon('heroicon-o-envelope-open')
                    ->schema([
                        Forms\Components\Toggle::make('invitation_visible')
                            ->label('Hiển thị khối này trên trang Giới thiệu')
                            ->helperText('Tắt sẽ ẩn toàn bộ khối "A Gentle Invitation" khỏi trang công khai.')
                            ->default(true)
                            ->columnSpanFull(),
                        Forms\Components\FileUpload::make('invitation_image')->label('Ảnh nền banner')
                            ->helperText('Banner thấp và rất rộng (~3:1) — chọn ảnh ngang, chủ thể căn giữa; ảnh dọc/chân dung sẽ bị crop mất nhiều phần trên dưới. Khuyến nghị tối thiểu 2400×800px.')
                            ->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(5120)->disk('public')->directory('about')->imageEditor(),
                        TranslatableField::group('invitation_image_alt', label: 'Alt text ảnh'),
                        TranslatableField::group('invitation_title', as: 'quill', label: 'Tiêu đề khối'),
                        TranslatableField::group('invitation_p1', as: 'quill', label: 'Đoạn văn chính'),
                        TranslatableField::group('invitation_p2', as: 'quill', label: 'Câu kết ngắn (trước nút CTA, có thể in đậm chữ "Mầm")'),
                        TranslatableField::group('invitation_button_text', as: 'quill', label: 'Nhãn nút CTA'),
                        Forms\Components\TextInput::make('invitation_button_url')->label('Link nút CTA')->url(),
                    ]),
            ])
            ->statePath('data');
    }

    public function save(): void
    {
        AboutPageContent::current()->update($this->form->getState());

        Notification::make()->success()->title('Đã lưu nội dung trang Giới thiệu')->send();
    }
}
