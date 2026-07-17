<?php

namespace App\Filament\Pages;

use App\Filament\Concerns\RestrictsFilamentAccess;
use App\Filament\Forms\TranslatableField;
use App\Models\BlogPageContent;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Page;

class BlogPageSettings extends Page implements HasForms
{
    use InteractsWithForms;
    use RestrictsFilamentAccess;

    protected static ?string $navigationIcon = 'heroicon-o-newspaper';

    protected static ?string $navigationGroup = 'Nội dung';

    protected static ?string $title = 'Nội dung trang Blog';

    protected static ?string $navigationLabel = 'Trang Blog';

    protected static ?int $navigationSort = 7;

    protected static string $view = 'filament.pages.blog-page-settings';

    public ?array $data = [];

    protected static function allowedRoles(): array
    {
        return User::contentRoles();
    }

    public function mount(): void
    {
        $this->form->fill(BlogPageContent::current()->only([
            'hero_title', 'hero_subtitle', 'hero_image', 'hero_image_alt', 'hero_visible',
        ]));
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Phần đầu trang (Hero)')
                    ->description('Banner đầu trang Blog — tiêu đề lớn "Blog", tiêu đề phụ và ảnh minh hoạ bên phải.')
                    ->icon('heroicon-o-photo')
                    ->schema([
                        Forms\Components\Toggle::make('hero_visible')
                            ->label('Hiển thị khối này trên trang Blog')
                            ->helperText('Tắt sẽ ẩn toàn bộ banner đầu trang khỏi trang công khai.')
                            ->default(true)
                            ->columnSpanFull(),
                        TranslatableField::group('hero_title', label: 'Tiêu đề lớn', example: 'Blog'),
                        TranslatableField::group(
                            'hero_subtitle',
                            as: 'quill',
                            label: 'Tiêu đề phụ',
                            example: 'Chia sẻ kiến thức trị liệu truyền thống, lối sống an lành và những cảm hứng chăm sóc bản thân mỗi ngày.',
                        ),
                        Forms\Components\FileUpload::make('hero_image')
                            ->label('Ảnh minh hoạ')
                            ->helperText('Ảnh dọc/vuông, chủ thể căn giữa khung hình, khuyến nghị tối thiểu 1200×1200px.')
                            ->image()
                            ->imageEditor()
                            ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                            ->maxSize(5120)
                            ->disk('public')
                            ->directory('blog'),
                        TranslatableField::group(
                            'hero_image_alt',
                            label: 'Alt text ảnh (mô tả ảnh cho SEO/accessibility)',
                            example: 'Không gian trị liệu tại Mầm Spa',
                        ),
                    ]),
            ])
            ->statePath('data');
    }

    public function save(): void
    {
        BlogPageContent::current()->update($this->form->getState());

        Notification::make()->success()->title('Đã lưu nội dung trang Blog')->send();
    }
}
