<?php

use App\Models\BlogPost;
use App\Models\Branch;
use App\Models\Service;
use Database\Seeders\BlogPostSeeder;
use Database\Seeders\BranchSeeder;
use Database\Seeders\ServiceSeeder;
use Database\Seeders\SlotSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed([
        BranchSeeder::class,
        ServiceSeeder::class,
        SlotSeeder::class,
        BlogPostSeeder::class,
    ]);
});

it('serves the main public pages', function () {
    $branch = Branch::where('is_active', true)->firstOrFail();
    $service = Service::where('is_active', true)->firstOrFail();
    $post = BlogPost::firstOrFail();

    $paths = [
        '/',
        '/gioi-thieu',
        '/dich-vu',
        "/dich-vu/{$service->slug}",
        "/chi-nhanh/{$branch->slug}",
        '/lien-he',
        '/dat-lich',
        '/tin-tuc',
        "/tin-tuc/{$post->slug}",
        '/services',
        "/services/{$service->slug}",
        '/promotions',
        '/gallery',
        '/login',
        '/i18n/vi',
    ];

    foreach ($paths as $path) {
        $this->get($path)->assertOk();
    }
});

it('serves booking slots as json', function () {
    $branch = Branch::where('is_active', true)->firstOrFail();

    $this->getJson('/dat-lich/slots?branch_id='.$branch->id.'&date='.now()->addDay()->format('Y-m-d'))
        ->assertOk()
        ->assertJsonStructure(['data']);
});

it('keeps compatibility redirects working', function () {
    $this->get('/booking')->assertRedirect('/dat-lich');
    $this->get('/my-bookings')->assertRedirect('/login');
});

it('keeps public registration disabled by default', function () {
    $this->get('/register')->assertNotFound();
});
