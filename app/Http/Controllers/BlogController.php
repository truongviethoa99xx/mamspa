<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    public function index(): Response
    {
        $posts = BlogPost::published()->orderByDesc('published_at')->paginate(9);

        return Inertia::render('Blog/Index', [
            'posts' => $posts->through(fn ($p) => [
                'id' => $p->id,
                'slug' => $p->slug,
                'title' => $p->title,
                'excerpt' => $p->excerpt,
                'cover_image' => $p->cover_image,
                'published_at' => $p->published_at?->toIso8601String(),
            ]),
        ]);
    }

    public function show(BlogPost $post): Response
    {
        abort_unless($post->is_published, 404);

        return Inertia::render('Blog/Show', [
            'post' => [
                'id' => $post->id,
                'slug' => $post->slug,
                'title' => $post->title,
                'excerpt' => $post->excerpt,
                'body' => $post->body,
                'cover_image' => $post->cover_image,
                'seo_meta' => $post->seo_meta,
                'published_at' => $post->published_at?->toIso8601String(),
            ],
        ]);
    }
}
