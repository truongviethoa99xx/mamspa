<?php

namespace App\Models;

use App\Support\HomeImageOptimizer;
use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    /** Toàn bộ ngôn ngữ hệ thống có sẵn bản dịch (resources/js/i18n/*.json) — admin chỉ được
     *  BẬT/TẮT trong tập này qua "Ngôn ngữ hiển thị" ở Thiết lập chung, không thêm được ngôn
     *  ngữ mới ngoài danh sách (cần thêm code + file dịch trước). */
    public const SUPPORTED_LOCALES = ['vi', 'en', 'ja', 'ko', 'zh'];

    /** Ngôn ngữ mặc định — luôn bật, không cho tắt (site sẽ vô nghĩa nếu tắt hết). */
    public const DEFAULT_LOCALE = 'vi';

    protected $fillable = [
        'brand_name',
        'logo_path',
        'header_background_color',
        'header_text_color',
        'header_transparent',
        'header_cta_text',
        'header_cta_background_color',
        'header_cta_text_color',
        'tagline',
        'meta_description',
        'hotline',
        'email',
        'chat_url',
        'floating_contact_buttons',
        'social_links',
        'service_menu',
        'address',
        'phone',
        'open_hours',
        'branches',
        'lat',
        'lng',
        'booking_notification_emails',
        'enabled_locales',
    ];

    protected $casts = [
        'floating_contact_buttons' => 'array',
        'social_links' => 'array',
        'service_menu' => 'array',
        'branches' => 'array',
        'booking_notification_emails' => 'array',
        'enabled_locales' => 'array',
        'header_transparent' => 'boolean',
        'lat' => 'float',
        'lng' => 'float',
    ];

    public static function current(): self
    {
        return static::first() ?? static::create([
            'floating_contact_buttons' => [],
            'social_links' => [],
            'service_menu' => [],
        ]);
    }

    /** Ngôn ngữ admin đã bật (CMS → Thiết lập chung → Ngôn ngữ hiển thị). Cột null (site cũ
     *  chưa từng lưu field này qua form mới) giữ hành vi trước đây — vi + en — thay vì rơi về
     *  chỉ vi, tránh im lặng tắt mất tiếng Anh trên site đang chạy. Đã lưu rồi thì luôn ép có
     *  DEFAULT_LOCALE dù admin lỡ bỏ chọn hết. */
    public function getEnabledLocales(): array
    {
        if ($this->enabled_locales === null) {
            return [self::DEFAULT_LOCALE, 'en'];
        }

        $stored = array_values(array_intersect($this->enabled_locales, self::SUPPORTED_LOCALES));

        // array_values() sau array_unique() là bắt buộc: array_unique giữ nguyên key gốc, nên
        // nếu DEFAULT_LOCALE trùng với 1 phần tử giữa mảng, các key còn lại bị đứt quãng
        // (0,2,3...) — json_encode() một mảng PHP có key không liền mạch từ 0 sẽ ra object
        // ({"0":...,"2":...}) thay vì array ["...","..."] , vỡ type string[] phía TypeScript.
        return $stored === [] ? [self::DEFAULT_LOCALE] : array_values(array_unique([self::DEFAULT_LOCALE, ...$stored]));
    }

    /** Sinh bản .webp đã resize cho logo + icon nút liên hệ nổi mỗi khi admin lưu
     *  (chỉ tạo file mới, không đụng DB/ảnh gốc) — xem HomeImageOptimizer::forSiteSetting(). */
    protected static function booted(): void
    {
        static::saved(fn (self $site) => HomeImageOptimizer::forSiteSetting($site));
    }
}
