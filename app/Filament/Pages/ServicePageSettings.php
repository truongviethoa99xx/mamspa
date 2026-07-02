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
            'happy_hours_title', 'happy_hours_desc', 'benefits', 'ideal_for', 'faqs',
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

                Forms\Components\Section::make('2 · Lợi ích liệu trình')
                    ->description('Thẻ trắng bên trái khối "Lợi ích & đối tượng phù hợp". Mỗi dòng một lợi ích.')
                    ->icon('heroicon-o-check-badge')
                    ->schema([
                        Forms\Components\TagsInput::make('benefits')
                            ->label('Danh sách lợi ích')
                            ->placeholder('Nhập một lợi ích rồi nhấn Enter')
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('3 · Đối tượng phù hợp')
                    ->description('Thẻ nền đậm bên phải — "Đặc biệt khuyên dùng cho". Mỗi dòng một nhóm.')
                    ->icon('heroicon-o-user-group')
                    ->schema([
                        Forms\Components\TagsInput::make('ideal_for')
                            ->label('Đặc biệt khuyên dùng cho')
                            ->placeholder('Nhập một đối tượng rồi nhấn Enter')
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('4 · Câu hỏi thường gặp (FAQ)')
                    ->description('Khối accordion gần cuối trang chi tiết.')
                    ->icon('heroicon-o-question-mark-circle')
                    ->schema([
                        Forms\Components\Repeater::make('faqs')
                            ->label('')
                            ->schema([
                                Forms\Components\TextInput::make('question')->label('Câu hỏi')->required(),
                                Forms\Components\Textarea::make('answer')->label('Trả lời')->rows(3)->required(),
                            ])
                            ->defaultItems(0)
                            ->reorderable()
                            ->collapsible()
                            ->itemLabel(fn (array $state): ?string => $state['question'] ?? null)
                            ->addActionLabel('+ Thêm câu hỏi')
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('5 · Trang danh sách dịch vụ - Danh mục')
                    ->description('Các nhãn hiển thị ở phần đầu trang và ô tìm kiếm của /dich-vu.')
                    ->icon('heroicon-o-list-bullet')
                    ->schema([
                        Forms\Components\TagsInput::make('listing_categories')
                            ->label('Danh mục hiển thị')
                            ->placeholder('Nhập danh mục rồi nhấn Enter')
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('6 · Trang danh sách dịch vụ - Massage')
                    ->schema([
                        Forms\Components\TextInput::make('massage_eyebrow')->label('Dòng giới thiệu'),
                        Forms\Components\Repeater::make('massage_cards')
                            ->label('Card massage')
                            ->schema([
                                Forms\Components\FileUpload::make('image')->label('Ảnh')->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(5120)->disk('public')->directory('services/listing')->imageEditor(),
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

                Forms\Components\Section::make('7 · Trang danh sách dịch vụ - Head Spa')
                    ->schema([
                        Forms\Components\TextInput::make('head_spa_eyebrow')->label('Dòng giới thiệu'),
                        Forms\Components\TextInput::make('head_spa_title')->label('Tiêu đề'),
                        Forms\Components\Repeater::make('head_spa_cards')
                            ->label('Nhóm dịch vụ')
                            ->schema([
                                Forms\Components\FileUpload::make('image')->label('Ảnh')->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(5120)->disk('public')->directory('services/listing')->imageEditor(),
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

                Forms\Components\Section::make('8 · Trang danh sách dịch vụ - Dịch vụ khác')
                    ->schema([
                        Forms\Components\TextInput::make('other_care_eyebrow')->label('Dòng giới thiệu'),
                        Forms\Components\TextInput::make('other_care_title')->label('Tiêu đề'),
                        Forms\Components\Repeater::make('other_care_items')
                            ->label('Danh sách dịch vụ khác')
                            ->schema([
                                Forms\Components\FileUpload::make('image')->label('Ảnh')->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->maxSize(5120)->disk('public')->directory('services/listing')->imageEditor(),
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
