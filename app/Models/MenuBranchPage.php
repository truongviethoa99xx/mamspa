<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Trang menu PDF riêng của 1 chi nhánh — URL /menu/{slug}/, liệt kê bộ PDF menu dịch vụ
 * theo 5 ngôn ngữ (xem MenuController::PDF_LOCALES). Thay cho repeater "branches" trước đây
 * từng gộp chung mọi chi nhánh vào 1 trang Menu duy nhất.
 */
class MenuBranchPage extends Model
{
    protected $fillable = [
        'slug', 'is_published', 'order',
        'image', 'image_alt', 'name', 'street', 'desc',
        'pdf_vi', 'pdf_en', 'pdf_zh', 'pdf_ko', 'pdf_ja',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'order' => 'integer',
        'image_alt' => 'array',
        'name' => 'array',
        'street' => 'array',
        'desc' => 'array',
    ];

    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }
}
