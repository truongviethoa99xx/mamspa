<?php

namespace App\Mail;

use App\Models\Booking;
use App\Models\SiteSetting;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class BookingAdminAlert extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(public Booking $booking) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Có lịch đặt mới #'.$this->booking->code,
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'mail.booking-admin-alert',
            with: [
                'booking' => $this->booking->load(['service', 'items.service']),
                'site' => SiteSetting::current(),
            ],
        );
    }
}
