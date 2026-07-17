<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Đảm bảo tồn tại đúng 1 dòng singleton `about_page_contents`. Toàn bộ nội dung
 * (Hero, Our Story, Our Philosophy...) để trống — GioiThieuController tự fallback
 * về nội dung mặc định khớp thiết kế cho tới khi admin nhập/nhập ảnh thật ở
 * /admin/about-page-settings.
 */
class AboutPageContentSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('about_page_contents')->updateOrInsert(['id' => 1], [
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
