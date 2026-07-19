<?php

namespace App\Http\Controllers;

use App\Models\OfferPageContent;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Trang "Ưu đãi" — 4 khối nội dung tĩnh quản lý ở /admin/offer-page-settings.
 * Field trống ở CMS sẽ fallback về nội dung mặc định (vi/en) khớp bản thiết kế gốc,
 * để trang luôn có nội dung đầy đủ ngay cả khi admin chưa nhập liệu.
 */
class OfferController extends Controller
{
    public function index(): Response
    {
        $content = OfferPageContent::current();

        return Inertia::render('Offers', [
            'hero' => $this->hero($content),
            'branches' => $this->branches($content),
            'note' => $this->note($content),
            'closing' => $this->closing($content),
            'sectionVisibility' => [
                'hero' => (bool) $content->hero_visible,
                'branches' => (bool) $content->branches_visible,
                'note' => (bool) $content->note_visible,
                'closing' => (bool) $content->closing_visible,
            ],
        ]);
    }

    protected function hero(OfferPageContent $content): array
    {
        return [
            'title' => $content->hero_title ?: ['vi' => 'Ưu đãi tại Mầm', 'en' => 'Offers at Mầm'],
            'subtitle' => $content->hero_subtitle ?: [
                'vi' => '<p>Mỗi chi nhánh đều có những chương trình được thiết kế riêng cho từng hành trình chăm sóc.</p>',
                'en' => '<p>Each branch has its own programs, designed for every wellness journey.</p>',
            ],
            'body' => $content->hero_body ?: [
                'vi' => '<p>Vui lòng liên hệ Mầm để được tư vấn chương trình phù hợp tại thời điểm đặt lịch.</p>',
                'en' => '<p>Please contact Mầm for advice on the right program at the time of booking.</p>',
            ],
            'image' => $this->publicUrl($content->hero_image),
            'image_alt' => $content->hero_image_alt ?: ['vi' => 'Không gian đón tiếp tại Mầm', 'en' => 'Reception space at Mầm'],
        ];
    }

    protected function branches(OfferPageContent $content): array
    {
        $items = $content->branches ?: $this->defaultBranches();

        return [
            'heading' => $content->branches_heading ?: [
                'vi' => 'BẠN SẼ TRẢI NGHIỆM TẠI CHI NHÁNH NÀO?',
                'en' => 'WHICH BRANCH WILL YOU EXPERIENCE?',
            ],
            'items' => $this->withPublicImages($items, 'image'),
        ];
    }

