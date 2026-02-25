<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookingResource;
use App\Models\Booking;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $totalBookings = Booking::count();
        $pendingCount = Booking::where('status', 'pending')->count();
        $confirmedCount = Booking::where('status', 'confirmed')->count();
        $completedCount = Booking::where('status', 'completed')->count();
        $cancelledCount = Booking::where('status', 'cancelled')->count();

        $totalRevenue = Booking::where('status', 'completed')
            ->join('services', 'bookings.service_id', '=', 'services.id')
            ->sum('services.price');

        $recentBookings = Booking::with(['user', 'service'])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        return response()->json([
            'total_bookings' => $totalBookings,
            'pending_count' => $pendingCount,
            'confirmed_count' => $confirmedCount,
            'completed_count' => $completedCount,
            'cancelled_count' => $cancelledCount,
            'total_revenue' => $totalRevenue,
            'recent_bookings' => BookingResource::collection($recentBookings),
        ]);
    }
}
