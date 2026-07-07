<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Models\Service;
use Inertia\Inertia;
use Inertia\Response;

class BranchController extends Controller
{
    public function show(Branch $branch): Response
    {
        abort_unless($branch->is_active, 404);

        $branch->load('services.category.parent');

        return Inertia::render('AboutUs', [
            'branch' => [
                'id' => $branch->id,
                'slug' => $branch->slug,
                'name' => $branch->name,
                'address' => $branch->address,
                'phone' => $branch->phone,
                'open_hours' => $branch->open_hours,
                'lat' => $branch->lat,
                'lng' => $branch->lng,
                'page_content' => $branch->page_content ?? [],
                'images' => $branch->getMedia('images')->map(fn ($media) => [
                    'url' => $media->getUrl(),
                    'alt' => $media->name,
                ])->all(),
                'services' => $branch->services->map(fn ($s) => [
                    'id' => $s->id,
                    'slug' => $s->slug,
                    'url' => $s->url,
                    'name' => $s->name,
                    'short_description' => $s->short_description,
                    'description' => $s->description,
                    'category' => $s->category?->slug,
                    'category_name' => $s->category?->getTranslations('name'),
                    'duration' => $s->duration,
                    'price' => $s->price,
                    'is_featured' => $s->is_featured,
                    'ingredients' => $s->ingredients ?? [],
                    'images' => $this->serviceImages($s),
                ])->all(),
            ],
        ]);
    }

    /** Gộp ảnh đại diện (thumbnail) lên đầu, theo sau là các ảnh phụ. */
    private function serviceImages(Service $s): array
    {
        $thumbnail = $s->getMedia('thumbnail')->first()?->getUrl();
        $gallery = $s->getMedia('images')->map(fn ($media) => $media->getUrl())->all();

        return array_values(array_filter([$thumbnail, ...$gallery]));
    }
}
