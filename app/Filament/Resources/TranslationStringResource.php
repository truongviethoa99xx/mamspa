<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TranslationStringResource\Pages;
use App\Models\TranslationString;
use App\Services\Translation\TranslationManager;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\Get;
use Filament\Forms\Set;
use Filament\Notifications\Notification;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class TranslationStringResource extends Resource
{
    protected static ?string $model = TranslationString::class;
    protected static ?string $navigationIcon = 'heroicon-o-language';
    protected static ?string $navigationGroup = 'System';
    protected static ?string $modelLabel = 'Translation';
    protected static ?string $pluralModelLabel = 'UI Translations';
    protected static ?int $navigationSort = 10;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Khoá dịch')->schema([
                Forms\Components\TextInput::make('group')->required()
                    ->placeholder('nav, home, footer, common, ...')
                    ->helperText('Nhóm key, ví dụ: nav.home → group=nav, key=home'),
                Forms\Components\TextInput::make('key')->required()
                    ->placeholder('vd: hero.title'),
                Forms\Components\Toggle::make('is_auto_translated')
                    ->label('Tự động dịch')
                    ->helperText('Sẽ TRUE nếu giá trị EN được auto-translate từ VI')
                    ->disabled(),
            ])->columns(3),

            Forms\Components\Section::make('Giá trị')->schema([
                Forms\Components\Textarea::make('values.vi')->label('VI')->rows(3)->required(),
                Forms\Components\Textarea::make('values.en')->label('EN')->rows(3),
                Forms\Components\Actions::make([
                    Forms\Components\Actions\Action::make('translate_en')
                        ->label('Dịch tự động VI → EN')
                        ->icon('heroicon-o-language')
                        ->color('warning')
                        ->action(function (Get $get, Set $set) {
                            $vi = $get('values.vi');
                            if (! $vi) {
                                Notification::make()->title('Cần nhập VI trước.')->danger()->send();
                                return;
                            }
                            $en = app(TranslationManager::class)->translate($vi, 'en', 'vi');
                            $set('values.en', $en);
                            $set('is_auto_translated', true);
                            Notification::make()->title('Đã dịch xong')->success()->send();
                        }),
                ]),
            ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('group')->sortable()->searchable(),
            Tables\Columns\TextColumn::make('key')->sortable()->searchable(),
            Tables\Columns\TextColumn::make('values.vi')->label('VI')->limit(50)->searchable(),
            Tables\Columns\TextColumn::make('values.en')->label('EN')->limit(50)->searchable(),
            Tables\Columns\IconColumn::make('is_auto_translated')->boolean()->label('Auto'),
            Tables\Columns\TextColumn::make('updated_at')->since(),
        ])
        ->defaultSort('group')
        ->filters([
            Tables\Filters\SelectFilter::make('group')
                ->options(fn () => TranslationString::query()->distinct()->pluck('group', 'group')->toArray()),
            Tables\Filters\TernaryFilter::make('is_auto_translated')->label('Đã auto-translate'),
        ])
        ->actions([Tables\Actions\EditAction::make()])
        ->bulkActions([
            Tables\Actions\BulkAction::make('autoTranslateMissingEn')
                ->label('Auto-translate EN còn trống')
                ->icon('heroicon-o-language')
                ->action(function ($records) {
                    $svc = app(TranslationManager::class);
                    $count = 0;
                    foreach ($records as $row) {
                        $vals = $row->values ?? [];
                        if (! empty($vals['vi']) && empty($vals['en'])) {
                            $vals['en'] = $svc->translate($vals['vi'], 'en', 'vi');
                            $row->update(['values' => $vals, 'is_auto_translated' => true]);
                            $count++;
                        }
                    }
                    Notification::make()->title("Đã dịch {$count} bản ghi.")->success()->send();
                }),
        ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListTranslationStrings::route('/'),
            'create' => Pages\CreateTranslationString::route('/create'),
            'edit' => Pages\EditTranslationString::route('/{record}/edit'),
        ];
    }
}
