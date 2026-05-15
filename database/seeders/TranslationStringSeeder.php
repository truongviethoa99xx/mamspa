<?php

namespace Database\Seeders;

use App\Models\TranslationString;
use Illuminate\Database\Seeder;

class TranslationStringSeeder extends Seeder
{
    public function run(): void
    {
        $vi = json_decode(file_get_contents(resource_path('js/i18n/vi.json')), true) ?? [];
        $en = json_decode(file_get_contents(resource_path('js/i18n/en.json')), true) ?? [];

        $flatVi = $this->flatten($vi);
        $flatEn = $this->flatten($en);

        $keys = array_unique(array_merge(array_keys($flatVi), array_keys($flatEn)));
        sort($keys);

        foreach ($keys as $full) {
            $parts = explode('.', $full);
            $key = array_pop($parts);
            $group = implode('.', $parts);

            TranslationString::updateOrCreate(
                ['group' => $group, 'key' => $key],
                ['values' => [
                    'vi' => $flatVi[$full] ?? '',
                    'en' => $flatEn[$full] ?? '',
                ], 'is_auto_translated' => false]
            );
        }
    }

    protected function flatten(array $items, string $prefix = ''): array
    {
        $out = [];
        foreach ($items as $k => $v) {
            $key = $prefix === '' ? $k : "{$prefix}.{$k}";
            if (is_array($v)) {
                $out += $this->flatten($v, $key);
            } else {
                $out[$key] = (string) $v;
            }
        }
        return $out;
    }
}
