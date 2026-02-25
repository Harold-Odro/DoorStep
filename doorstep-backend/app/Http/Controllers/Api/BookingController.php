<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\BookingRequest;
use App\Http\Resources\BookingResource;
use App\Mail\BookingConfirmationMail;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        $bookings = $request->user()
            ->bookings()
            ->with(['service', 'staff'])
            ->orderBy('booking_date', 'desc')
            ->get();

        return BookingResource::collection($bookings);
    }

    public function store(BookingRequest $request)
    {
        $booking = Booking::create([
            'user_id' => $request->user()->id,
            ...$request->validated(),
        ]);

        $booking->load(['user', 'service', 'staff']);

        Mail::to($request->user()->email)->send(new BookingConfirmationMail($booking));

        return new BookingResource($booking);
    }

    public function show(Request $request, Booking $booking)
    {
        if ($booking->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Forbidden.'], 403);
        }

        $booking->load(['user', 'service', 'staff']);
        return new BookingResource($booking);
    }

    public function cancel(Request $request, Booking $booking)
    {
        if ($booking->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Forbidden.'], 403);
        }

        if (!in_array($booking->status, ['pending', 'confirmed'])) {
            return response()->json([
                'message' => 'Only pending or confirmed bookings can be cancelled.',
            ], 422);
        }

        $booking->update(['status' => 'cancelled']);
        $booking->load(['service', 'staff']);

        return new BookingResource($booking);
    }
}
