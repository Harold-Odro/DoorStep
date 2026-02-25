<?php

namespace Database\Seeders;

use App\Models\Staff;
use Illuminate\Database\Seeder;

class StaffSeeder extends Seeder
{
    public function run(): void
    {
        Staff::create([
            'name' => 'Tyler Bennett',
            'email' => 'tyler@doorstepauto.ca',
            'phone' => '604-555-0181',
        ]);

        Staff::create([
            'name' => 'Mei-Ling Park',
            'email' => 'meilingp@doorstepauto.ca',
            'phone' => '604-555-0193',
        ]);
    }
}
