<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UsersSeeder extends Seeder
{
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'admin@doorstepauto.ca'],
            ['name' => 'Admin User', 'password' => bcrypt('password'), 'role' => 'admin']
        );

        User::firstOrCreate(
            ['email' => 'customer@doorstepauto.ca'],
            ['name' => 'Alex Johnson', 'password' => bcrypt('password'), 'role' => 'customer']
        );
    }
}
