<?php

use App\Filament\Resources\PromoPopupResource;
use App\Models\PromoPopup;
use App\Models\User;
use Database\Seeders\RolePermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;

uses(RefreshDatabase::class);

function makePopup(array $overrides = []): PromoPopup
{
    return PromoPopup::create([
        'name' => 'Popup thử',
        'title' => ['vi' => 'Ưu đãi', 'en' => 'Offer'],
        'position' => 'center',
        ...$overrides,
    ]);
}

it('only returns popups that are active and inside their time window', function () {
    $always = makePopup(['name' => 'always']);
    $current = makePopup(['name' => 'current', 'starts_at' => now()->subDay(), 'ends_at' => now()->addDay()]);
    makePopup(['name' => 'inactive', 'is_active' => false]);
    makePopup(['name' => 'future', 'starts_at' => now()->addHour()]);
    makePopup(['name' => 'expired', 'ends_at' => now()->subMinute()]);

    expect(PromoPopup::active()->pluck('name')->all())
        ->toEqualCanonicalizing([$always->name, $current->name]);
});

it('shares active popups with the public site and hides the rest', function () {
    makePopup([
        'name' => 'shown',
        'title' => ['vi' => 'Giảm 20%', 'en' => '20% off'],
        'button_text' => ['vi' => 'Đặt lịch', 'en' => 'Book'],
        'button_url' => '/booking',
        'button_background' => '#112233',
        'position' => 'bottom-left',
        'delay_seconds' => 5,
    ]);
    makePopup(['name' => 'hidden', 'is_active' => false]);

    $this->get('/')
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->has('promo_popups', 1)
            ->where('promo_popups.0.title.vi', 'Giảm 20%')
            ->where('promo_popups.0.title.en', '20% off')
            ->where('promo_popups.0.button_url', '/booking')
            ->where('promo_popups.0.button_background', '#112233')
            ->where('promo_popups.0.position', 'bottom-left')
            ->where('promo_popups.0.delay_seconds', 5));
});

it('lets admins open the popup resource and keeps customers out', function () {
    $this->seed(RolePermissionSeeder::class);

    $admin = User::create(['name' => 'Admin', 'email' => 'popup-admin@example.test', 'password' => 'password']);
    $admin->assignRole(User::ROLE_ADMIN);
    $customer = User::create(['name' => 'Khách', 'email' => 'popup-customer@example.test', 'password' => 'password']);

    $this->actingAs($admin)->get(PromoPopupResource::getUrl('index'))->assertOk();
    $this->actingAs($customer)->get(PromoPopupResource::getUrl('index'))->assertForbidden();
});

it('creates a popup from the CMS form with position, time window and button colours', function () {
    $this->seed(RolePermissionSeeder::class);
    $admin = User::create(['name' => 'Admin', 'email' => 'popup-form@example.test', 'password' => 'password']);
    $admin->assignRole(User::ROLE_ADMIN);
    $this->actingAs($admin);

    Livewire\Livewire::test(PromoPopupResource\Pages\CreatePromoPopup::class)
        ->fillForm([
            'name' => 'Khuyến mãi tháng 12',
            'title' => ['vi' => 'Ưu đãi tháng 12', 'en' => 'December offer'],
            'description' => ['vi' => 'Giảm 20%'],
            'button_text' => ['vi' => 'Đặt lịch ngay'],
            'button_url' => '/booking',
            'button_background' => '#556B3F',
            'button_text_color' => '#FFFFFF',
            'position' => 'top-right',
            'delay_seconds' => 4,
            'starts_at' => '2026-12-01 08:00:00',
            'ends_at' => '2026-12-31 23:00:00',
            'is_active' => true,
        ])
        ->call('create')
        ->assertHasNoFormErrors();

    $popup = PromoPopup::firstOrFail();
    expect($popup->position)->toBe('top-right')
        ->and($popup->delay_seconds)->toBe(4)
        ->and($popup->getTranslation('title', 'en'))->toBe('December offer')
        ->and($popup->ends_at->format('Y-m-d H:i'))->toBe('2026-12-31 23:00');
});

it('rejects an end time earlier than the start time', function () {
    $this->seed(RolePermissionSeeder::class);
    $admin = User::create(['name' => 'Admin', 'email' => 'popup-form2@example.test', 'password' => 'password']);
    $admin->assignRole(User::ROLE_ADMIN);
    $this->actingAs($admin);

    Livewire\Livewire::test(PromoPopupResource\Pages\CreatePromoPopup::class)
        ->fillForm([
            'name' => 'Sai ngày',
            'title' => ['vi' => 'X'],
            'position' => 'center',
            'delay_seconds' => 0,
            'starts_at' => '2026-12-31 10:00:00',
            'ends_at' => '2026-12-01 10:00:00',
        ])
        ->call('create')
        ->assertHasFormErrors(['ends_at']);
});

it('requires a button link when the button has text', function () {
    $this->seed(RolePermissionSeeder::class);
    $admin = User::create(['name' => 'Admin', 'email' => 'popup-form3@example.test', 'password' => 'password']);
    $admin->assignRole(User::ROLE_ADMIN);
    $this->actingAs($admin);

    Livewire\Livewire::test(PromoPopupResource\Pages\CreatePromoPopup::class)
        ->fillForm([
            'name' => 'Thiếu link',
            'title' => ['vi' => 'X'],
            'button_text' => ['vi' => 'Đặt lịch ngay'],
            'button_url' => null,
            'position' => 'center',
            'delay_seconds' => 0,
        ])
        ->call('create')
        ->assertHasFormErrors(['button_url' => 'required']);
});
