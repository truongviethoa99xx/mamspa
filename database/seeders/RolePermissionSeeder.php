<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        foreach (['admin', 'staff', 'customer'] as $role) {
            Role::firstOrCreate(['name' => $role]);
        }
    }
}
