<?php

namespace App\Jobs;

use App\Services\Translation\TranslationManager;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class TranslateModelJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;
    public int $backoff = 60;

    public function __construct(
        public readonly Model $model,
        public readonly array $fields,
        public readonly string $target,
        public readonly string $source = 'vi',
    ) {}

    public function handle(TranslationManager $manager): void
    {
        $changed = false;

        foreach ($this->fields as $field) {
            $vals = $this->model->getTranslations($field);
            $src  = $vals[$this->source] ?? null;
            $tgt  = $vals[$this->target] ?? null;

            if (! $src || $tgt) {
                continue;
            }

            $translated = $manager->translate($src, $this->target, $this->source);
            $this->model->setTranslation($field, $this->target, $translated);
            $changed = true;
        }

        if ($changed) {
            $this->model->saveQuietly();
        }
    }
}
