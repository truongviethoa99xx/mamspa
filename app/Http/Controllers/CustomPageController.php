<?php

namespace App\Http\Controllers;

use App\Models\CustomPage;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class CustomPageController extends Controller
{
    /** Trang tuỳ biến qua CMS — banner cấu trúc (giống hero trang chủ) + body HTML/CSS/JS admin tự nhập. */
    public function show(string $slug): Response
    {
        $page = CustomPage::published()->where('slug', trim($slug, '/'))->first();

        abort_unless($page, 404);

        return Inertia::render('CustomPage/Show', [
            'banner' => $this->banner($page),
            'bannerVisible' => (bool) $page->banner_visible,
            'body' => [
                'html' => $page->body_html,
                'css' => $page->body_css,
                'js' => $page->body_js,
            ],
        ]);
    }

    protected function banner(CustomPage $page): array
    {
        return [
            'heading' => $page->banner_title,
            'subtitle' => $page->banner_subtitle,
            'image' => $this->publicUrl($page->banner_image),
            'image_alt' => $page->banner_image_alt,
            'cta' => [
                'text' => $page->banner_cta_text,
                'link' => $page->banner_cta_link ?: '#',
                'background_color' => $page->banner_cta_background_color,
                'text_color' => $page->banner_cta_text_color,
                'border_color' => $page->banner_cta_border_color,
            ],
            'secondary_cta' => [
                'text' => $page->banner_secondary_cta_text,
                'link' => $page->banner_secondary_cta_link ?: '#',
                'background_color' => $page->banner_secondary_cta_background_color,
                'text_color' => $page->banner_secondary_cta_text_color,
                'border_color' => $page->banner_secondary_cta_border_color,
            ],
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
