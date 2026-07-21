<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\ServiceCategory;
use App\Models\ServicePageContent;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class DichVuController extends Controller
{
    private function map(Service $s): array
    {
        return [
            'id' => $s->id,
            'slug' => $s->slug,
            'url' => $s->url,
            'name' => $s->name,
            'short_description' => $s->short_description,
            'description' => $s->description,
            'thumbnail_alt' => $s->thumbnail_alt,
            'category' => $s->category?->slug,
            'category_name' => $s->category?->getTranslations('name'),
            'duration' => $s->duration,
            'price' => $s->price,
            'is_featured' => $s->is_featured,
            'ingredients' => $s->ingredients ?? [],
            'steps' => collect($s->steps ?? [])
                ->map(fn ($step) => array_merge(
                    is_array($step) ? $step : [],
                    ['image' => $this->publicUrl($step['image'] ?? null)],
                ))->all(),
            // Lợi ích / đối tượng phù hợp / FAQ / ảnh trải nghiệm giờ quản lý theo danh mục dịch vụ.
            'benefits' => $s->category?->benefits ?? [],
            'ideal_for' => $s->category?->ideal_for ?? [],
            'faqs' => $s->category?->faqs ?? [],
            'experience_images' => collect($s->category?->experience_images ?? [])
                ->map(fn ($img) => [
                    'image' => $this->publicUrl($img['image'] ?? null),
                    'alt' => $img['alt'] ?? '',
                ])
                ->filter(fn ($img) => ! empty($img['image']))
                ->values()->all(),
            'images' => $this->serviceImages($s),
        ];
    }

    /** Dữ liệu đầy đủ cho trang chi tiết dịch vụ — bổ sung các khối riêng của trang chi tiết lên trên map() dùng cho thẻ dịch vụ. */
    private function mapDetail(Service $s): array
    {
        return array_merge($this->map($s), [
            'pillars_heading' => $s->pillars_heading,
            'pillars' => $s->pillars ?? [],
            'pillars_image' => $this->publicUrl($s->pillars_image),
            'pillars_image_alt' => $s->pillars_image_alt,
            'treatment_scope_note' => $s->treatment_scope_note,
            'treatment_scope_image' => $s->treatment_scope_image,
            'tools_used' => $s->tools_used ?? [],
            'tiers_heading' => $s->tiers_heading,
            'tiers_subtitle' => $s->tiers_subtitle,
            'tiers' => collect($s->tiers ?? [])
                ->map(fn ($tier) => array_merge(
                    is_array($tier) ? $tier : [],
                    ['image' => $this->publicUrl($tier['image'] ?? null)],
                ))->all(),
        ]);
    }

    /** Dịch vụ là gói combo — qua cờ is_combo hoặc thuộc danh mục "combo" (chính nó hoặc danh mục cấp 1 của nó). */
    private function isCombo(Service $s): bool
    {
        return $s->is_combo || ($s->category && ($s->category->slug === 'combo' || $s->category->parent?->slug === 'combo'));
    }

    /** Gộp ảnh đại diện (thumbnail) lên đầu, theo sau là các ảnh phụ. */
    private function serviceImages(Service $s): array
    {
        $thumbnail = $s->getMedia('thumbnail')->first()?->getUrl();
        $gallery = $s->getMedia('images')->map(fn ($media) => $media->getUrl())->all();

        return array_values(array_filter([$thumbnail, ...$gallery]));
    }

    public function index(): Response
    {
        $content = ServicePageContent::current();

        return Inertia::render('DichVu', [
            'hero' => $this->hero($content),
            'showcase' => $this->showcase(),
            'closing' => $this->closing($content),
            'sectionVisibility' => [
                'hero' => (bool) $content->hero_visible,
                'showcase' => (bool) $content->showcase_visible,
                'closing' => (bool) $content->closing_visible,
            ],
        ]);
    }

    /** Banner đầu trang /dich-vu — chỉ tiêu đề + mô tả, không ảnh nền/nút CTA. */
    protected function hero(ServicePageContent $content): array
    {
        return [
            'heading' => $content->hero_title ?: ['vi' => '<p>Dịch vụ tại Mầm</p>', 'en' => '<p>Services at Mầm</p>'],
            'subtitle' => $content->hero_subtitle ?: [
                'vi' => '<p>Bốn hành trình trị liệu được thiết kế để chăm sóc cơ thể, nuôi dưỡng tâm trí và khơi dậy nguồn năng lượng tích cực từ bên trong.</p>',
                'en' => '<p>Four therapeutic journeys designed to care for the body, nourish the mind and awaken positive energy from within.</p>',
            ],
            'image' => $this->publicUrl($content->hero_image),
            'image_alt' => $content->hero_image_alt ?: null,
        ];
    }

    /** 4 khối dịch vụ nổi bật = các danh mục dịch vụ cấp 1 thật, quản lý ở /admin/service-categories. */
    protected function showcase(): array
    {
        $categories = ServiceCategory::active()->listed()->roots()->orderBy('order')->get();

        return [
            'items' => $categories->map(fn (ServiceCategory $c) => [
                'image' => $this->publicUrl($c->image),
                'title' => $c->getTranslations('name'),
                'description' => $c->getTranslations('description'),
                'url' => $c->url,
            ])->all(),
        ];
    }

    /** Nội dung chữ mặc định của banner CTA khép lại trang — dùng khi field tương ứng để trống. */
    protected function closingDefaults(): array
    {
        return [
            'heading' => [
                'vi' => '<p>Mỗi liệu trình là một hành trình trở về bên trong.</p>',
                'en' => '<p>Every treatment is a journey back within.</p>',
            ],
            'body' => [
                'vi' => '<p>Hãy để Mầm đồng hành cùng bạn trên hành trình chăm sóc sức khỏe và nuôi dưỡng sự an lành mỗi ngày.</p>',
                'en' => '<p>Let Mầm walk alongside you on the journey of health and everyday wellbeing.</p>',
            ],
            'ctaText' => ['vi' => '<p>Đặt lịch ngay</p>', 'en' => '<p>Book now</p>'],
            'ctaLink' => '/dat-lich/',
        ];
    }

    /** Banner CTA khép lại trang, mời khách đặt lịch. */
    protected function closing(ServicePageContent $content): array
    {
        $defaults = $this->closingDefaults();

        return [
            'heading' => $content->closing_heading ?: $defaults['heading'],
            'body' => $content->closing_body ?: $defaults['body'],
            'ctaText' => $content->closing_cta_text ?: $defaults['ctaText'],
            'ctaLink' => $content->closing_cta_link ?: $defaults['ctaLink'],
            'image' => $this->publicUrl($content->closing_image),
            'image_alt' => $content->closing_image_alt ?: null,
        ];
    }

    /** Banner khép lại trang chi tiết dịch vụ — riêng cho từng dịch vụ, không dùng chung banner ở Trang Dịch vụ; field chữ trống thì dùng nội dung mặc định. */
    protected function serviceClosing(Service $service): array
    {
        $defaults = $this->closingDefaults();

        return [
            'heading' => $service->closing_heading ?: $defaults['heading'],
            'body' => $service->closing_body ?: $defaults['body'],
            'ctaText' => $service->closing_cta_text ?: $defaults['ctaText'],
            'ctaLink' => $service->closing_cta_link ?: $defaults['ctaLink'],
            'image' => $this->publicUrl($service->closing_image),
            'image_alt' => $service->closing_image_alt ?: null,
        ];
    }

    /** Banner khép lại trang danh mục — ưu tiên nội dung riêng của danh mục, trống thì dùng chung banner mặc định. */
    protected function categoryClosing(ServiceCategory $category): array
    {
        $fallback = $this->closing(ServicePageContent::current());

        return [
            'heading' => $category->closing_heading ?: $fallback['heading'],
            'body' => $category->closing_body ?: $fallback['body'],
            'ctaText' => $category->closing_cta_text ?: $fallback['ctaText'],
            'ctaLink' => $category->closing_cta_link ?: $fallback['ctaLink'],
            'image' => $category->closing_image ? $this->publicUrl($category->closing_image) : $fallback['image'],
            'image_alt' => $category->closing_image_alt ?: $fallback['image_alt'],
        ];
    }

    /**
     * Điều hướng cây danh mục 2 cấp dưới /dich-vu/:
     * - /dich-vu/{root}/                    → trang danh mục cấp 1
     * - /dich-vu/{root}/{child}/            → trang danh mục cấp 2
     * - /dich-vu/{root}/{service}/          → chi tiết dịch vụ gắn trực tiếp vào danh mục cấp 1
     * - /dich-vu/{root}/{child}/{service}/  → chi tiết dịch vụ gắn vào danh mục cấp 2
     * - /dich-vu/{service}/ (URL cũ, phẳng) → 301 sang URL chuẩn có tiền tố danh mục.
     */
    public function browse(string $a, ?string $b = null, ?string $c = null): Response|RedirectResponse
    {
        $root = ServiceCategory::active()->roots()->where('slug', $a)->first();

        if (! $root) {
            if ($b !== null || $c !== null) {
                return $this->customPageOrAbort($a, $b, $c);
            }

            $legacyService = Service::active()->with('category.parent')->where('slug', $a)->first();

            if (! $legacyService) {
                return $this->customPageOrAbort($a);
            }

            // Dịch vụ chưa gán danh mục thì không có tiền tố để redirect tới — render thẳng tại URL phẳng.
            if (! $legacyService->category) {
                return $this->renderService($legacyService, []);
            }

            return redirect()->away(url(rtrim($legacyService->url, '/')).'/', 301);
        }

        if ($b === null) {
            return $this->renderCategory($root);
        }

        $child = $root->children()->active()->where('slug', $b)->first();

        if ($child) {
            return $c === null
                ? $this->renderCategory($child)
                : $this->renderServiceIn($child, $c, "/dich-vu/{$a}/{$b}/{$c}/");
        }

        if ($c !== null) {
            return $this->customPageOrAbort($a, $b, $c);
        }

        return $this->renderServiceIn($root, $b, "/dich-vu/{$a}/{$b}/");
    }

    /**
     * Không khớp danh mục/dịch vụ nào dưới /dich-vu/ — thử tìm Trang tuỳ biến (CustomPage)
     * trùng slug trước khi trả 404, để admin có thể tạo trang riêng dưới tiền tố /dich-vu/.
     */
    private function customPageOrAbort(string $a, ?string $b = null, ?string $c = null): Response
    {
        $slug = implode('/', array_filter(['dich-vu', $a, $b, $c], fn (?string $segment) => $segment !== null));

        return app(CustomPageController::class)->show($slug);
    }

    /** Render chi tiết dịch vụ, hoặc 301 sang URL chuẩn nếu $requestedPath không còn là URL chính tắc (VD: dịch vụ đã đổi danh mục). */
    private function renderServiceIn(ServiceCategory $category, string $slug, string $requestedPath): Response|RedirectResponse
    {
        $service = Service::active()
            ->with('category.parent')
            ->where('service_category_id', $category->id)
            ->where('slug', $slug)
            ->first();

        if (! $service) {
            return app(CustomPageController::class)->show(trim($requestedPath, '/'));
        }

        if ($service->url !== $requestedPath) {
            return redirect()->away(url(rtrim($service->url, '/')).'/', 301);
        }

        return $this->renderService($service, $this->categoryBreadcrumb($category));
    }

    private function renderService(Service $service, array $breadcrumb): Response
    {
        $related = Service::active()
            ->with('category.parent')
            ->whereKeyNot($service->getKey())
            ->orderByRaw('service_category_id = ? desc', [$service->service_category_id])
            ->orderByDesc('is_featured')
            ->limit(4)
            ->get();

        // Khối "Các gói combo" chỉ hiển thị khi chính dịch vụ đang xem là combo.
        $combos = $this->isCombo($service)
            ? Service::active()
                ->with('category.parent')
                ->combo()
                ->whereKeyNot($service->getKey())
                ->orderByDesc('is_featured')
                ->limit(3)
                ->get()
            : collect();

        $categoryServices = $service->service_category_id
            ? Service::active()
                ->with('category.parent')
                ->where('service_category_id', $service->service_category_id)
                ->orderByDesc('is_featured')
                ->get()
            : collect();

        return Inertia::render('DichVuDetail', [
            'service' => $this->mapDetail($service),
            'breadcrumb' => $breadcrumb,
            'categoryServices' => $categoryServices->map(fn ($s) => $this->map($s)),
            'combos' => $combos->map(fn ($s) => $this->map($s)),
            'related' => $related->map(fn ($s) => $this->map($s)),
            'closing' => $this->serviceClosing($service),
        ]);
    }

    /** Trang danh mục: hero lấy tên/mô tả/ảnh danh mục, bên dưới là card dịch vụ (gồm cả dịch vụ của danh mục con nếu là cấp 1). */
    private function renderCategory(ServiceCategory $category): Response
    {
        $categoryIds = [$category->id];

        if ($category->isRoot()) {
            $categoryIds = array_merge($categoryIds, $category->children()->active()->pluck('id')->all());
        }

        $services = Service::active()
            ->with('category.parent')
            ->whereIn('service_category_id', $categoryIds)
            ->orderByDesc('is_featured')
            ->get();

        // "Tham khảo dịch vụ khác": các danh mục bậc 1, trừ danh mục (gốc) đang xem.
        $currentRootId = $category->isRoot() ? $category->id : $category->parent_id;

        $related = ServiceCategory::active()
            ->listed()
            ->roots()
            ->where('id', '!=', $currentRootId)
            ->orderBy('order')
            ->get();

        return Inertia::render('DichVuCategory', [
            'category' => [
                'id' => $category->id,
                'slug' => $category->slug,
                'name' => $category->getTranslations('name'),
                'description' => $category->getTranslations('description'),
                'image' => $this->publicUrl($category->image),
                'image_alt' => $category->image_alt,
                'url' => $category->url,
                'benefits' => $category->benefits ?? [],
                'ideal_for' => $category->ideal_for ?? [],
                'faqs' => $category->faqs ?? [],
                'experience_images' => collect($category->experience_images ?? [])
                    ->map(fn ($img) => [
                        'image' => $this->publicUrl($img['image'] ?? null),
                        'alt' => $img['alt'] ?? '',
                    ])
                    ->filter(fn ($img) => ! empty($img['image']))
                    ->values()->all(),
                // Khối "Chăm sóc theo nhu cầu, không theo khuôn mẫu" — trống thì FE ẩn khối, không có fallback mặc định.
                'intro_heading' => $category->intro_heading,
                'intro_body' => $category->intro_body,
                'intro_image' => $this->publicUrl($category->intro_image),
                'intro_image_alt' => $category->intro_image_alt,
                'pillars' => $category->pillars ?? [],
                'quote' => $category->quote,
                'experience_note_title' => $category->experience_note_title,
                'experience_checklist' => $category->experience_checklist ?? [],
                'experience_note_body' => $category->experience_note_body,
                'experience_note_image' => $this->publicUrl($category->experience_note_image),
                'experience_note_image_alt' => $category->experience_note_image_alt,
                'therapy_heading' => $category->therapy_heading,
            ],
            'breadcrumb' => $this->categoryAncestors($category),
            'services' => $services->map(fn ($s) => $this->map($s)),
            'related' => $related->map(fn (ServiceCategory $c) => [
                'id' => $c->id,
                'slug' => $c->slug,
                'name' => $c->getTranslations('name'),
                'description' => $c->getTranslations('description'),
                'url' => $c->url,
                'image' => $this->publicUrl($c->image),
            ])->all(),
            'closing' => $this->categoryClosing($category),
        ]);
    }

    /**
     * Breadcrumb link tới $category (bao gồm chính nó) — dùng cho trang chi tiết dịch vụ,
     * nơi $category là danh mục trực tiếp của dịch vụ và tên dịch vụ được thêm làm mục cuối ở FE.
     */
    private function categoryBreadcrumb(ServiceCategory $category): array
    {
        $items = $this->categoryAncestors($category);
        $items[] = ['name' => html_entity_decode(strip_tags($category->name)), 'url' => $category->url];

        return $items;
    }

    /** Breadcrumb chỉ gồm tổ tiên của $category (không gồm chính nó) — dùng cho trang danh mục. */
    private function categoryAncestors(ServiceCategory $category): array
    {
        return $category->parent
            ? [['name' => html_entity_decode(strip_tags($category->parent->name)), 'url' => $category->parent->url]]
            : [];
    }

    private function withPublicImages(array $items): array
    {
        return array_map(function (array $item) {
            if (! empty($item['image'])) {
                $item['image'] = $this->publicUrl($item['image']);
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
