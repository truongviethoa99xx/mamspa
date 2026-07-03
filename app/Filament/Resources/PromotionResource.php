<?php

namespace App\Filament\Resources;

use App\Filament\Concerns\RestrictsFilamentAccess;
use App\Filament\Forms\TranslatableField;
use App\Filament\Resources\PromotionResource\Pages;
use App\Models\Promotion;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class PromotionResource extends Resource
{
    use RestrictsFilamentAccess;

    protected static ?string $model = Promotion::class;

    protected static ?string $navigationIcon = 'heroicon-o-megaphone';

    protected static ?string $navigationGroup = 'Nội dung';

    protected static ?string $navigationLabel = 'Khuyến mãi';

    protected static ?string $modelLabel = 'Khuyến mãi';

    protected static ?string $pluralModelLabel = 'Khuyến mãi';

    protected static ?int $navigationSort = 9;

    protected static function allowedRoles(): array
    {
        return User::contentRoles();
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('slug')->label('Slug')->required()->unique(ignoreRecord: true),
            TranslatableField::group('title', label: 'Tiêu đề', required: true),
            TranslatableField::group('description', as: 'textarea', label: 'Mô tả'),
            Forms\Components\FileUpload::make('image')
                ->label('Hình ảnh')
                ->helperText('Ảnh ngang, tỉ lệ 3:2, khuyến nghị tối thiểu 1200×800px.')
                ->image()
                ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                ->maxSize(5120),
            Forms\Components\TextInput::make('link')->label('Đường dẫn')->url(),
            Forms\Components\DateTimePicker::make('starts_at')->label('Bắt đầu'),
            Forms\Components\DateTimePicker::make('ends_at')->label('Kết thúc'),
            Forms\Components\Toggle::make('is_active')->label('Kích hoạt')->default(true),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('slug')->label('Slug')->searchable(),
            Tables\Columns\TextColumn::make('title')->label('Tiêu đề'),
            Tables\Columns\TextColumn::make('ends_at')->label('Kết thúc')->dateTime(),
            Tables\Columns\IconColumn::make('is_active')->label('Kích hoạt')->boolean(),
        ])->actions([Tables\Actions\EditAction::make()]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPromotions::route('/'),
            'create' => Pages\CreatePromotion::route('/create'),
            'edit' => Pages\EditPromotion::route('/{record}/edit'),
        ];
    }
}
