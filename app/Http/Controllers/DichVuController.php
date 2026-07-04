<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Models\Service;
use App\Models\ServiceCategory;
use App\Models\ServicePageContent;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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
            'description' => $s->description,
            'category' => $s->category?->slug,
            'duration' => $s->duration,
            'price' => $s->price,
            'is_featured' => $s->is_featured,
            'ingredients' => $s->ingredients ?? [],
            'steps' => collect($s->steps ?? [])
                ->map(fn ($step) => array_merge(
                    is_array($step) ? $step : [],
                    ['image' => $this->publicUrl($step['image'] ?? null)],
                ))->all(),
            'benefits' => $s->benefits ?? [],
            'ideal_for' => $s->ideal_for ?? [],
            'faqs' => $s->faqs ?? [],
            'experience_images' => collect($s->experience_images ?? [])
                ->map(fn ($img) => [
                    'image' => $this->publicUrl($img['image'] ?? null),
                    'alt' => $img['alt'] ?? '',
                ])
                ->filter(fn ($img) => ! empty($img['image']))
                ->values()->all(),
            'images' => $this->serviceImages($s),
            'branches' => $s->branches->pluck('slug'),
        ];
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

    public function index(Request $request): Response
    {
        $branchSlug = $request->query('branch');
        $q = trim((string) $request->query('q', ''));

        $services = Service::active()
            ->with(['branches', 'category.parent'])
            ->when($branchSlug, fn ($query) => $query->whereHas('branches', fn ($b) => $b->where('slug', $branchSlug)))
            ->when($q !== '', fn ($query) => $query->where('name', 'like', "%{$q}%"))
            ->orderByDesc('is_featured')
            ->get();

        return Inertia::render('DichVu', [
            'filters' => ['branch' => $branchSlug, 'q' => $q],
            'combos' => $services->filter(fn (Service $s) => $this->isCombo($s))->values()->map(fn ($s) => $this->map($s)),
            'services' => $services->map(fn ($s) => $this->map($s)),
            'branches' => Branch::where('is_active', true)->get()->map(fn ($b) => [
                'slug' => $b->slug, 'name' => $b->name,
            ]),
            'content' => $this->listingContent(),
        ]);
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
                abort(404);
            }

            $legacyService = Service::active()->with(['branches', 'category.parent'])->where('slug', $a)->first();
            abort_if(! $legacyService, 404);

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

        abort_if($c !== null, 404);

        return $this->renderServiceIn($root, $b, "/dich-vu/{$a}/{$b}/");
    }

    /** Render chi tiết dịch vụ, hoặc 301 sang URL chuẩn nếu $requestedPath không còn là URL chính tắc (VD: danh mục đã collapse còn 1 dịch vụ). */
    private function renderServiceIn(ServiceCategory $category, string $slug, string $requestedPath): Response|RedirectResponse
    {
        $service = Service::active()
            ->with(['branches', 'category.parent'])
            ->where('service_category_id', $category->id)
            ->where('slug', $slug)
            ->first();

        abort_if(! $service, 404);

        if ($service->url !== $requestedPath) {
            return redirect()->away(url(rtrim($service->url, '/')).'/', 301);
        }

        return $this->renderService($service, $this->categoryBreadcrumb($category));
    }

    private function renderService(Service $service, array $breadcrumb): Response
    {
        $related = Service::active()
            ->with(['branches', 'category.parent'])
            ->whereKeyNot($service->getKey())
            ->orderByRaw('service_category_id = ? desc', [$service->service_category_id])
            ->orderByDesc('is_featured')
            ->limit(4)
            ->get();

        $combos = Service::active()
            ->with(['branches', 'category.parent'])
            ->combo()
            ->whereKeyNot($service->getKey())
            ->orderByDesc('is_featured')
            ->limit(3)
            ->get();

        $content = ServicePageContent::current();

        return Inertia::render('DichVuDetail', [
            'service' => $this->map($service),
            'breadcrumb' => $breadcrumb,
            'combos' => $combos->map(fn ($s) => $this->map($s)),
            'related' => $related->map(fn ($s) => $this->map($s)),
            'content' => [
                'happy_hours_title' => $content->happy_hours_title,
                'happy_hours_desc' => $content->happy_hours_desc,
            ],
        ]);
    }

    /** Trang danh mục: liệt kê danh mục con (nếu $category là gốc) và dịch vụ gắn trực tiếp vào $category. */
    private function renderCategory(ServiceCategory $category): Response
    {
        $services = Service::active()
            ->with(['branches', 'category.parent'])
            ->where('service_category_id', $category->id)
            ->orderByDesc('is_featured')
            ->get();

        // Danh mục cấp 2 chỉ có đúng 1 dịch vụ → hiển thị thẳng trang chi tiết dịch vụ đó tại
        // URL danh mục, tránh trang danh mục thừa chỉ để hiển thị một dịch vụ duy nhất.
        if (! $category->isRoot() && $services->count() === 1) {
            return $this->renderService($services->first(), $this->categoryBreadcrumb($category));
        }

        return Inertia::render('DichVuCategory', [
            'category' => [
                'slug' => $category->slug,
                'name' => $category->name,
                'url' => $category->url,
                'is_root' => $category->isRoot(),
            ],
            'breadcrumb' => $this->categoryAncestors($category),
            'children' => $category->isRoot()
                ? $category->children()->active()->get()->map(fn (ServiceCategory $c) => [
                    'slug' => $c->slug,
                    'name' => $c->name,
                    'url' => $c->url,
                ])->all()
                : [],
            'services' => $services->map(fn ($s) => $this->map($s)),
        ]);
    }

    /**
     * Breadcrumb link tới $category (bao gồm chính nó) — dùng cho trang chi tiết dịch vụ,
     * nơi $category là danh mục trực tiếp của dịch vụ và tên dịch vụ được thêm làm mục cuối ở FE.
     */
    private function categoryBreadcrumb(ServiceCategory $category): array
    {
        $items = $this->categoryAncestors($category);
        $items[] = ['name' => $category->name, 'url' => $category->url];

        return $items;
    }

    /** Breadcrumb chỉ gồm tổ tiên của $category (không gồm chính nó) — dùng cho trang danh mục. */
    private function categoryAncestors(ServiceCategory $category): array
    {
        return $category->parent
            ? [['name' => $category->parent->name, 'url' => $category->parent->url]]
            : [];
    }

    private function listingContent(): array
    {
        $content = ServicePageContent::current();

        return [
            'listing_categories' => $content->listing_categories ?? [],
            'massage_eyebrow' => $content->massage_eyebrow,
            'massage_cards' => $this->withPublicImages($content->massage_cards ?? []),
            'head_spa_eyebrow' => $content->head_spa_eyebrow,
            'head_spa_title' => $content->head_spa_title,
            'head_spa_cards' => $this->withPublicImages($content->head_spa_cards ?? []),
            'other_care_eyebrow' => $content->other_care_eyebrow,
            'other_care_title' => $content->other_care_title,
            'other_care_items' => $this->withPublicImages($content->other_care_items ?? []),
        ];
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
