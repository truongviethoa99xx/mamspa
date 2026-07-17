<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Translatable\HasTranslations;

/**
 * @property-read string $url
 */
class ServiceCategory extends Model
{
    use HasTranslations;

    protected $fillable = [
        'slug', 'name', 'description', 'image', 'image_alt', 'parent_id', 'order', 'is_active',
        'benefits', 'experience_images', 'faqs', 'ideal_for',
        // Khối "Chăm sóc theo nhu cầu, không theo khuôn mẫu" (đoạn giới thiệu + 3 điểm nổi bật).
        'intro_heading', 'intro_body', 'intro_image', 'intro_image_alt', 'pillars',
        // Khối trích dẫn lớn giữa trang.
        'quote',
        // Khối "Mỗi tầng trải nghiệm được thiết kế khác nhau về" (checklist + ảnh minh hoạ).
        'experience_note_title', 'experience_checklist', 'experience_note_body',
        'experience_note_image', 'experience_note_image_alt',
        // Tiêu đề khối lưới liệu pháp con (vd "Nhóm liệu pháp") — số thứ tự tự tính từ số dịch vụ.
        'therapy_heading',
        // Banner khép lại trang danh mục — trống thì FE fallback về banner chung ở /admin/service-page-settings.
        'closing_image', 'closing_image_alt', 'closing_heading', 'closing_body', 'closing_cta_text', 'closing_cta_link',
    ];

    protected $casts = [
        'order' => 'integer',
        'is_active' => 'boolean',
        'image_alt' => 'array',
        'benefits' => 'array',
        'experience_images' => 'array',
        'faqs' => 'array',
        'ideal_for' => 'array',
        'intro_heading' => 'array',
        'intro_body' => 'array',
        'intro_image_alt' => 'array',
        'pillars' => 'array',
        'quote' => 'array',
        'experience_note_title' => 'array',
        'experience_checklist' => 'array',
        'experience_note_body' => 'array',
        'experience_note_image_alt' => 'array',
        'therapy_heading' => 'array',
        'closing_image_alt' => 'array',
        'closing_heading' => 'array',
        'closing_body' => 'array',
        'closing_cta_text' => 'array',
    ];

    public array $translatable = ['name', 'description'];

    /** Danh mục cấp 1 (null nếu chính nó là cấp 1). */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(self::class, 'parent_id');
    }

    /** Danh mục con cấp 2. */
    public function children(): HasMany
    {
        return $this->hasMany(self::class, 'parent_id')->orderBy('order');
    }

    public function services(): HasMany
    {
        return $this->hasMany(Service::class);
    }

    public function scopeRoots($query)
    {
        return $query->whereNull('parent_id');
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function isRoot(): bool
    {
        return $this->parent_id === null;
    }

    /** URL công khai của danh mục: /dich-vu/{root}/ hoặc /dich-vu/{root}/{child}/. */
    public function getUrlAttribute(): string
    {
        return $this->parent
            ? "/dich-vu/{$this->parent->slug}/{$this->slug}/"
            : "/dich-vu/{$this->slug}/";
    }
}
