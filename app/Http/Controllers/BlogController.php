<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    private const GRID_PER_PAGE = 6;

    public function index(): Response
    {
        $transform = fn ($p) => [
            'id' => $p->id,
            'slug' => $p->slug,
            'category' => $p->category,
            'title' => $p->title,
            'excerpt' => $p->excerpt,
            'cover_image' => $p->cover_image,
            'published_at' => $p->published_at?->toIso8601String(),
        ];

        $featured = BlogPost::published()->orderByDesc('published_at')->first();

        $posts = BlogPost::published()
            ->when($featured, fn ($q) => $q->whereKeyNot($featured->getKey()))
            ->orderByDesc('published_at')
            ->paginate(self::GRID_PER_PAGE);

        return Inertia::render('Blog/Index', [
            'featured' => $featured ? $transform($featured) : null,
            'posts' => [
                'data' => collect($posts->items())->map($transform)->values(),
                'next_page_url' => $posts->nextPageUrl(),
            ],
        ]);
    }

    public function show(BlogPost $post): Response
    {
        abort_unless($post->is_published, 404);

        $post->loadMissing('author');

        $related = BlogPost::published()
            ->whereKeyNot($post->getKey())
            ->orderByDesc('published_at')
            ->limit(3)
            ->get()
            ->map(fn ($p) => [
                'id' => $p->id,
                'slug' => $p->slug,
                'title' => $p->title,
                'cover_image' => $p->cover_image,
                'published_at' => $p->published_at?->toIso8601String(),
            ])
            ->values();

        return Inertia::render('Blog/Show', [
            'post' => [
                'id' => $post->id,
                'slug' => $post->slug,
                'category' => $post->category,
                'title' => $post->title,
                'excerpt' => $post->excerpt,
                'body' => $post->body,
                'cover_image' => $post->cover_image,
                'seo_meta' => $post->seo_meta,
                'author' => $post->author?->name,
                'published_at' => $post->published_at?->toIso8601String(),
            ],
            'related' => $related,
        ]);
    }
}
