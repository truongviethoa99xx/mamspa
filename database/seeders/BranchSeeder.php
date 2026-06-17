<?php

namespace Database\Seeders;

use App\Models\Branch;
use Illuminate\Database\Seeder;

class BranchSeeder extends Seeder
{
    public function run(): void
    {
        Branch::updateOrCreate(['slug' => 'heritage'], [
            'name' => ['vi' => 'Mầm Spa Lê Văn Sỹ', 'en' => 'Mầm Spa Le Van Sy'],
            'address' => '26 Lê Văn Sỹ, Phường 14, Quận 3, TP. Hồ Chí Minh',
            'phone' => '+84965806166',
            'open_hours' => '09:00 - 21:00',
            'lat' => 10.7917,
            'lng' => 106.6779,
            'is_active' => true,
        ]);
        Branch::updateOrCreate(['slug' => 'signature'], [
            'name' => ['vi' => 'Mầm Spa Lê Thị Riêng', 'en' => 'Mầm Spa Le Thi Rieng'],
            'address' => 'Đường Lê Thị Riêng, Phường Bến Thành, Quận 1, TP.HCM',
            'phone' => '+84965806166',
            'open_hours' => '10:00 - 22:00',
            'lat' => 10.7722,
            'lng' => 106.6930,
            'is_active' => true,
        ]);
    }
}
