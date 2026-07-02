<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Models\Service;
use App\Models\ServicePageContent;
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
            'name' => $s->name,
            'description' => $s->description,
            'category' => $s->category,
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
            ->with('branches')
            ->when($branchSlug, fn ($query) => $query->whereHas('branches', fn ($b) => $b->where('slug', $branchSlug)))
            ->when($q !== '', fn ($query) => $query->where('name', 'like', "%{$q}%"))
            ->orderByDesc('is_featured')
            ->get();

        return Inertia::render('DichVu', [
            'filters' => ['branch' => $branchSlug, 'q' => $q],
            'combos' => $services->where('category', 'combo')->values()->map(fn ($s) => $this->map($s)),
            'services' => $services->map(fn ($s) => $this->map($s)),
            'branches' => Branch::where('is_active', true)->get()->map(fn ($b) => [
                'slug' => $b->slug, 'name' => $b->name,
            ]),
            'content' => $this->listingContent(),
        ]);
    }

    public function show(string $slug): Response
    {
        $service = Service::active()->with('branches')->where('slug', $slug)->firstOrFail();

        $related = Service::active()
            ->with('branches')
            ->whereKeyNot($service->getKey())
            ->orderByRaw('category = ? desc', [$service->category])
            ->orderByDesc('is_featured')
            ->limit(4)
            ->get();

        $combos = Service::active()
            ->with('branches')
            ->where('category', 'combo')
            ->whereKeyNot($service->getKey())
            ->orderByDesc('is_featured')
            ->limit(3)
            ->get();

        $content = ServicePageContent::current();

        return Inertia::render('DichVuDetail', [
            'service' => $this->map($service),
            'combos' => $combos->map(fn ($s) => $this->map($s)),
            'related' => $related->map(fn ($s) => $this->map($s)),
            'content' => [
                'happy_hours_title' => $content->happy_hours_title,
                'happy_hours_desc' => $content->happy_hours_desc,
                'benefits' => $content->benefits ?? [],
                'ideal_for' => $content->ideal_for ?? [],
                'faqs' => $content->faqs ?? [],
            ],
        ]);
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
