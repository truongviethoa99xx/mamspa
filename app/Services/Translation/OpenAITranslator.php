<?php

namespace App\Services\Translation;

use Illuminate\Support\Facades\Http;

class OpenAITranslator implements TranslatorContract
{
    public function translate(string $text, string $to, string $from = 'vi'): string
    {
        $key = config('translation.openai.key');
        if (! $key) {
            return $text;
        }

        $langs = ['vi' => 'Vietnamese', 'en' => 'English', 'ja' => 'Japanese', 'ko' => 'Korean', 'zh' => 'Chinese (Simplified)'];
        $fromName = $langs[$from] ?? $from;
        $toName = $langs[$to] ?? $to;

        $response = Http::withToken($key)
            ->timeout(30)
            ->post(config('translation.openai.endpoint'), [
                'model' => config('translation.openai.model'),
                'temperature' => 0,
                'messages' => [
                    ['role' => 'system', 'content' => "Translate from {$fromName} to {$toName}. Return ONLY the translation, no quotes or commentary. Keep brand names like 'Maha Spa', 'Maha Heritage', 'Maha Signature' unchanged."],
                    ['role' => 'user', 'content' => $text],
                ],
            ]);

        return trim($response->json('choices.0.message.content') ?? $text);
    }
}
