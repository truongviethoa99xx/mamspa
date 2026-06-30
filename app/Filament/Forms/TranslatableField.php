<?php

namespace App\Filament\Forms;

use App\Models\TranslationString;
use App\Services\Translation\TranslationManager;
use Filament\Forms;
use Filament\Forms\Get;
use Filament\Forms\Set;
use Filament\Notifications\Notification;
use Illuminate\Support\Str;
use Throwable;

/**
 * Helper: tạo nhanh các field đa ngôn ngữ có nút "Dịch tự động" từ Tiếng Việt.
 *
 *   ...TranslatableField::group('name', label: 'Tên dịch vụ')
 *   ...TranslatableField::group('description', as: 'textarea', rows: 4)
 */
class TranslatableField
{
    /**
     * @param  string  $field  tên field translatable, vd. 'name', 'description'
     * @param  string  $as  'text' | 'textarea' | 'rich'
     * @param  string|null  $example  văn bản ví dụ hiển thị trong placeholder (vd. "Khám phá chi tiết")
     */
    public static function group(string $field, string $as = 'text', ?string $label = null, int $rows = 3, bool $required = false, ?string $example = null): Forms\Components\Tabs
    {
        $locales = self::availableLocales();
        $fieldLabel = $label ?? ucfirst($field);
        $makeInput = function (string $lang) use ($field, $as, $rows, $required, $fieldLabel, $example) {
            $name = "{$field}.{$lang}";
            $placeholder = $example !== null
                ? "VD: {$example}"
                : "{$fieldLabel} (".self::localeLabel($lang).')';
            $input = match ($as) {
                'textarea' => Forms\Components\Textarea::make($name)->rows($rows),
                'rich' => Forms\Components\RichEditor::make($name),
                default => Forms\Components\TextInput::make($name),
            };
            if ($required && $lang === 'vi') {
                $input = $input->required();
            }

            $input = $input->label($fieldLabel);

            if ($as !== 'rich') {
                $input = $input->placeholder($placeholder);
            }

            return $input;
        };

        return Forms\Components\Tabs::make($field)
            ->label($label ?? ucfirst($field))
            ->columnSpanFull()
            ->tabs(collect($locales)
                ->map(function (string $locale) use ($field, $makeInput, $locales) {
                    $schema = [$makeInput($locale)];

                    if ($locale === 'vi' && count($locales) > 1) {
                        $schema[] = Forms\Components\Actions::make([
                            Forms\Components\Actions\Action::make('translate_all_'.md5($field))
                                ->label('Dịch Tiếng Việt sang tất cả ngôn ngữ')
                                ->icon('heroicon-o-language')
                                ->color('warning')
                                ->action(function (Get $get, Set $set) use ($field, $locales) {
                                    $source = $get("{$field}.vi");
                                    if (! $source) {
                                        Notification::make()->title('Hãy nhập nội dung Tiếng Việt trước.')->danger()->send();

                                        return;
                                    }

                                    $translationKey = null;
                                    foreach ($locales as $target) {
                                        if ($target === 'vi') {
                                            continue;
                                        }

                                        try {
                                            $translated = app(TranslationManager::class)->translate($source, $target, 'vi');
                                        } catch (Throwable $exception) {
                                            Notification::make()
                                                ->title('Không dịch được')
                                                ->body($exception->getMessage())
                                                ->danger()
                                                ->send();

                                            return;
                                        }

                                        $set("{$field}.{$target}", $translated);
                                        $translationKey = self::rememberAutoTranslation($field, $source, $translated, $target);
                                    }

                                    Notification::make()
                                        ->title('Đã dịch xong tất cả ngôn ngữ')
                                        ->body($translationKey ? "Đã lưu vào UI Translations: {$translationKey}" : null)
                                        ->success()
                                        ->send();
                                }),
                        ]);
                    }

                    if ($locale !== 'vi') {
                        $schema[] = Forms\Components\Actions::make([
                            Forms\Components\Actions\Action::make('translate_'.md5($field.'_'.$locale))
                                ->label('Dịch tự động từ Tiếng Việt → '.self::localeLabel($locale))
                                ->icon('heroicon-o-language')
                                ->color('warning')
                                ->action(function (Get $get, Set $set) use ($field, $locale) {
                                    $source = $get("{$field}.vi");
                                    if (! $source) {
                                        Notification::make()->title('Hãy nhập nội dung Tiếng Việt trước.')->danger()->send();

                                        return;
                                    }

                                    try {
                                        $translated = app(TranslationManager::class)->translate($source, $locale, 'vi');
                                    } catch (Throwable $exception) {
                                        Notification::make()
                                            ->title('Không dịch được')
                                            ->body($exception->getMessage())
                                            ->danger()
                                            ->send();

                                        return;
                                    }

                                    $set("{$field}.{$locale}", $translated);
                                    $translationKey = self::rememberAutoTranslation($field, $source, $translated, $locale);

                                    Notification::make()
                                        ->title('Đã dịch xong')
                                        ->body("Đã lưu vào UI Translations: {$translationKey}")
                                        ->success()
                                        ->send();
                                }),
                        ]);
                    }

                    return Forms\Components\Tabs\Tab::make(self::localeLabel($locale))->schema($schema);
                })
                ->all());
    }

    public static function rememberAutoTranslation(string $field, string $source, string $translated, string $target = 'en'): string
    {
        $parts = collect(explode('.', $field))
            ->map(fn (string $part): string => Str::slug($part, '_'))
            ->filter()
            ->values();

        $groupSuffix = $parts->count() > 1
            ? $parts->slice(0, -1)->implode('.')
            : 'fields';
        $group = Str::limit('cms_auto.'.$groupSuffix, 64, '');

        $fieldName = $parts->last() ?: 'content';
        $key = Str::limit($fieldName.'_'.substr(sha1($source), 0, 12), 191, '');

        $row = TranslationString::firstOrNew(['group' => $group, 'key' => $key]);
        $values = $row->values ?? [];
        $values['vi'] = $source;
        $values[$target] = $translated;
        $row->fill([
            'values' => $values,
            'is_auto_translated' => true,
        ])->save();

        return "{$group}.{$key}";
    }

    private static function availableLocales(): array
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
