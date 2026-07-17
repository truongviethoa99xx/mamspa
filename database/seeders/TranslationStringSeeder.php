<?php

namespace Database\Seeders;

use App\Models\TranslationString;
use Illuminate\Database\Seeder;

/**
 * Seed toàn bộ chuỗi giao diện (UI text tĩnh) đa ngôn ngữ vào bảng
 * `translation_strings`, lấy nguồn từ các file i18n resources/js/i18n/{locale}.json.
 *
 * Hỗ trợ đủ 5 ngôn ngữ: vi, en, ja, ko, zh. Bỏ qua dữ liệu động (dịch vụ,
 * chi nhánh, blog...) — những thứ đó nằm ở model riêng.
 *
 * Chạy: php artisan db:seed --class=TranslationStringSeeder
 */
class TranslationStringSeeder extends Seeder
{
    /** Các ngôn ngữ được seed. */
    private const LOCALES = ['vi', 'en', 'ja', 'ko', 'zh'];

    /**
     * Các key KHÔNG seed vào translation_strings vì nội dung đã được quản lý
     * riêng ở page-content (Trang chủ / Chi nhánh). Chúng vẫn còn trong file
     * i18n JSON để làm fallback khi page-content để trống — chỉ là không hiển
     * thị trong màn "Chuỗi giao diện" để tránh sửa nhầm mà không thấy đổi.
     */
    private const HIDDEN_KEYS = [
        'home.hero.eyebrow',
        'home.hero.heading',
        'home.hero.body',
        'home.hero.title',
        'home.hero.subtitle',
    ];

    /** Bỏ qua mọi key bắt đầu bằng các tiền tố này. */
    private const HIDDEN_PREFIXES = [
    ];

    public function run(): void
    {
        $flats = [];
        foreach (self::LOCALES as $locale) {
            $path = resource_path("js/i18n/{$locale}.json");
            $data = is_file($path) ? (json_decode(file_get_contents($path), true) ?? []) : [];
            $flats[$locale] = $this->flatten($data);
        }

        // Tập hợp tất cả key từ mọi ngôn ngữ (vi là nguồn đầy đủ nhất).
        $keys = [];
        foreach (self::LOCALES as $locale) {
            $keys = array_merge($keys, array_keys($flats[$locale]));
        }
        $keys = array_unique($keys);
        sort($keys);

        $seeded = 0;
        foreach ($keys as $full) {
            if ($this->isHidden($full)) {
                continue;
            }

            $parts = explode('.', $full);
            $key = array_pop($parts);
            $group = implode('.', $parts);

            // Thiếu bản dịch ở ngôn ngữ nào thì lùi về EN rồi VI để không bỏ trống.
            $values = [];
            foreach (self::LOCALES as $locale) {
                $values[$locale] = $flats[$locale][$full]
                    ?? $flats['en'][$full]
                    ?? $flats['vi'][$full]
                    ?? '';
            }

            TranslationString::updateOrCreate(
                ['group' => $group, 'key' => $key],
                ['values' => $values, 'is_auto_translated' => false],
            );
            $seeded++;
        }

        $this->command?->info('✓ Đã seed '.$seeded.' chuỗi giao diện × '.count(self::LOCALES).' ngôn ngữ.');
    }

    /** Key có bị ẩn khỏi translation_strings không (quản lý ở page-content). */
    private function isHidden(string $full): bool
    {
        if (in_array($full, self::HIDDEN_KEYS, true)) {
            return true;
        }

        foreach (self::HIDDEN_PREFIXES as $prefix) {
            if (str_starts_with($full, $prefix)) {
                return true;
            }
        }

        return false;
    }

    /**
     * @param  array<string, mixed>  $items
     * @return array<string, string>
     */
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
