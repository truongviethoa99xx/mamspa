<?php

namespace Database\Seeders;

use App\Models\Customer;
use Illuminate\Database\Seeder;

/**
 * One-off import of the 7 real customers recovered from the legacy dump
 * (2026-07-14 .. 2026-07-16). The "Dev Test" record and the related
 * bookings were intentionally excluded — the branches/services they
 * referenced no longer exist after the branch removal in c3a4cb15.
 * Run manually: php artisan db:seed --class=LegacyCustomerImportSeeder
 */
class LegacyCustomerImportSeeder extends Seeder
{
    public function run(): void
    {
        $customers = [
            ['name' => 'Đỗ Ngọc Luyến', 'phone' => '+84 389725780', 'email' => null, 'created_at' => '2026-07-14 00:00:00'],
            ['name' => 'Liam price', 'phone' => '+61 0477952931', 'email' => 'liamprice420@gmail.com', 'created_at' => '2026-07-14 00:00:00'],
            ['name' => 'Vy', 'phone' => '+358 465865859', 'email' => null, 'created_at' => '2026-07-15 00:00:00'],
            ['name' => 'Grace Yang', 'phone' => '+886 955211740', 'email' => 'gracewen0914@gmail.com', 'created_at' => '2026-07-15 00:00:00'],
            ['name' => 'Sunny', 'phone' => '+886 988143366', 'email' => null, 'created_at' => '2026-07-16 00:00:00'],
            ['name' => 'ollie', 'phone' => '+886 0922150468', 'email' => 'suollie@gmail.com', 'created_at' => '2026-07-16 00:00:00'],
            ['name' => 'XINTANG jiang', 'phone' => '+886 903362653', 'email' => 'sara665860@gmail.com', 'created_at' => '2026-07-16 00:00:00'],
        ];

        foreach ($customers as $data) {
            Customer::firstOrCreate(
                $data['email'] ? ['email' => $data['email']] : ['phone' => $data['phone']],
                [
                    'name' => $data['name'],
                    'phone' => $data['phone'],
                    'email' => $data['email'],
                    'preferred_lang' => 'vi',
                    'created_at' => $data['created_at'],
                    'updated_at' => $data['created_at'],
                ]
            );
        }
    }
}
