<?php

namespace App\Filament\Resources;

use App\Filament\Concerns\RestrictsFilamentAccess;
use App\Filament\Forms\TranslatableField;
use App\Filament\Resources\ServiceResource\Pages;
use App\Models\Service;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ServiceResource extends Resource
{
    use RestrictsFilamentAccess;

    protected static ?string $model = Service::class;

    protected static ?string $navigationIcon = 'heroicon-o-sparkles';

    protected static ?string $navigationGroup = 'Nội dung';

    protected static ?string $navigationLabel = 'Dịch vụ';

    protected static ?string $modelLabel = 'Dịch vụ';

    protected static ?string $pluralModelLabel = 'Dịch vụ';

    protected static ?int $navigationSort = 2;

    protected static function allowedRoles(): array
    {
        return User::contentRoles();
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Cơ bản')->schema([
                Forms\Components\TextInput::make('slug')->label('Slug')->required()->unique(ignoreRecord: true),
                Forms\Components\Select::make('category')->label('Danh mục')->options([
                    'massage' => 'Body Massage',
                    'facial' => 'Facial / Da mặt',
                    'head-spa' => 'Head Spa',
                    'foot-spa' => 'Foot Spa',
                    'combo' => 'Combo',
                ])->required(),
                Forms\Components\TextInput::make('duration')->label('Thời lượng (phút)')->numeric()->required(),
                Forms\Components\TextInput::make('price')->label('Giá (VND)')->numeric()->required(),
                Forms\Components\Toggle::make('is_featured')->label('Nổi bật'),
                Forms\Components\Toggle::make('is_active')->label('Kích hoạt')->default(true),
            ])->columns(2),
            TranslatableField::group('name', label: 'Tên dịch vụ', required: true),
            TranslatableField::group('description', as: 'textarea', label: 'Mô tả', rows: 4),
            Forms\Components\TagsInput::make('ingredients')->label('Nguyên liệu'),
            Forms\Components\Select::make('branches')
                ->label('Chi nhánh')
                ->relationship('branches', 'slug')
                ->multiple()->preload(),
            Forms\Components\SpatieMediaLibraryFileUpload::make('images')
                ->label('Hình ảnh')
                ->multiple()
                ->image()
                ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                ->maxSize(5120),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('slug')->label('Slug')->searchable()->sortable(),
            Tables\Columns\TextColumn::make('name')->label('Tên dịch vụ')->searchable(),
            Tables\Columns\TextColumn::make('category')->label('Danh mục')->badge(),
            Tables\Columns\TextColumn::make('duration')->label('Thời lượng')->suffix(' phút'),
            Tables\Columns\TextColumn::make('price')->label('Giá')->money('VND'),
            Tables\Columns\IconColumn::make('is_featured')->label('Nổi bật')->boolean(),
            Tables\Columns\IconColumn::make('is_active')->label('Kích hoạt')->boolean(),
        ])->filters([
            Tables\Filters\SelectFilter::make('category')->label('Danh mục')->options([
                'massage' => 'Massage', 'facial' => 'Facial',
                'head-spa' => 'Head Spa', 'foot-spa' => 'Foot Spa', 'combo' => 'Combo',
            ]),
        ])->actions([
            Tables\Actions\EditAction::make(),
        ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListServices::route('/'),
            'create' => Pages\CreateService::route('/create'),
            'edit' => Pages\EditService::route('/{record}/edit'),
        ];
    }
}
