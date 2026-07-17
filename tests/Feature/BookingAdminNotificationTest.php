<?php

use App\Jobs\SendBookingNotifications;
use App\Models\Service;
use App\Models\ServiceCategory;
use App\Models\User;
use App\Services\BookingService;
use App\Services\SmsService;
use Database\Seeders\RolePermissionSeeder;
use Filament\Notifications\DatabaseNotification;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notification;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed(RolePermissionSeeder::class);

    $category = ServiceCategory::create([
        'slug' => 'notif-category',
        'name' => ['vi' => 'Danh mục kiểm thử'],
    ]);

    $this->service = Service::create([
        'slug' => 'notif-service',
        'name' => ['vi' => 'Dịch vụ kiểm thử'],
        'description' => ['vi' => 'Mô tả'],
        'service_category_id' => $category->id,
        'duration' => 60,
        'price' => 300000,
        'is_active' => true,
    ]);
});

function bookingInternalUser(string $role): User
{
    $user = User::create([
        'name' => ucfirst($role),
        'email' => $role.'@example.test',
        'password' => 'password',
    ]);

    $user->assignRole($role);

    return $user;
}

it('dispatches SendBookingNotifications when a booking is created', function () {
    Bus::fake();

    $booking = app(BookingService::class)->create([
        'service_id' => $this->service->id,
        'date' => now()->addDay()->format('Y-m-d'),
        'time_slot' => '10:00',
        'guest_name' => 'Test User',
        'guest_phone' => '+84900000000',
    ]);

    Bus::assertDispatched(
        SendBookingNotifications::class,
        fn (SendBookingNotifications $job) => $job->bookingId === $booking->id,
    );
});

it('notifies only admin-role users about a new booking, not customers', function () {
    $admin = bookingInternalUser(User::ROLE_ADMIN);
    $customer = User::create([
        'name' => 'Customer',
        'email' => 'customer@example.test',
        'password' => 'password',
    ]);
    $customer->assignRole(User::ROLE_CUSTOMER);

    Mail::fake();
    Notification::fake();

    $booking = app(BookingService::class)->create([
        'service_id' => $this->service->id,
        'date' => now()->addDay()->format('Y-m-d'),
        'time_slot' => '10:00',
        'guest_name' => 'Test User',
        'guest_phone' => '+84900000000',
        'guest_email' => 'guest@example.test',
    ]);

    (new SendBookingNotifications($booking->id))->handle(app(SmsService::class));

    Notification::assertSentTo($admin, DatabaseNotification::class);
    Notification::assertNotSentTo($customer, DatabaseNotification::class);
});
