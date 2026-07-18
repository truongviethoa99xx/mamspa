<?php

namespace App\Services;

use App\Exceptions\BookingException;
use App\Jobs\SendBookingNotifications;
use App\Models\Booking;
use App\Models\Customer;
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
     *     items:array<int, array{service_id:int, gender?:string|null}>,
     *     date:string, time_slot:string,
     *     guest_name:string, guest_phone:string, guest_email?:string,
     *     contact_channel?:string|null, contact_value?:string|null, branch?:string|null, note?:string,
     *     user_id?:int|null, voucher_code?:string|null, payment_method?:string
     * } $data
     */
    public function create(array $data): Booking
    {
        return DB::transaction(function () use ($data) {
            $items = $data['items'] ?? [
                ['service_id' => $data['service_id'], 'gender' => $data['gender'] ?? null],
            ];
            $guestCount = count($items);

            $skipSlotCheck = $data['skip_slot_check'] ?? false;
            if (! $skipSlotCheck && ! $this->slots->isSlotAvailable($data['date'], $data['time_slot'], $guestCount)) {
                throw new BookingException('BOOKING_SLOT_UNAVAILABLE', 'Khung giờ này đã hết chỗ.');
            }

            $serviceIds = array_column($items, 'service_id');
            $services = Service::findMany($serviceIds)->keyBy('id');

            $subtotal = 0;
            foreach ($items as $item) {
                $subtotal += (int) ($services[$item['service_id']]->price ?? 0);
            }

            $totalPrice = $subtotal;
            if (! empty($data['voucher_code'])) {
                $voucher = $this->vouchers->validateCode($data['voucher_code'], $subtotal);
                if (! $voucher) {
                    throw new BookingException('VOUCHER_INVALID', 'Mã voucher không hợp lệ.');
                }
                $totalPrice = max(0, $subtotal - $this->vouchers->applyDiscount($voucher, $subtotal));
            }

            $customer = Customer::query()
                ->when(! empty($data['guest_email']), fn ($query) => $query->where('email', $data['guest_email']))
                ->when(empty($data['guest_email']), fn ($query) => $query->where('phone', $data['guest_phone']))
                ->first();

            if (! $customer) {
                $customer = Customer::create([
                    'name' => $data['guest_name'],
                    'phone' => $data['guest_phone'],
                    'email' => $data['guest_email'] ?? null,
                    'preferred_lang' => 'vi',
                ]);
            } else {
                $customer->fill([
                    'name' => $data['guest_name'],
                    'phone' => $data['guest_phone'],
                    'email' => $data['guest_email'] ?? $customer->email,
                ])->save();
            }

            $booking = Booking::create([
                'user_id' => $data['user_id'] ?? null,
                'customer_id' => $customer->id,
                'guest_name' => $data['guest_name'],
                'guest_phone' => $data['guest_phone'],
                'guest_email' => $data['guest_email'] ?? null,
                'contact_channel' => $data['contact_channel'] ?? null,
                'contact_value' => $data['contact_value'] ?? null,
                'branch' => $data['branch'] ?? null,
                'note' => $data['note'] ?? null,
                // Primary service keeps single-service code paths working.
                'service_id' => $items[0]['service_id'],
                'date' => $data['date'],
                'time_slot' => $data['time_slot'],
                'status' => 'pending',
                'total_price' => $totalPrice,
                'voucher_code' => $data['voucher_code'] ?? null,
                'payment_method' => $data['payment_method'] ?? 'cash',
                'payment_status' => 'unpaid',
            ]);

            foreach ($items as $item) {
                $booking->items()->create([
                    'service_id' => $item['service_id'],
                    'gender' => $item['gender'] ?? null,
                    'price' => (int) ($services[$item['service_id']]->price ?? 0),
                ]);
            }

            // A notification/queue failure must never roll back a confirmed booking.
            try {
                SendBookingNotifications::dispatch($booking->id);
            } catch (\Throwable $e) {
                report($e);
            }

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
        if (! $this->slots->isSlotAvailable($date, $timeSlot)) {
            throw new BookingException('BOOKING_SLOT_UNAVAILABLE', 'Khung giờ này đã hết chỗ.');
        }
        $booking->update(['date' => $date, 'time_slot' => $timeSlot]);

        return $booking;
    }
}
