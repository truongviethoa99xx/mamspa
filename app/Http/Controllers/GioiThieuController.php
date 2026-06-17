<?php

namespace App\Http\Controllers;

use App\Models\AboutPageContent;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class GioiThieuController extends Controller
{
    public function index(): Response
    {
        $content = AboutPageContent::current();

        return Inertia::render('GioiThieu', [
            'content' => [
                'contact_phone' => $content->contact_phone,
                'contact_address' => $content->contact_address,
                'contact_website' => $content->contact_website,
                'hero_image' => $this->publicUrl($content->hero_image),
                'story_image' => $this->publicUrl($content->story_image),
                'vision_image' => $this->publicUrl($content->vision_image),
                'value_images' => [
                    $this->publicUrl($content->value1_image),
                    $this->publicUrl($content->value2_image),
                    $this->publicUrl($content->value3_image),
                ],
                'team' => $this->withPublicImages($content->team ?? [], 'photo'),
                'instagram_handles' => $content->instagram_handles ?? [],
                'review_video_url' => $content->review_video_url,
                'review_video_image' => $this->publicUrl($content->review_video_image),
                'review_cards' => $this->withPublicImages($content->review_cards ?? []),
            ],
        ]);
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
