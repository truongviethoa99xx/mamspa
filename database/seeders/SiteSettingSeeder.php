<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Snapshot nội dung tĩnh bảng `site_settings` (đa ngôn ngữ vi/en/ja/ko/zh).
 * Tự sinh từ dữ liệu thật — chạy lại sẽ phục hồi nguyên trạng nội dung trang.
 */
class SiteSettingSeeder extends Seeder
{
    public function run(): void
    {
        $data = array (
          'brand_name' => 'Mầm Spa',
          'tagline' => 'Rooted in Vietnamese Healing Traditions',
          'hotline' => '(+84) 965 80 6166',
          'email' => 'info@mamspa.vn',
          'chat_url' => 'https://zalo.me/0865806166',
          'floating_contact_buttons' => '[{"href": "https://zalo.me/0865806166", "type": "zalo", "color": "#028fe8", "label": "Zalo", "enabled": true, "background": "#ffffff"}, {"href": "/contact", "type": "map", "color": "#4285f4", "label": "Google Maps", "enabled": true, "background": "#ffffff"}, {"href": "https://wa.me/84865806166", "type": "whatsapp", "color": "#ffffff", "label": "WhatsApp", "enabled": true, "background": "#19b83f"}, {"href": "#", "type": "kakao", "color": "#3b1f1f", "label": "KakaoTalk", "enabled": true, "background": "#fee500"}, {"href": "tel:0865806166", "type": "phone", "color": "#ffffff", "label": "Hotline", "enabled": true, "background": "#0d8bff"}]',
          'social_links' => '[{"href": "https://facebook.com/mahaSpa.danang", "label": "Facebook"}, {"href": "https://instagram.com/mahaspa.danang", "label": "Instagram"}, {"href": "https://zalo.me", "label": "Zalo OA"}]',
          'service_menu' => '[{"href": "/dich-vu?category=combo", "label": "Mầm Combo"}, {"href": "/dich-vu?category=massage", "label": "Traditional Massage"}, {"href": "/dich-vu?category=head-spa", "label": "Head Spa"}, {"href": "/dich-vu?category=facial", "label": "Facial Care"}, {"href": "/dich-vu?category=mother-care", "label": "Mother Care"}]',
          'review_widget' => '<script src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.2.10/iframeResizer.min.js"></script>'."\n".'<iframe onload="iFrameResize(this)" src="https://442ee0d83cf24f0e8c11412acc591fc7.elf.site" style="border:none;width:100%;"></iframe>',
        );

        $data['created_at'] = $data['created_at'] ?? now();
        $data['updated_at'] = now();

        DB::table('site_settings')->updateOrInsert(['id' => 1], $data);
    }
}
