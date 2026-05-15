<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactMessage extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(public array $payload) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Liên hệ mới: '.($this->payload['subject'] ?? 'từ website'),
            replyTo: $this->payload['email'] ?? null,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'mail.contact-message',
            with: ['p' => $this->payload],
        );
    }
}
