<?php

use App\Models\Branch;
use App\Models\Service;
use App\Models\Slot;
use App\Services\BookingService;
use Database\Seeders\BranchSeeder;
use Database\Seeders\ServiceSeeder;
use Database\Seeders\SlotSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed([BranchSeeder::class, ServiceSeeder::class, SlotSeeder::class]);
});

it('creates a booking when slot is available', function () {
    $branch = Branch::first();
    $service = Service::first();
    $slot = Slot::where('branch_id', $branch->id)->first();

    $booking = app(BookingService::class)->create([
        'branch_id' => $branch->id,
        'service_id' => $service->id,
        'date' => now()->addDay()->format('Y-m-d'),
        'time_slot' => $slot->start_time->format('H:i'),
        'guest_name' => 'Test User',
        'guest_phone' => '+84900000000',
    ]);

    expect($booking->status)->toBe('pending')
        ->and($booking->code)->toStartWith('MS')
        ->and($booking->total_price)->toBe($service->price);

    $this->assertDatabaseHas('customers', [
        'name' => 'Test User',
        'phone' => '+84900000000',
        'preferred_lang' => 'vi',
    ]);

    expect($booking->customer)->not->toBeNull();
});
