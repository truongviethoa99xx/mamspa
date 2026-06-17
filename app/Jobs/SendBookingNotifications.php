<?php

namespace App\Jobs;

use App\Mail\BookingConfirmation;
use App\Models\Booking;
use App\Services\SmsService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendBookingNotifications implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(public int $bookingId) {}

    public function handle(SmsService $sms): void
    {
        $booking = Booking::with(['branch', 'service'])->find($this->bookingId);
        if (! $booking) {
            return;
        }

        if ($booking->guest_email) {
            Mail::to($booking->guest_email)->send(new BookingConfirmation($booking));
        }

        if ($booking->guest_phone) {
            $msg = sprintf(
                'Mam Spa: Da nhan booking #%s, %s %s tai %s. Chung toi se goi xac nhan.',
                $booking->code,
                $booking->date->format('d/m'),
                $booking->time_slot,
                $booking->branch->getTranslation('name', 'vi'),
            );
            $sms->send($booking->guest_phone, $msg);
        }
    }
}
