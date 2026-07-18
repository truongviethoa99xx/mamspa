<?php

namespace App\Jobs;

use App\Filament\Resources\ContactSubmissionResource;
use App\Models\ContactSubmission;
use App\Models\User;
use Filament\Notifications\Actions\Action;
use Filament\Notifications\Notification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

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
    }
}
