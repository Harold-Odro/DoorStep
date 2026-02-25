<?php

namespace Database\Seeders;

use App\Models\Staff;
use Illuminate\Database\Seeder;

class StaffSeeder extends Seeder
{
    public function run(): void
    {
        Staff::firstOrCreate(
            ['email' => 'tyler@doorstepauto.ca'],
            ['name' => 'Tyler Bennett', 'phone' => '604-555-0181']
        );

        Staff::firstOrCreate(
            ['email' => 'meilingp@doorstepauto.ca'],
            ['name' => 'Mei-Ling Park', 'phone' => '604-555-0193']
        );
    }
}
