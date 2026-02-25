<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServicesSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'name' => 'Exterior Wash',
                'description' => 'A thorough exterior rinse and hand wash leaving your car spotless and streak-free.',
                'price' => 19.00,
                'duration_minutes' => 30,
            ],
            [
                'name' => 'Full Wash',
                'description' => 'Complete exterior wash plus interior vacuum and full wipe-down of all surfaces.',
                'price' => 39.00,
                'duration_minutes' => 60,
            ],
            [
                'name' => 'Interior Detailing',
                'description' => 'A deep clean of every interior surface — seats, dash, door panels, and carpets.',
                'price' => 79.00,
                'duration_minutes' => 90,
            ],
            [
                'name' => 'Premium Package',
                'description' => 'Our best: full exterior wash, interior detailing, hand wax, and paint polish.',
                'price' => 119.00,
                'duration_minutes' => 120,
            ],
        ];

        foreach ($services as $service) {
            Service::firstOrCreate(['name' => $service['name']], $service);
        }
    }
}
