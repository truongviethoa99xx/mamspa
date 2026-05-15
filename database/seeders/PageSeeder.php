<?php

namespace Database\Seeders;

use App\Models\Block;
use App\Models\Page;
use App\Models\Service;
use Illuminate\Database\Seeder;

class PageSeeder extends Seeder
{
    public function run(): void
    {
        $home = Page::updateOrCreate(['slug' => 'home'], [
            'title' => ['vi' => 'Trang chủ', 'en' => 'Home'],
            'is_published' => true,
            'seo_meta' => [
                'description' => 'Maha Spa Đà Nẵng — Hành trình cân bằng Thân Tâm Trí.',
            ],
        ]);

        $home->blocks()->delete();

        $featuredIds = Service::featured()->pluck('id')->all();

        $blocks = [
            [
                'type' => 'hero',
                'order' => 1,
                'data' => [
                    'title' => ['vi' => 'Hành trình cân bằng Thân – Tâm – Trí', 'en' => 'The Journey to Balance Body – Mind – Spirit'],
                    'subtitle' => ['vi' => 'Maha Spa — Trải nghiệm spa truyền thống Việt giữa lòng Đà Nẵng', 'en' => 'Traditional Vietnamese spa experience in Da Nang'],
                    'image' => '/images/hero.jpg',
                    'cta_text' => 'Đặt lịch ngay',
                    'cta_link' => '/booking',
                ],
            ],
            [
                'type' => 'service_list',
                'order' => 2,
                'data' => [
                    'title' => ['vi' => 'Dịch vụ nổi bật', 'en' => 'Featured Services'],
                    'service_ids' => $featuredIds,
                    'columns' => 3,
                ],
            ],
            [
                'type' => 'branches',
                'order' => 3,
                'data' => [],
            ],
            [
                'type' => 'testimonial',
                'order' => 4,
                'data' => [
                    'items' => [
                        ['name' => 'Mai Anh', 'content' => 'Liệu trình head spa tuyệt vời, nhân viên rất tận tâm.', 'rating' => 5],
                        ['name' => 'Sarah K.', 'content' => 'Best spa experience in Da Nang. Highly recommend!', 'rating' => 5],
                    ],
                ],
            ],
            [
                'type' => 'cta',
                'order' => 5,
                'data' => [
                    'title' => ['vi' => 'Sẵn sàng cho hành trình của bạn?', 'en' => 'Ready for your journey?'],
                    'description' => ['vi' => 'Đặt lịch online hoặc gọi hotline.', 'en' => 'Book online or call us.'],
                    'button_text' => 'Đặt lịch',
                    'button_link' => '/booking',
                ],
            ],
        ];

        foreach ($blocks as $block) {
            Block::create(array_merge($block, ['page_id' => $home->id, 'is_active' => true]));
        }
    }
}
