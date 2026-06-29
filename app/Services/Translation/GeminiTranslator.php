<?php

namespace App\Services\Translation;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use RuntimeException;

class GeminiTranslator implements TranslatorContract
{
    /** Cache khóa cho model đã được xác định là chạy được. */
    private const MODEL_CACHE_KEY = 'translation.gemini.working_model';

    private array $langNames = [
        'vi' => 'Vietnamese',
        'en' => 'English',
        'ja' => 'Japanese',
        'ko' => 'Korean',
        'zh' => 'Simplified Chinese',
    ];

    /** Tên model không dùng để dịch text (ảnh, audio, tts, nghiên cứu...). */
    private array $blockedModelKeywords = [
        'embedding', 'aqa', 'image', 'imagen', 'tts', 'audio', 'veo', 'live',
        'vision', 'lyria', 'robotics', 'computer-use', 'deep-research',
        'nano-banana', 'antigravity',
    ];

    public function translate(string $text, string $to, string $from = 'vi'): string
    {
        $key = config('translation.gemini.key');
        if (! $key) {
            return $text;
        }

        $base = $this->baseUrl();
        $fromName = $this->langNames[$from] ?? $from;
        $toName = $this->langNames[$to] ?? $to;
        $prompt = "Translate the following text from {$fromName} to {$toName}. "
            .'Return ONLY the translated text, no explanations or quotes. '
            ."Keep brand names like 'Mầm Spa', 'Maha Heritage', 'Maha Signature' unchanged.\n\n{$text}";

        // Thử với model đang cache; nếu thất bại (lỗi HTTP, timeout, hoặc model
        // đã bị gỡ) thì quên cache, dò lại model khác và thử thêm 1 lần.
        foreach ([false, true] as $rediscover) {
            try {
                if ($rediscover) {
                    Cache::forget(self::MODEL_CACHE_KEY);
                }

                $model = $this->resolveModel($base, $key);
                $translated = $this->generate($base, $key, $model, $prompt, 2048);

                if ($translated !== null && $translated !== '') {
                    return $translated;
                }

                // Model trả về rỗng/lỗi → bỏ cache để vòng sau dò lại model khác.
                Cache::forget(self::MODEL_CACHE_KEY);
            } catch (ConnectionException $e) {
                Cache::forget(self::MODEL_CACHE_KEY);
                if ($rediscover) {
                    throw new RuntimeException('Không kết nối được dịch vụ dịch tự động (Gemini). Vui lòng thử lại.');
                }
            }
        }

        throw new RuntimeException('Gemini không trả về bản dịch (đã thử dò lại model).');
    }

    /**
     * Lấy danh sách model từ API key, ưu tiên flash (nhanh), ping thử từng cái
     * và dùng model đầu tiên trả lời OK. Kết quả được cache 1 ngày.
     */
    private function resolveModel(string $base, string $key): string
    {
        return Cache::remember(self::MODEL_CACHE_KEY, now()->addDay(), function () use ($base, $key) {
            foreach ($this->candidateModels($base, $key) as $model) {
                if ($this->ping($base, $key, $model)) {
                    return $model;
                }
            }

            throw new RuntimeException('Không tìm thấy model Gemini khả dụng cho API key này.');
        });
    }

    /**
     * @return array<int, string> danh sách model ứng viên đã sắp theo độ ưu tiên
     */
    private function candidateModels(string $base, string $key): array
    {
        try {
            $response = Http::withoutVerifying()->timeout(15)
                ->get("{$base}/models", ['key' => $key, 'pageSize' => 200]);
        } catch (ConnectionException $e) {
            $response = null;
        }

        $models = collect($response?->json('models') ?? [])
            ->filter(fn ($m) => in_array('generateContent', $m['supportedGenerationMethods'] ?? [], true))
            ->map(fn ($m) => Str::after($m['name'] ?? '', 'models/'))
            ->filter()
            ->reject(fn ($name) => Str::contains($name, $this->blockedModelKeywords))
            ->reject(fn ($name) => Str::contains($name, 'preview') || Str::contains($name, 'exp'));

        $ordered = $this->prioritise($models);

        // Fallback: model trong config endpoint nếu list rỗng.
        if (empty($ordered)) {
            $fallback = Str::of($this->configModel())->trim()->value();
            $ordered = $fallback !== '' ? [$fallback] : ['gemini-2.0-flash'];
        }

        return $ordered;
    }

    /**
     * @param  Collection<int, string>  $models
     * @return array<int, string>
     */
    private function prioritise(Collection $models): array
    {
        return $models
            ->sortBy(fn ($name) => match (true) {
                Str::contains($name, 'flash-lite') => 0,
                Str::contains($name, 'flash') => 1,
                Str::contains($name, 'pro') => 3,
                default => 2,
            })
            ->values()
            ->all();
    }

    private function ping(string $base, string $key, string $model): bool
    {
        try {
            return $this->generate($base, $key, $model, 'Translate to English, only the translation: xin chào', 16) !== null;
        } catch (ConnectionException $e) {
            return false;
        }
    }

    /**
     * Gọi generateContent. Trả về text đã dịch, hoặc null nếu thất bại.
     * Tự bỏ thinkingConfig nếu model không hỗ trợ.
     */
    private function generate(string $base, string $key, string $model, string $prompt, int $maxTokens): ?string
    {
        $url = "{$base}/models/{$model}:generateContent?key={$key}";
        $payload = [
            'contents' => [[
                'parts' => [['text' => $prompt]],
            ]],
            'generationConfig' => [
                'temperature' => 0.1,
                'maxOutputTokens' => $maxTokens,
                // Tắt "thinking" cho nhanh; model nào không hỗ trợ sẽ thử lại bên dưới.
                'thinkingConfig' => ['thinkingBudget' => 0],
            ],
        ];

        $response = Http::withoutVerifying()->connectTimeout(10)->timeout(60)->post($url, $payload);

        if ($response->failed() && Str::contains(Str::lower($response->body()), 'thinking')) {
            unset($payload['generationConfig']['thinkingConfig']);
            $response = Http::withoutVerifying()->connectTimeout(10)->timeout(60)->post($url, $payload);
        }

        if ($response->failed()) {
            return null;
        }

        $text = trim($response->json('candidates.0.content.parts.0.text') ?? '');

        return $text !== '' ? $text : null;
    }

    /** Base URL (…/v1beta) suy ra từ endpoint cấu hình. */
    private function baseUrl(): string
    {
        $endpoint = (string) config('translation.gemini.endpoint');
        $base = Str::before($endpoint, '/models/');

        return $base !== '' && $base !== $endpoint
            ? rtrim($base, '/')
            : 'https://generativelanguage.googleapis.com/v1beta';
    }

    /** Tên model trong endpoint cấu hình (để fallback). */
    private function configModel(): string
    {
        $endpoint = (string) config('translation.gemini.endpoint');

        return Str::of($endpoint)->after('/models/')->before(':generateContent')->value();
    }
}
