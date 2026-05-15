<?php

namespace App\Observers;

use App\Jobs\TranslateModelJob;
use Illuminate\Database\Eloquent\Model;

class AutoTranslateObserver
{
    /**
     * Sau khi model được lưu, queue job dịch sang tất cả ngôn ngữ còn thiếu.
     * Dùng saveQuietly() trong job để không trigger observer vòng lặp.
     */
    public function saved(Model $model): void
    {
        if (config('translation.provider', 'null') === 'null') {
            return;
        }

        $fields    = $model->translatable ?? [];
        $available = config('app.available_locales', ['vi', 'en']);
        $source    = 'vi';
        $targets   = array_filter($available, fn ($l) => $l !== $source);

        foreach ($targets as $target) {
            $needsTranslation = false;
            foreach ($fields as $field) {
                $vals = $model->getTranslations($field);
                if (! empty($vals[$source]) && empty($vals[$target])) {
                    $needsTranslation = true;
                    break;
                }
            }

            if ($needsTranslation) {
                TranslateModelJob::dispatch($model, $fields, $target, $source)
                    ->onQueue('translations');
            }
        }
    }
}
