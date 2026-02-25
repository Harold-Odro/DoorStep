<?php

namespace Database\Seeders;

use App\Models\Booking;
use App\Models\User;
use Illuminate\Database\Seeder;

class BookingsSeeder extends Seeder
{
    public function run(): void
    {
        $customer = User::where('email', 'customer@doorstepauto.ca')->first();

        $bookings = [
            [
                'user_id' => $customer->id,
                'service_id' => 1,
                'staff_id' => null,
                'booking_date' => now()->addDays(3)->toDateString(),
                'booking_time' => '10:00',
                'address' => '123 Granville Street, Vancouver, BC V6C 1T2',
                'status' => 'pending',
                'notes' => 'Please use the side entrance.',
            ],
            [
                'user_id' => $customer->id,
                'service_id' => 2,
                'staff_id' => null,
                'booking_date' => now()->addDays(5)->toDateString(),
                'booking_time' => '14:00',
                'address' => '456 Douglas Street, Victoria, BC V8V 2P8',
                'status' => 'pending',
                'notes' => null,
            ],
            [
                'user_id' => $customer->id,
                'service_id' => 3,
                'staff_id' => 1,
                'booking_date' => now()->addDays(1)->toDateString(),
                'booking_time' => '09:00',
                'address' => '789 Robson Street, Vancouver, BC V6Z 3B9',
                'status' => 'confirmed',
                'notes' => 'Gate code is 4521.',
            ],
            [
                'user_id' => $customer->id,
                'service_id' => 4,
                'staff_id' => 2,
                'booking_date' => now()->subDays(7)->toDateString(),
                'booking_time' => '11:00',
                'address' => '321 Fort Street, Victoria, BC V8W 1E7',
                'status' => 'completed',
                'notes' => null,
            ],
            [
                'user_id' => $customer->id,
                'service_id' => 1,
                'staff_id' => null,
                'booking_date' => now()->subDays(3)->toDateString(),
                'booking_time' => '16:00',
                'address' => '654 Burrard Street, Vancouver, BC V6C 2L7',
                'status' => 'cancelled',
                'notes' => 'Had to cancel due to schedule change.',
            ],
        ];

        foreach ($bookings as $booking) {
            Booking::firstOrCreate(
                ['user_id' => $booking['user_id'], 'address' => $booking['address'], 'booking_time' => $booking['booking_time']],
                $booking
            );
        }
    }
}
