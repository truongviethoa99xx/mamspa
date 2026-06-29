<?php

use App\Models\Booking;
use App\Models\Branch;
use App\Models\Service;
use App\Models\Slot;
use App\Models\Therapist;
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

it('creates a booking and customer from the public booking endpoint', function () {
    $branch = Branch::first();
    $services = Service::take(2)->get();
    $slot = Slot::where('branch_id', $branch->id)->first();

    $response = $this->from('/')->post('/dat-lich', [
        'branch_id' => $branch->id,
        'service_id' => $services[0]->id,
        'items' => [
            ['service_id' => $services[0]->id, 'gender' => 'male'],
            ['service_id' => $services[1]->id, 'gender' => 'female'],
        ],
        'date' => now()->addDay()->format('Y-m-d'),
        'time_slot' => $slot->start_time->format('H:i'),
        'guest_name' => 'Inline Guest',
        'guest_phone' => '+84 912345678',
        'guest_email' => 'inline@example.test',
        'note' => str_repeat('Khach chon nhieu dich vu. ', 30),
        'inline' => 1,
    ]);

    $response->assertRedirect('/');
    $response->assertSessionHas('booking_code');

    $booking = Booking::where('guest_email', 'inline@example.test')->first();

    expect($booking)->not->toBeNull()
        ->and($booking->customer)->not->toBeNull()
        ->and($booking->items)->toHaveCount(2);

    $this->assertDatabaseHas('customers', [
        'name' => 'Inline Guest',
        'phone' => '+84 912345678',
        'email' => 'inline@example.test',
    ]);
});

it('can assign a booking to a technician profile', function () {
    $branch = Branch::first();
    $service = Service::first();
    $slot = Slot::where('branch_id', $branch->id)->first();
    $therapist = Therapist::create([
        'name' => 'Ky thuat vien A',
        'phone' => '0900000001',
        'is_active' => true,
    ]);

    $booking = app(BookingService::class)->create([
        'branch_id' => $branch->id,
        'service_id' => $service->id,
        'date' => now()->addDay()->format('Y-m-d'),
        'time_slot' => $slot->start_time->format('H:i'),
        'guest_name' => 'Assigned Guest',
        'guest_phone' => '+84900000001',
    ]);

    $booking->update(['therapist_id' => $therapist->id]);

    expect($booking->fresh()->therapist->is($therapist))->toBeTrue();
});
