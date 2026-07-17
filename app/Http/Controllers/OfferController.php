<?php

namespace App\Http\Controllers;

use App\Models\OfferPageContent;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Trang "Ưu đãi" — 5 khối nội dung tĩnh quản lý ở /admin/offer-page-settings.
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
            'benefits' => $this->benefits($content),
            'branchOffers' => $this->branchOffers($content),
            'note' => $this->note($content),
            'closing' => $this->closing($content),
            'sectionVisibility' => [
                'hero' => (bool) $content->hero_visible,
                'benefits' => (bool) $content->benefits_visible,
                'branchOffers' => (bool) $content->branch_offers_visible,
                'note' => (bool) $content->note_visible,
                'closing' => (bool) $content->closing_visible,
            ],
        ]);
    }

    protected function hero(OfferPageContent $content): array
    {
        return [
            'title' => $content->hero_title ?: ['vi' => 'SPECIAL OFFERS', 'en' => 'SPECIAL OFFERS'],
            'subtitle' => $content->hero_subtitle ?: [
                'vi' => '<p>Ưu đãi dành cho từng hành trình chăm sóc</p>',
                'en' => '<p>Offers made for every wellness journey</p>',
            ],
            'body' => $content->hero_body ?: [
                'vi' => '<p>Mỗi chương trình được xây dựng nhằm mang đến nhiều lựa chọn hơn trong hành trình chăm sóc sức khỏe tại Mầm.</p>',
                'en' => '<p>Every program is designed to give you more choice on your wellness journey at Mầm.</p>',
            ],
            'image' => $this->publicUrl($content->hero_image),
            'image_alt' => $content->hero_image_alt ?: ['vi' => 'Bàn trị liệu tại Mầm Spa', 'en' => 'Therapy tray at Mầm Spa'],
        ];
    }

    protected function benefits(OfferPageContent $content): array
    {
        $items = $content->benefits ?: [
            [
                'icon' => 'Leaf',
                'title' => ['vi' => 'Wellness Credit', 'en' => 'Wellness Credit'],
                'description' => [
                    'vi' => '<p>Giới thiệu bạn bè và cùng lan tỏa hành trình chăm sóc.</p>',
                    'en' => '<p>Refer friends and share the journey of care together.</p>',
                ],
                'button_label' => ['vi' => 'Tìm hiểu thêm', 'en' => 'Learn more'],
                'button_link' => '/uu-dai/',
            ],
            [
                'icon' => 'Clock',
                'title' => ['vi' => 'Quiet Hours', 'en' => 'Quiet Hours'],
                'description' => [
                    'vi' => '<p>Những khoảng thời gian yên tĩnh với quyền lợi dành cho khách hàng phù hợp.</p>',
                    'en' => '<p>Quiet time slots with benefits tailored for the right guests.</p>',
                ],
                'button_label' => ['vi' => 'Tìm hiểu thêm', 'en' => 'Learn more'],
                'button_link' => '/uu-dai/',
            ],
            [
                'icon' => 'User',
                'title' => ['vi' => 'Membership', 'en' => 'Membership'],
                'description' => [
                    'vi' => '<p>Những quyền lợi dành cho khách hàng đồng hành cùng Mầm. Chương trình thành viên có thể khác nhau giữa các chi nhánh và từng thời điểm.</p>',
                    'en' => '<p>Benefits for guests who journey together with Mầm. Membership programs may vary between branches and over time.</p>',
                ],
                'button_label' => ['vi' => 'Tìm hiểu thêm', 'en' => 'Learn more'],
                'button_link' => '/uu-dai/',
            ],
        ];

        return [
            'heading' => $content->benefits_heading ?: ['vi' => 'Quyền lợi toàn hệ thống', 'en' => 'System-wide Benefits'],
            'subtitle' => $content->benefits_subtitle ?: [
                'vi' => 'Áp dụng tại tất cả các chi nhánh của Mầm.',
                'en' => 'Available at every Mầm branch.',
            ],
            'items' => $items,
        ];
    }

    protected function branchOffers(OfferPageContent $content): array
    {
        $items = $content->branch_offers ?: $this->defaultBranchOffers();

        return [
            'heading' => $content->branch_offers_heading ?: ['vi' => 'Ưu đãi nổi bật', 'en' => 'Featured Offers'],
            'items' => $this->withPublicImages($items, 'image'),
        ];
    }

    /** Ưu đãi mẫu, khớp nội dung bản thiết kế gốc. */
    protected function defaultBranchOffers(): array
    {
        return [
            [
                'image' => null,
                'image_alt' => null,
                'title' => ['vi' => 'Happy Hours Rituals', 'en' => 'Happy Hours Rituals'],
                'description' => [
                    'vi' => '<p>Ưu đãi dành riêng cho một số liệu trình Signature Rituals trong khung giờ áp dụng.</p>',
                    'en' => '<p>A special offer for selected Signature Rituals during set time slots.</p>',
                ],
                'button_label' => ['vi' => 'Xem chi tiết', 'en' => 'View details'],
                'button_link' => '/dich-vu/',
            ],
            [
                'image' => null,
                'image_alt' => null,
                'title' => ['vi' => 'First Visit', 'en' => 'First Visit'],
                'description' => [
                    'vi' => '<p>Ưu đãi dành cho khách hàng lần đầu trải nghiệm tại Mầm Spa.</p>',
                    'en' => '<p>An offer for guests visiting Mầm Spa for the first time.</p>',
                ],
                'button_label' => ['vi' => 'Xem chi tiết', 'en' => 'View details'],
                'button_link' => '/dich-vu/',
            ],
        ];
    }

    protected function note(OfferPageContent $content): array
    {
        return [
            'text' => $content->note_text ?: [
                'vi' => '<ul><li>Các chương trình ưu đãi được cập nhật theo từng thời điểm và có thể khác nhau giữa các chi nhánh.</li><li>Vui lòng liên hệ Mầm để được tư vấn chương trình phù hợp tại thời điểm đặt lịch.</li></ul>',
                'en' => '<ul><li>Offer programs are updated periodically and may vary between branches.</li><li>Please contact Mầm for advice on the right program when you book.</li></ul>',
            ],
            'image' => $this->publicUrl($content->note_image),
            'image_alt' => $content->note_image_alt ?: null,
        ];
    }

    protected function closing(OfferPageContent $content): array
    {
        return [
            'title' => $content->closing_title ?: ['vi' => '<p>Begin Your Wellness Journey</p>', 'en' => '<p>Begin Your Wellness Journey</p>'],
            'subtitle' => $content->closing_subtitle ?: [
                'vi' => '<p>Chúng tôi luôn sẵn sàng tư vấn liệu trình và chương trình phù hợp dành cho bạn.</p>',
                'en' => '<p>We are always ready to advise you on the right treatment and program.</p>',
            ],
            'primaryButtonText' => $content->closing_primary_button_text ?: ['vi' => 'Đặt lịch ngay', 'en' => 'Book now'],
            'primaryButtonUrl' => $content->closing_primary_button_url ?: '/dat-lich/',
            'secondaryButtonText' => $content->closing_secondary_button_text ?: ['vi' => 'Liên hệ với chúng tôi', 'en' => 'Contact us'],
            'secondaryButtonUrl' => $content->closing_secondary_button_url ?: '/lien-he/',
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
