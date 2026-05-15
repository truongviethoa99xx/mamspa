<?php

namespace Database\Seeders;

use App\Models\Branch;
use Illuminate\Database\Seeder;

class BranchSeeder extends Seeder
{
    public function run(): void
    {
        Branch::updateOrCreate(['slug' => 'heritage'], [
            'name' => ['vi' => 'Maha Heritage', 'en' => 'Maha Heritage'],
            'address' => '26 Nguyễn Văn Thoại, Đà Nẵng',
            'phone' => '+84934743026',
            'open_hours' => '09:00 - 22:00',
            'lat' => 16.0544,
            'lng' => 108.2400,
            'is_active' => true,
        ]);
        Branch::updateOrCreate(['slug' => 'signature'], [
            'name' => ['vi' => 'Maha Signature', 'en' => 'Maha Signature'],
            'address' => '185 Hồ Nghinh, Đà Nẵng',
            'phone' => '+84978456185',
            'open_hours' => '09:00 - 22:00',
            'lat' => 16.0712,
            'lng' => 108.2447,
            'is_active' => true,
        ]);
    }
}
