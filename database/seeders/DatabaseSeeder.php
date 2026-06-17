<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RolePermissionSeeder::class,
            AdminUserSeeder::class,
            BranchSeeder::class,
            ServiceSeeder::class,
            SlotSeeder::class,
            VoucherSeeder::class,
            PromotionSeeder::class,
            BlogPostSeeder::class,
            TranslationStringSeeder::class,
        ]);
    }
}
