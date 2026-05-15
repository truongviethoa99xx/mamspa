<?php

namespace App\Services\Translation;

use Illuminate\Support\Facades\Http;

class GoogleTranslator implements TranslatorContract
{
    public function translate(string $text, string $to, string $from = 'vi'): string
    {
        $key = config('translation.google.key');
        if (! $key) {
            return $text;
        }

        $response = Http::post(config('translation.google.endpoint').'?key='.$key, [
            'q' => $text,
            'source' => $from,
            'target' => $to,
            'format' => 'text',
        ]);

        return $response->json('data.translations.0.translatedText') ?? $text;
    }
}
