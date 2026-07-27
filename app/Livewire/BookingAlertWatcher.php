<?php

namespace App\Livewire;

use Illuminate\Support\Facades\Auth;
use Livewire\Component;

class BookingAlertWatcher extends Component
{
    public ?string $lastSeenId = null;

    public function mount(): void
    {
        $this->lastSeenId = Auth::user()?->notifications()->value('id');
    }

    public function poll(): void
    {
        $user = Auth::user();

        if (! $user) {
            return;
        }

        $latest = $user->notifications()->first();

        if (! $latest || $latest->id === $this->lastSeenId) {
            return;
        }

        $this->lastSeenId = $latest->id;

        $this->dispatch(
            'booking-alert-show',
            title: $latest->data['title'] ?? 'Thông báo mới',
            body: $latest->data['body'] ?? '',
            url: $latest->data['actions'][0]['url'] ?? null,
        );
    }

    public function render()
    {
        return view('livewire.booking-alert-watcher');
    }
}
