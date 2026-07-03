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
            'contact_phone', 'contact_address', 'contact_website',
            'hero_image', 'story_image', 'vision_image',
            'value1_image', 'value2_image', 'value3_image',
            'team', 'instagram_handles', 'review_video_url', 'review_video_image', 'review_cards',
            'hero_eyebrow', 'hero_title', 'hero_subtitle', 'hero_retreat', 'hero_visible',
            'features', 'features_visible',
            'contact_bar_visible',
            'story_eyebrow', 'story_heading', 'story_p1', 'story_p2', 'story_visible',
            'vision_eyebrow', 'vision_title', 'vision_p1', 'vision_p2', 'vision_bullets', 'vision_visible',
            'values_eyebrow', 'values_title',
            'value1_title', 'value1_desc', 'value2_title', 'value2_desc', 'value3_title', 'value3_desc', 'values_visible',
            'team_eyebrow', 'team_title', 'team_visible',
            'reviews_eyebrow', 'reviews_title', 'review_video_caption', 'review_quote', 'review_quote_author', 'reviews_visible',
        ]));
    }

    public function form(Form $form): Form
    {
        // Các khối dưới đây xếp đúng thứ tự xuất hiện trên trang Giới thiệu.
        // Field chữ để trống → FE fallback về chuỗi dịch nhóm about.* như cũ.
        return $form
            ->schema([
                Forms\Components\Section::make('1 · Phần đầu trang')
                    ->description('Ảnh lớn + dòng giới thiệu, tiêu đề, mô tả và câu kết (retreat).')
                    ->icon('heroicon-o-photo')
                    ->schema([
                        Forms\Components\Toggle::make('hero_visible')
                            ->label('Hiển thị khối này trên trang Giới thiệu')
                            ->helperText('Tắt sẽ ẩn toàn bộ ảnh + dòng giới thiệu + câu kết khỏi trang công khai.')
                            ->default(true)
                            ->columnSpanFull(),
                        Forms\Components\FileUpload::make('hero_image')->label('Ảnh đầu trang')
                            ->helperText('Tỉ lệ ngang 4:3, khuyến nghị tối thiểu 1200×900px.')
                            ->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(5120)->disk('public')->directory('about')->imageEditor(),
                        TranslatableField::group('hero_eyebrow', label: 'Dòng giới thiệu (eyebrow)', example: 'Chào mừng đến với Mầm Spa'),
                        TranslatableField::group('hero_title', label: 'Tiêu đề chính', example: 'Về chúng tôi'),
                        TranslatableField::group('hero_subtitle', as: 'textarea', label: 'Mô tả ngắn', rows: 3),
                        TranslatableField::group('hero_retreat', as: 'textarea', label: 'Câu kết (dòng nghiêng giữa trang)', rows: 2),
                    ]),

                Forms\Components\Section::make('1b · Bốn ưu điểm nổi bật')
                    ->description('Bốn trụ cột dưới phần đầu trang. Để trống dùng nội dung mặc định; icon gán theo thứ tự: Hoa · Bàn tay · Lá · Trà.')
                    ->icon('heroicon-o-sparkles')
                    ->schema([
                        Forms\Components\Toggle::make('features_visible')
                            ->label('Hiển thị khối này trên trang Giới thiệu')
                            ->helperText('Tắt sẽ ẩn toàn bộ khối 4 ưu điểm khỏi trang công khai.')
                            ->default(true)
                            ->columnSpanFull(),
                        Forms\Components\Repeater::make('features')
                            ->label('')
                            ->schema([
                                TranslatableField::group('title', label: 'Tiêu đề', example: 'Head Spa'),
                                TranslatableField::group('description', as: 'textarea', label: 'Mô tả', rows: 2),
                            ])
                            ->defaultItems(0)
                            ->maxItems(4)
                            ->reorderable()
                            ->collapsible()
                            ->itemLabel(fn (array $state): ?string => $state['title']['vi'] ?? null)
                            ->addActionLabel('+ Thêm ưu điểm (tối đa 4)')
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('2 · Thanh liên hệ')
                    ->description('Dòng điện thoại · địa chỉ · website ngay dưới phần đầu trang.')
                    ->icon('heroicon-o-phone')
                    ->schema([
                        Forms\Components\Toggle::make('contact_bar_visible')
                            ->label('Hiển thị khối này trên trang Giới thiệu')
                            ->helperText('Tắt sẽ ẩn dòng điện thoại · địa chỉ · website khỏi trang công khai.')
                            ->default(true)
                            ->columnSpanFull(),
                        Forms\Components\TextInput::make('contact_phone')->label('Điện thoại')->tel(),
                        Forms\Components\TextInput::make('contact_website')->label('Website')->placeholder('mahaspa.vn'),
                        Forms\Components\TextInput::make('contact_address')->label('Địa chỉ')->columnSpanFull(),
                    ])->columns(2),

                Forms\Components\Section::make('3 · Câu chuyện thương hiệu')
                    ->description('Khối "Câu chuyện" — ảnh bên trái, chữ bên phải.')
                    ->icon('heroicon-o-book-open')
                    ->schema([
                        Forms\Components\Toggle::make('story_visible')
                            ->label('Hiển thị khối này trên trang Giới thiệu')
                            ->helperText('Tắt sẽ ẩn toàn bộ khối "Câu chuyện thương hiệu" khỏi trang công khai.')
                            ->default(true)
                            ->columnSpanFull(),
                        Forms\Components\FileUpload::make('story_image')->label('Ảnh câu chuyện')
                            ->helperText('Tỉ lệ ngang 4:3, khuyến nghị tối thiểu 1200×900px.')
                            ->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(5120)->disk('public')->directory('about')->imageEditor(),
                        TranslatableField::group('story_eyebrow', label: 'Dòng giới thiệu (eyebrow)', example: 'Câu chuyện của Mầm'),
                        TranslatableField::group('story_heading', label: 'Tiêu đề khối'),
                        TranslatableField::group('story_p1', as: 'textarea', label: 'Đoạn văn 1', rows: 4),
                        TranslatableField::group('story_p2', as: 'textarea', label: 'Đoạn văn 2', rows: 4),
                    ]),

                Forms\Components\Section::make('4 · Tầm nhìn & Sứ mệnh')
                    ->description('Khối "Tầm nhìn" — chữ bên trái, ảnh bên phải.')
                    ->icon('heroicon-o-eye')
                    ->schema([
                        Forms\Components\Toggle::make('vision_visible')
                            ->label('Hiển thị khối này trên trang Giới thiệu')
                            ->helperText('Tắt sẽ ẩn toàn bộ khối "Tầm nhìn & Sứ mệnh" khỏi trang công khai.')
                            ->default(true)
                            ->columnSpanFull(),
                        Forms\Components\FileUpload::make('vision_image')->label('Ảnh tầm nhìn')
                            ->helperText('Ảnh vuông (1:1), khuyến nghị tối thiểu 1000×1000px.')
                            ->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(5120)->disk('public')->directory('about')->imageEditor(),
                        TranslatableField::group('vision_eyebrow', label: 'Dòng giới thiệu (eyebrow)'),
                        TranslatableField::group('vision_title', label: 'Tiêu đề khối', example: 'Tầm nhìn & Sứ mệnh'),
                        TranslatableField::group('vision_p1', as: 'textarea', label: 'Đoạn văn 1', rows: 4),
                        TranslatableField::group('vision_p2', as: 'textarea', label: 'Đoạn văn 2', rows: 4),
                        Forms\Components\Repeater::make('vision_bullets')
                            ->label('Danh sách gạch đầu dòng (chi nhánh)')
                            ->schema([
                                Forms\Components\TextInput::make('name')->label('Tên (in đậm)')->required(),
                                TranslatableField::group('description', as: 'textarea', label: 'Mô tả', rows: 2),
                            ])
                            ->defaultItems(0)
                            ->reorderable()
                            ->collapsible()
                            ->itemLabel(fn (array $state): ?string => $state['name'] ?? null)
                            ->addActionLabel('+ Thêm dòng')
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('5 · Giá trị cốt lõi')
                    ->description('Tiêu đề khối + ba thẻ giá trị (trái → phải), mỗi thẻ gồm ảnh, tiêu đề, mô tả.')
                    ->icon('heroicon-o-squares-2x2')
                    ->schema([
                        Forms\Components\Toggle::make('values_visible')
                            ->label('Hiển thị khối này trên trang Giới thiệu')
                            ->helperText('Tắt sẽ ẩn toàn bộ khối "Giá trị cốt lõi" khỏi trang công khai.')
                            ->default(true)
                            ->columnSpanFull(),
                        TranslatableField::group('values_eyebrow', label: 'Dòng giới thiệu (eyebrow)'),
                        TranslatableField::group('values_title', label: 'Tiêu đề khối', example: 'Giá trị cốt lõi'),
                        Forms\Components\Grid::make(3)->schema([
                            Forms\Components\Group::make([
                                Forms\Components\FileUpload::make('value1_image')->label('Ảnh giá trị 1')
                                    ->helperText('Tỉ lệ ngang 4:3, khuyến nghị tối thiểu 800×600px.')
                                    ->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(5120)->disk('public')->directory('about')->imageEditor(),
                                TranslatableField::group('value1_title', label: 'Tiêu đề thẻ 1'),
                                TranslatableField::group('value1_desc', as: 'textarea', label: 'Mô tả thẻ 1', rows: 3),
                            ]),
                            Forms\Components\Group::make([
                                Forms\Components\FileUpload::make('value2_image')->label('Ảnh giá trị 2')
                                    ->helperText('Tỉ lệ ngang 4:3, khuyến nghị tối thiểu 800×600px.')
                                    ->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(5120)->disk('public')->directory('about')->imageEditor(),
                                TranslatableField::group('value2_title', label: 'Tiêu đề thẻ 2'),
                                TranslatableField::group('value2_desc', as: 'textarea', label: 'Mô tả thẻ 2', rows: 3),
                            ]),
                            Forms\Components\Group::make([
                                Forms\Components\FileUpload::make('value3_image')->label('Ảnh giá trị 3')
                                    ->helperText('Tỉ lệ ngang 4:3, khuyến nghị tối thiểu 800×600px.')
                                    ->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(5120)->disk('public')->directory('about')->imageEditor(),
                                TranslatableField::group('value3_title', label: 'Tiêu đề thẻ 3'),
                                TranslatableField::group('value3_desc', as: 'textarea', label: 'Mô tả thẻ 3', rows: 3),
                            ]),
                        ]),
                    ]),

                Forms\Components\Section::make('6 · Đội ngũ')
                    ->description('Tiêu đề khối + danh sách nhân sự hiển thị ở khối "Đội ngũ".')
                    ->icon('heroicon-o-user-group')
                    ->schema([
                        Forms\Components\Toggle::make('team_visible')
                            ->label('Hiển thị khối này trên trang Giới thiệu')
                            ->helperText('Tắt sẽ ẩn toàn bộ khối "Đội ngũ" khỏi trang công khai.')
                            ->default(true)
                            ->columnSpanFull(),
                        TranslatableField::group('team_eyebrow', label: 'Dòng giới thiệu (eyebrow)'),
                        TranslatableField::group('team_title', label: 'Tiêu đề khối', example: 'Đội ngũ của chúng tôi'),
                        Forms\Components\Repeater::make('team')
                            ->label('Danh sách thành viên')
                            ->schema([
                                Forms\Components\FileUpload::make('photo')->label('Ảnh')
                                    ->helperText('Ảnh dọc, tỉ lệ 3:4, khuyến nghị tối thiểu 480×640px.')
                                    ->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(5120)->disk('public')->directory('about/team'),
                                Forms\Components\TextInput::make('name')->label('Họ tên')->required(),
                                TranslatableField::group('role', label: 'Vai trò'),
                                TranslatableField::group('description', as: 'textarea', label: 'Mô tả', rows: 2),
                            ])
                            ->columns(2)
                            ->defaultItems(0)
                            ->reorderable()
                            ->collapsible()
                            ->itemLabel(fn (array $state): ?string => $state['name'] ?? null)
                            ->addActionLabel('+ Thêm thành viên')
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('7 · Đánh giá khách hàng (Instagram)')
                    ->description('Tiêu đề khối, video, trích dẫn và các card review cuối trang.')
                    ->icon('heroicon-o-heart')
                    ->schema([
                        Forms\Components\Toggle::make('reviews_visible')
                            ->label('Hiển thị khối này trên trang Giới thiệu')
                            ->helperText('Tắt sẽ ẩn toàn bộ khối "Đánh giá khách hàng" khỏi trang công khai.')
                            ->default(true)
                            ->columnSpanFull(),
                        TranslatableField::group('reviews_eyebrow', label: 'Dòng giới thiệu (eyebrow)'),
                        TranslatableField::group('reviews_title', label: 'Tiêu đề khối', example: 'Khách hàng nói gì'),
                        Forms\Components\FileUpload::make('review_video_image')->label('Ảnh/video thumbnail')
                            ->helperText('Tỉ lệ ngang 16:9 (khung video), khuyến nghị tối thiểu 1280×720px.')
                            ->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(5120)->disk('public')->directory('about/reviews')->imageEditor(),
                        Forms\Components\TextInput::make('review_video_url')->label('Link video')->url(),
                        TranslatableField::group('review_video_caption', label: 'Chú thích trên video'),
                        TranslatableField::group('review_quote', as: 'textarea', label: 'Trích dẫn khách hàng', rows: 3),
                        TranslatableField::group('review_quote_author', label: 'Tên người trích dẫn'),
                        Forms\Components\TagsInput::make('instagram_handles')
                            ->label('Tài khoản Instagram')
                            ->placeholder('@tài_khoản rồi nhấn Enter')
                            ->columnSpanFull(),
                        Forms\Components\Repeater::make('review_cards')
                            ->label('Card review / Instagram')
                            ->schema([
                                Forms\Components\FileUpload::make('image')->label('Ảnh')
                                    ->helperText('Ảnh dọc kiểu Instagram, tỉ lệ 4:5, khuyến nghị tối thiểu 1080×1350px.')
                                    ->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(5120)->disk('public')->directory('about/reviews')->imageEditor(),
                                Forms\Components\TextInput::make('handle')->label('Tên/handle')->required(),
                                Forms\Components\TextInput::make('link')->label('Link')->url(),
                            ])
                            ->columns(2)
                            ->defaultItems(0)
                            ->reorderable()
                            ->collapsible()
                            ->itemLabel(fn (array $state): ?string => $state['handle'] ?? null)
                            ->addActionLabel('+ Thêm card')
                            ->columnSpanFull(),
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
