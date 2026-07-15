<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Chỉ seed phần nền tĩnh: tài khoản/phân quyền, nội dung trang, chuỗi
        // giao diện đa ngôn ngữ. Dữ liệu động (chi nhánh, dịch vụ, slot,
        // voucher, khuyến mãi, blog) do admin tự thêm — KHÔNG seed mẫu.
        $this->call([
            RolePermissionSeeder::class,
            AdminUserSeeder::class,
            HomePageContentSeeder::class,
            AboutPageContentSeeder::class,
            ContactPageContentSeeder::class,
            ServicePageContentSeeder::class,
            SiteSettingSeeder::class,
            TranslationStringSeeder::class,
        ]);
    }
}
