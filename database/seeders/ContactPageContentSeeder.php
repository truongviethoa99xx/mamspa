<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Snapshot nội dung tĩnh bảng `contact_page_contents` (đa ngôn ngữ vi/en/ja/ko/zh).
 * Tự sinh từ dữ liệu thật — chạy lại sẽ phục hồi nguyên trạng nội dung trang.
 */
class ContactPageContentSeeder extends Seeder
{
    public function run(): void
    {
        $data = array (
          'seo_description' => '{"en": "Contact Mầm Spa for advice and to book an appointment at the suitable branch.", "ja": "Mầm Spaにお問い合わせいただき、ご相談やご希望の店舗でのご予約を承ります。", "ko": "Mầm Spa에 연락하셔서 상담을 받으시고 적합한 지점으로 예약하시기 바랍니다.", "vi": "Liên hệ Mầm Spa để được tư vấn và đặt lịch tại chi nhánh phù hợp.", "zh": "联系 Mầm Spa 获取咨询并在合适的门店预约。"}',
          'heading' => '{"en": "Contact", "ja": "お問い合わせ", "ko": "연락처", "vi": "Liên hệ", "zh": "联系我们"}',
          'email' => 'info@mamspa.vn',
          'map_embed_url' => NULL,
        );

        $data['created_at'] = $data['created_at'] ?? now();
        $data['updated_at'] = now();

        DB::table('contact_page_contents')->updateOrInsert(['id' => 1], $data);
    }
}
