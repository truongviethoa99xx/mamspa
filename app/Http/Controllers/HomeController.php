<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Models\HomePageContent;
use App\Models\Service;
use App\Models\ServiceCategory;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Trang chủ tĩnh: thứ tự khối cố định (hero → chi nhánh → dịch vụ nổi bật →
     * menu dịch vụ → form đặt lịch). Dữ liệu động chỉ gồm dịch vụ & chi nhánh
     * lấy từ DB; phần văn bản giới thiệu là nội dung tĩnh quản lý ở /admin.
     */
    public function __invoke(): Response
    {
        $content = HomePageContent::current();

        return Inertia::render('Home', [
            'hero' => $this->hero($content),
            'story' => $this->story($content),
            'featuredServices' => $this->featuredServices(),
            'menuServices' => $this->menuServices(),
            'menuCategories' => $this->menuCategories(),
            'branches' => $this->branches(),
            'bookingBranches' => $this->bookingBranches(),
            'bookingServices' => $this->bookingServices(),
            // Cờ ẩn/hiện từng khối trên trang chủ, chỉnh trong /admin/home-page-settings.
            'sectionVisibility' => [
                'hero' => (bool) $content->hero_visible,
                'story' => (bool) $content->story_visible,
                'featuredServices' => (bool) $content->featured_services_visible,
            ],
        ]);
    }

    /** Nội dung banner đầu trang (tĩnh, đa ngôn ngữ, rich text qua Quill). */
    protected function hero(HomePageContent $content): array
    {
        return [
            'heading' => $content->hero_eyebrow ?: ['vi' => '<p>Hành trình chữa lành từ thiên nhiên</p>', 'en' => '<p>A healing journey from nature</p>'],
            'subtitle' => $content->hero_subtitle ?: ['vi' => '<p>Một khoảng lặng giữa nhịp sống thành phố.</p>', 'en' => '<p>A quiet pause amid the rhythm of city life.</p>'],
            'image' => $this->publicUrl($content->hero_image),
            'service_list_title' => $content->service_list_title ?: ['vi' => 'Dịch vụ nổi bật', 'en' => 'Featured Services'],
            'cta' => [
                'text' => $content->hero_cta_text ?: 'Đặt lịch ngay',
                'link' => $content->hero_cta_link ?: '/dat-lich/',
                'background_color' => $content->hero_cta_background_color ?: '#2F3E2E',
                'text_color' => $content->hero_cta_text_color ?: '#FFFFFF',
                'border_color' => $content->hero_cta_border_color ?: '#2F3E2E',
            ],
            'secondary_cta' => [
                'text' => $content->hero_secondary_cta_text ?: 'Khám phá dịch vụ',
                'link' => $content->hero_secondary_cta_link ?: '/dich-vu/',
                'background_color' => $content->hero_secondary_cta_background_color ?: 'transparent',
                'text_color' => $content->hero_secondary_cta_text_color ?: '#FFFFFF',
                'border_color' => $content->hero_secondary_cta_border_color ?: '#FFFFFF',
            ],
        ];
    }

    /**
     * Banner 2 "A Place To Pause" — 2 cột (chữ trái, ảnh phải ~2/3 chiều rộng),
     * rich text qua Quill. Nút chỉ có màu chữ + link, không nền/viền.
     */
    protected function story(HomePageContent $content): array
    {
        return [
            'heading' => $content->story_eyebrow ?: ['vi' => '<p>Một khoảng lặng để nghỉ ngơi</p>', 'en' => '<p>A place to pause</p>'],
            'caption' => $content->story_body ?: [
                'vi' => '<p>Giữa những chuyển động không ngừng của thành phố,<br>Mầm là nơi cơ thể được nghỉ ngơi,<br>tâm trí được lắng lại<br>và những giá trị trị liệu Việt được gìn giữ.</p>',
                'en' => "<p>Amid the city's constant motion,<br>Mầm is where the body rests,<br>the mind settles,<br>and Vietnamese healing values are preserved.</p>",
            ],
            'image' => $this->publicUrl($content->story_image),
            'cta' => [
                'text' => $content->story_cta_text ?: 'Về Mầm Spa',
                'link' => $content->story_cta_link ?: '/gioi-thieu/',
                'text_color' => $content->story_cta_text_color ?: '#2F3E2E',
            ],
        ];
    }

    /** Dịch vụ nổi bật cho khối grid. */
    protected function featuredServices(): array
    {
        return Service::active()->featured()->with('category.parent')->get()
            ->map(fn (Service $s) => [
                'id' => $s->id,
                'slug' => $s->slug,
                'name' => $s->name,
                'description' => $s->description,
                'category' => $this->categoryPayload($s),
                'duration' => $s->duration,
                'price' => $s->price,
                'images' => $this->serviceImages($s),
            ])->all();
    }

    /** Toàn bộ dịch vụ cho khối menu (lọc theo danh mục cấp 1 ở FE). */
    protected function menuServices(): array
    {
        return Service::active()->with('category.parent')->get()
            ->map(fn (Service $s) => [
                'id' => $s->id,
                'slug' => $s->slug,
                'name' => $s->name,
                'description' => $s->description,
                'category' => $this->categoryPayload($s),
                'duration' => $s->duration,
                'images' => $this->serviceImages($s),
            ])->all();
    }

    /** Danh mục cấp 1 đang có dịch vụ, dùng làm tab cho khối menu dịch vụ. */
    protected function menuCategories(): array
    {
        return ServiceCategory::active()->roots()->orderBy('order')->get()
            ->map(fn (ServiceCategory $c) => [
                'slug' => $c->slug,
                'name' => $c->name,
            ])->all();
    }

    /** Danh mục hiệu lực của dịch vụ: slug riêng + slug cấp 1 (để nhóm tab trên FE). */
    protected function categoryPayload(Service $s): ?array
    {
        if (! $s->category) {
            return null;
        }

        return [
            'slug' => $s->category->slug,
            'name' => $s->category->name,
            'root_slug' => $s->category->parent?->slug ?? $s->category->slug,
        ];
    }

    /**
     * Chi nhánh cho khối giới thiệu. Nội dung khối “Khám phá các không gian Mầm
     * Spa” được cấu hình riêng cho từng chi nhánh trong cột `page_content`.
     */
    protected function branches(): array
    {
        return Branch::where('is_active', true)->get()
            ->map(function (Branch $b) {
                $pc = $b->page_content ?? [];

                return [
                    'id' => $b->id,
                    'slug' => $b->slug,
                    'name' => $b->name,
                    'address' => $b->address,
                    'phone' => $b->phone,
                    'open_hours' => $b->open_hours,
                    'intro_title' => $pc['home_intro_title'] ?? null,
                    'eyebrow' => $pc['home_intro_eyebrow'] ?? null,
                    'subheading' => $pc['home_intro_subheading'] ?? null,
                    'heading' => $pc['home_intro_heading'] ?? null,
                    'body_1' => $pc['home_intro_body_1'] ?? null,
                    'body_2' => $pc['home_intro_body_2'] ?? null,
                    'cta' => $pc['home_intro_cta'] ?? null,
                    'images' => $b->getMedia('images')->map(fn ($media) => $media->getUrl())->all(),
                ];
            })->all();
    }

    /** Chi nhánh rút gọn cho dropdown trong form đặt lịch. */
    protected function bookingBranches(): array
    {
        return Branch::where('is_active', true)->get()
            ->map(fn (Branch $b) => [
                'id' => $b->id,
                'slug' => $b->slug,
                'name' => $b->name,
            ])->all();
    }

    /** Dịch vụ + chi nhánh áp dụng, cho form đặt lịch. */
    protected function bookingServices(): array
    {
        return Service::active()->with('branches')->get()
            ->map(fn (Service $s) => [
                'id' => $s->id,
                'slug' => $s->slug,
                'name' => $s->name,
                'duration' => $s->duration,
                'branch_ids' => $s->branches->pluck('id'),
            ])->all();
    }

    /** Gộp ảnh đại diện (thumbnail) lên đầu, theo sau là các ảnh phụ. */
    private function serviceImages(Service $s): array
    {
        $thumbnail = $s->getMedia('thumbnail')->first()?->getUrl();
        $gallery = $s->getMedia('images')->map(fn ($media) => $media->getUrl())->all();

        return array_values(array_filter([$thumbnail, ...$gallery]));
    }

    private function publicUrl(?string $path): ?string
    {
        if (! $path || str_starts_with($path, '/') || str_starts_with($path, 'http')) {
            return $path;
        }

        return Storage::disk('public')->url($path);
    }
}
