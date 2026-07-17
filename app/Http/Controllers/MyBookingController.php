<?php

namespace App\Http\Controllers;

use App\Exceptions\BookingException;
use App\Models\Booking;
use App\Services\BookingService;
use App\Support\GuestBookings;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MyBookingController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();
        $guestCodes = GuestBookings::codes($request);

        if (! $user && $guestCodes === []) {
            return Inertia::render('MyBookings', ['bookings' => []]);
        }

        $bookings = Booking::with(['service'])
            ->where(function ($query) use ($user, $guestCodes) {
                if ($user) {
                    $query->orWhere('user_id', $user->id);
                }
                if ($guestCodes !== []) {
                    $query->orWhereIn('code', $guestCodes);
                }
            })
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
                'service' => ['slug' => $b->service->slug, 'name' => $b->service->name, 'duration' => $b->service->duration],
            ]);

        return Inertia::render('MyBookings', ['bookings' => $bookings]);
    }

    public function cancel(Request $request, Booking $booking, BookingService $svc): RedirectResponse
    {
        abort_unless($this->authorizes($request, $booking), 403);
        try {
            $svc->cancel($booking);
        } catch (BookingException $e) {
            return back()->with('error', $e->getMessage());
        }

        return back()->with('success', 'Đã huỷ booking '.$booking->code);
    }

    private function authorizes(Request $request, Booking $booking): bool
    {
        $user = $request->user();

        return ($user && $booking->user_id === $user->id)
            || GuestBookings::owns($request, $booking->code);
    }
}
