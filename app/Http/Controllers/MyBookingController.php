<?php

namespace App\Http\Controllers;

use App\Exceptions\BookingException;
use App\Models\Booking;
use App\Services\BookingService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MyBookingController extends Controller
{
    public function index(Request $request): Response
    {
        $bookings = Booking::with(['branch', 'service'])
            ->where('user_id', $request->user()->id)
            ->orderByDesc('date')
            ->orderByDesc('time_slot')
            ->get()
            ->map(fn ($b) => [
                'id' => $b->id,
                'code' => $b->code,
                'date' => $b->date->format('Y-m-d'),
                'time_slot' => $b->time_slot,
                'status' => $b->status,
                'total_price' => $b->total_price,
                'payment_status' => $b->payment_status,
                'branch' => ['slug' => $b->branch->slug, 'name' => $b->branch->name],
                'service' => ['slug' => $b->service->slug, 'name' => $b->service->name, 'duration' => $b->service->duration],
            ]);

        return Inertia::render('MyBookings', ['bookings' => $bookings]);
    }

    public function cancel(Request $request, Booking $booking, BookingService $svc): RedirectResponse
    {
        abort_unless($booking->user_id === $request->user()->id, 403);
        try {
            $svc->cancel($booking);
        } catch (BookingException $e) {
            return back()->with('error', $e->getMessage());
        }
        return back()->with('success', 'Đã huỷ booking '.$booking->code);
    }
}
