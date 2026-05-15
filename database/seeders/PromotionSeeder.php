<?php

namespace Database\Seeders;

use App\Models\Promotion;
use Illuminate\Database\Seeder;

class PromotionSeeder extends Seeder
{
    public function run(): void
    {
        Promotion::updateOrCreate(['slug' => 'tet-2026'], [
            'title' => ['vi' => 'Ưu đãi Tết 2026 — Giảm 20%', 'en' => 'Tet 2026 — 20% off'],
            'description' => ['vi' => 'Áp dụng tất cả combo từ 1/1 - 28/2.', 'en' => 'All combos from Jan 1 to Feb 28.'],
            'starts_at' => now(),
            'ends_at' => now()->addMonths(2),
            'is_active' => true,
        ]);
    }
}
