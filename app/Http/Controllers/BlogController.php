<?php

namespace App\Http\Controllers;

use App\Models\BlogPageContent;
use App\Models\BlogPost;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    private const GRID_PER_PAGE = 6;

    private const FEATURED_LIMIT = 4;

    private const RECENT_LIMIT = 4;

    private const READING_WORDS_PER_MINUTE = 200;

    public function index(Request $request): Response
    {
        $activeCategory = $request->string('category')->trim()->value() ?: null;

        $categories = BlogPost::published()
            ->whereNotNull('category')
            ->selectRaw('category, count(*) as total')
            ->groupBy('category')
            ->orderByDesc('total')
            ->get()
            ->map(fn ($row) => ['name' => $row->category, 'count' => (int) $row->total])
            ->values();

        $base = BlogPost::published()
            ->when($activeCategory, fn ($q) => $q->where('category', $activeCategory));

        $featured = (clone $base)->orderByDesc('published_at')->limit(self::FEATURED_LIMIT)->get();
        $featuredIds = $featured->pluck('id');

        $recentPosts = (clone $base)
            ->whereNotIn('id', $featuredIds)
            ->orderByDesc('published_at')
            ->limit(self::RECENT_LIMIT)
            ->get();
        $excludedIds = $featuredIds->merge($recentPosts->pluck('id'));

        $posts = (clone $base)
            ->whereNotIn('id', $excludedIds)
            ->orderByDesc('published_at')
            ->paginate(self::GRID_PER_PAGE)
            ->withQueryString();

        $transform = fn (BlogPost $p) => $this->transformCard($p);
        $content = BlogPageContent::current();

        return Inertia::render('Blog/Index', [
            'hero' => [
                'title' => $content->hero_title ?: ['vi' => 'Blog', 'en' => 'Blog'],
                'subtitle' => $content->hero_subtitle ?: [
                    'vi' => '<p>Chia sẻ kiến thức trị liệu truyền thống, lối sống an lành và những cảm hứng chăm sóc bản thân mỗi ngày.</p>',
                    'en' => '<p>Traditional healing knowledge, mindful living, and daily inspiration for self-care.</p>',
                ],
                'image' => $this->publicUrl($content->hero_image),
                'image_alt' => $content->hero_image_alt ?: null,
            ],
            'featured' => $featured->map($transform)->values(),
            'recentPosts' => $recentPosts->map($transform)->values(),
            'posts' => [
                'data' => collect($posts->items())->map($transform)->values(),
                'next_page_url' => $posts->nextPageUrl(),
            ],
            'categories' => $categories,
            'activeCategory' => $activeCategory,
            'sectionVisibility' => [
                'hero' => (bool) $content->hero_visible,
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
            ->map(fn ($p) => $this->transformCard($p))
            ->values();

        $previous = null;
        $next = null;

        if ($post->published_at) {
            $previous = BlogPost::published()
                ->where('published_at', '<', $post->published_at)
                ->orderByDesc('published_at')
                ->first();

            $next = BlogPost::published()
                ->where('published_at', '>', $post->published_at)
                ->orderBy('published_at')
                ->first();
        }

        return Inertia::render('Blog/Show', [
            'post' => [
                'id' => $post->id,
                'slug' => $post->slug,
                'category' => $post->category,
                'title' => $post->getTranslations('title'),
                'excerpt' => $post->getTranslations('excerpt'),
                'body' => $post->getTranslations('body'),
                'cover_image' => $this->publicUrl($post->cover_image),
                'cover_image_alt' => $post->getTranslations('cover_image_alt'),
                'seo' => $this->seoMetaFor($post),
                'author' => $post->author?->name,
                'author_avatar' => $post->author?->getFilamentAvatarUrl(),
                'published_at' => $post->published_at?->toIso8601String(),
                'updated_at' => $post->updated_at?->toIso8601String(),
                'reading_minutes' => $this->estimateReadingMinutes($post->getTranslations('body')),
            ],
            'related' => $related,
            'previous' => $previous ? $this->transformCard($previous) : null,
            'next' => $next ? $this->transformCard($next) : null,
        ]);
    }

    /** SEO title/description hiệu lực theo từng ngôn ngữ — ưu tiên field SEO riêng, mặc định lấy từ tiêu đề/mô tả ngắn. */
    private function seoMetaFor(BlogPost $post): array
    {
        $titles = $post->getTranslations('title');
        $seoTitles = $post->getTranslations('seo_title');
        $excerpts = $post->getTranslations('excerpt');
        $seoDescriptions = $post->getTranslations('seo_description');

        $locales = array_unique(array_merge(array_keys($titles), array_keys($seoTitles)));

        $title = [];
        $description = [];

        foreach ($locales as $locale) {
            $title[$locale] = ($seoTitles[$locale] ?? '') !== '' ? $seoTitles[$locale] : ($titles[$locale] ?? '');
            $description[$locale] = ($seoDescriptions[$locale] ?? '') !== ''
                ? $seoDescriptions[$locale]
                : trim(strip_tags($excerpts[$locale] ?? ''));
        }

        return ['title' => $title, 'description' => $description];
    }

    private function transformCard(BlogPost $p): array
    {
        return [
            'id' => $p->id,
            'slug' => $p->slug,
            'category' => $p->category,
            'title' => $p->getTranslations('title'),
            'excerpt' => $p->getTranslations('excerpt'),
            'cover_image' => $this->publicUrl($p->cover_image),
            'cover_image_alt' => $p->getTranslations('cover_image_alt'),
            'published_at' => $p->published_at?->toIso8601String(),
            'reading_minutes' => $this->estimateReadingMinutes($p->getTranslations('body')),
        ];
    }

    /** Ước lượng thời gian đọc (phút) từ số từ trong nội dung, tối thiểu 1 phút. */
    private function estimateReadingMinutes(array $bodyByLocale): int
    {
        $text = trim(strip_tags(collect($bodyByLocale)->implode(' ')));
        $wordCount = $text === '' ? 0 : count(preg_split('/\s+/u', $text));

        return max(1, (int) ceil($wordCount / self::READING_WORDS_PER_MINUTE));
    }

    private function publicUrl(?string $path): ?string
    {
        return $path ? (str_starts_with($path, 'http') ? $path : "/storage/{$path}") : null;
    }
}
