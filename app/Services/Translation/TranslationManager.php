<?php

namespace App\Services\Translation;

use Illuminate\Support\Facades\Cache;
use InvalidArgumentException;

class TranslationManager
{
    public function driver(?string $name = null): TranslatorContract
    {
        $name = $name ?? config('translation.provider', 'null');

        return match ($name) {
            'google' => app(GoogleTranslator::class),
            'deepl' => app(DeepLTranslator::class),
            'openai' => app(OpenAITranslator::class),
            'gemini' => app(GeminiTranslator::class),
            'null', null => app(NullTranslator::class),
            default => throw new InvalidArgumentException("Unknown translator: {$name}"),
        };
    }

    /**
     * Dịch có cache. Kết quả lưu trong cache 7 ngày để tránh gọi API trùng.
     */
    public function translate(string $text, string $to, string $from = 'vi'): string
    {
        if (trim($text) === '' || $from === $to) {
            return $text;
        }

        $provider = config('translation.provider', 'null');
        $key = 'translate:'.$provider.':'.$from.':'.$to.':'.md5($text);

        return Cache::remember($key, config('translation.cache_ttl', 604800), function () use ($text, $to, $from, $provider) {
            return $this->driver($provider)->translate($text, $to, $from);
        });
    }
}
