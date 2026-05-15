<?php

namespace App\Services\Translation;

use Illuminate\Support\Facades\Http;

class DeepLTranslator implements TranslatorContract
{
    public function translate(string $text, string $to, string $from = 'vi'): string
    {
        $key = config('translation.deepl.key');
        if (! $key) {
            return $text;
        }

        $response = Http::asForm()->withHeaders([
            'Authorization' => 'DeepL-Auth-Key '.$key,
        ])->post(config('translation.deepl.endpoint'), [
            'text' => $text,
            'source_lang' => strtoupper($from),
            'target_lang' => strtoupper($to),
        ]);

        return $response->json('translations.0.text') ?? $text;
    }
}
