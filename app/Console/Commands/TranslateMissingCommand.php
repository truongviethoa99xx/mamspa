<?php

namespace App\Console\Commands;

use App\Models\BlogPost;
use App\Models\Branch;
use App\Models\Service;
use App\Models\TranslationString;
use App\Services\Translation\TranslationManager;
use Illuminate\Console\Command;

class TranslateMissingCommand extends Command
{
    protected $signature = 'translate:missing
        {--target=all : Ngôn ngữ đích — mã cụ thể (en, ja, ko, zh) hoặc "all" để dịch tất cả}
        {--source=vi : Ngôn ngữ nguồn}
        {--dry-run : Chỉ hiển thị, không lưu}';

    protected $description = 'Auto-translate tất cả translatable field đang còn rỗng ở ngôn ngữ đích.';

    private array $modelFields = [
        Branch::class => ['name'],
        Service::class => ['name', 'description'],
        BlogPost::class => ['title', 'excerpt', 'body'],
    ];

    public function handle(TranslationManager $svc): int
    {
        $source = $this->option('source');
        $dry = (bool) $this->option('dry-run');
        $available = config('app.available_locales', ['vi', 'en']);

        $targets = $this->option('target') === 'all'
            ? array_values(array_filter($available, fn ($l) => $l !== $source))
            : [$this->option('target')];

        $total = 0;
        foreach ($targets as $target) {
            $this->info("→ Dịch sang: {$target}");
            $total += $this->translateModels($svc, $source, $target, $dry);
            $total += $this->translateUiStrings($svc, $source, $target, $dry);
        }

        $this->info(($dry ? '[DRY-RUN] ' : '')."Tổng: {$total} mục đã xử lý.");

        return self::SUCCESS;
    }

    private function translateModels(TranslationManager $svc, string $source, string $target, bool $dry): int
    {
        $count = 0;
        foreach ($this->modelFields as $class => $fields) {
            foreach ($class::all() as $row) {
                $changed = false;
                foreach ($fields as $field) {
                    $vals = $row->getTranslations($field);
                    $src = $vals[$source] ?? null;
                    $tgt = $vals[$target] ?? null;
                    if (! $src || $tgt) {
                        continue;
                    }
                    $translated = $svc->translate($src, $target, $source);
                    $this->line('  '.class_basename($class)." #{$row->id} [{$field}]: ".mb_substr($translated, 0, 70));
                    if (! $dry) {
                        $row->setTranslation($field, $target, $translated);
                        $changed = true;
                    }
                    $count++;
                }
                if ($changed) {
                    $row->saveQuietly();
                }
            }
        }

        return $count;
    }

    private function translateUiStrings(TranslationManager $svc, string $source, string $target, bool $dry): int
    {
        $count = 0;
        foreach (TranslationString::all() as $row) {
            $vals = $row->values ?? [];
            if (empty($vals[$source]) || ! empty($vals[$target])) {
                continue;
            }
            $translated = $svc->translate($vals[$source], $target, $source);
            $this->line("  UI [{$row->group}.{$row->key}]: ".mb_substr($translated, 0, 70));
            if (! $dry) {
                $vals[$target] = $translated;
                $row->update(['values' => $vals, 'is_auto_translated' => true]);
            }
            $count++;
        }

        return $count;
    }
}
