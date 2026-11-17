<?php

use App\Filament\Pages\PromoPopupSettings;
use App\Models\PromoPopup;
use App\Models\User;
use Database\Seeders\RolePermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;
use Livewire\Livewire;

uses(RefreshDatabase::class);

function configurePopup(array $overrides = []): PromoPopup
{
    $popup = PromoPopup::current();
    $popup->update([
        'is_active' => true,
        'title' => ['vi' => 'Giảm 20%', 'en' => '20% off'],
        'button_text' => ['vi' => 'Đặt lịch', 'en' => 'Book'],
        'button_url' => '/dat-lich',
        'button_background' => '#112233',
        'position' => 'bottom-left',
        'delay_seconds' => 5,
        ...$overrides,
    ]);

    return $popup;
}

function popupAdmin(string $email = 'popup-admin@example.test'): User
{
    test()->seed(RolePermissionSeeder::class);
    $admin = User::create(['name' => 'Admin', 'email' => $email, 'password' => 'password']);
    $admin->assignRole(User::ROLE_ADMIN);

    return $admin;
}

it('is a singleton that starts switched off', function () {
    $first = PromoPopup::current();
    $second = PromoPopup::current();

    expect($first->id)->toBe($second->id)
        ->and(PromoPopup::count())->toBe(1)
        ->and($first->is_active)->toBeFalse();
});

it('is hidden outside the active flag and time window', function () {
    $popup = configurePopup();
    expect(PromoPopup::active()->count())->toBe(1);

    $popup->update(['is_active' => false]);
    expect(PromoPopup::active()->count())->toBe(0);

    $popup->update(['is_active' => true, 'starts_at' => now()->addHour()]);
    expect(PromoPopup::active()->count())->toBe(0);

    $popup->update(['starts_at' => now()->subDay(), 'ends_at' => now()->subMinute()]);
    expect(PromoPopup::active()->count())->toBe(0);

    $popup->update(['starts_at' => now()->subDay(), 'ends_at' => now()->addDay()]);
    expect(PromoPopup::active()->count())->toBe(1);
});

it('shares the popup with the public site only while it is live', function () {
    $popup = configurePopup();

    $this->get('/')->assertOk()->assertInertia(fn (AssertableInertia $page) => $page
        ->where('promo_popup.title.vi', 'Giảm 20%')
        ->where('promo_popup.title.en', '20% off')
        ->where('promo_popup.button_url', '/dat-lich')
        ->where('promo_popup.button_background', '#112233')
        ->where('promo_popup.position', 'bottom-left')
        ->where('promo_popup.delay_seconds', 5));

    $popup->update(['is_active' => false]);

    $this->get('/')->assertOk()->assertInertia(fn (AssertableInertia $page) => $page->where('promo_popup', null));
});

it('lets admins open the popup page and keeps customers out', function () {
    $admin = popupAdmin();
    $customer = User::create(['name' => 'Khách', 'email' => 'popup-customer@example.test', 'password' => 'password']);

    $this->actingAs($admin)->get(PromoPopupSettings::getUrl())->assertOk();
    $this->actingAs($customer)->get(PromoPopupSettings::getUrl())->assertForbidden();
});

it('saves position, time window and button settings from the CMS form', function () {
    $this->actingAs(popupAdmin('popup-form@example.test'));

    Livewire::test(PromoPopupSettings::class)
        ->fillForm([
            'is_active' => true,
            'title' => ['vi' => 'Ưu đãi tháng 12', 'en' => 'December offer'],
            'description' => ['vi' => 'Giảm 20%'],
            'button_text' => ['vi' => 'Đặt lịch ngay'],
            'button_url' => '/dat-lich',
            'button_background' => '#556B3F',
            'button_text_color' => '#FFFFFF',
            'position' => 'top-right',
            'delay_seconds' => 4,
            'starts_at' => '2026-12-01 08:00:00',
            'ends_at' => '2026-12-31 23:00:00',
        ])
        ->call('save')
        ->assertHasNoFormErrors();

    $popup = PromoPopup::firstOrFail();
    expect(PromoPopup::count())->toBe(1)
        ->and($popup->is_active)->toBeTrue()
        ->and($popup->position)->toBe('top-right')
        ->and($popup->delay_seconds)->toBe(4)
        ->and($popup->title['en'])->toBe('December offer')
        ->and($popup->ends_at->format('Y-m-d H:i'))->toBe('2026-12-31 23:00');
});

it('rejects an end time earlier than the start time', function () {
    $this->actingAs(popupAdmin('popup-form2@example.test'));

    Livewire::test(PromoPopupSettings::class)
        ->fillForm([
            'title' => ['vi' => 'X'],
            'position' => 'center',
            'delay_seconds' => 0,
            'starts_at' => '2026-12-31 10:00:00',
            'ends_at' => '2026-12-01 10:00:00',
        ])
        ->call('save')
        ->assertHasFormErrors(['ends_at']);
});

it('requires a button link when the button has text', function () {
    $this->actingAs(popupAdmin('popup-form3@example.test'));

    Livewire::test(PromoPopupSettings::class)
        ->fillForm([
            'title' => ['vi' => 'X'],
            'button_text' => ['vi' => 'Đặt lịch ngay'],
            'button_url' => null,
            'position' => 'center',
            'delay_seconds' => 0,
        ])
        ->call('save')
        ->assertHasFormErrors(['button_url' => 'required']);
});
