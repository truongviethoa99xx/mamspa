<?php

use App\Filament\Resources\PolicyPageResource;
use App\Models\PolicyPage;
use App\Models\User;
use Database\Seeders\RolePermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed(RolePermissionSeeder::class);
});

function policyPageEditor(): User
{
    $user = User::create([
        'name' => 'Editor',
        'email' => 'editor@example.test',
        'password' => 'password',
    ]);

    $user->assignRole(User::ROLE_EDITOR);

    return $user;
}

it('allows content editors to manage policy pages', function () {
    auth()->login(policyPageEditor());

    expect(PolicyPageResource::canViewAny())->toBeTrue()
        ->and(PolicyPageResource::canCreate())->toBeTrue();
});

it('renders the policy page create form with the Quill field', function () {
    $this->actingAs(policyPageEditor())
        ->get('/admin/policy-pages/create')
        ->assertOk()
        ->assertSee('fi-quill-editor', false);
});

it('stores translatable name and content as JSON', function () {
    $page = PolicyPage::create([
        'slug' => 'chinh-sach-bao-mat',
        'name' => ['vi' => 'Chính sách bảo mật', 'en' => 'Privacy Policy'],
        'content' => ['vi' => '<p>Nội dung tiếng Việt</p>', 'en' => '<p>English content</p>'],
        'is_published' => true,
    ]);

    $page->refresh();

    expect($page->getTranslation('name', 'vi'))->toBe('Chính sách bảo mật')
        ->and($page->getTranslation('name', 'en'))->toBe('Privacy Policy')
        ->and($page->getTranslation('content', 'vi'))->toBe('<p>Nội dung tiếng Việt</p>');
});

it('serves the published policy page on the public site with the featured image on top', function () {
    $page = PolicyPage::create([
        'slug' => 'chinh-sach-doi-tra',
        'name' => ['vi' => 'Chính sách đổi trả'],
        'content' => ['vi' => '<p>Áp dụng cho mọi dịch vụ.</p>'],
        'featured_image' => 'policy-pages/cover.jpg',
        'is_published' => true,
    ]);

    $this->get('/chinh-sach')->assertOk();

    $this->get("/chinh-sach/{$page->slug}")
        ->assertOk()
        ->assertInertia(fn ($assert) => $assert
            ->component('ChinhSach/Show')
            ->where('page.slug', $page->slug)
            ->where('page.featured_image', 'policy-pages/cover.jpg')
        );
});

it('hides unpublished policy pages from the public site', function () {
    $page = PolicyPage::create([
        'slug' => 'chinh-sach-nhap',
        'name' => ['vi' => 'Nháp'],
        'content' => ['vi' => '<p>Chưa xuất bản</p>'],
        'is_published' => false,
    ]);

    $this->get("/chinh-sach/{$page->slug}")->assertNotFound();
});
