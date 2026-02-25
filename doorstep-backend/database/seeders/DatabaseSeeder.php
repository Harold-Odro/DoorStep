<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UsersSeeder::class,
            ServicesSeeder::class,
            StaffSeeder::class,
            BookingsSeeder::class,
        ]);
    }
}
