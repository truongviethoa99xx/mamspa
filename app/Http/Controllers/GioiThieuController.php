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
                // Text đa ngôn ngữ theo section (JSON {vi,en,...}); null → FE fallback nhóm dịch about.*
                'hero_eyebrow' => $content->hero_eyebrow,
                'hero_title' => $content->hero_title,
                'hero_subtitle' => $content->hero_subtitle,
                'hero_retreat' => $content->hero_retreat,
                'features' => $content->features ?? [],
                'story_eyebrow' => $content->story_eyebrow,
                'story_heading' => $content->story_heading,
                'story_p1' => $content->story_p1,
                'story_p2' => $content->story_p2,
                'vision_eyebrow' => $content->vision_eyebrow,
                'vision_title' => $content->vision_title,
                'vision_p1' => $content->vision_p1,
                'vision_p2' => $content->vision_p2,
                'vision_bullets' => $content->vision_bullets ?? [],
                'values_eyebrow' => $content->values_eyebrow,
                'values_title' => $content->values_title,
                'value_titles' => [$content->value1_title, $content->value2_title, $content->value3_title],
                'value_descs' => [$content->value1_desc, $content->value2_desc, $content->value3_desc],
                'team_eyebrow' => $content->team_eyebrow,
                'team_title' => $content->team_title,
                'reviews_eyebrow' => $content->reviews_eyebrow,
                'reviews_title' => $content->reviews_title,
                'review_video_caption' => $content->review_video_caption,
                'review_quote' => $content->review_quote,
                'review_quote_author' => $content->review_quote_author,
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
