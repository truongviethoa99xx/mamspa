<?php

namespace App\Http\Controllers;

use App\Models\MenuPageContent;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Trang "Menu" — hero + giới thiệu + chi nhánh (mỗi chi nhánh có bộ 5 file PDF menu dịch
 * vụ theo ngôn ngữ: vi/en/zh/ko/ja) + dải liên hệ. Quản lý ở /admin/menu-page-settings,
 * slug công khai tự do (xem routes/web.php). Field trống ở CMS fallback về nội dung mặc
 * định khớp bản thiết kế gốc (service-menu-web/), để trang luôn đầy đủ ngay cả khi admin
 * chưa nhập liệu.
 */
class MenuController extends Controller
{
    /** Các ngôn ngữ PDF menu hỗ trợ, khớp APP_AVAILABLE_LOCALES. */
    public const PDF_LOCALES = ['vi', 'en', 'zh', 'ko', 'ja'];

    public function render(MenuPageContent $content): Response
    {
        return Inertia::render('Menu', [
            'hero' => $this->hero($content),
            'intro' => $this->intro($content),
            'branches' => $this->branches($content),
            'contact' => $this->contact($content),
            'sectionVisibility' => [
                'hero' => (bool) $content->hero_visible,
                'intro' => (bool) $content->intro_visible,
                'branches' => (bool) $content->branches_visible,
                'contact' => (bool) $content->contact_visible,
            ],
        ]);
    }

    protected function hero(MenuPageContent $content): array
    {
        return [
            'kicker' => $content->hero_kicker ?: ['vi' => 'SERVICE MENU', 'en' => 'SERVICE MENU'],
            'title' => $content->hero_title ?: ['vi' => 'MẦM SPA', 'en' => 'MẦM SPA'],
            'subtitle' => $content->hero_subtitle ?: [
                'vi' => 'Rooted in Vietnamese Healing Traditions',
                'en' => 'Rooted in Vietnamese Healing Traditions',
            ],
            'image' => $this->publicUrl($content->hero_image),
            'image_alt' => $content->hero_image_alt ?: ['vi' => 'Nến thơm và thảo mộc tại Mầm', 'en' => 'Candles and herbs at Mầm'],
        ];
    }

    protected function intro(MenuPageContent $content): array
    {
        return [
            'title' => $content->intro_title ?: [
                'vi' => 'Hai không gian. Một triết lý chăm sóc.<br>Những trải nghiệm được thiết kế riêng cho từng chi nhánh.',
                'en' => 'Two spaces. One philosophy of care.<br>Experiences designed for each branch.',
            ],
            'note' => $content->intro_note ?: [
                'vi' => 'Vui lòng liên hệ hoặc chọn chi nhánh khi đặt lịch<br>để được tư vấn dịch vụ và mức giá áp dụng<br>và đặc quyền ưu đãi riêng dành cho quý khách.',
                'en' => 'Please contact us or choose a branch when booking<br>for advice on services, pricing, and exclusive privileges.',
            ],
        ];
    }

    protected function branches(MenuPageContent $content): array
    {
        $items = $content->branches ?: [];

        return [
            'items' => array_map(function (array $branch) {
                $branch['image'] = $this->publicUrl($branch['image'] ?? null);
                $branch['pdfs'] = collect(self::PDF_LOCALES)
                    ->mapWithKeys(fn (string $locale) => [$locale => $this->publicUrl($branch["pdf_{$locale}"] ?? null)])
                    ->all();

                return $branch;
            }, $items),
        ];
    }

    protected function contact(MenuPageContent $content): array
    {
        return [
            'title' => $content->contact_title ?: ['vi' => 'Mầm luôn sẵn sàng đồng hành cùng bạn', 'en' => 'Mầm is always ready to accompany you'],
            'text' => $content->contact_text ?: [
                'vi' => 'Để được tư vấn chi tiết, vui lòng liên hệ với Mầm<br>hoặc chọn chi nhánh khi đặt lịch.',
                'en' => 'For detailed advice, please contact Mầm<br>or choose a branch when booking.',
            ],
            'image' => $this->publicUrl($content->contact_image),
            'image_alt' => $content->contact_image_alt ?: ['vi' => 'Khay gỗ với nến và thảo mộc', 'en' => 'Wooden tray with candles and herbs'],
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
