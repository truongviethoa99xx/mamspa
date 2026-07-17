<?php

namespace App\Http\Controllers;

use App\Exceptions\BookingException;
use App\Http\Requests\StoreBookingRequest;
use App\Models\Booking;
use App\Models\Service;
use App\Services\BookingService;
use App\Services\SlotService;
use App\Services\VoucherService;
use App\Support\GuestBookings;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BookingController extends Controller
{
    public function index(Request $request, SlotService $slots): Response
    {
        $serviceSlug = $request->query('service');

        return Inertia::render('Booking', [
            'preselect' => [
                'service' => $serviceSlug,
            ],
            'openHours' => $slots->openHours(),
            'services' => Service::active()->with('category')->get()->map(fn ($s) => [
                'id' => $s->id, 'slug' => $s->slug, 'name' => $s->name,
                'category' => $s->category?->name, 'duration' => $s->duration, 'price' => $s->price,
            ])->all(),
        ]);
    }

    public function validateVoucher(Request $request, VoucherService $svc)
    {
        $data = $request->validate([
            'code' => 'required|string',
            'order_value' => 'required|integer|min:0',
        ]);
        $voucher = $svc->validateCode($data['code'], $data['order_value']);
        if (! $voucher) {
            return response()->json([
                'success' => false,
                'error' => 'VOUCHER_INVALID',
                'message' => 'Mã voucher không hợp lệ hoặc đã hết hạn.',
            ], 422);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'code' => $voucher->code,
                'type' => $voucher->type,
                'value' => $voucher->value,
                'discount' => $svc->applyDiscount($voucher, $data['order_value']),
            ],
        ]);
    }

    public function store(StoreBookingRequest $request, BookingService $svc): RedirectResponse
    {
        try {
            $booking = $svc->create([
                ...$request->validated(),
                'user_id' => $request->user()?->id,
            ]);
        } catch (BookingException $e) {
            return back()->with('error', $e->getMessage())->withInput();
        }

        // Khách chưa đăng nhập: nhớ mã booking qua cookie để xem lại ở "Lịch của tôi".
        if (! $request->user()) {
            GuestBookings::remember($request, $booking->code);
        }

        // Inline forms (e.g. the home page block) show a success modal in place
        // instead of redirecting to the dedicated success page.
        if ($request->boolean('inline')) {
            return back()->with('booking_code', $booking->code);
        }

        return redirect()->route('booking.success', $booking->code)
            ->with('success', 'Đặt lịch thành công! Mã: '.$booking->code)
            ->with('booking_code', $booking->code);
    }

    public function success(string $code): Response
    {
        $booking = Booking::with(['service', 'items.service'])
            ->where('code', $code)->firstOrFail();

        $user = request()->user();
        abort_unless(
            ($booking->user_id && $user && $booking->user_id === $user->id)
                || session('booking_code') === $booking->code,
            403
        );

        return Inertia::render('BookingSuccess', [
            'booking' => [
                'code' => $booking->code,
                'guest_name' => $booking->guest_name,
                'date' => $booking->date->format('Y-m-d'),
                'time_slot' => $booking->time_slot,
                'service' => ['name' => $booking->service->name, 'duration' => $booking->service->duration],
                'items' => $booking->items->map(fn ($it) => [
                    'name' => $it->service->name,
                    'duration' => $it->service->duration,
                    'gender' => $it->gender,
                    'price' => $it->price,
                ])->values(),
                'total_price' => $booking->total_price,
                'status' => $booking->status,
            ],
        ]);
    }
}
