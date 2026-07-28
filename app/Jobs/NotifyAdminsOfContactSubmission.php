<?php

namespace App\Jobs;

use App\Filament\Resources\ContactSubmissionResource;
use App\Mail\ContactSubmissionAlert;
use App\Models\ContactSubmission;
use App\Models\SiteSetting;
use App\Models\User;
use Filament\Notifications\Actions\Action;
use Filament\Notifications\Notification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class NotifyAdminsOfContactSubmission implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(public int $contactSubmissionId) {}

    public function handle(): void
    {
        $submission = ContactSubmission::find($this->contactSubmissionId);
        if (! $submission) {
            return;
        }

        $admins = User::role(User::frontDeskRoles())->get();
        Notification::make()
            ->title('Liên hệ mới: '.$submission->subject)
            ->body(sprintf('%s — %s', $submission->name, $submission->message))
            ->icon('heroicon-o-envelope')
            ->actions([
                Action::make('view')
                    ->label('Xem')
                    ->url(ContactSubmissionResource::getUrl('edit', ['record' => $submission])),
            ])
            ->sendToDatabase($admins)
            ->broadcast($admins);

        $notificationEmails = collect(SiteSetting::current()->booking_notification_emails ?? [])->filter();

        if ($notificationEmails->isNotEmpty()) {
            Mail::to($notificationEmails->all())->send(new ContactSubmissionAlert($submission));
        }
    }
}
