<?php

namespace App\Http\Controllers;

use App\Models\CustomerExperiencePageContent;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Trang "Customer Experience" — nội dung tĩnh quản lý ở /admin/customer-experience-page-settings.
 * Field trống ở CMS sẽ fallback về nội dung mặc định (vi/en) khớp bản thiết kế gốc (image 9.png),
 * để trang luôn có nội dung đầy đủ ngay cả khi admin chưa nhập liệu.
 */
class CustomerExperienceController extends Controller
{
    public function index(): Response
    {
        $content = CustomerExperiencePageContent::current();

        return Inertia::render('CustomerExperience', [
            'hero' => $this->hero($content),
            'stats' => $this->stats($content),
            'gallery' => $this->gallery($content),
            'testimonials' => $this->testimonials($content),
            'reasons' => $this->reasons($content),
            'instagram' => $this->instagram($content),
            'closing' => $this->closing($content),
            'sectionVisibility' => [
                'hero' => (bool) $content->hero_visible,
                'stats' => (bool) $content->stats_visible,
                'gallery' => (bool) $content->gallery_visible,
                'testimonials' => (bool) $content->testimonials_visible,
                'reasons' => (bool) $content->reasons_visible,
                'instagram' => (bool) $content->instagram_visible,
                'closing' => (bool) $content->closing_visible,
            ],
        ]);
    }

    protected function hero(CustomerExperiencePageContent $content): array
    {
        return [
            'heading' => $content->hero_title ?: ['vi' => '<p>Customer Experience</p>', 'en' => '<p>Customer Experience</p>'],
            'subtitle' => $content->hero_subtitle ?: [
                'vi' => '<p>Những khoảnh khắc bình yên và sự hài lòng của khách hàng là nguồn cảm hứng lớn nhất của Mầm.</p>',
                'en' => "<p>Our guests' peaceful moments and satisfaction are Mầm's greatest source of inspiration.</p>",
            ],
            'image' => $this->publicUrl($content->hero_image),
            'image_alt' => $content->hero_image_alt ?: ['vi' => 'Không gian Mầm Spa', 'en' => 'Mầm Spa space'],
        ];
    }

    protected function stats(CustomerExperiencePageContent $content): array
    {
        $items = $content->stats ?: [
            ['icon' => 'leaf', 'value' => '10.000+', 'description' => ['vi' => 'Lượt khách tin chọn', 'en' => 'Guests who trusted us']],
            ['icon' => 'heart', 'value' => '4.9/5', 'description' => ['vi' => 'Đánh giá trên Google', 'en' => 'Rating on Google']],
            ['icon' => 'globe', 'value' => '50+', 'description' => ['vi' => 'Quốc gia đã ghé thăm', 'en' => 'Countries visited']],
            ['icon' => 'sparkles', 'value' => '', 'description' => ['vi' => 'Trải nghiệm chân thật, được chia sẻ từ khách hàng của Mầm', 'en' => "Genuine experiences, shared by Mầm's guests"]],
        ];

        return ['items' => $items];
    }

    protected function gallery(CustomerExperiencePageContent $content): array
    {
        $items = $content->gallery_images ?: [];

        return [
            'title' => $content->gallery_title ?: ['vi' => 'Khoảng lặng mà khách hàng cảm nhận', 'en' => 'The quiet moments our guests feel'],
            'items' => $this->withPublicImages($items, 'image'),
            'featuredStat' => [
                'title' => $content->featured_stat_title ?: ['vi' => '<p>Hơn 10.000+ khách hàng</p>', 'en' => '<p>Over 10,000+ guests</p>'],
                'description' => $content->featured_stat_description ?: [
                    'vi' => '<p>đã tin chọn và đồng hành cùng Mầm trên hành trình chăm sóc sức khỏe.</p>',
                    'en' => "<p>have trusted and journeyed with Mầm on the path to wellness.</p>",
                ],
                'position' => (int) ($content->featured_stat_position ?: 9),
            ],
        ];
    }

    protected function testimonials(CustomerExperiencePageContent $content): array
    {
        $items = $content->testimonials ?: [
            ['source' => 'quote', 'rating' => null, 'quote' => ['vi' => '<p>Từ không gian, hương thơm cho đến từng động tác, mọi chi tiết tại Mầm đều mang lại cảm giác thư thái và được chăm sóc thật sự.</p>', 'en' => '<p>From the space, the scent, to every movement — every detail at Mầm brings a feeling of true relaxation and care.</p>'], 'author_name' => 'Khách hàng từ Hàn Quốc', 'author_meta' => null],
            ['source' => 'quote', 'rating' => 5, 'quote' => ['vi' => '<p>The best massage experience in HCMC. So relaxing!</p>', 'en' => '<p>The best massage experience in HCMC. So relaxing!</p>'], 'author_name' => 'Anna, Singapore', 'author_meta' => null],
            ['source' => 'quote', 'rating' => 5, 'quote' => ['vi' => '<p>Không gian yên tĩnh, dịch vụ tuyệt vời, nhân viên rất tinh tế.</p>', 'en' => '<p>Quiet space, wonderful service, very thoughtful staff.</p>'], 'author_name' => 'Linh, Việt Nam', 'author_meta' => null],
            ['source' => 'quote', 'rating' => 5, 'quote' => ['vi' => '<p>I love the herbal scent and the peaceful atmosphere.</p>', 'en' => '<p>I love the herbal scent and the peaceful atmosphere.</p>'], 'author_name' => 'James, Australia', 'author_meta' => null],
        ];

        return [
            'title' => $content->testimonials_title,
            'intro' => $content->testimonials_intro,
            'items' => $items,
        ];
    }

