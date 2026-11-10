<?php

namespace App\Http\Controllers;

use App\Models\MenuBranchPage;
use App\Models\MenuPageContent;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Trang "Menu" — hero + giới thiệu + danh sách link chi nhánh + dải liên hệ. Mỗi chi nhánh
 * giờ là 1 trang riêng (App\Models\MenuBranchPage, URL /menu/{slug}/) với bộ 5 file PDF menu
 * dịch vụ theo ngôn ngữ (vi/en/zh/ko/ja) — xem renderBranch(). Quản lý trang chính ở
 * /admin/menu-page-settings, chi nhánh ở resource riêng (MenuBranchPageResource). Field trống
 * ở CMS fallback về nội dung mặc định khớp bản thiết kế gốc (service-menu-web/), để trang
 * luôn đầy đủ ngay cả khi admin chưa nhập liệu.
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
            'branches' => $this->branches(),
            'contact' => $this->contact($content),
            'sectionVisibility' => [
                'hero' => (bool) $content->hero_visible,
                'intro' => (bool) $content->intro_visible,
                'branches' => (bool) $content->branches_visible,
                'contact' => (bool) $content->contact_visible,
            ],
        ]);
    }

    /** Trang riêng của 1 chi nhánh (/menu/{slug}/) — thông tin + 5 nút PDF theo ngôn ngữ. */
    public function renderBranch(MenuBranchPage $branch): Response
    {
        $menu = MenuPageContent::current();

        return Inertia::render('MenuBranch', [
            'branch' => [
                'slug' => $branch->slug,
                'url' => '/'.trim($branch->slug, '/').'/',
                'image' => $this->publicUrl($branch->image),
                'image_alt' => $branch->image_alt ?: null,
                'name' => $branch->name ?: null,
                'street' => $branch->street ?: null,
                'desc' => $branch->desc ?: null,
                'pdfs' => collect(self::PDF_LOCALES)
                    ->mapWithKeys(fn (string $locale) => [$locale => $this->publicUrl($branch->{"pdf_{$locale}"})])
                    ->all(),
            ],
            'contact' => $this->contact($menu),
            'sectionVisibility' => [
                'contact' => (bool) $menu->contact_visible,
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

    /** Danh sách thẻ link sang từng trang chi nhánh riêng — không còn mang theo PDF ở đây nữa. */
    protected function branches(): array
    {
        return [
            'items' => MenuBranchPage::published()
                ->orderBy('order')
                ->get()
                ->map(fn (MenuBranchPage $branch) => [
                    'slug' => $branch->slug,
                    'url' => '/'.trim($branch->slug, '/').'/',
                    'image' => $this->publicUrl($branch->image),
                    'image_alt' => $branch->image_alt ?: null,
                    'name' => $branch->name ?: null,
                    'street' => $branch->street ?: null,
                ])
                ->all(),
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
