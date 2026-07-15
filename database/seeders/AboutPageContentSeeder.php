<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Snapshot nội dung tĩnh bảng `about_page_contents` (đa ngôn ngữ vi/en/ja/ko/zh).
 * Tự sinh từ dữ liệu thật — chạy lại sẽ phục hồi nguyên trạng nội dung trang.
 */
class AboutPageContentSeeder extends Seeder
{
    public function run(): void
    {
        $data = array (
          'contact_phone' => '+84 0901 234 567',
          'contact_address' => '23/45 Nguyễn Bỉnh Khiêm, Quận 1, HCM',
          'contact_website' => 'mamspa.vn',
          'hero_image' => '/images/about-spa.jpg',
          'story_image' => '/images/about-story.jpg',
          'vision_image' => '/images/about-vision.jpg',
          'value1_image' => NULL,
          'value2_image' => NULL,
          'value3_image' => NULL,
          'team' => '[{"name": "Nguyễn Thị Mai", "role": "Sáng lập & Giám đốc", "photo": "/images/about-team-1.jpg", "description": "Hơn 15 năm kinh nghiệm trị liệu dưỡng sinh cổ truyền."}, {"name": "Lê Hoàng Nam", "role": "Chuyên viên Head Spa", "photo": "/images/about-team-2.jpg", "description": "Chuyên sâu liệu trình gội dưỡng sinh và bấm huyệt."}, {"name": "Phạm Hồng Hạnh", "role": "Chuyên viên trị liệu", "photo": "/images/about-team-3.jpg", "description": "Tận tâm với từng khách hàng, am hiểu thảo mộc thiên nhiên."}]',
          'instagram_handles' => '["@vivian_c_h", "@chaoch_chen"]',
          'review_video_url' => NULL,
          'review_video_image' => NULL,
          'review_cards' => NULL,
        );

        $data['created_at'] = $data['created_at'] ?? now();
        $data['updated_at'] = now();

        DB::table('about_page_contents')->updateOrInsert(['id' => 1], $data);
    }
}
