<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Models\HomePageContent;
use App\Models\Service;
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
        return Inertia::render('Home', [
            'hero' => $this->hero(),
            'featuredServices' => $this->featuredServices(),
            'menuServices' => $this->menuServices(),
            'branchIntro' => $this->branchIntro(),
            'branches' => $this->branches(),
            'bookingBranches' => $this->bookingBranches(),
            'bookingServices' => $this->bookingServices(),
            'testimonials' => $this->testimonials(),
        ]);
    }

    /** Nội dung banner đầu trang (tĩnh, đa ngôn ngữ). */
    protected function hero(): array
    {
        $content = HomePageContent::current();

        return [
            'eyebrow' => $content->hero_eyebrow,
            'title' => $content->hero_title ?: ['vi' => 'Hành trình cân bằng Thân – Tâm – Trí', 'en' => 'The Journey to Balance Body – Mind – Spirit'],
            'subtitle' => $content->hero_subtitle ?: ['vi' => 'Mầm Spa — Trải nghiệm spa truyền thống Việt giữa lòng Đà Nẵng', 'en' => 'Traditional Vietnamese spa experience in Da Nang'],
            'cta_text' => $content->hero_cta_text ?: 'Đặt lịch ngay',
            'cta_link' => $content->hero_cta_link ?: '/dat-lich',
            'image' => $this->publicUrl($content->hero_image),
            'service_list_title' => $content->service_list_title ?: ['vi' => 'Dịch vụ nổi bật', 'en' => 'Featured Services'],
        ];
    }

    /** Dịch vụ nổi bật cho khối grid. */
    protected function featuredServices(): array
    {
        return Service::active()->featured()->get()
            ->map(fn (Service $s) => [
                'id' => $s->id,
                'slug' => $s->slug,
                'name' => $s->name,
                'description' => $s->description,
                'category' => $s->category,
                'duration' => $s->duration,
                'price' => $s->price,
                'images' => $s->getMedia('images')->map(fn ($media) => $media->getUrl())->all(),
            ])->all();
    }

    /** Toàn bộ dịch vụ cho khối menu (lọc theo danh mục ở FE). */
    protected function menuServices(): array
    {
        return Service::active()->get()
            ->map(fn (Service $s) => [
                'id' => $s->id,
                'slug' => $s->slug,
                'name' => $s->name,
                'description' => $s->description,
                'category' => $s->category,
                'duration' => $s->duration,
                'images' => $s->getMedia('images')->map(fn ($media) => $media->getUrl())->all(),
            ])->all();
    }

    /** Nội dung khối giới thiệu không gian chi nhánh trên trang chủ. */
    protected function branchIntro(): array
    {
        $content = HomePageContent::current();

        return [
            'title' => $content->branch_intro_title,
            'eyebrow' => $content->branch_intro_eyebrow,
            'subheading' => $content->branch_intro_subheading,
            'heading' => $content->branch_intro_heading,
            'body_1' => $content->branch_intro_body_1,
            'body_2' => $content->branch_intro_body_2,
            'cta' => $content->branch_intro_cta,
            'caption' => $content->branch_intro_caption,
        ];
    }

    /** Chi nhánh cho khối giới thiệu. */
    protected function branches(): array
    {
        return Branch::where('is_active', true)->get()
            ->map(fn (Branch $b) => [
                'id' => $b->id,
                'slug' => $b->slug,
                'name' => $b->name,
                'address' => $b->address,
                'phone' => $b->phone,
                'open_hours' => $b->open_hours,
                'images' => $b->getMedia('images')->map(fn ($media) => $media->getUrl())->all(),
            ])->all();
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

    /** Đánh giá khách hàng (tĩnh — đồng bộ Google reviews). */
    protected function testimonials(): array
    {
        $content = HomePageContent::current();
        $items = $content->testimonials ?: [
            ['name' => 'B H', 'time' => '8 months ago', 'rating' => 5, 'content' => 'Mầm Massage Therapy & Healing Spa ist ein Ort, bei dem man sich verwöhnen lassen sollte! Die Atmosphäre ist ruhig und entspannend, das Personal sehr aufmerksam.'],
            ['name' => '2201_Nguyễn Phi Lân', 'time' => '8 months ago', 'rating' => 5, 'content' => 'Tối đi làm về thấy bảng hiệu nên ghé thử vì muốn massage cổ vai do phải ngồi lâu. Liệu trình làm khá dễ chịu, thấy hiệu quả rõ rệt, tuy chưa đặt lịch trước mà vẫn được phục vụ chu đáo.'],
            ['name' => 'Oanh Hoang', 'time' => '8 months ago', 'rating' => 5, 'content' => 'Lần đầu đi massage hơi bỡ ngỡ xíu kkkk. Mấy bạn ở đây tư vấn nhiệt tình mà đúng với nhu cầu của mình, hông có bị upsale, chạy KPI. Kỹ thuật viên tay nghề tốt, sẽ quay lại.'],
            ['name' => 'Trần Mỹ Linh', 'time' => '6 months ago', 'rating' => 5, 'content' => 'Không gian yên tĩnh, thơm mùi thảo mộc rất dễ chịu. Head spa 21 bước thư giãn đỉnh cao, ngủ quên luôn. Nhân viên nhẹ nhàng, chuyên nghiệp.'],
            ['name' => 'James P.', 'time' => '5 months ago', 'rating' => 5, 'content' => 'A hidden gem in Da Nang. The foot spa and shoulder massage were exactly what I needed after a long flight. Will definitely come back.'],
            ['name' => 'Phạm Thu Hà', 'time' => '4 months ago', 'rating' => 5, 'content' => 'Giá hợp lý, chất lượng vượt mong đợi. Combo gội + massage làm mình thư giãn hoàn toàn. Sẽ giới thiệu cho bạn bè.'],
        ];

        return [
            'rating' => $content->testimonial_rating ?: 5,
            'review_count' => $content->testimonial_review_count ?: 821,
            'source' => $content->testimonial_source ?: 'google',
            'items' => $items,
        ];
    }

    private function publicUrl(?string $path): ?string
    {
        if (! $path || str_starts_with($path, '/') || str_starts_with($path, 'http')) {
            return $path;
        }

        return Storage::disk('public')->url($path);
    }
}
