<?php

namespace App\Filament\Pages;

use App\Filament\Concerns\RestrictsFilamentAccess;
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

    protected static ?string $navigationGroup = 'Content';

    protected static ?string $title = 'Nội dung trang Giới thiệu';

    protected static ?string $navigationLabel = 'Trang Giới thiệu';

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
        ]));
    }

    public function form(Form $form): Form
    {
        // Các khối dưới đây xếp đúng thứ tự xuất hiện trên trang Giới thiệu.
        // Phần chữ (tiêu đề, đoạn văn) sửa ở "Hệ thống → Quản lý dịch (nhóm about.*)".
        return $form
            ->schema([
                Forms\Components\Section::make('1 · Phần đầu trang')
                    ->description('Ảnh lớn đầu trang. Chữ tiêu đề/mô tả: nhóm dịch about.title, about.subtitle.')
                    ->icon('heroicon-o-photo')
                    ->schema([
                        Forms\Components\FileUpload::make('hero_image')->label('Ảnh đầu trang')
                            ->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(5120)->disk('public')->directory('about')->imageEditor(),
                    ]),

                Forms\Components\Section::make('2 · Thanh liên hệ')
                    ->description('Dòng điện thoại · địa chỉ · website ngay dưới phần đầu trang.')
                    ->icon('heroicon-o-phone')
                    ->schema([
                        Forms\Components\TextInput::make('contact_phone')->label('Điện thoại')->tel(),
                        Forms\Components\TextInput::make('contact_website')->label('Website')->placeholder('mahaspa.vn'),
                        Forms\Components\TextInput::make('contact_address')->label('Địa chỉ')->columnSpanFull(),
                    ])->columns(2),

                Forms\Components\Section::make('3 · Câu chuyện thương hiệu')
                    ->description('Ảnh khối "Câu chuyện". Chữ: nhóm dịch about.story.*')
                    ->icon('heroicon-o-book-open')
                    ->schema([
                        Forms\Components\FileUpload::make('story_image')->label('Ảnh câu chuyện')
                            ->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(5120)->disk('public')->directory('about')->imageEditor(),
                    ]),

                Forms\Components\Section::make('4 · Tầm nhìn & Sứ mệnh')
                    ->description('Ảnh khối "Tầm nhìn". Chữ: nhóm dịch about.vision.*')
                    ->icon('heroicon-o-eye')
                    ->schema([
                        Forms\Components\FileUpload::make('vision_image')->label('Ảnh tầm nhìn')
                            ->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(5120)->disk('public')->directory('about')->imageEditor(),
                    ]),

                Forms\Components\Section::make('5 · Giá trị cốt lõi')
                    ->description('Ba ảnh thẻ giá trị (trái → phải). Chữ: nhóm dịch about.values.*')
                    ->icon('heroicon-o-squares-2x2')
                    ->schema([
                        Forms\Components\FileUpload::make('value1_image')->label('Ảnh giá trị 1')
                            ->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(5120)->disk('public')->directory('about')->imageEditor(),
                        Forms\Components\FileUpload::make('value2_image')->label('Ảnh giá trị 2')
                            ->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(5120)->disk('public')->directory('about')->imageEditor(),
                        Forms\Components\FileUpload::make('value3_image')->label('Ảnh giá trị 3')
                            ->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(5120)->disk('public')->directory('about')->imageEditor(),
                    ])->columns(3),

                Forms\Components\Section::make('6 · Đội ngũ')
                    ->description('Danh sách nhân sự hiển thị ở khối "Đội ngũ".')
                    ->icon('heroicon-o-user-group')
                    ->schema([
                        Forms\Components\Repeater::make('team')
                            ->label('')
                            ->schema([
                                Forms\Components\FileUpload::make('photo')->label('Ảnh')->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(5120)->disk('public')->directory('about/team'),
                                Forms\Components\TextInput::make('name')->label('Họ tên')->required(),
                                Forms\Components\TextInput::make('role')->label('Vai trò'),
                                Forms\Components\Textarea::make('description')->label('Mô tả')->rows(2),
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
                    ->description('Nội dung media/review cuối trang Giới thiệu.')
                    ->icon('heroicon-o-heart')
                    ->schema([
                        Forms\Components\FileUpload::make('review_video_image')->label('Ảnh/video thumbnail')
                            ->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(5120)->disk('public')->directory('about/reviews')->imageEditor(),
                        Forms\Components\TextInput::make('review_video_url')->label('Link video')->url(),
                        Forms\Components\TagsInput::make('instagram_handles')
                            ->label('Tài khoản Instagram')
                            ->placeholder('@tài_khoản rồi nhấn Enter')
                            ->columnSpanFull(),
                        Forms\Components\Repeater::make('review_cards')
                            ->label('Card review / Instagram')
                            ->schema([
                                Forms\Components\FileUpload::make('image')->label('Ảnh')->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(5120)->disk('public')->directory('about/reviews')->imageEditor(),
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
