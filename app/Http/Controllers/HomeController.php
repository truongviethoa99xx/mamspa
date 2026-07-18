<?php

namespace App\Http\Controllers;

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
            'philosophy' => $this->philosophy($content),
            'serviceListHeading' => $content->featured_services_heading ?: ['vi' => '<p>Dịch vụ nổi bật</p>', 'en' => '<p>Featured Services</p>'],
            'serviceListTitle' => $content->service_list_title ?: ['vi' => 'Dịch vụ nổi bật', 'en' => 'Featured Services'],
            'featuredServices' => $this->featuredServices(),
            'artBanner' => $this->artBanner($content),
            'spaces' => $this->spaces($content),
            'whyUs' => $this->whyUs($content),
            'reviews' => $this->reviews($content),
            'galleryPreview' => $this->galleryPreview(),
            'menuServices' => $this->menuServices(),
            'menuCategories' => $this->menuCategories(),
            // Cờ ẩn/hiện từng khối trên trang chủ, chỉnh trong /admin/home-page-settings.
            'sectionVisibility' => [
                'hero' => (bool) $content->hero_visible,
                'story' => (bool) $content->story_visible,
                'philosophy' => (bool) $content->philosophy_visible,
                'featuredServices' => (bool) $content->featured_services_visible,
                'artBanner' => (bool) $content->art_banner_visible,
                'spaces' => (bool) $content->spaces_visible,
                'whyUs' => (bool) $content->why_us_visible,
                'reviews' => (bool) $content->testimonials_visible,
                'gallery' => (bool) $content->gallery_visible,
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
            'image_alt' => $content->hero_image_alt ?: ['vi' => 'Không gian trị liệu Mầm Spa', 'en' => 'Mầm Spa treatment space'],
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
            'image_alt' => $content->story_image_alt ?: ['vi' => 'Không gian Mầm Spa', 'en' => 'Mầm Spa space'],
            'cta' => [
                'text' => $content->story_cta_text ?: 'Về Mầm Spa',
                'link' => $content->story_cta_link ?: '/gioi-thieu/',
                'text_color' => $content->story_cta_text_color ?: '#2F3E2E',
            ],
        ];
    }

    /** Khối "Our Philosophy" — trích dẫn triết lý trị liệu, căn giữa trang. */
    protected function philosophy(HomePageContent $content): array
    {
        return [
            'eyebrow' => $content->philosophy_eyebrow ?: ['vi' => '<p>Triết lý của chúng tôi</p>', 'en' => '<p>Our philosophy</p>'],
            'quote' => $content->philosophy_quote ?: [
                'vi' => '<p>An lành không phải là điều được trao.<br>Đó là điều được đánh thức từ chính bên trong.</p>',
                'en' => '<p>Wellness is not something given.<br>It is something awakened from within.</p>',
            ],
        ];
    }

    /** Banner "The Art of Vietnamese Healing" — ảnh + đoạn giới thiệu, nút link tự do (vd: 1 bài blog). */
    protected function artBanner(HomePageContent $content): array
    {
        return [
            'eyebrow' => $content->art_banner_eyebrow ?: ['vi' => '<p>Nghệ thuật trị liệu Việt</p>', 'en' => '<p>The art of Vietnamese healing</p>'],
            'body' => $content->art_banner_body ?: [
                'vi' => '<p>Được nuôi dưỡng từ những giá trị trị liệu Việt,<br>phát triển bằng chuyên môn hiện đại<br>và gìn giữ qua từng đôi tay tận tâm.</p>',
                'en' => '<p>Nurtured by Vietnamese therapeutic heritage,<br>refined with modern expertise<br>and carried through every attentive hand.</p>',
            ],
            'image' => $this->publicUrl($content->art_banner_image),
            'image_alt' => $content->art_banner_image_alt ?: ['vi' => 'Nghệ thuật trị liệu Việt', 'en' => 'The art of Vietnamese healing'],
            'cta' => [
                'text' => $content->art_banner_cta_text ?: ['vi' => 'Tìm hiểu thêm', 'en' => 'Learn more'],
                'link' => $content->art_banner_cta_link ?: '/blog/',
                'text_color' => $content->art_banner_cta_text_color ?: '#2F3E2E',
            ],
        ];
    }

    /**
     * "Our Spaces" — danh sách thẻ không gian, admin quản lý tự do qua repeater
     * (mặc định theo chi nhánh, có thể thêm/bớt). 1 hàng tối đa 2 thẻ, xử lý ở FE.
     */
    protected function spaces(HomePageContent $content): array
    {
        $items = collect($content->spaces_items ?: [])
            ->map(fn (array $item) => [
                'image' => $this->publicUrl($item['image'] ?? null),
                'image_alt' => $item['image_alt'] ?? $item['title'] ?? null,
                'title' => $item['title'] ?? null,
                'description' => $item['description'] ?? null,
                'link_text' => $item['link_text'] ?? null,
                'link_url' => $item['link_url'] ?? null,
            ])->all();

        return [
            'title' => $content->spaces_title ?: ['vi' => 'Không gian của chúng tôi', 'en' => 'Our spaces'],
            'items' => $items,
        ];
    }

    /** "Why Mầm" — 5 điểm nổi bật dạng icon, admin quản lý tự do qua repeater. */
    protected function whyUs(HomePageContent $content): array
    {
        return [
            'title' => $content->why_us_title ?: ['vi' => 'Vì sao chọn Mầm', 'en' => 'Why Mầm'],
            'items' => $content->why_us_items ?: [],
        ];
    }

    /**
     * Đánh giá khách hàng — thẻ Google + TripAdvisor (nhập tay), 1 trích dẫn nổi bật
     * (đầu tiên trong danh sách "testimonials" — admin quản lý tự do qua repeater),
     * và 1 thẻ video (ưu tiên file upload, nếu không có thì dùng link ngoài).
     */
    protected function reviews(HomePageContent $content): array
    {
        $quote = collect($content->testimonials ?: [])->first();
        $videoFile = $this->publicUrl($content->testimonial_video_file);

        return [
            'google' => [
                'rating' => $content->reviews_google_rating ?: '4.9',
                'count' => $content->reviews_google_count ?: 0,
                'link' => $content->reviews_google_link ?: '#',
            ],
            'tripadvisor' => [
                'rating' => $content->reviews_tripadvisor_rating ?: '5.0',
                'count' => $content->reviews_tripadvisor_count ?: 0,
                'link' => $content->reviews_tripadvisor_link ?: '#',
            ],
            'quote' => $quote ? [
                'name' => $quote['name'] ?? null,
                'rating' => $quote['rating'] ?? 5,
                'content' => $quote['content'] ?? null,
            ] : null,
            'quote_cta_link' => $content->testimonials_cta_link ?: '#',
            'video' => [
                'thumbnail' => $this->publicUrl($content->testimonial_video_thumbnail),
                'url' => $videoFile ?: $content->testimonial_video_url,
            ],
        ];
    }

    /** Dải ảnh xem trước thư viện ảnh, xem thêm ở /gallery. */
    protected function galleryPreview(): array
    {
        $images = collect(HomePageContent::current()->customer_gallery_images ?? [])
            ->map(fn ($item) => [
                'src' => $this->publicUrl($item['image'] ?? null),
                'alt' => $item['image_alt'] ?? null,
                'is_customer' => true,
            ])
            ->filter(fn ($item) => ! empty($item['src']))
            ->take(10)->values()->all();

        return [
            'images' => $images,
            'link' => '/gallery/',
        ];
    }

    /** "Four Healing Journeys" — danh mục dịch vụ cấp 1, quản lý ở /admin/service-categories. */
    protected function featuredServices(): array
    {
        return ServiceCategory::active()->listed()->roots()->orderBy('order')->get()
            ->map(fn (ServiceCategory $c) => [
                'id' => $c->id,
                'slug' => $c->slug,
                'url' => $c->url,
                'name' => $c->getTranslations('name'),
                'description' => $c->getTranslations('description'),
                'thumbnail_alt' => $c->image_alt,
                'images' => array_values(array_filter([$this->publicUrl($c->image)])),
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
        return ServiceCategory::active()->listed()->roots()->orderBy('order')->get()
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
