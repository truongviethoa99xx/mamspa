<?php

namespace Database\Seeders;

use App\Models\BlogPost;
use Illuminate\Database\Seeder;

class BlogPostSeeder extends Seeder
{
    public function run(): void
    {
        BlogPost::updateOrCreate(['slug' => 'gioi-thieu-head-spa-21-buoc'], [
            'title' => ['vi' => 'Head Spa 21 bước — Hành trình dưỡng sinh tóc và da đầu', 'en' => '21-Step Head Spa — Hair & Scalp Wellness'],
            'excerpt' => [
                'vi' => 'Liệu trình head spa kết hợp bấm huyệt cổ truyền.',
                'en' => 'A head spa routine combining traditional acupressure.',
            ],
            'body' => [
                'vi' => '<p>Tại Maha Spa, head spa 21 bước được thiết kế để...</p>',
                'en' => '<p>At Maha Spa, our 21-step head spa is designed to...</p>',
            ],
            'is_published' => true,
            'published_at' => now()->subDays(3),
        ]);
    }
}
