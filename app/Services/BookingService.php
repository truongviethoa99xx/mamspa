<?php

namespace App\Services;

use App\Exceptions\BookingException;
use App\Jobs\SendBookingNotifications;
use App\Models\Booking;
use App\Models\Service;
use Illuminate\Support\Facades\DB;

class BookingService
{
    public function __construct(
        protected SlotService $slots,
        protected VoucherService $vouchers,
    ) {}

    /**
     * @param array{
     *     branch_id:int, service_id:int, date:string, time_slot:string,
     *     guest_name:string, guest_phone:string, guest_email?:string, note?:string,
     *     user_id?:int|null, voucher_code?:string|null, payment_method?:string
     * } $data
     */
    public function create(array $data): Booking
    {
        return DB::transaction(function () use ($data) {
            if (! $this->slots->isSlotAvailable($data['branch_id'], $data['date'], $data['time_slot'])) {
                throw new BookingException('BOOKING_SLOT_UNAVAILABLE', 'Khung giờ này đã hết chỗ.');
            }

            $service = Service::findOrFail($data['service_id']);
            $totalPrice = $service->price;

            if (! empty($data['voucher_code'])) {
                $voucher = $this->vouchers->validateCode($data['voucher_code'], $totalPrice);
                if (! $voucher) {
                    throw new BookingException('VOUCHER_INVALID', 'Mã voucher không hợp lệ.');
                }
                $totalPrice = max(0, $totalPrice - $this->vouchers->applyDiscount($voucher, $totalPrice));
            }

            $booking = Booking::create([
                'user_id' => $data['user_id'] ?? null,
                'guest_name' => $data['guest_name'],
                'guest_phone' => $data['guest_phone'],
                'guest_email' => $data['guest_email'] ?? null,
                'note' => $data['note'] ?? null,
                'branch_id' => $data['branch_id'],
                'service_id' => $data['service_id'],
                'date' => $data['date'],
                'time_slot' => $data['time_slot'],
                'status' => 'pending',
                'total_price' => $totalPrice,
                'voucher_code' => $data['voucher_code'] ?? null,
                'payment_method' => $data['payment_method'] ?? 'cash',
                'payment_status' => 'unpaid',
            ]);

            SendBookingNotifications::dispatch($booking->id);

            return $booking;
        });
    }

    public function cancel(Booking $booking): Booking
    {
        if (! in_array($booking->status, ['pending', 'confirmed'])) {
            throw new BookingException('BOOKING_NOT_CANCELLABLE', 'Booking không thể huỷ ở trạng thái này.');
        }
        if ($booking->date->lt(now()->addDay())) {
            throw new BookingException('BOOKING_CANCEL_TOO_LATE', 'Phải huỷ trước 24h.');
        }
        $booking->update(['status' => 'cancelled']);
        return $booking;
    }

    public function reschedule(Booking $booking, string $date, string $timeSlot): Booking
    {
        if (! $this->slots->isSlotAvailable($booking->branch_id, $date, $timeSlot)) {
            throw new BookingException('BOOKING_SLOT_UNAVAILABLE', 'Khung giờ này đã hết chỗ.');
        }
        $booking->update(['date' => $date, 'time_slot' => $timeSlot]);
        return $booking;
    }
}
