<?php

namespace App\Http\Controllers;

use App\Exceptions\BookingException;
use App\Http\Requests\StoreBookingRequest;
use App\Models\Branch;
use App\Models\Service;
use App\Services\BookingService;
use App\Services\SlotService;
use App\Services\VoucherService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BookingController extends Controller
{
    public function index(Request $request): Response
    {
        $serviceSlug = $request->query('service');
        $branchSlug = $request->query('branch');

        return Inertia::render('Booking', [
            'preselect' => [
                'service' => $serviceSlug,
                'branch' => $branchSlug,
            ],
            'branches' => Branch::where('is_active', true)->get()->map(fn ($b) => [
                'id' => $b->id, 'slug' => $b->slug, 'name' => $b->name,
                'address' => $b->address, 'phone' => $b->phone,
            ])->all(),
            'services' => Service::active()->with('branches')->get()->map(fn ($s) => [
                'id' => $s->id, 'slug' => $s->slug, 'name' => $s->name,
                'category' => $s->category, 'duration' => $s->duration, 'price' => $s->price,
                'branch_ids' => $s->branches->pluck('id'),
            ])->all(),
        ]);
    }

    public function slots(Request $request, SlotService $svc)
    {
        $data = $request->validate([
            'branch_id' => 'required|integer|exists:branches,id',
            'date' => 'required|date|after_or_equal:today',
        ]);
        return response()->json([
            'data' => $svc->availableSlots($data['branch_id'], $data['date']),
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

        return redirect()->route('booking.success', $booking->code)
            ->with('success', 'Đặt lịch thành công! Mã: '.$booking->code);
    }

    public function success(string $code): Response
    {
        $booking = \App\Models\Booking::with(['branch', 'service'])
            ->where('code', $code)->firstOrFail();

        return Inertia::render('BookingSuccess', [
            'booking' => [
                'code' => $booking->code,
                'guest_name' => $booking->guest_name,
                'date' => $booking->date->format('Y-m-d'),
                'time_slot' => $booking->time_slot,
                'branch' => ['name' => $booking->branch->name, 'address' => $booking->branch->address],
                'service' => ['name' => $booking->service->name, 'duration' => $booking->service->duration],
                'total_price' => $booking->total_price,
                'status' => $booking->status,
            ],
        ]);
    }
}
