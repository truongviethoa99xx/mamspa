<?php

namespace App\Filament\Pages;

use App\Filament\Concerns\RestrictsFilamentAccess;
use App\Models\SiteSetting;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Forms\Get;
use Filament\Notifications\Notification;
use Filament\Pages\Page;

class HeaderSettings extends Page implements HasForms
{
    use InteractsWithForms;
    use RestrictsFilamentAccess;

    protected static ?string $navigationIcon = 'heroicon-o-window';

    protected static ?string $navigationGroup = 'Nội dung';

    protected static ?string $title = 'Quản lý header';

    protected static ?string $navigationLabel = 'Quản lý header';

    protected static ?int $navigationSort = 0;

    protected static string $view = 'filament.pages.header-settings';

    public ?array $data = [];

    protected static function allowedRoles(): array
    {
        return User::contentRoles();
    }

    public function mount(): void
    {
        $this->form->fill(SiteSetting::current()->only([
            'logo_path', 'header_background_color', 'header_text_color', 'header_transparent',
        ]));
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Header')
                    ->description('Thanh header hiển thị trên cùng mọi trang công khai — full chiều rộng, cao cố định 100px.')
                    ->schema([
                        Forms\Components\FileUpload::make('logo_path')
                            ->label('Logo')
                            ->helperText('Ảnh vuông, nền trong suốt, tối thiểu 512×512px. Định dạng SVG hoặc PNG cho chất lượng tốt nhất.')
                            ->image()
                            ->acceptedFileTypes(['image/svg+xml', 'image/png', 'image/webp'])
                            ->maxSize(2048)
                            ->disk('public')
                            ->directory('branding')
                            ->columnSpanFull(),
                        Forms\Components\ColorPicker::make('header_background_color')
                            ->label('Màu nền header')
                            ->required()
                            ->disabled(fn (Get $get) => (bool) $get('header_transparent')),
                        Forms\Components\ColorPicker::make('header_text_color')
                            ->label('Màu chữ header')
                            ->required(),
                        Forms\Components\Toggle::make('header_transparent')
                            ->label('Nền trong suốt')
                            ->helperText('Bật để header trong suốt, nổi đè lên nội dung phía dưới (vd. banner đầu trang) thay vì chiếm khoảng riêng. Khi bật, màu nền ở trên sẽ bị vô hiệu hoá (không dùng).')
                            ->live()
                            ->columnSpanFull(),
                    ])
                    ->columns(2),
            ])
            ->statePath('data');
    }

    public function save(): void
    {
        SiteSetting::current()->update($this->form->getState());

        Notification::make()->success()->title('Đã lưu thiết lập header')->send();
    }
}
