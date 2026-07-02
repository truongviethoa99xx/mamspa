<?php

namespace App\Filament\Resources;

use App\Filament\Concerns\RestrictsFilamentAccess;
use App\Filament\Forms\TranslatableField;
use App\Filament\Resources\PolicyPageResource\Pages;
use App\Models\PolicyPage;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class PolicyPageResource extends Resource
{
    use RestrictsFilamentAccess;

    protected static ?string $model = PolicyPage::class;

    protected static ?string $navigationIcon = 'heroicon-o-shield-check';

    protected static ?string $navigationGroup = 'Nội dung';

    protected static ?string $navigationLabel = 'Trang chính sách';

    protected static ?string $modelLabel = 'Trang chính sách';

    protected static ?string $pluralModelLabel = 'Trang chính sách';

    protected static function allowedRoles(): array
    {
        return User::contentRoles();
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Grid::make(3)->schema([
                Forms\Components\Group::make([
                    Forms\Components\Section::make('Nội dung trang')
                        ->description('Tên trang và nội dung chi tiết, hỗ trợ đa ngôn ngữ.')
                        ->schema([
                            TranslatableField::group('name', label: 'Tên trang', required: true, example: 'Chính sách bảo mật'),
                            TranslatableField::group('content', as: 'quill', label: 'Nội dung'),
                        ]),
                ])->columnSpan(2),

                Forms\Components\Group::make([
                    Forms\Components\Section::make('Xuất bản')
                        ->schema([
                            Forms\Components\TextInput::make('slug')
                                ->label('Slug')
                                ->required()
                                ->unique(ignoreRecord: true)
                                ->helperText('Dùng trong đường dẫn, vd: chinh-sach-bao-mat'),
                            Forms\Components\Toggle::make('is_published')
                                ->label('Hiển thị trên website')
                                ->default(true),
                        ]),
                    Forms\Components\Section::make('Hình ảnh đại diện')
                        ->description('Hiển thị ở đầu trang nếu có.')
                        ->schema([
                            Forms\Components\FileUpload::make('featured_image')
                                ->hiddenLabel()
                                ->image()
                                ->imageEditor()
                                ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                                ->maxSize(5120),
                        ]),
                ])->columnSpan(1),
            ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\ImageColumn::make('featured_image')->label('Ảnh')->square(),
            Tables\Columns\TextColumn::make('name')->label('Tên trang')->weight('medium'),
            Tables\Columns\TextColumn::make('slug')->label('Slug')->searchable()->color('gray'),
            Tables\Columns\IconColumn::make('is_published')->label('Hiển thị')->boolean(),
            Tables\Columns\TextColumn::make('updated_at')->label('Cập nhật lúc')->dateTime()->color('gray'),
        ])->actions([Tables\Actions\EditAction::make()]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPolicyPages::route('/'),
            'create' => Pages\CreatePolicyPage::route('/create'),
            'edit' => Pages\EditPolicyPage::route('/{record}/edit'),
        ];
    }
}
