<?php

namespace App\Jobs;

use App\Filament\Resources\BookingResource;
use App\Mail\BookingConfirmation;
use App\Models\Booking;
use App\Models\SiteSetting;
use App\Models\User;
use App\Services\SmsService;
use Filament\Notifications\Actions\Action;
use Filament\Notifications\Notification;
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
        $booking = Booking::with(['service'])->find($this->bookingId);
        if (! $booking) {
            return;
        }

        $brandName = SiteSetting::current()->brand_name ?: 'Mầm Spa';

        if ($booking->guest_email) {
            Mail::to($booking->guest_email)->send(new BookingConfirmation($booking));
        }

        if ($booking->guest_phone) {
            $msg = sprintf(
                'Mam Spa: Da nhan booking #%s, %s %s tai %s. Chung toi se goi xac nhan.',
                $booking->code,
                $booking->date->format('d/m'),
                $booking->time_slot,
                $brandName,
            );
            $sms->send($booking->guest_phone, $msg);
        }

        $admins = User::role(User::frontDeskRoles())->get();
        Notification::make()
            ->title('Đặt lịch mới #'.$booking->code)
            ->body(sprintf(
                '%s — %s %s tại %s',
                $booking->guest_name,
                $booking->date->format('d/m/Y'),
                $booking->time_slot,
                $brandName,
            ))
            ->icon('heroicon-o-calendar')
            ->actions([
                Action::make('view')
                    ->label('Xem')
                    ->url(BookingResource::getUrl('edit', ['record' => $booking])),
            ])
            ->sendToDatabase($admins)
            ->broadcast($admins);
    }
}
