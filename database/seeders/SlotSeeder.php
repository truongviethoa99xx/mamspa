<?php

namespace Database\Seeders;

use App\Models\Branch;
use App\Models\Slot;
use Illuminate\Database\Seeder;

class SlotSeeder extends Seeder
{
    public function run(): void
    {
        $times = [
            ['09:00', '11:00'],
            ['11:30', '13:30'],
            ['14:00', '16:00'],
            ['16:30', '18:30'],
            ['19:00', '21:00'],
        ];

        foreach (Branch::all() as $branch) {
            foreach ($times as [$start, $end]) {
                Slot::updateOrCreate(
                    ['branch_id' => $branch->id, 'start_time' => $start],
                    ['end_time' => $end, 'capacity' => 2, 'is_active' => true]
                );
            }
        }
    }
}
