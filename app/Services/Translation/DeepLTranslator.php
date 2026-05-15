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

        $map = ['zh' => 'ZH-HANS', 'vi' => 'VI', 'en' => 'EN', 'ja' => 'JA', 'ko' => 'KO'];

        $response = Http::asForm()->withHeaders([
            'Authorization' => 'DeepL-Auth-Key '.$key,
        ])->post(config('translation.deepl.endpoint'), [
            'text' => $text,
            'source_lang' => $map[$from] ?? strtoupper($from),
            'target_lang' => $map[$to] ?? strtoupper($to),
        ]);

        return $response->json('translations.0.text') ?? $text;
    }
}
