<?php

use App\Filament\Pages\HomePageSettings;
use App\Filament\Pages\SiteSettings;
use App\Filament\Resources\BookingResource;
use App\Filament\Resources\BranchResource;
use App\Filament\Resources\CustomerResource;
use App\Filament\Resources\TherapistResource;
use App\Filament\Resources\UserResource;
use App\Models\User;
use Database\Seeders\RolePermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed(RolePermissionSeeder::class);
});

function internalUser(string $role): User
{
    $user = User::create([
        'name' => ucfirst($role),
        'email' => $role.'@example.test',
        'password' => 'password',
    ]);

    $user->assignRole($role);

    return $user;
}

it('allows superadmin to manage staff accounts', function () {
    auth()->login(internalUser(User::ROLE_SUPERADMIN));

    expect(UserResource::canViewAny())->toBeTrue()
        ->and(UserResource::shouldRegisterNavigation())->toBeTrue()
        ->and(BookingResource::canViewAny())->toBeTrue()
        ->and(CustomerResource::canViewAny())->toBeTrue()
        ->and(TherapistResource::canViewAny())->toBeTrue()
        ->and(BranchResource::canViewAny())->toBeTrue()
        ->and(SiteSettings::canAccess())->toBeTrue();
});

it('allows admin to manage operations and content but not staff accounts', function () {
    auth()->login(internalUser(User::ROLE_ADMIN));

    expect(UserResource::canViewAny())->toBeFalse()
        ->and(BookingResource::canViewAny())->toBeTrue()
        ->and(CustomerResource::canViewAny())->toBeTrue()
        ->and(TherapistResource::canViewAny())->toBeTrue()
        ->and(BranchResource::canViewAny())->toBeTrue()
        ->and(SiteSettings::canAccess())->toBeTrue();
});

it('allows editor to manage content only', function () {
    auth()->login(internalUser(User::ROLE_EDITOR));

    expect(UserResource::canViewAny())->toBeFalse()
        ->and(BookingResource::canViewAny())->toBeFalse()
        ->and(CustomerResource::canViewAny())->toBeFalse()
        ->and(TherapistResource::canViewAny())->toBeFalse()
        ->and(BranchResource::canViewAny())->toBeTrue()
        ->and(HomePageSettings::canAccess())->toBeTrue()
        ->and(SiteSettings::canAccess())->toBeFalse();
});
