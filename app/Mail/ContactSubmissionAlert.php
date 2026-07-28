<?php

namespace App\Mail;

use App\Models\ContactSubmission;
use App\Models\SiteSetting;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactSubmissionAlert extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(public ContactSubmission $submission) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Liên hệ mới: '.$this->submission->subject,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'mail.contact-submission-alert',
            with: [
                'submission' => $this->submission,
                'site' => SiteSetting::current(),
            ],
        );
    }
}
