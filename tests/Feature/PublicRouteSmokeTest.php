<?php

use App\Models\BlogPost;
use App\Models\Branch;
use App\Models\Service;
use App\Models\ServiceCategory;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    // Seed nội dung CMS nền (trang chủ, giới thiệu, liên hệ, chuỗi giao diện).
    // Dữ liệu động (chi nhánh, dịch vụ, blog) tạo trực tiếp — không còn seeder mẫu.
    $this->seed(DatabaseSeeder::class);

    Branch::create([
        'slug' => 'smoke-branch',
        'name' => ['vi' => 'Chi nhánh smoke'],
        'address' => '123 Smoke',
        'phone' => '0900000000',
        'open_hours' => '09:00 - 21:00',
        'is_active' => true,
    ]);

    $category = ServiceCategory::create([
        'slug' => 'smoke-category',
        'name' => ['vi' => 'Danh mục smoke'],
    ]);

    Service::create([
        'slug' => 'smoke-service',
        'name' => ['vi' => 'Dịch vụ smoke'],
        'description' => ['vi' => 'Mô tả'],
        'service_category_id' => $category->id,
        'duration' => 60,
        'price' => 100000,
        'is_active' => true,
    ]);

    BlogPost::create([
        'slug' => 'smoke-post',
        'title' => ['vi' => 'Bài viết smoke'],
        'excerpt' => ['vi' => 'Tóm tắt'],
        'body' => ['vi' => '<p>Nội dung</p>'],
        'is_published' => true,
        'published_at' => now(),
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
        "/dich-vu/smoke-category/{$service->slug}",
        "/chi-nhanh/{$branch->slug}",
        '/lien-he',
        '/dat-lich',
        '/tin-tuc',
        "/tin-tuc/{$post->slug}",
        '/promotions',
        '/gallery',
        '/login',
        '/i18n/vi',
    ];

    foreach ($paths as $path) {
        $this->get($path)->assertOk();
    }
});

it('keeps compatibility redirects working', function () {
    $service = Service::where('is_active', true)->firstOrFail();

    $this->get('/booking')->assertRedirect(url('/dat-lich').'/');
    $this->get('/services')->assertRedirect(url('/dich-vu').'/');
    $this->get("/services/{$service->slug}")->assertStatus(301);
});

it('serves my-bookings to guests with an empty list', function () {
    $this->get('/my-bookings/')->assertOk();
});

it('keeps public registration disabled by default', function () {
    $this->get('/register')->assertNotFound();
});
