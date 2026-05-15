<?php

namespace App\Console\Commands;

use App\Models\TranslationString;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class TranslateScanCommand extends Command
{
    protected $signature = 'translate:scan
        {--path=resources/js : Đường dẫn quét}
        {--auto-translate : Tự auto-translate VI→EN ngay khi tạo (cần TRANSLATE_PROVIDER)}
        {--dry-run : Chỉ liệt kê, không insert}';

    protected $description = 'Quét code FE tìm tất cả t(\'key\') và đảm bảo DB có translation_strings tương ứng.';

    public function handle(): int
    {
        $path = base_path($this->option('path'));
        $files = collect(File::allFiles($path))
            ->filter(fn ($f) => in_array($f->getExtension(), ['ts', 'tsx', 'js', 'jsx']));

        $pattern = "/\\bt\\(\\s*['\"]([a-zA-Z][\\w.]+)['\"]\\s*[,)]/";
        $found = [];

        foreach ($files as $file) {
            $content = $file->getContents();
            if (preg_match_all($pattern, $content, $matches)) {
                foreach ($matches[1] as $key) {
                    $found[$key] = true;
                }
            }
        }

        $keys = array_keys($found);
        sort($keys);
        $this->info('Tìm thấy '.count($keys).' translation keys trong code.');

        $existing = TranslationString::all()
            ->mapWithKeys(fn ($r) => [$r->group.'.'.$r->key => true])
            ->toArray();

        $missing = [];
        foreach ($keys as $full) {
            if (isset($existing[$full])) continue;
            $parts = explode('.', $full);
            if (count($parts) < 2) continue;
            $key = array_pop($parts);
            $group = implode('.', $parts);
            $missing[] = ['group' => $group, 'key' => $key, 'full' => $full];
        }

        if (empty($missing)) {
            $this->info('✓ Tất cả key đã có trong DB.');
            return self::SUCCESS;
        }

        $this->warn('Thiếu '.count($missing).' key:');
        foreach ($missing as $m) {
            $this->line('  - '.$m['full']);
        }

        if ($this->option('dry-run')) {
            return self::SUCCESS;
        }

        $auto = $this->option('auto-translate');
        $translator = $auto ? app(\App\Services\Translation\TranslationManager::class) : null;

        foreach ($missing as $m) {
            $vi = $this->humanise($m['key']);
            $values = ['vi' => $vi, 'en' => ''];
            if ($translator) {
                $values['en'] = $translator->translate($vi, 'en', 'vi');
            }
            TranslationString::create([
                'group' => $m['group'],
                'key' => $m['key'],
                'values' => $values,
                'is_auto_translated' => $auto,
            ]);
        }

        $this->info('Đã insert '.count($missing).' bản ghi. Admin có thể vào /admin/translation-strings để sửa.');
        return self::SUCCESS;
    }

    protected function humanise(string $key): string
    {
        return ucfirst(trim(preg_replace('/(?<!^)[A-Z]/', ' $0', $key)));
    }
}
