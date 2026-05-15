<?php

namespace App\Services\Translation;

interface TranslatorContract
{
    public function translate(string $text, string $to, string $from = 'vi'): string;
}
