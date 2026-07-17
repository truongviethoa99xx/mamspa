<?php

namespace App\Http\Controllers;

use App\Models\HomePageContent;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    public function index(): Response
    {
        $images = collect(HomePageContent::current()->customer_gallery_images ?? [])
            ->map(fn ($item) => [
                'src' => $this->publicUrl($item['image'] ?? null),
                'alt' => $item['image_alt'] ?? null,
                'is_customer' => true,
            ])
            ->filter(fn ($item) => ! empty($item['src']))
            ->values()->all();

        return Inertia::render('Gallery', [
            'images' => $images,
        ]);
    }

    private function publicUrl(?string $path): ?string
    {
        if (! $path || str_starts_with($path, '/') || str_starts_with($path, 'http')) {
            return $path;
        }

        return Storage::disk('public')->url($path);
    }
}
