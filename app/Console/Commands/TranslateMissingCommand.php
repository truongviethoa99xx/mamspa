<?php

namespace App\Console\Commands;

use App\Models\BlogPost;
use App\Models\Branch;
use App\Models\Page;
use App\Models\Promotion;
use App\Models\Service;
use App\Models\TranslationString;
use App\Services\Translation\TranslationManager;
use Illuminate\Console\Command;

class TranslateMissingCommand extends Command
{
    protected $signature = 'translate:missing
        {--target=en : Ngôn ngữ đích}
        {--source=vi : Ngôn ngữ nguồn}
        {--dry-run : Chỉ hiển thị, không lưu}';

    protected $description = 'Auto-translate tất cả translatable field đang còn rỗng ở ngôn ngữ đích.';

    public function handle(TranslationManager $svc): int
    {
        $target = $this->option('target');
        $source = $this->option('source');
        $dry = (bool) $this->option('dry-run');

        $models = [
            Branch::class => ['name'],
            Service::class => ['name', 'description'],
            Promotion::class => ['title', 'description'],
            BlogPost::class => ['title', 'excerpt', 'body'],
            Page::class => ['title'],
        ];

        $count = 0;
        foreach ($models as $class => $fields) {
            foreach ($class::all() as $row) {
                foreach ($fields as $field) {
                    $vals = $row->getTranslations($field);
                    $src = $vals[$source] ?? null;
                    $tgt = $vals[$target] ?? null;
                    if (! $src || $tgt) continue;
                    $translated = $svc->translate($src, $target, $source);
                    $this->line(class_basename($class)." #{$row->id} [{$field}]: ".mb_substr($translated, 0, 80));
                    if (! $dry) {
                        $row->setTranslation($field, $target, $translated);
                        $row->save();
                    }
                    $count++;
                }
            }
        }

        foreach (TranslationString::all() as $row) {
            $vals = $row->values ?? [];
            if (empty($vals[$source]) || ! empty($vals[$target])) continue;
            $translated = $svc->translate($vals[$source], $target, $source);
            $this->line("UI [{$row->group}.{$row->key}]: ".mb_substr($translated, 0, 80));
            if (! $dry) {
                $vals[$target] = $translated;
                $row->update(['values' => $vals, 'is_auto_translated' => true]);
            }
            $count++;
        }

        $this->info(($dry ? '[DRY-RUN] ' : '')."Đã xử lý {$count} mục.");
        return self::SUCCESS;
    }
}
