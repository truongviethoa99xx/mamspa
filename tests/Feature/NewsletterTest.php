<?php

use App\Filament\Resources\NewsletterSubscriberResource;
use App\Models\NewsletterSubscriber;
use App\Models\User;
use Database\Seeders\RolePermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed(RolePermissionSeeder::class);
});

function newsletterAdmin(): User
{
    $user = User::create([
        'name' => 'Admin',
        'email' => 'newsletter-admin@example.test',
        'password' => 'password',
    ]);

    $user->assignRole(User::ROLE_ADMIN);

    return $user;
}

function newsletterEditor(): User
{
    $user = User::create([
        'name' => 'Editor',
        'email' => 'newsletter-editor@example.test',
        'password' => 'password',
    ]);

    $user->assignRole(User::ROLE_EDITOR);

    return $user;
}

it('stores a subscriber from the public form', function () {
    $this->post('/newsletter', ['email' => 'guest@example.test'])
        ->assertRedirect()
        ->assertSessionHas('success');

    expect(NewsletterSubscriber::where('email', 'guest@example.test')->exists())->toBeTrue();
});

it('rejects invalid and duplicate emails', function () {
    NewsletterSubscriber::create(['email' => 'existing@example.test']);

    $this->post('/newsletter', ['email' => 'not-an-email'])
        ->assertSessionHasErrors('email');

    $this->post('/newsletter', ['email' => 'existing@example.test'])
        ->assertSessionHasErrors('email');

    expect(NewsletterSubscriber::count())->toBe(1);
});

it('silently accepts (without storing) when the honeypot field is filled', function () {
    $this->post('/newsletter', ['email' => 'bot@example.test', 'website' => 'https://spam.example'])
        ->assertRedirect()
        ->assertSessionHas('success');

    expect(NewsletterSubscriber::where('email', 'bot@example.test')->exists())->toBeFalse();
});

it('allows admins but not editors to manage newsletter subscribers', function () {
    auth()->login(newsletterAdmin());
    expect(NewsletterSubscriberResource::canViewAny())->toBeTrue();

    auth()->login(newsletterEditor());
    expect(NewsletterSubscriberResource::canViewAny())->toBeFalse();
});

it('renders the subscriber list for admins', function () {
    NewsletterSubscriber::create(['email' => 'guest@example.test']);

    $this->actingAs(newsletterAdmin())
        ->get('/admin/newsletter-subscribers')
        ->assertOk()
        ->assertSee('guest@example.test');
});

it('lets an admin delete a subscriber from the edit page', function () {
    $subscriber = NewsletterSubscriber::create(['email' => 'guest@example.test']);

    $this->actingAs(newsletterAdmin())
        ->get("/admin/newsletter-subscribers/{$subscriber->id}/edit")
        ->assertOk();
});