    protected function reasons(CustomerExperiencePageContent $content): array
    {
        $features = $content->reasons_features ?: [
            ['icon' => 'leaf', 'title' => ['vi' => 'Liệu pháp chuẩn Việt', 'en' => 'Authentic Vietnamese therapy'], 'description' => ['vi' => '<p>Kết hợp tinh hoa trị liệu truyền thống và kiến thức hiện đại.</p>', 'en' => '<p>Combining the essence of traditional therapy with modern knowledge.</p>']],
            ['icon' => 'heart-hands', 'title' => ['vi' => 'Chăm sóc từ trái tim', 'en' => 'Care from the heart'], 'description' => ['vi' => '<p>Tận tâm trong từng liệu trình, chỉn chu trong từng chi tiết.</p>', 'en' => '<p>Dedicated in every treatment, meticulous in every detail.</p>']],
            ['icon' => 'droplet', 'title' => ['vi' => 'Nguyên liệu thiên nhiên', 'en' => 'Natural ingredients'], 'description' => ['vi' => '<p>Ưu tiên sản phẩm lành tính, nguồn gốc rõ ràng.</p>', 'en' => '<p>Prioritising gentle products with clear origins.</p>']],
            ['icon' => 'shield', 'title' => ['vi' => 'Không gian an yên', 'en' => 'A peaceful space'], 'description' => ['vi' => '<p>Thiết kế tinh giản, ấm áp, giúp bạn thật sự thư giãn.</p>', 'en' => '<p>A simple, warm design that helps you truly relax.</p>']],
        ];

        return [
            'title' => $content->reasons_title ?: ['vi' => 'Vì sao khách hàng quay lại Mầm?', 'en' => 'Why do guests come back to Mầm?'],
            'features' => $features,
            'card' => [
                'title' => $content->reasons_card_title ?: ['vi' => 'Lịch hẹn luôn đông!', 'en' => 'Always fully booked!'],
                'description' => $content->reasons_card_description ?: [
                    'vi' => '<p>Nhiều khung giờ được khách hàng đặt trước.</p>',
                    'en' => '<p>Many time slots are booked in advance by our guests.</p>',
                ],
                'statText' => $content->reasons_card_stat_text ?: '+999',
                'avatars' => $this->withPublicImages($content->reasons_card_avatars ?: [], 'image'),
                'buttonText' => $content->reasons_card_button_text ?: ['vi' => 'Đặt lịch ngay', 'en' => 'Book now'],
                'buttonUrl' => $content->reasons_card_button_url ?: '/dat-lich/',
            ],
        ];
    }

    protected function instagram(CustomerExperiencePageContent $content): array
    {
        return [
            'title' => $content->instagram_title ?: ['vi' => 'Theo dõi Mầm trên Instagram', 'en' => 'Follow Mầm on Instagram'],
            'items' => $this->withPublicImages($content->instagram_images ?: [], 'image'),
            'handle' => $content->instagram_handle ?: '@mam.spa.therapy',
            'description' => $content->instagram_description ?: [
                'vi' => '<p>Xem thêm khoảnh khắc tại Mầm trên Instagram.</p>',
                'en' => '<p>See more moments at Mầm on Instagram.</p>',
            ],
            'url' => $content->instagram_url ?: 'https://instagram.com/mam.spa.therapy',
        ];
    }

    protected function closing(CustomerExperiencePageContent $content): array
    {
        return [
            'title' => $content->closing_title ?: [
                'vi' => '<p>Sẵn sàng cho hành trình chăm sóc của bạn?</p>',
                'en' => '<p>Ready for your care journey?</p>',
            ],
            'image' => $this->publicUrl($content->closing_image),
            'image_alt' => $content->closing_image_alt ?: ['vi' => 'Nến và thảo mộc tại Mầm', 'en' => 'Candles and herbs at Mầm'],
            'buttonText' => $content->closing_button_text ?: ['vi' => 'Đặt lịch ngay', 'en' => 'Book now'],
            'buttonUrl' => $content->closing_button_url ?: '/dat-lich/',
        ];
    }

    private function withPublicImages(array $items, string $key = 'image'): array
    {
        return array_map(function (array $item) use ($key) {
            if (! empty($item[$key])) {
                $item[$key] = $this->publicUrl($item[$key]);
            }

            return $item;
        }, $items);
    }

    private function publicUrl(?string $path): ?string
    {
        if (! $path || str_starts_with($path, '/') || str_starts_with($path, 'http')) {
            return $path;
        }

        return Storage::disk('public')->url($path);
    }
}
