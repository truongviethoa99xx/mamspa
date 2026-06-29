<?php

namespace App\Filament\Pages;

use App\Filament\Concerns\RestrictsFilamentAccess;
use App\Filament\Forms\TranslatableField;
use App\Models\ContactPageContent;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Page;

class ContactPageSettings extends Page implements HasForms
{
    use InteractsWithForms;
    use RestrictsFilamentAccess;

    protected static ?string $navigationIcon = 'heroicon-o-envelope';

    protected static ?string $navigationGroup = 'Nội dung';

    protected static ?string $title = 'Nội dung trang Liên hệ';

    protected static ?string $navigationLabel = 'Trang Liên hệ';

    protected static string $view = 'filament.pages.contact-page-settings';

    public ?array $data = [];

    protected static function allowedRoles(): array
    {
        return User::contentRoles();
    }

    public function mount(): void
    {
        $this->form->fill(ContactPageContent::current()->only([
            'seo_description', 'heading', 'email', 'map_embed_url',
        ]));
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Nội dung chính')
                    ->schema([
                        TranslatableField::group('heading', label: 'Tiêu đề trang'),
                        TranslatableField::group('seo_description', as: 'textarea', label: 'SEO description', rows: 3),
                        Forms\Components\TextInput::make('email')->label('Email hiển thị')->email()->rules(['not_regex:/[\r\n]/']),
                        Forms\Components\TextInput::make('map_embed_url')->label('Google Maps embed URL')->url()->columnSpanFull(),
                    ])
                    ->columns(2),
            ])
            ->statePath('data');
    }

    public function save(): void
    {
        ContactPageContent::current()->update($this->form->getState());

        Notification::make()->success()->title('Đã lưu nội dung trang Liên hệ')->send();
    }
}
