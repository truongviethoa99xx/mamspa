<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BlogPostResource\Pages;
use App\Models\BlogPost;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class BlogPostResource extends Resource
{
    protected static ?string $model = BlogPost::class;
    protected static ?string $navigationIcon = 'heroicon-o-newspaper';
    protected static ?string $navigationGroup = 'Content';
    protected static ?string $modelLabel = 'Blog post';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('slug')->required()->unique(ignoreRecord: true),
            Forms\Components\FileUpload::make('cover_image')->image(),
            Forms\Components\Toggle::make('is_published'),
            Forms\Components\DateTimePicker::make('published_at'),
            Forms\Components\Tabs::make('content')->tabs([
                Forms\Components\Tabs\Tab::make('VI')->schema([
                    Forms\Components\TextInput::make('title.vi')->required(),
                    Forms\Components\Textarea::make('excerpt.vi')->rows(3),
                    Forms\Components\RichEditor::make('body.vi')->required(),
                ]),
                Forms\Components\Tabs\Tab::make('EN')->schema([
                    Forms\Components\TextInput::make('title.en'),
                    Forms\Components\Textarea::make('excerpt.en')->rows(3),
                    Forms\Components\RichEditor::make('body.en'),
                ]),
            ]),
            Forms\Components\KeyValue::make('seo_meta')->keyLabel('Meta key')->valueLabel('Value'),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('slug')->searchable(),
            Tables\Columns\TextColumn::make('title'),
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
