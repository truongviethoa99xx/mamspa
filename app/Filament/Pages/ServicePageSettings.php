<?php

namespace App\Filament\Pages;

use App\Filament\Concerns\RestrictsFilamentAccess;
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

    protected static ?string $title = 'Nội dung trang chi tiết dịch vụ';

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
            'happy_hours_title', 'happy_hours_desc',
            'listing_categories', 'massage_cards', 'head_spa_cards', 'other_care_items',
            'massage_eyebrow', 'head_spa_eyebrow', 'head_spa_title',
            'other_care_eyebrow', 'other_care_title',
        ]));
    }

    public function form(Form $form): Form
    {
        // Nội dung dùng chung cho MỌI trang chi tiết dịch vụ (/dich-vu/{slug}).
        // Các khối xếp đúng thứ tự xuất hiện trên trang chi tiết.
        return $form
            ->schema([
                Forms\Components\Section::make('1 · Banner Happy Hours')
                    ->description('Dải ưu đãi nền đậm, ngay dưới phần đầu trang chi tiết.')
                    ->icon('heroicon-o-sparkles')
                    ->schema([
                        Forms\Components\TextInput::make('happy_hours_title')->label('Tiêu đề')
                            ->placeholder('Happy Hours - Ưu đãi đặc quyền'),
                        Forms\Components\Textarea::make('happy_hours_desc')->label('Mô tả')->rows(2)
                            ->placeholder('Giảm ngay …% cho lịch hẹn hoàn tất trước 19:00.'),
                    ]),

                Forms\Components\Section::make('2 · Trang danh sách dịch vụ - Danh mục')
                    ->description('Các nhãn hiển thị ở phần đầu trang và ô tìm kiếm của /dich-vu.')
                    ->icon('heroicon-o-list-bullet')
                    ->schema([
                        Forms\Components\TagsInput::make('listing_categories')
                            ->label('Danh mục hiển thị')
                            ->placeholder('Nhập danh mục rồi nhấn Enter')
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('3 · Trang danh sách dịch vụ - Massage')
                    ->schema([
                        Forms\Components\TextInput::make('massage_eyebrow')->label('Dòng giới thiệu'),
                        Forms\Components\Repeater::make('massage_cards')
                            ->label('Card massage')
                            ->schema([
                                Forms\Components\FileUpload::make('image')->label('Ảnh')
                                    ->helperText('Ảnh vuông (1:1), khuyến nghị tối thiểu 600×600px.')
                                    ->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(5120)->disk('public')->directory('services/listing')->imageEditor(),
                                Forms\Components\TextInput::make('title')->label('Tiêu đề')->required(),
                                Forms\Components\Textarea::make('description')->label('Mô tả')->rows(3),
                            ])
                            ->columns(2)
                            ->defaultItems(0)
                            ->reorderable()
                            ->collapsible()
                            ->itemLabel(fn (array $state): ?string => $state['title'] ?? null)
                            ->addActionLabel('+ Thêm card massage')
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('4 · Trang danh sách dịch vụ - Head Spa')
                    ->schema([
                        Forms\Components\TextInput::make('head_spa_eyebrow')->label('Dòng giới thiệu'),
                        Forms\Components\TextInput::make('head_spa_title')->label('Tiêu đề'),
                        Forms\Components\Repeater::make('head_spa_cards')
                            ->label('Nhóm dịch vụ')
                            ->schema([
                                Forms\Components\FileUpload::make('image')->label('Ảnh')
                                    ->helperText('Ảnh ngang, tỉ lệ ~5:2, khuyến nghị tối thiểu 1200×480px.')
                                    ->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(5120)->disk('public')->directory('services/listing')->imageEditor(),
                                Forms\Components\TextInput::make('title')->label('Tiêu đề nhóm')->required(),
                                Forms\Components\Repeater::make('services')
                                    ->label('Dịch vụ trong nhóm')
                                    ->schema([
                                        Forms\Components\TextInput::make('name')->label('Tên')->required(),
                                        Forms\Components\TextInput::make('duration')->label('Thời lượng'),
                                        Forms\Components\Textarea::make('description')->label('Mô tả')->rows(2),
                                    ])
                                    ->defaultItems(0)
                                    ->reorderable()
                                    ->collapsible()
                                    ->itemLabel(fn (array $state): ?string => $state['name'] ?? null)
                                    ->addActionLabel('+ Thêm dịch vụ')
                                    ->columnSpanFull(),
                            ])
                            ->columns(2)
                            ->defaultItems(0)
                            ->reorderable()
                            ->collapsible()
                            ->itemLabel(fn (array $state): ?string => $state['title'] ?? null)
                            ->addActionLabel('+ Thêm nhóm')
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('5 · Trang danh sách dịch vụ - Dịch vụ khác')
                    ->schema([
                        Forms\Components\TextInput::make('other_care_eyebrow')->label('Dòng giới thiệu'),
                        Forms\Components\TextInput::make('other_care_title')->label('Tiêu đề'),
                        Forms\Components\Repeater::make('other_care_items')
                            ->label('Danh sách dịch vụ khác')
                            ->schema([
                                Forms\Components\FileUpload::make('image')->label('Ảnh')
                                    ->helperText('Ảnh ngang, tỉ lệ 4:3, khuyến nghị tối thiểu 1000×750px.')
                                    ->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(5120)->disk('public')->directory('services/listing')->imageEditor(),
                                Forms\Components\TextInput::make('title')->label('Tiêu đề')->required(),
                                Forms\Components\TextInput::make('eyebrow')->label('Dòng phụ'),
                                Forms\Components\TagsInput::make('paragraphs')
                                    ->label('Các đoạn mô tả')
                                    ->placeholder('Nhập một đoạn rồi nhấn Enter')
                                    ->columnSpanFull(),
                            ])
                            ->columns(2)
                            ->defaultItems(0)
                            ->reorderable()
                            ->collapsible()
                            ->itemLabel(fn (array $state): ?string => $state['title'] ?? null)
                            ->addActionLabel('+ Thêm dịch vụ khác')
                            ->columnSpanFull(),
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