    /** Chi nhánh + ưu đãi mẫu, khớp nội dung bản thiết kế gốc. */
    protected function defaultBranches(): array
    {
        return [
            [
                'image' => null,
                'image_alt' => ['vi' => 'Chi nhánh Phú Nhuận', 'en' => 'Phú Nhuận branch'],
                'name' => ['vi' => 'PHÚ NHUẬN', 'en' => 'PHÚ NHUẬN'],
                'tagline' => ['vi' => 'Một khoảng lặng giữa lòng thành phố.', 'en' => 'A quiet pause in the heart of the city.'],
                'offers' => [
                    [
                        'icon' => 'Clock',
                        'title' => ['vi' => 'Happy Hours Rituals', 'en' => 'Happy Hours Rituals'],
                        'description' => [
                            'vi' => '<p>Ưu đãi dành riêng cho các hành trình Signature Rituals trong khung giờ yên tĩnh.</p>',
                            'en' => '<p>A special offer for Signature Rituals during quiet time slots.</p>',
                        ],
                        'button_label' => ['vi' => 'Xem chi tiết', 'en' => 'View details'],
                        'button_link' => '/dich-vu/',
                    ],
                    [
                        'icon' => 'ShieldCheck',
                        'title' => ['vi' => 'Quiet Hours', 'en' => 'Quiet Hours'],
                        'description' => [
                            'vi' => '<p>Những khoảng thời gian thư thái với quyền lợi dành riêng cho khách hàng phù hợp.</p>',
                            'en' => '<p>Relaxed time slots with benefits tailored for the right guests.</p>',
                        ],
                        'button_label' => ['vi' => 'Xem chi tiết', 'en' => 'View details'],
                        'button_link' => '/dich-vu/',
                    ],
                    [
                        'icon' => 'Leaf',
                        'title' => ['vi' => 'Wellness Credit', 'en' => 'Wellness Credit'],
                        'description' => [
                            'vi' => '<p>Giới thiệu bạn bè và cùng lan tỏa hành trình chăm sóc sức khỏe.</p>',
                            'en' => '<p>Refer friends and share the journey of care together.</p>',
                        ],
                        'button_label' => ['vi' => 'Xem chi tiết', 'en' => 'View details'],
                        'button_link' => '/dich-vu/',
                    ],
                ],
            ],
            [
                'image' => null,
                'image_alt' => ['vi' => 'Chi nhánh Bến Thành', 'en' => 'Bến Thành branch'],
                'name' => ['vi' => 'BẾN THÀNH', 'en' => 'BẾN THÀNH'],
                'tagline' => ['vi' => 'Một không gian wellness giữa trung tâm thành phố.', 'en' => 'A wellness space in the heart of downtown.'],
                'offers' => [
                    [
                        'icon' => 'User',
                        'title' => ['vi' => 'First Visit', 'en' => 'First Visit'],
                        'description' => [
                            'vi' => '<p>Ưu đãi dành cho khách hàng lần đầu trải nghiệm tại Mầm Spa Bến Thành.</p>',
                            'en' => '<p>An offer for guests visiting Mầm Spa Bến Thành for the first time.</p>',
                        ],
                        'button_label' => ['vi' => 'Xem chi tiết', 'en' => 'View details'],
                        'button_link' => '/dich-vu/',
                    ],
                    [
                        'icon' => 'Gift',
                        'title' => ['vi' => 'Membership', 'en' => 'Membership'],
                        'description' => [
                            'vi' => '<p>Quyền lợi dành cho khách hàng đồng hành lâu dài cùng Mầm.</p>',
                            'en' => '<p>Benefits for guests who journey together with Mầm long-term.</p>',
                        ],
                        'button_label' => ['vi' => 'Xem chi tiết', 'en' => 'View details'],
                        'button_link' => '/dich-vu/',
                    ],
                    [
                        'icon' => 'Leaf',
                        'title' => ['vi' => 'Wellness Credit', 'en' => 'Wellness Credit'],
                        'description' => [
                            'vi' => '<p>Giới thiệu bạn bè và cùng lan tỏa hành trình chăm sóc sức khỏe.</p>',
                            'en' => '<p>Refer friends and share the journey of care together.</p>',
                        ],
                        'button_label' => ['vi' => 'Xem chi tiết', 'en' => 'View details'],
                        'button_link' => '/dich-vu/',
                    ],
                ],
            ],
        ];
    }

    protected function note(OfferPageContent $content): array
    {
        return [
            'text' => $content->note_text ?: [
                'vi' => '<ul><li>Chương trình có thể thay đổi theo từng thời điểm.</li><li>Mỗi chi nhánh có chương trình riêng.</li><li>Liên hệ Mầm để được tư vấn ưu đãi phù hợp.</li></ul>',
                'en' => '<ul><li>Programs may change from time to time.</li><li>Each branch has its own program.</li><li>Contact Mầm for advice on the right offer.</li></ul>',
            ],
            'image' => $this->publicUrl($content->note_image),
            'image_alt' => $content->note_image_alt ?: ['vi' => 'Thiệp Mầm Integrative Therapy', 'en' => 'Mầm Integrative Therapy card'],
        ];
    }

    protected function closing(OfferPageContent $content): array
    {
        return [
            'title' => $content->closing_title ?: [
                'vi' => '<p>Chưa biết nên chọn chi nhánh nào?</p>',
                'en' => '<p>Not sure which branch to choose?</p>',
            ],
            'subtitle' => $content->closing_subtitle ?: [
                'vi' => '<p>Mầm sẽ giúp bạn lựa chọn liệu trình và ưu đãi phù hợp nhất.</p>',
                'en' => '<p>Mầm will help you choose the right treatment and offer.</p>',
            ],
            'buttonText' => $content->closing_button_text ?: ['vi' => 'Đặt lịch ngay', 'en' => 'Book now'],
            'buttonUrl' => $content->closing_button_url ?: '/dat-lich/',
            'image' => $this->publicUrl($content->closing_image),
            'image_alt' => $content->closing_image_alt ?: ['vi' => 'Bình gốm và đá cuội', 'en' => 'Ceramic vase and pebbles'],
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
