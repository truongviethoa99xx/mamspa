<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Models\HomePageContent;
use App\Models\Service;
use App\Models\ServiceCategory;
use App\Services\GooglePlacesService;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Trang chủ tĩnh: thứ tự khối cố định (hero → chi nhánh → dịch vụ nổi bật →
     * menu dịch vụ → form đặt lịch → đánh giá). Dữ liệu động chỉ gồm dịch vụ &
     * chi nhánh lấy từ DB; phần văn bản giới thiệu/đánh giá là nội dung tĩnh.
     */
    public function __invoke(): Response
    {
        $content = HomePageContent::current();

        return Inertia::render('Home', [
            'hero' => $this->hero($content),
            'story' => $this->story($content),
            'philosophy' => $this->philosophy($content),
            'artBanner' => $this->artBanner($content),
            'whyUs' => $this->whyUs($content),
            'featuredServices' => $this->featuredServices(),
            'menuServices' => $this->menuServices(),
            'menuCategories' => $this->menuCategories(),
            'branches' => $this->branches(),
            'bookingBranches' => $this->bookingBranches(),
            'bookingServices' => $this->bookingServices(),
            'testimonials' => $this->testimonials($content),
            'galleryPreview' => $this->galleryPreview(),
            'finalCta' => $this->finalCta($content),
            // Cờ ẩn/hiện từng khối trên trang chủ, chỉnh trong /admin/home-page-settings.
            'sectionVisibility' => [
                'hero' => (bool) $content->hero_visible,
                'story' => (bool) $content->story_visible,
                'philosophy' => (bool) $content->philosophy_visible,
                'artBanner' => (bool) $content->art_banner_visible,
                'whyUs' => (bool) $content->why_us_visible,
                'featuredServices' => (bool) $content->featured_services_visible,
                'testimonials' => (bool) $content->testimonials_visible,
                'gallery' => (bool) $content->gallery_visible,
                'finalCta' => (bool) $content->final_cta_visible,
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

    /** "A Place To Pause" — đoạn giới thiệu thương hiệu ngắn kèm ảnh. */
    protected function story(HomePageContent $content): array
    {
        return [
            'eyebrow' => $content->story_eyebrow ?: ['vi' => 'Một khoảng lặng để nghỉ ngơi', 'en' => 'A place to pause'],
            'body' => $content->story_body ?: [
                'vi' => "Giữa những chuyển động không ngừng của thành phố,\nMầm Spa là nơi cơ thể được nghỉ ngơi, tâm trí được lắng lại\nvà những giá trị trị liệu Việt được gìn giữ.",
                'en' => "Amid the city's constant motion,\nMầm Spa is where the body rests, the mind settles,\nand Vietnamese healing values are preserved.",
            ],
            'cta_text' => $content->story_cta_text ?: ['vi' => 'Về Mầm Spa', 'en' => 'About Mầm Spa'],
            'cta_link' => '/gioi-thieu/',
            'image' => $this->publicUrl($content->story_image),
        ];
    }

    /** "Our Philosophy" — trích dẫn triết lý trị liệu, căn giữa trang. */
    protected function philosophy(HomePageContent $content): array
    {
        return [
            'eyebrow' => $content->philosophy_eyebrow ?: ['vi' => 'Triết lý của chúng tôi', 'en' => 'Our philosophy'],
            'quote' => $content->philosophy_quote ?: [
                'vi' => "An lành không phải là điều được trao.\nĐó là điều được đánh thức từ chính bên trong.",
                'en' => "Wellness is not something given.\nIt is something awakened from within.",
            ],
        ];
    }

    /** Banner "Nghệ thuật trị liệu Việt" — ảnh + copy chia đôi. */
    protected function artBanner(HomePageContent $content): array
    {
        return [
            'eyebrow' => $content->art_banner_eyebrow ?: ['vi' => 'Nghệ thuật trị liệu Việt', 'en' => 'The art of Vietnamese healing'],
            'heading' => $content->art_banner_heading ?: ['vi' => 'Nghệ thuật trị liệu Việt', 'en' => 'The art of Vietnamese healing'],
            'body' => $content->art_banner_body ?: [
                'vi' => "Được nuôi dưỡng từ những giá trị trị liệu Việt,\nphát triển bằng chuyên môn hiện đại\nvà gìn giữ qua từng đôi tay tận tâm.",
                'en' => "Nurtured by Vietnamese therapeutic heritage,\nrefined with modern expertise\nand carried through every attentive hand.",
            ],
            'cta_text' => $content->art_banner_cta_text ?: ['vi' => 'Tìm hiểu thêm', 'en' => 'Learn more'],
            'cta_link' => '/gioi-thieu/',
            'image' => $this->publicUrl($content->art_banner_image),
        ];
    }

    /** "Why Mầm Spa" — danh sách điểm nổi bật dạng icon (mặc định 5 mục). */
    protected function whyUs(HomePageContent $content): array
    {
        return $content->why_us_items ?: [
            ['icon' => 'Leaf', 'title' => ['vi' => 'Gốc rễ trị liệu Việt', 'en' => 'Rooted in Vietnamese healing traditions'], 'description' => ['vi' => 'Kế thừa và gìn giữ giá trị trị liệu truyền thống Việt Nam.', 'en' => 'Preserving the value of traditional Vietnamese therapy.']],
            ['icon' => 'HeartHandshake', 'title' => ['vi' => 'Chăm sóc cá nhân hoá', 'en' => 'Personalized wellness'], 'description' => ['vi' => 'Trải nghiệm được cá nhân hoá cho từng nhu cầu riêng biệt.', 'en' => 'An experience tailored to your individual needs.']],
            ['icon' => 'Sprout', 'title' => ['vi' => 'Thảo mộc tự nhiên', 'en' => 'Natural herbs'], 'description' => ['vi' => 'Sử dụng thảo mộc thiên nhiên, lành tính và an toàn.', 'en' => 'Using natural, gentle and safe herbal ingredients.']],
            ['icon' => 'GraduationCap', 'title' => ['vi' => 'Đội ngũ chuyên nghiệp', 'en' => 'Professionally trained team'], 'description' => ['vi' => 'Trị liệu viên được đào tạo bài bản và giàu kinh nghiệm.', 'en' => 'Well-trained and experienced therapists.']],
            ['icon' => 'Sparkles', 'title' => ['vi' => 'Dịch vụ tận tâm', 'en' => 'Thoughtful hospitality'], 'description' => ['vi' => 'Sự chu đáo trong từng chi tiết, chăm sóc bằng cả trái tim.', 'en' => 'Attentive care in every detail, from the heart.']],
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

    /**
     * Đánh giá khách hàng: ưu tiên review thật lấy từ Google Maps (chi nhánh có
     * google_place_id); chưa chi nhánh nào cấu hình thì dùng danh sách nhập
     * tay trong HomePageSettings làm dự phòng.
     */
    protected function testimonials(HomePageContent $content): array
    {
        $google = $this->googleReviews();

        return [
            'rating' => $google['rating'] ?? ($content->testimonial_rating ?: 5),
            'review_count' => $google['total'] ?? ($content->testimonial_review_count ?: 0),
            'source' => $content->testimonial_source ?: 'google',
            'items' => $google['items'] ?? ($content->testimonials ?: []),
            'video_url' => $content->testimonial_video_url,
        ];
    }

    /** Vài ảnh đầu từ thư viện ảnh chi nhánh — dải xem trước trên trang chủ. */
    protected function galleryPreview(): array
    {
        return Branch::where('is_active', true)->get()
            ->flatMap(fn (Branch $b) => $b->getMedia()->map(fn ($m) => $m->getUrl()))
            ->take(9)
            ->values()
            ->all();
    }

    /** CTA cuối trang "Dành một khoảnh khắc cho chính mình". */
    protected function finalCta(HomePageContent $content): array
    {
        return [
            'heading' => $content->final_cta_heading ?: ['vi' => 'Dành một khoảnh khắc cho chính mình', 'en' => 'Take a moment for yourself'],
            'cta_text' => $content->final_cta_cta_text ?: ['vi' => 'Đặt lịch ngay', 'en' => 'Book now'],
            'cta_link' => $content->final_cta_cta_link ?: '/dat-lich/',
            'image' => $this->publicUrl($content->final_cta_image),
        ];
    }

    /**
     * Gộp review thật từ mọi chi nhánh — ưu tiên review đã đồng bộ qua Google
     * Business Profile (toàn bộ), dự phòng Places API (tối đa 5 review) khi
     * chi nhánh chưa đồng bộ.
     */
    protected function googleReviews(): ?array
    {
        $service = app(GooglePlacesService::class);

        $items = [];
        $ratings = [];
        $total = 0;

        foreach (Branch::where('is_active', true)->orderBy('id')->get() as $b) {
            $data = $this->branchReviews($b, $service);
            if (! $data) {
                continue;
            }

            $items = array_merge($items, $data['reviews']);
            $ratings[] = $data['rating'];
            $total += $data['total'];
        }

        if ($items === []) {
            return null;
        }

        return [
            'items' => $items,
            'rating' => round(array_sum($ratings) / count($ratings), 1),
            'total' => $total,
        ];
    }

    private function branchReviews(Branch $branch, GooglePlacesService $service): ?array
    {
        $synced = $branch->googleReviews()->orderByDesc('review_time')->get();

        if ($synced->isNotEmpty()) {
            return [
                'rating' => round($synced->avg('rating'), 1),
                'total' => $synced->count(),
                'reviews' => $synced->map(fn ($review) => [
                    'name' => $review->reviewer_name,
                    'content' => $review->comment ?? '',
                    'rating' => $review->rating,
                    'time' => $review->review_time?->diffForHumans(),
                ])->all(),
            ];
        }

        return $branch->google_place_id ? $service->reviews($branch->google_place_id) : null;
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
