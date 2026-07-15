<?php

use App\Jobs\NotifyAdminsOfContactSubmission;
use App\Models\ContactSubmission;
use App\Models\User;
use Database\Seeders\RolePermissionSeeder;
use Filament\Notifications\DatabaseNotification;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notification;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed(RolePermissionSeeder::class);
});

function contactInternalUser(string $role): User
{
    $user = User::create([
        'name' => ucfirst($role),
        'email' => $role.'-contact@example.test',
        'password' => 'password',
    ]);

    $user->assignRole($role);

    return $user;
}

it('dispatches NotifyAdminsOfContactSubmission when a contact form is submitted', function () {
    Bus::fake();
    Mail::fake();

    $this->post(route('contact.store'), [
        'name' => 'Test User',
        'subject' => 'Cần tư vấn',
        'message' => 'Xin chào, tôi muốn hỏi về dịch vụ.',
    ]);

    $submission = ContactSubmission::first();

    expect($submission)->not->toBeNull();

    Bus::assertDispatched(
        NotifyAdminsOfContactSubmission::class,
        fn (NotifyAdminsOfContactSubmission $job) => $job->contactSubmissionId === $submission->id,
    );
});

it('notifies only admin-role users about a new contact submission, not customers', function () {
    $admin = contactInternalUser(User::ROLE_STAFF);
    $customer = User::create([
        'name' => 'Customer',
        'email' => 'customer-contact@example.test',
        'password' => 'password',
    ]);
    $customer->assignRole(User::ROLE_CUSTOMER);

    Mail::fake();
    Notification::fake();

    $submission = ContactSubmission::create([
        'name' => 'Test User',
        'subject' => 'Cần tư vấn',
        'message' => 'Xin chào, tôi muốn hỏi về dịch vụ.',
        'status' => ContactSubmission::STATUS_NEW,
    ]);

    (new NotifyAdminsOfContactSubmission($submission->id))->handle();

    Notification::assertSentTo($admin, DatabaseNotification::class);
    Notification::assertNotSentTo($customer, DatabaseNotification::class);
});
