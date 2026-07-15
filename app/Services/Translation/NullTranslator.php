<?php

namespace App\Services\Translation;

class NullTranslator implements TranslatorContract
{
    public function translate(string $text, string $to, string $from = 'vi'): string
    {
        return $text;
    }
}
