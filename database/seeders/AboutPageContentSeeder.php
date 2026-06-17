<?php

namespace Database\Seeders;

use App\Models\AboutPageContent;
use Illuminate\Database\Seeder;

class AboutPageContentSeeder extends Seeder
{
    public function run(): void
    {
        AboutPageContent::query()->updateOrCreate(['id' => 1], [
            'contact_phone' => '+84 0901 234 567',
            'contact_address' => '23/45 Nguyễn Bỉnh Khiêm, Quận 1, HCM',
            'contact_website' => 'mamspa.vn',
            'hero_image' => '/images/about-spa.jpg',
            'story_image' => '/images/about-story.jpg',
            'vision_image' => '/images/about-vision.jpg',
            'team' => [
                ['name' => 'Nguyễn Thị Mai', 'role' => 'Sáng lập & Giám đốc', 'description' => 'Hơn 15 năm kinh nghiệm trị liệu dưỡng sinh cổ truyền.', 'photo' => '/images/about-team-1.jpg'],
                ['name' => 'Lê Hoàng Nam', 'role' => 'Chuyên viên Head Spa', 'description' => 'Chuyên sâu liệu trình gội dưỡng sinh và bấm huyệt.', 'photo' => '/images/about-team-2.jpg'],
                ['name' => 'Phạm Hồng Hạnh', 'role' => 'Chuyên viên trị liệu', 'description' => 'Tận tâm với từng khách hàng, am hiểu thảo mộc thiên nhiên.', 'photo' => '/images/about-team-3.jpg'],
            ],
            'instagram_handles' => ['@vivian_c_h', '@chaoch_chen'],
        ]);
    }
}
