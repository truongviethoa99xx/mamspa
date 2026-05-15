<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::firstOrCreate(
            ['email' => 'admin@mahaspa.vn'],
            [
                'name' => 'Maha Admin',
                'phone' => '+84934743026',
                'password' => Hash::make('password'),
                'preferred_lang' => 'vi',
                'email_verified_at' => now(),
            ]
        );
        $admin->assignRole('admin');
    }
}
