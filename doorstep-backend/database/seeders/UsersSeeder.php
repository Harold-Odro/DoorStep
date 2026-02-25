<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UsersSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@doorstepauto.ca',
            'password' => bcrypt('password'),
            'role' => 'admin',
        ]);

        User::create([
            'name' => 'Alex Johnson',
            'email' => 'customer@doorstepauto.ca',
            'password' => bcrypt('password'),
            'role' => 'customer',
        ]);
    }
}
