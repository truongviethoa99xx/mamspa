<?php

namespace App\Services\Translation;

use Illuminate\Support\Facades\Http;

class GeminiTranslator implements TranslatorContract
{
    private array $langNames = [
        'vi' => 'Vietnamese',
        'en' => 'English',
        'ja' => 'Japanese',
        'ko' => 'Korean',
        'zh' => 'Simplified Chinese',
    ];

    public function translate(string $text, string $to, string $from = 'vi'): string
    {
        $key = config('translation.gemini.key');
        if (! $key) {
            return $text;
        }

        $fromName = $this->langNames[$from] ?? $from;
        $toName   = $this->langNames[$to] ?? $to;

        $response = Http::withoutVerifying()
            ->timeout(30)
            ->post(config('translation.gemini.endpoint').'?key='.$key, [
                'contents' => [[
                    'parts' => [[
                        'text' => "Translate the following text from {$fromName} to {$toName}. Return ONLY the translated text, no explanations or quotes. Keep brand names like 'Maha Spa', 'Maha Heritage', 'Maha Signature' unchanged.\n\n{$text}",
                    ]],
                ]],
                'generationConfig' => [
                    'temperature' => 0.1,
                    'maxOutputTokens' => 2048,
                ],
            ]);

        return trim($response->json('candidates.0.content.parts.0.text') ?? $text);
    }
}
