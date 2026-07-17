<?php

use App\Models\Booking;
use App\Models\Service;
use App\Models\ServiceCategory;
use App\Support\GuestBookings;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

function createGuestCookieService(): Service
{
    $category = ServiceCategory::create([
        'slug' => 'guest-cookie-category',
        'name' => ['vi' => 'Danh mục kiểm thử'],
    ]);

    return Service::create([
        'slug' => 'guest-cookie-service',
        'name' => ['vi' => 'Dịch vụ kiểm thử'],
        'description' => ['vi' => 'Mô tả'],
        'service_category_id' => $category->id,
        'duration' => 60,
        'price' => 200000,
        'is_active' => true,
    ]);
}

function createGuestCookieBooking(): Booking
{
    return Booking::create([
        'guest_name' => 'Cookie Guest',
        'guest_phone' => '+84900000001',
        'service_id' => createGuestCookieService()->id,
        'date' => now()->addDays(3)->format('Y-m-d'),
        'time_slot' => '10:00',
        'status' => 'pending',
        'total_price' => 200000,
        'payment_status' => 'unpaid',
    ]);
}

it('remembers a guest booking in the cookie after booking', function () {
    $service = createGuestCookieService();

    $response = $this->post('/dat-lich', [
        'service_id' => $service->id,
        'date' => now()->addDay()->format('Y-m-d'),
        'time_slot' => '10:00',
        'guest_name' => 'Cookie Guest',
        'guest_phone' => '+84900000001',
    ]);

    $booking = Booking::latest('id')->first();

    expect($booking)->not->toBeNull();
    $response->assertCookie(GuestBookings::COOKIE, json_encode([$booking->code]));
});

it('shows guest bookings from the cookie on my-bookings', function () {
    $booking = createGuestCookieBooking();

    $this->withCookie(GuestBookings::COOKIE, json_encode([$booking->code]))
        ->get('/my-bookings/')
        ->assertOk()
        ->assertInertia(fn ($assert) => $assert
            ->component('MyBookings')
            ->has('bookings', 1)
            ->where('bookings.0.code', $booking->code));
});

it('hides bookings that are not in the guest cookie', function () {
    createGuestCookieBooking();

    $this->get('/my-bookings/')
        ->assertOk()
        ->assertInertia(fn ($assert) => $assert
            ->component('MyBookings')
            ->has('bookings', 0));
});

it('lets a guest cancel their own booking via the cookie', function () {
    $booking = createGuestCookieBooking();

    $this->withCookie(GuestBookings::COOKIE, json_encode([$booking->code]))
        ->post('/my-bookings/'.$booking->id.'/cancel')
        ->assertRedirect();

    expect($booking->fresh()->status)->toBe('cancelled');
});

it('forbids cancelling a booking that is not in the guest cookie', function () {
    $booking = createGuestCookieBooking();

    $this->post('/my-bookings/'.$booking->id.'/cancel')->assertForbidden();

    expect($booking->fresh()->status)->not->toBe('cancelled');
});

it('forbids guests from starting payment for a booking outside their cookie', function () {
    $booking = createGuestCookieBooking();

    $this->get('/payment/vnpay/'.$booking->id.'/')->assertForbidden();
});
