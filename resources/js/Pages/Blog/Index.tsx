import { Head, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import PublicLayout from '@/Layouts/PublicLayout';
import { useLocale } from '@/Hooks/useLocale';
import { tr } from '@/Lib/utils';

interface Post {
    id: number;
    slug: string;
    title: any;
    excerpt: any;
    cover_image: string | null;
    published_at: string | null;
}

interface PaginatedPosts {
    data: Post[];
    links: any[];
}

export default function BlogIndex({ posts }: { posts: PaginatedPosts }) {
    const locale = useLocale();
    const { t } = useTranslation();
    return (
        <PublicLayout>
            <Head title={t('nav.blog')} />
            <section className="bg-maha-50 py-12">
                <div className="mx-auto max-w-5xl px-4">
                    <h1 className="font-serif text-4xl text-maha-700">{t('nav.blog')}</h1>
                </div>
            </section>
            <section className="py-12">
                <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-3">
                    {posts.data.map((p) => (
                        <Link key={p.id} href={`/blog/${p.slug}`}
                            className="overflow-hidden rounded-xl border border-maha-100 hover:shadow-lg">
                            {p.cover_image && <img src={p.cover_image} alt="" className="aspect-[4/3] w-full object-cover" />}
                            <div className="p-5">
                                {p.published_at && (
                                    <p className="text-xs text-gray-500">
                                        {new Date(p.published_at).toLocaleDateString(locale === 'en' ? 'en-US' : 'vi-VN')}
                                    </p>
                                )}
                                <h2 className="mt-1 font-serif text-xl text-maha-700">{tr(p.title, locale)}</h2>
                                <p className="mt-2 line-clamp-3 text-sm text-gray-600">{tr(p.excerpt, locale)}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </PublicLayout>
    );
}
