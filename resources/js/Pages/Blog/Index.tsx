import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Seo } from '@/Components/Seo';
import { useLocale } from '@/Hooks/useLocale';
import { tr } from '@/Lib/utils';

interface Post {
    id: number;
    slug: string;
    category: string | null;
    title: Record<string, string> | string;
    excerpt: Record<string, string> | string;
    cover_image: string | null;
    published_at: string | null;
}

interface PaginatedPosts {
    data: Post[];
    next_page_url: string | null;
}

interface BlogIndexProps {
    featured: Post | null;
    posts: PaginatedPosts;
}

const DATE_LOCALES: Record<string, string> = {
    en: 'en-US',
    ja: 'ja-JP',
    ko: 'ko-KR',
    zh: 'zh-CN',
    vi: 'vi-VN',
};

function formatDate(value: string | null, locale: string): string | null {
    if (!value) return null;
    return new Date(value).toLocaleDateString(DATE_LOCALES[locale] ?? 'vi-VN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

export default function BlogIndex({ featured, posts }: BlogIndexProps) {
    const locale = useLocale();
    const { t } = useTranslation();

    const [items, setItems] = useState<Post[]>(posts.data);
    const [nextUrl, setNextUrl] = useState<string | null>(posts.next_page_url);
    const [loading, setLoading] = useState(false);

    const loadMore = () => {
        if (!nextUrl || loading) return;
        setLoading(true);
        router.get(
            nextUrl,
            {},
            {
                only: ['posts'],
                preserveState: true,
                preserveScroll: true,
                onSuccess: (page) => {
                    const more = page.props.posts as PaginatedPosts;
                    setItems((prev) => [...prev, ...more.data]);
                    setNextUrl(more.next_page_url);
                },
                onFinish: () => setLoading(false),
            },
        );
    };

    return (
        <PublicLayout>
            <Seo
                title={t('nav.blog')}
                description={t('blog.metaDescription', 'Cẩm nang chăm sóc sức khoẻ, wellness và trải nghiệm thư giãn tại Mầm Spa.')}
            />

            <section className="bg-maha-50">
                <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
                    {/* Header */}
                    <header className="mb-12 text-center">
                        <p className="font-serif text-lg italic text-[#556B3F]">{t('blog.story')}</p>
                        <h1 className="mt-2 font-serif text-4xl tracking-wide text-heading md:text-5xl">
                            {t('nav.blog')}
                        </h1>
                        <span className="mx-auto mt-5 block h-px w-20 bg-[#556B3F]/60" />
                    </header>

                    {/* Featured */}
                    {featured && <FeaturedCard post={featured} locale={locale} cta={t('blog.readArticle')} />}

                    {/* Grid */}
                    {items.length > 0 ? (
                        <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                            {items.map((p) => (
                                <PostCard key={p.id} post={p} locale={locale} readMore={t('blog.readMore')} />
                            ))}
                        </div>
                    ) : (
                        !featured && (
                            <p className="py-16 text-center font-serif text-lg text-maha-600">{t('blog.empty')}</p>
                        )
                    )}

                    {/* Load more */}
                    {nextUrl && (
                        <div className="mt-12 flex justify-center">
                            <button
                                type="button"
                                onClick={loadMore}
                                disabled={loading}
                                className="rounded-full border border-ink/20 bg-white px-8 py-3 text-sm font-semibold tracking-wide text-ink transition-colors hover:bg-ink hover:text-maha-50 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? t('blog.loading') : t('blog.loadMore')}
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}

function FeaturedCard({ post, locale, cta }: { post: Post; locale: string; cta: string }) {
    const date = formatDate(post.published_at, locale);

    return (
        <Link
            href={`/tin-tuc/${post.slug}`}
            className="group grid overflow-hidden rounded-3xl border border-maha-100 bg-white shadow-xl shadow-maha-900/5 transition-shadow hover:shadow-2xl hover:shadow-maha-900/10 md:grid-cols-2"
        >
            <div className="aspect-[4/3] w-full overflow-hidden bg-maha-200 md:aspect-auto">
                {post.cover_image && (
                    <img
                        src={post.cover_image}
                        alt={tr(post.title, locale)}
                        width={800}
                        height={600}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                )}
            </div>
            <div className="flex flex-col justify-center gap-5 p-8 md:p-12">
                <div className="flex flex-wrap items-center gap-3">
                    {post.category && (
                        <span className="rounded-full bg-maha-100 px-3 py-1 text-xs font-semibold text-[#556B3F]">
                            {post.category}
                        </span>
                    )}
                    {date && <span className="text-xs font-semibold uppercase tracking-wider text-[#556B3F]">{date}</span>}
                </div>
                <h2 className="font-serif text-3xl leading-tight text-heading md:text-4xl">{tr(post.title, locale)}</h2>
                <p className="text-base leading-relaxed text-ink/70">{tr(post.excerpt, locale)}</p>
                <span className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-7 py-3 text-sm font-semibold tracking-wide text-maha-50 transition-colors group-hover:bg-ink/90">
                    {cta}
                    <ChevronRight className="h-4 w-4" />
                </span>
            </div>
        </Link>
    );
}

function PostCard({ post, locale, readMore }: { post: Post; locale: string; readMore: string }) {
    const date = formatDate(post.published_at, locale);

    return (
        <Link
            href={`/tin-tuc/${post.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-maha-100 bg-white shadow-sm transition-shadow hover:shadow-lg hover:shadow-maha-900/5"
        >
            <div className="aspect-[4/3] w-full overflow-hidden bg-maha-200">
                {post.cover_image && (
                    <img
                        src={post.cover_image}
                        alt={tr(post.title, locale)}
                        width={800}
                        height={600}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                )}
            </div>
            <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#556B3F]">
                    {post.category && <span>{post.category}</span>}
                    {post.category && date && <span className="mx-1.5">•</span>}
                    {date}
                </p>
                <h3 className="mt-2 font-serif text-xl leading-snug text-heading">{tr(post.title, locale)}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink/65">{tr(post.excerpt, locale)}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors group-hover:text-[#556B3F]">
                    {readMore}
                    <ChevronRight className="h-4 w-4" />
                </span>
            </div>
        </Link>
    );
}
