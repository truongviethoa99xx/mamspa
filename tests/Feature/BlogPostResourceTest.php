<?php

use App\Filament\Pages\BlogPageSettings;
use App\Filament\Resources\BlogPostResource;
use App\Models\BlogPageContent;
use App\Models\BlogPost;
use App\Models\User;
use Database\Seeders\RolePermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Livewire\Livewire;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed(RolePermissionSeeder::class);
});

function blogPostEditor(): User
{
    $user = User::create([
        'name' => 'Editor',
        'email' => 'blog-editor@example.test',
        'password' => 'password',
    ]);

    $user->assignRole(User::ROLE_EDITOR);

    return $user;
}

it('allows content editors to manage blog posts', function () {
    auth()->login(blogPostEditor());

    expect(BlogPostResource::canViewAny())->toBeTrue()
        ->and(BlogPostResource::canCreate())->toBeTrue();
});

it('renders the blog post create form with the category text input and SEO section', function () {
    $this->actingAs(blogPostEditor())
        ->get('/admin/blog-posts/create')
        ->assertOk()
        ->assertSee('wire:model="data.category"', false)
        ->assertDontSee('wire:model="data.category.vi"', false)
        ->assertSee('fi-quill-editor', false);
});

it('stores category as a plain string and SEO fields as translatable JSON', function () {
    $post = BlogPost::create([
        'slug' => 'vi-sao-massage-tri-lieu',
        'category' => 'Trị liệu & Sức khỏe',
        'title' => ['vi' => 'Vì sao massage trị liệu giúp phục hồi', 'en' => 'Why therapeutic massage aids recovery'],
        'body' => ['vi' => '<p>Nội dung.</p>'],
        'seo_title' => ['vi' => 'Tiêu đề SEO tuỳ chỉnh'],
        'seo_description' => ['vi' => 'Mô tả SEO tuỳ chỉnh dưới 160 ký tự.'],
        'seo_focus_keyword' => ['vi' => 'massage trị liệu'],
        'is_published' => true,
        'published_at' => now(),
    ]);

    $post->refresh();

    expect($post->category)->toBe('Trị liệu & Sức khỏe')
        ->and($post->getTranslation('seo_title', 'vi'))->toBe('Tiêu đề SEO tuỳ chỉnh')
        ->and($post->getTranslation('seo_description', 'vi'))->toBe('Mô tả SEO tuỳ chỉnh dưới 160 ký tự.')
        ->and($post->getTranslation('seo_focus_keyword', 'vi'))->toBe('massage trị liệu');
});

it('falls back to the post title and excerpt when SEO fields are left empty', function () {
    $post = BlogPost::create([
        'slug' => 'bai-viet-khong-co-seo-rieng',
        'title' => ['vi' => 'Tiêu đề gốc của bài viết'],
        'excerpt' => ['vi' => '<p>Mô tả ngắn gốc.</p>'],
        'body' => ['vi' => '<p>Nội dung.</p>'],
        'is_published' => true,
        'published_at' => now(),
    ]);

    $this->get("/tin-tuc/{$post->slug}")
        ->assertOk()
        ->assertInertia(fn ($assert) => $assert
            ->component('Blog/Show')
            ->where('post.seo.title.vi', 'Tiêu đề gốc của bài viết')
            ->where('post.seo.description.vi', 'Mô tả ngắn gốc.')
        );
});

it('defaults the hero to visible on a fresh install before any admin has saved settings', function () {
    // Regression test: BlogPageContent::current() must refresh() after create() so the
    // DB-level `hero_visible` default (true) is hydrated into the in-memory instance —
    // otherwise it reads as null/false on the very first request and the hero silently
    // never renders until an admin happens to open and save the settings page once.
    expect(BlogPageContent::query()->count())->toBe(0);

    $this->get('/tin-tuc')
        ->assertOk()
        ->assertInertia(fn ($assert) => $assert
            ->component('Blog/Index')
            ->where('sectionVisibility.hero', true)
        );
});

it('allows content editors to open the blog page settings screen', function () {
    $this->actingAs(blogPostEditor())
        ->get('/admin/blog-page-settings')
        ->assertOk();
});

it('saves the blog hero via the settings form and reflects it on the public page', function () {
    Livewire::actingAs(blogPostEditor())
        ->test(BlogPageSettings::class)
        ->fillForm([
            'hero_title' => ['vi' => 'Blog Mầm', 'en' => 'Mầm Blog'],
            'hero_subtitle' => ['vi' => '<p>Tiêu đề phụ tuỳ chỉnh.</p>'],
            'hero_visible' => true,
        ])
        ->call('save')
        ->assertHasNoFormErrors();

    expect(BlogPageContent::current()->hero_title['vi'])->toBe('Blog Mầm');

    $this->get('/tin-tuc')
        ->assertOk()
        ->assertInertia(fn ($assert) => $assert
            ->component('Blog/Index')
            ->where('hero.title.vi', 'Blog Mầm')
            ->where('sectionVisibility.hero', true)
        );
});
