<?php

namespace App\Filament\Resources;

use App\Filament\Concerns\RestrictsFilamentAccess;
use App\Filament\Forms\TranslatableField;
use App\Filament\Resources\BlogPostResource\Pages;
use App\Models\BlogPost;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Auth;

class BlogPostResource extends Resource
{
    use RestrictsFilamentAccess;

    protected static ?string $model = BlogPost::class;

    protected static ?string $navigationIcon = 'heroicon-o-newspaper';

    protected static ?string $navigationGroup = 'Content';

    protected static ?string $modelLabel = 'Blog post';

    protected static function allowedRoles(): array
    {
        return User::contentRoles();
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('slug')->required()->unique(ignoreRecord: true),
            Forms\Components\Select::make('category')
                ->label('Chuyên mục')
                ->options([
                    'Kiến thức' => 'Kiến thức',
                    'Trị liệu Body' => 'Trị liệu Body',
                    'Head Spa' => 'Head Spa',
                    'Tin tức' => 'Tin tức',
                    'Khuyến mãi' => 'Khuyến mãi',
                ])
                ->searchable()
                ->placeholder('Chọn chuyên mục'),
            Forms\Components\FileUpload::make('cover_image')
                ->image()
                ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                ->maxSize(5120),
            Forms\Components\Toggle::make('is_published'),
            Forms\Components\DateTimePicker::make('published_at'),
            Forms\Components\Select::make('author_id')
                ->label('Tác giả')
                ->relationship('author', 'name')
                ->searchable()
                ->preload()
                ->default(fn () => Auth::id()),
            TranslatableField::group('title', label: 'Tiêu đề', required: true),
            TranslatableField::group('excerpt', as: 'textarea', label: 'Mô tả ngắn', rows: 3),
            TranslatableField::group('body', as: 'rich', label: 'Nội dung'),
            Forms\Components\KeyValue::make('seo_meta')->keyLabel('Meta key')->valueLabel('Value'),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('slug')->searchable(),
            Tables\Columns\TextColumn::make('title'),
            Tables\Columns\TextColumn::make('category')->label('Chuyên mục')->badge()->placeholder('—'),
            Tables\Columns\TextColumn::make('author.name')->label('Tác giả')->placeholder('—'),
            Tables\Columns\IconColumn::make('is_published')->boolean(),
            Tables\Columns\TextColumn::make('published_at')->dateTime(),
        ])->actions([Tables\Actions\EditAction::make()]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListBlogPosts::route('/'),
            'create' => Pages\CreateBlogPost::route('/create'),
            'edit' => Pages\EditBlogPost::route('/{record}/edit'),
        ];
    }
}
