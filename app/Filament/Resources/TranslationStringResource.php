<?php

namespace App\Filament\Resources;

use App\Filament\Concerns\RestrictsFilamentAccess;
use App\Filament\Resources\TranslationStringResource\Pages;
use App\Models\TranslationString;
use App\Models\User;
use App\Services\Translation\TranslationManager;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\Get;
use Filament\Forms\Set;
use Filament\Notifications\Notification;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Throwable;

class TranslationStringResource extends Resource
{
    use RestrictsFilamentAccess;

    protected static ?string $model = TranslationString::class;

    protected static ?string $navigationIcon = 'heroicon-o-language';

    protected static ?string $navigationGroup = 'Nội dung';

    protected static ?string $navigationLabel = 'Chuỗi giao diện';

    protected static ?string $modelLabel = 'Chuỗi dịch';

    protected static ?string $pluralModelLabel = 'Chuỗi giao diện';

    protected static ?int $navigationSort = 10;

    protected static function allowedRoles(): array
    {
        return User::contentRoles();
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Khoá dịch')->schema([
                Forms\Components\TextInput::make('group')->label('Nhóm')->required()
                    ->placeholder('nav, home, footer, common, ...')
                    ->helperText('Nhóm key, ví dụ: nav.home → group=nav, key=home'),
                Forms\Components\TextInput::make('key')->label('Khoá')->required()
                    ->placeholder('vd: hero.title'),
                Forms\Components\Toggle::make('is_auto_translated')
                    ->label('Tự động dịch')
                    ->helperText('Sẽ TRUE nếu một hoặc nhiều ngôn ngữ được auto-translate từ Tiếng Việt')
                    ->disabled(),
            ])->columns(3),

            Forms\Components\Section::make('Giá trị')
                ->description('Nếu ô Tiếng Việt đang là tiếng Anh, dùng các nút dịch từ Tiếng Anh. Nút "còn trống" không ghi đè ô đã có nội dung; nút "dịch lại" sẽ ghi đè.')
                ->schema([
                    ...collect(self::locales())->map(
                        fn (string $locale) => Forms\Components\Textarea::make("values.{$locale}")
                            ->label(self::localeLabel($locale))
                            ->rows(3)
                            ->required($locale === 'vi')
                    )->all(),
                    Forms\Components\Actions::make([
                        Forms\Components\Actions\Action::make('translate_all_missing')
                            ->label('Dịch Tiếng Việt sang các ngôn ngữ còn trống')
                            ->icon('heroicon-o-language')
                            ->color('warning')
                            ->action(fn (Get $get, Set $set) => self::translateFormValues($get, $set, 'vi', false)),
                        Forms\Components\Actions\Action::make('translate_all_from_vi_overwrite')
                            ->label('Dịch lại từ Tiếng Việt')
                            ->icon('heroicon-o-arrow-path')
                            ->color('danger')
                            ->requiresConfirmation()
                            ->modalHeading('Dịch lại từ Tiếng Việt?')
                            ->modalDescription('Các ô ngôn ngữ khác sẽ bị ghi đè bằng bản dịch mới từ Tiếng Việt.')
                            ->action(fn (Get $get, Set $set) => self::translateFormValues($get, $set, 'vi', true)),
                        Forms\Components\Actions\Action::make('translate_all_missing_from_en')
                            ->label('Dịch Tiếng Anh sang các ngôn ngữ còn trống')
                            ->icon('heroicon-o-language')
                            ->color('warning')
                            ->visible(fn (): bool => in_array('en', self::locales(), true))
                            ->action(fn (Get $get, Set $set) => self::translateFormValues($get, $set, 'en', false)),
                        Forms\Components\Actions\Action::make('translate_all_from_en_overwrite')
                            ->label('Dịch lại từ Tiếng Anh')
                            ->icon('heroicon-o-arrow-path')
                            ->color('danger')
                            ->visible(fn (): bool => in_array('en', self::locales(), true))
                            ->requiresConfirmation()
                            ->modalHeading('Dịch lại từ Tiếng Anh?')
                            ->modalDescription('Các ô ngôn ngữ khác, bao gồm Tiếng Việt, sẽ bị ghi đè bằng bản dịch mới từ Tiếng Anh.')
                            ->action(fn (Get $get, Set $set) => self::translateFormValues($get, $set, 'en', true)),
                    ])->columnSpanFull(),
                ])
                ->columns([
                    'default' => 1,
                    'lg' => 2,
                ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('group')->label('Nhóm')->sortable()->searchable(),
            Tables\Columns\TextColumn::make('key')->label('Khoá')->sortable()->searchable(),
            ...collect(self::locales())->map(
                fn (string $locale) => Tables\Columns\TextColumn::make("values.{$locale}")
                    ->label(self::localeLabel($locale))
                    ->limit(42)
                    ->placeholder('—')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: ! in_array($locale, ['vi', 'en'], true))
            )->all(),
            Tables\Columns\IconColumn::make('is_auto_translated')->boolean()->label('Tự động'),
            Tables\Columns\TextColumn::make('updated_at')->label('Cập nhật')->since(),
        ])
            ->defaultSort('group')
            ->filters([
                Tables\Filters\SelectFilter::make('group')
                    ->label('Nhóm')
                    ->options(fn () => TranslationString::query()->distinct()->pluck('group', 'group')->toArray()),
                Tables\Filters\TernaryFilter::make('is_auto_translated')->label('Đã dịch tự động'),
            ])
            ->actions([Tables\Actions\EditAction::make()])
            ->bulkActions([
                Tables\Actions\BulkAction::make('autoTranslateMissingLocales')
                    ->label('Dịch tự động ngôn ngữ còn trống')
                    ->icon('heroicon-o-language')
                    ->action(function ($records) {
                        $svc = app(TranslationManager::class);
                        $count = 0;
                        foreach ($records as $row) {
                            $vals = $row->values ?? [];
                            if (empty($vals['vi'])) {
                                continue;
                            }

                            $changed = false;
                            foreach (self::targetLocales() as $locale) {
                                if (! empty($vals[$locale])) {
                                    continue;
                                }

                                $vals[$locale] = $svc->translate($vals['vi'], $locale, 'vi');
                                $count++;
                                $changed = true;
                            }

                            if ($changed) {
                                $row->update(['values' => $vals, 'is_auto_translated' => true]);
                            }
                        }
                        Notification::make()->title("Đã dịch {$count} ô ngôn ngữ.")->success()->send();
                    }),
            ])
            ->defaultPaginationPageOption(50);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListTranslationStrings::route('/'),
            'create' => Pages\CreateTranslationString::route('/create'),
            'edit' => Pages\EditTranslationString::route('/{record}/edit'),
        ];
    }

    private static function locales(): array
    {
        $locales = collect(config('app.available_locales', ['vi', 'en']))
            ->map(fn (string $locale): string => trim($locale))
            ->filter()
            ->unique()
            ->values();

        return $locales->contains('vi')
            ? $locales->sortBy(fn (string $locale): int => $locale === 'vi' ? 0 : 1)->values()->all()
            : $locales->prepend('vi')->values()->all();
    }

    private static function targetLocales(): array
    {
        return array_values(array_filter(self::locales(), fn (string $locale): bool => $locale !== 'vi'));
    }

    private static function translateFormValues(Get $get, Set $set, string $sourceLocale, bool $overwrite): void
    {
        $source = $get("values.{$sourceLocale}");
        if (! $source) {
            Notification::make()
                ->title('Cần nhập '.self::localeLabel($sourceLocale).' trước.')
                ->danger()
                ->send();

            return;
        }

        $count = 0;
        foreach (self::locales() as $locale) {
            if ($locale === $sourceLocale) {
                continue;
            }

            if (! $overwrite && filled($get("values.{$locale}"))) {
                continue;
            }

            try {
                $translated = app(TranslationManager::class)->translate($source, $locale, $sourceLocale);
            } catch (Throwable $exception) {
                Notification::make()
                    ->title('Không dịch được')
                    ->body($exception->getMessage())
                    ->danger()
                    ->send();

                return;
            }

            $set("values.{$locale}", $translated);
            $count++;
        }

        if ($count > 0) {
            $set('is_auto_translated', true);
        }

        Notification::make()
            ->title($count > 0 ? "Đã dịch {$count} ô ngôn ngữ" : 'Không có ô ngôn ngữ nào cần dịch')
            ->success()
            ->send();
    }

    private static function localeLabel(string $locale): string
    {
        return [
            'vi' => 'Tiếng Việt',
            'en' => 'Tiếng Anh',
            'ja' => 'Tiếng Nhật',
            'ko' => 'Tiếng Hàn',
            'zh' => 'Tiếng Trung',
        ][$locale] ?? strtoupper($locale);
    }
}
