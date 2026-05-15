<?php

namespace Database\Seeders;

use App\Models\Voucher;
use Illuminate\Database\Seeder;

class VoucherSeeder extends Seeder
{
    public function run(): void
    {
        Voucher::updateOrCreate(['code' => 'WELCOME10'], [
            'type' => 'percent', 'value' => 10, 'min_order_value' => 500000,
            'expires_at' => now()->addMonths(3), 'is_active' => true, 'source' => 'internal',
        ]);
        Voucher::updateOrCreate(['code' => 'TET100K'], [
            'type' => 'fixed', 'value' => 100000, 'min_order_value' => 700000,
            'expires_at' => now()->addMonths(1), 'is_active' => true, 'source' => 'internal',
        ]);
    }
}
