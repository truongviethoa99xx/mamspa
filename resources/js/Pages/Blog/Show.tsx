import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { useLocale } from '@/Hooks/useLocale';
import { tr } from '@/Lib/utils';

interface Props {
    post: {
        slug: string; title: any; excerpt: any; body: any;
        cover_image: string | null;
        seo_meta: { description?: string } | null;
        published_at: string | null;
    };
}

export default function BlogShow({ post }: Props) {
    const locale = useLocale();
    const title = tr(post.title, locale);
    return (
        <PublicLayout>
            <Head title={title}>
                {post.seo_meta?.description && <meta name="description" content={post.seo_meta.description} />}
                <meta property="og:title" content={title} />
                {post.cover_image && <meta property="og:image" content={post.cover_image} />}
            </Head>
            <article className="mx-auto max-w-3xl px-4 py-12">
                {post.published_at && (
                    <p className="text-xs uppercase tracking-wider text-maha-600">
                        {new Date(post.published_at).toLocaleDateString(locale === 'en' ? 'en-US' : 'vi-VN')}
                    </p>
                )}
                <h1 className="mt-2 font-serif text-4xl text-maha-700">{title}</h1>
                {post.cover_image && <img src={post.cover_image} alt="" className="mt-6 w-full rounded-xl" />}
                <div className="prose prose-stone mt-8" dangerouslySetInnerHTML={{ __html: tr(post.body, locale) }} />
            </article>
        </PublicLayout>
    );
}
