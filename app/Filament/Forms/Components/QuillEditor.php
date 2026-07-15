<?php

namespace App\Filament\Forms\Components;

use Filament\Forms\Components\Field;

/**
 * Rich text field dùng Quill.js (thay cho RichEditor mặc định của Filament).
 */
class QuillEditor extends Field
{
    protected string $view = 'filament.forms.components.quill-editor';
}
