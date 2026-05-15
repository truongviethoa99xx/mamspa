<?php

namespace App\Filament\Forms;

use App\Services\Translation\TranslationManager;
use Filament\Forms;
use Filament\Forms\Get;
use Filament\Forms\Set;
use Filament\Notifications\Notification;

/**
 * Helper: tạo nhanh các cặp field VI/EN có nút "Dịch tự động" sang EN.
 *
 *   ...TranslatableField::group('name', label: 'Tên dịch vụ')
 *   ...TranslatableField::group('description', as: 'textarea', rows: 4)
 */
class TranslatableField
{
    /**
     * @param  string  $field  tên field translatable, vd. 'name', 'description'
     * @param  string  $as     'text' | 'textarea' | 'rich'
     */
    public static function group(string $field, string $as = 'text', string $label = null, int $rows = 3, bool $required = false): Forms\Components\Tabs
    {
        $makeInput = function (string $lang) use ($field, $as, $rows, $required) {
            $name = "{$field}.{$lang}";
            $input = match ($as) {
                'textarea' => Forms\Components\Textarea::make($name)->rows($rows),
                'rich' => Forms\Components\RichEditor::make($name),
                default => Forms\Components\TextInput::make($name),
            };
            if ($required && $lang === 'vi') {
                $input = $input->required();
            }
            return $input->label(strtoupper($lang));
        };

        return Forms\Components\Tabs::make($field)
            ->label($label ?? ucfirst($field))
            ->tabs([
                Forms\Components\Tabs\Tab::make('VI')->schema([
                    $makeInput('vi'),
                ]),
                Forms\Components\Tabs\Tab::make('EN')->schema([
                    $makeInput('en'),
                    Forms\Components\Actions::make([
                        Forms\Components\Actions\Action::make("translate_{$field}_en")
                            ->label('Dịch tự động từ VI →')
                            ->icon('heroicon-o-language')
                            ->color('warning')
                            ->action(function (Get $get, Set $set) use ($field) {
                                $source = $get("{$field}.vi");
                                if (! $source) {
                                    Notification::make()->title('Hãy nhập nội dung VI trước.')->danger()->send();
                                    return;
                                }
                                $translated = app(TranslationManager::class)->translate($source, 'en', 'vi');
                                $set("{$field}.en", $translated);
                                Notification::make()->title('Đã dịch xong')->success()->send();
                            }),
                    ]),
                ]),
            ]);
    }
}
