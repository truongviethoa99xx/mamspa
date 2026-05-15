<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PageResource\Pages;
use App\Models\Page;
use Filament\Forms;
use Filament\Forms\Components\Builder;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class PageResource extends Resource
{
    protected static ?string $model = Page::class;
    protected static ?string $navigationIcon = 'heroicon-o-document-text';
    protected static ?string $navigationGroup = 'CMS';
    protected static ?int $navigationSort = 1;
    protected static ?string $modelLabel = 'Page';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Meta')->schema([
                Forms\Components\TextInput::make('slug')->required()->unique(ignoreRecord: true),
                Forms\Components\Tabs::make('title')->tabs([
                    Forms\Components\Tabs\Tab::make('VI')->schema([
                        Forms\Components\TextInput::make('title.vi')->label('Tiêu đề (VI)')->required(),
                    ]),
                    Forms\Components\Tabs\Tab::make('EN')->schema([
                        Forms\Components\TextInput::make('title.en')->label('Title (EN)'),
                    ]),
                ]),
                Forms\Components\Toggle::make('is_published'),
                Forms\Components\KeyValue::make('seo_meta')
                    ->keyLabel('Meta key')
                    ->valueLabel('Meta value'),
            ])->columns(2),
            Forms\Components\Section::make('Content blocks')
                ->description('Sắp xếp lại, thêm/xoá block để dựng nội dung trang (kiểu WordPress).')
                ->schema([
                    Forms\Components\Repeater::make('blocks')
                        ->relationship('blocks')
                        ->schema(self::blockSchema())
                        ->collapsible()
                        ->cloneable()
                        ->reorderable()
                        ->orderColumn('order')
                        ->itemLabel(fn (array $state): ?string => $state['type'] ?? null)
                        ->addActionLabel('+ Thêm block'),
                ]),
        ]);
    }

    protected static function blockSchema(): array
    {
        return [
            Forms\Components\Select::make('type')->options([
                'hero' => 'Hero banner',
                'service_list' => 'Service list',
                'gallery' => 'Gallery',
                'testimonial' => 'Testimonial',
                'cta' => 'Call to action',
                'text' => 'Rich text',
                'branches' => 'Branches grid',
                'promo_banner' => 'Promo banner',
            ])->required()->live(),
            Forms\Components\Toggle::make('is_active')->default(true),

            // Hero
            Forms\Components\Group::make([
                Forms\Components\TextInput::make('data.title.vi')->label('Title (VI)'),
                Forms\Components\TextInput::make('data.title.en')->label('Title (EN)'),
                Forms\Components\TextInput::make('data.subtitle.vi')->label('Subtitle (VI)'),
                Forms\Components\TextInput::make('data.subtitle.en')->label('Subtitle (EN)'),
                Forms\Components\FileUpload::make('data.image')->image()->disk('public')->directory('blocks'),
                Forms\Components\TextInput::make('data.cta_text'),
                Forms\Components\TextInput::make('data.cta_link'),
            ])->visible(fn ($get) => $get('type') === 'hero')->columns(2),

            // Service list
            Forms\Components\Group::make([
                Forms\Components\TextInput::make('data.title.vi')->label('Title (VI)'),
                Forms\Components\TextInput::make('data.title.en')->label('Title (EN)'),
                Forms\Components\Select::make('data.service_ids')
                    ->multiple()
                    ->relationship('page', 'id') // placeholder
                    ->options(\App\Models\Service::active()->pluck('slug', 'id'))
                    ->preload(),
                Forms\Components\TextInput::make('data.columns')->numeric()->default(3),
            ])->visible(fn ($get) => $get('type') === 'service_list')->columns(2),

            // Gallery
            Forms\Components\Group::make([
                Forms\Components\TextInput::make('data.title.vi')->label('Title (VI)'),
                Forms\Components\FileUpload::make('data.images')->multiple()->image()->reorderable(),
            ])->visible(fn ($get) => $get('type') === 'gallery'),

            // CTA
            Forms\Components\Group::make([
                Forms\Components\TextInput::make('data.title.vi')->label('Title (VI)'),
                Forms\Components\TextInput::make('data.title.en')->label('Title (EN)'),
                Forms\Components\Textarea::make('data.description.vi'),
                Forms\Components\TextInput::make('data.button_text'),
                Forms\Components\TextInput::make('data.button_link'),
            ])->visible(fn ($get) => $get('type') === 'cta')->columns(2),

            // Text
            Forms\Components\Group::make([
                Forms\Components\RichEditor::make('data.body.vi')->label('Body (VI)'),
                Forms\Components\RichEditor::make('data.body.en')->label('Body (EN)'),
            ])->visible(fn ($get) => $get('type') === 'text'),

            // Promo banner
            Forms\Components\Group::make([
                Forms\Components\FileUpload::make('data.image')->image(),
                Forms\Components\TextInput::make('data.link'),
                Forms\Components\DateTimePicker::make('data.expires_at'),
            ])->visible(fn ($get) => $get('type') === 'promo_banner')->columns(2),

            // Testimonial
            Forms\Components\Group::make([
                Forms\Components\Repeater::make('data.items')->schema([
                    Forms\Components\TextInput::make('name'),
                    Forms\Components\TextInput::make('avatar'),
                    Forms\Components\Textarea::make('content'),
                    Forms\Components\TextInput::make('rating')->numeric()->minValue(1)->maxValue(5),
                ]),
            ])->visible(fn ($get) => $get('type') === 'testimonial'),
        ];
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('slug')->searchable(),
            Tables\Columns\TextColumn::make('title'),
            Tables\Columns\TextColumn::make('blocks_count')->counts('blocks')->label('Blocks'),
            Tables\Columns\IconColumn::make('is_published')->boolean(),
            Tables\Columns\TextColumn::make('updated_at')->dateTime()->since(),
        ])->actions([
            Tables\Actions\EditAction::make(),
        ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPages::route('/'),
            'create' => Pages\CreatePage::route('/create'),
            'edit' => Pages\EditPage::route('/{record}/edit'),
        ];
    }
}
