<?php

use App\Models\Booking;
use App\Models\Branch;
use App\Models\Service;
use App\Models\ServiceCategory;
use App\Services\BookingService;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    // Không còn seeder mẫu (chi nhánh/dịch vụ do admin tự thêm) → tạo trực tiếp.
    $this->branch = Branch::create([
        'slug' => 'flow-branch',
        'name' => ['vi' => 'Chi nhánh kiểm thử'],
        'address' => '123 Flow',
        'phone' => '0900000000',
        'open_hours' => '09:00 - 21:00',
        'is_active' => true,
    ]);

    $category = ServiceCategory::create([
        'slug' => 'flow-category',
        'name' => ['vi' => 'Danh mục kiểm thử'],
    ]);

    $this->services = collect([
        ['slug' => 'flow-service-1', 'price' => 300000],
        ['slug' => 'flow-service-2', 'price' => 450000],
    ])->map(fn ($s) => Service::create([
        'slug' => $s['slug'],
        'name' => ['vi' => 'Dịch vụ '.$s['slug']],
        'description' => ['vi' => 'Mô tả'],
        'service_category_id' => $category->id,
        'duration' => 60,
        'price' => $s['price'],
        'is_active' => true,
    ]));
});

it('creates a booking when slot is available', function () {
    $service = $this->services[0];

    $booking = app(BookingService::class)->create([
        'branch_id' => $this->branch->id,
        'service_id' => $service->id,
        'date' => now()->addDay()->format('Y-m-d'),
        'time_slot' => '10:00',
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
    $response = $this->from('/')->post('/dat-lich', [
        'branch_id' => $this->branch->id,
        'service_id' => $this->services[0]->id,
        'items' => [
            ['service_id' => $this->services[0]->id, 'gender' => 'male'],
            ['service_id' => $this->services[1]->id, 'gender' => 'female'],
        ],
        'date' => now()->addDay()->format('Y-m-d'),
        'time_slot' => '10:00',
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
