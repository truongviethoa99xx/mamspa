<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Snapshot nội dung tĩnh bảng `home_page_contents` (đa ngôn ngữ vi/en/ja/ko/zh).
 * Tự sinh từ dữ liệu thật — chạy lại sẽ phục hồi nguyên trạng nội dung trang.
 */
class HomePageContentSeeder extends Seeder
{
    public function run(): void
    {
        $data = array (
          'hero_title' => '{"en": "A healing journey from nature", "ja": "自然からの癒やしの旅", "ko": "자연으로부터의 치유 여정", "vi": "Hành trình chữa lành từ thiên nhiên", "zh": "来自大自然的治愈之旅"}',
          'hero_subtitle' => '{"en": "Traditional Vietnamese spa experience in Da Nang", "ja": null, "ko": null, "vi": "Gác lại những bộn bề của nhịp sống hối hả, mời bạn bước vào không gian Indochine tĩnh lặng để lắng nghe cơ thể và vỗ về tâm hồn.", "zh": null}',
          'hero_eyebrow' => '{"en": "Rooted in Vietnam\'s healing traditions", "ja": "ベトナムの伝統的な治療法に由来する", "ko": "베트남의 전통 치유에서 유래한", "vi": " Bắt nguồn từ truyền thống chữa bệnh của Việt Nam", "zh": "源自越南的传统疗法"}',
          'hero_cta_text' => '{"en": "Book now", "ja": "今すぐ予約", "ko": "지금 예약하기", "vi": "Đặt lịch ngay", "zh": "立即预约"}',
          'hero_cta_link' => '/dat-lich',
          'hero_image' => NULL,
          'service_list_title' => '{"en": "Featured Services", "ja": null, "ko": null, "vi": "Dịch vụ nổi bật", "zh": null}',
          'branch_intro_title' => '{"en": "Explore the Mầm Spa spaces", "ja": "Mầm Spa の空間を巡る", "ko": "Mầm Spa 공간 둘러보기", "vi": "Khám phá các không gian Mầm Spa", "zh": "探索 Mầm Spa 空间"}',
          'branch_intro_eyebrow' => '{"en": "A retreat for body, mind & soul", "ja": "A retreat for body, mind & soul", "ko": "A retreat for body, mind & soul", "vi": "A retreat for body, mind & soul", "zh": "A retreat for body, mind & soul"}',
          'branch_intro_subheading' => '{"en": "A healing space", "ja": "癒やしの空間", "ko": "치유의 공간", "vi": "Không gian chữa lành", "zh": "疗愈空间"}',
          'branch_intro_heading' => '{"en": "The beauty of old Saigon.", "ja": "古きサイゴンの趣。", "ko": "옛 사이공의 아름다움.", "vi": "Nét đẹp của Sài Gòn xưa.", "zh": "旧西贡之美。"}',
          'branch_intro_body_1' => '{"en": "Step into the Lê Văn Sỹ space and return to a rare moment of stillness. Here, the rustic charm of traditional architecture is preserved with warm wood, natural light and the faint scent of herbs.", "ja": "レ・ヴァン・シー店に足を踏み入れると、希少な静寂のひとときへ。温かみのある木材、自然光、ほのかなハーブの香りが、伝統建築の素朴な趣をそのままに残しています。", "ko": "레 반 시 지점에 들어서면 보기 드문 고요한 순간으로 돌아갑니다. 따뜻한 원목, 자연 채광, 은은한 허브 향이 전통 건축의 소박한 멋을 고스란히 간직하고 있습니다.", "vi": "Lạc bước vào không gian Lê Văn Sỹ như trở về một khoảng trời yên tĩnh hiếm hoi. Nơi đây giữ trọn nét mộc mạc của kiến trúc truyền thống với gỗ ấm, ánh sáng tự nhiên và hương thảo mộc phảng phất.", "zh": "步入黎文士门店，仿佛回到难得的宁静天地。这里完整保留了传统建筑的质朴韵味，温润木材、自然光线与淡淡草本清香交织其间。"}',
          'branch_intro_body_2' => '{"en": "An ideal destination to set aside the rush of life, relax deeply and reconnect with yourself.", "ja": "慌ただしい日常を離れ、深くリラックスし、自分自身とつながり直すための理想的な場所です。", "ko": "분주한 삶을 잠시 내려놓고 깊이 휴식하며 자신과 다시 연결되기에 이상적인 곳입니다.", "vi": "Một điểm đến lý tưởng để tạm gác lại nhịp sống hối hả, thư giãn sâu và kết nối lại với chính mình.", "zh": "是暂别忙碌生活、深度放松、重新与自我连接的理想之地。"}',
          'branch_intro_cta' => '{"en": "Explore in detail", "ja": "詳しく見る", "ko": "자세히 보기", "vi": "Khám phá chi tiết", "zh": "查看详情"}',
          'branch_intro_caption' => '{"en": "A peaceful corner at {{name}}", "ja": "{{name}} の静かな一角", "ko": "{{name}}의 평온한 한 켠", "vi": "Góc nhỏ bình yên tại {{name}}", "zh": "{{name}} 的宁静一隅"}',
          'testimonial_rating' => 5,
          'testimonial_review_count' => 0,
          'testimonial_source' => 'google',
          'testimonials' => '[]',
        );

        $data['created_at'] = $data['created_at'] ?? now();
        $data['updated_at'] = now();

        DB::table('home_page_contents')->updateOrInsert(['id' => 1], $data);
    }
}
