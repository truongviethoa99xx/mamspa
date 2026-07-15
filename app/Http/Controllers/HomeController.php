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
            'featuredServices' => $this->featuredServices(),
            'menuServices' => $this->menuServices(),
            'menuCategories' => $this->menuCategories(),
            'branches' => $this->branches(),
            'bookingBranches' => $this->bookingBranches(),
            'bookingServices' => $this->bookingServices(),
            // Cờ ẩn/hiện từng khối trên trang chủ, chỉnh trong /admin/home-page-settings.
            'sectionVisibility' => [
                'hero' => (bool) $content->hero_visible,
                'featuredServices' => (bool) $content->featured_services_visible,
            ],
        ]);
    }

    /** Nội dung banner đầu trang (tĩnh, đa ngôn ngữ). */
    protected function hero(HomePageContent $content): array
    {
        return [
            'eyebrow' => $content->hero_eyebrow,
            'title' => $content->hero_title ?: ['vi' => 'Hành trình cân bằng Thân – Tâm – Trí', 'en' => 'The Journey to Balance Body – Mind – Spirit'],
            'subtitle' => $content->hero_subtitle ?: ['vi' => 'Mầm Spa — Trải nghiệm spa truyền thống Việt giữa lòng Đà Nẵng', 'en' => 'Traditional Vietnamese spa experience in Da Nang'],
            'cta_text' => $content->hero_cta_text ?: 'Đặt lịch ngay',
            'cta_link' => $content->hero_cta_link ?: '/dat-lich/',
            'image' => $this->publicUrl($content->hero_image),
            'service_list_title' => $content->service_list_title ?: ['vi' => 'Dịch vụ nổi bật', 'en' => 'Featured Services'],
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
