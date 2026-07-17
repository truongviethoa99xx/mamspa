import { useState } from 'react';
import { router } from '@inertiajs/react';
import { BlogPostCard } from './BlogPostCard';
import { type BlogPostCardData } from './types';

interface PostsPage {
    data: BlogPostCardData[];
    next_page_url: string | null;
}

/** Lưới "Khám phá thêm" — tải thêm bài viết theo trang (không tải lại toàn bộ trang). */
export function BlogExploreGrid({ posts }: { posts: PostsPage }) {
    const [items, setItems] = useState(posts.data);
    const [nextPageUrl, setNextPageUrl] = useState(posts.next_page_url);
    const [loading, setLoading] = useState(false);

    if (!items.length) {
        return null;
    }

    const loadMore = () => {
        if (!nextPageUrl || loading) return;

        setLoading(true);
        router.get(
            nextPageUrl,
            {},
            {
                preserveScroll: true,
                preserveState: true,
                only: ['posts'],
                onSuccess: (page) => {
                    const next = page.props.posts as PostsPage;
                    setItems((prev) => [...prev, ...next.data]);
                    setNextPageUrl(next.next_page_url);
                },
                onFinish: () => setLoading(false),
            },
        );
    };

    return (
        <section id="kham-pha-them" className="bg-maha-50 px-5 py-14 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
            <div className="mx-auto max-w-7xl">
                <p className="font-serif text-xs uppercase tracking-[0.2em] text-subheading">Khám phá thêm</p>

                <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((post) => (
                        <BlogPostCard key={post.id} data={post} />
                    ))}
                </div>

                {nextPageUrl && (
                    <div className="mt-10 text-center">
                        <button
                            type="button"
                            onClick={loadMore}
                            disabled={loading}
                            className="rounded-md border border-heading px-7 py-3 text-sm font-semibold uppercase tracking-wide text-heading transition-colors hover:bg-heading hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? 'Đang tải...' : 'Xem thêm bài viết'}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
