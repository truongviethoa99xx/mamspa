<?php

use App\Models\Booking;
use App\Models\Branch;
use App\Models\Service;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;

uses(RefreshDatabase::class);

function createSecurityTestBooking(?User $user = null): Booking
{
    $branch = Branch::create([
        'slug' => 'security-branch',
        'name' => ['vi' => 'Chi nhánh kiểm thử'],
        'address' => '123 Test',
        'phone' => '0900000000',
        'is_active' => true,
    ]);

    $service = Service::create([
        'slug' => 'security-service',
        'name' => ['vi' => 'Dịch vụ kiểm thử'],
        'description' => ['vi' => 'Mô tả'],
        'category' => 'massage',
        'duration' => 60,
        'price' => 100000,
        'is_active' => true,
    ]);

    return Booking::create([
        'user_id' => $user?->id,
        'guest_name' => 'Nguyen Van A',
        'guest_phone' => '0900000000',
        'branch_id' => $branch->id,
        'service_id' => $service->id,
        'date' => now()->addDays(2)->format('Y-m-d'),
        'time_slot' => '09:00',
        'status' => 'pending',
        'total_price' => 100000,
        'payment_method' => 'vnpay',
        'payment_status' => 'unpaid',
    ]);
}

function createSecurityTestUser(string $email): User
{
    return User::create([
        'name' => 'Security User',
        'email' => $email,
        'password' => Hash::make('password'),
    ]);
}

it('does not expose guest booking success pages without the booking session', function () {
    $booking = createSecurityTestBooking();

    $this->get('/dat-lich/success/'.$booking->code)->assertForbidden();

    $this->withSession(['booking_code' => $booking->code])
        ->get('/dat-lich/success/'.$booking->code)
        ->assertOk();
});

it('prevents users from starting payment for someone elses booking', function () {
    $owner = createSecurityTestUser('owner@example.test');
    $other = createSecurityTestUser('other@example.test');
    $booking = createSecurityTestBooking($owner);

    $this->actingAs($other)
        ->get('/payment/vnpay/'.$booking->id)
        ->assertForbidden();
});
