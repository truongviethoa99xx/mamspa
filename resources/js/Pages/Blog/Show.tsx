import { useMemo, useRef } from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { useLocale } from '@/Hooks/useLocale';
import { tr, formatDate } from '@/Lib/utils';
import { extractToc } from '@/Lib/toc';
import { Breadcrumb, type BreadcrumbItem } from '@/Components/Breadcrumb';
import { BlogPostCard } from '@/Components/Blog/BlogPostCard';
import { BlogNewsletter } from '@/Components/Blog/BlogNewsletter';
import { ReadingProgressBar } from '@/Components/Blog/ReadingProgressBar';
import { TableOfContents } from '@/Components/Blog/TableOfContents';
import { ArticleShare } from '@/Components/Blog/ArticleShare';
import { AuthorCard } from '@/Components/Blog/AuthorCard';
import { ArticleNav } from '@/Components/Blog/ArticleNav';
import { type BlogPostCardData } from '@/Components/Blog/types';

interface BlogPostDetail {
    id: number;
    slug: string;
    category: string | null;
    title: unknown;
    excerpt?: unknown;
    body: unknown;
    cover_image: string | null;
    cover_image_alt?: unknown;
    seo: { title: unknown; description: unknown };
    author: string | null;
    author_avatar: string | null;
    published_at: string | null;
    updated_at: string | null;
    reading_minutes: number;
}

interface Props {
    post: BlogPostDetail;
    related: BlogPostCardData[];
    previous: BlogPostCardData | null;
    next: BlogPostCardData | null;
}

const HOME_CRUMB: BreadcrumbItem = { name: 'Trang chủ', url: '/' };
const BLOG_CRUMB: BreadcrumbItem = { name: 'Blog', url: '/tin-tuc/' };

export default function BlogShow({ post, related, previous, next }: Props) {
    const locale = useLocale();
    const title = tr(post.title, locale);
    const excerpt = tr(post.excerpt, locale);
    const rawBody = tr(post.body, locale);
    const imageAlt = tr(post.cover_image_alt, locale) || title;
    const articleRef = useRef<HTMLDivElement>(null);

    const seoTitle = tr(post.seo.title, locale) || title;
    const seoDescription = tr(post.seo.description, locale);

    const { html: body, toc } = useMemo(() => extractToc(rawBody), [rawBody]);

    const breadcrumbItems: BreadcrumbItem[] = [HOME_CRUMB, BLOG_CRUMB, { name: title }];

    return (
        <PublicLayout mainClassName="bg-maha-50">
            <Head title={seoTitle || 'Blog'}>
                {seoDescription && <meta name="description" content={seoDescription} />}
                <meta property="og:type" content="article" />
                <meta property="og:title" content={seoTitle} />
                {seoDescription && <meta property="og:description" content={seoDescription} />}
                {post.cover_image && <meta property="og:image" content={post.cover_image} />}
                <meta name="twitter:card" content={post.cover_image ? 'summary_large_image' : 'summary'} />
            </Head>

            <ReadingProgressBar targetRef={articleRef} />

            {/* Phần đầu bài viết — chuyên mục, tiêu đề, mô tả, meta, chia sẻ.
                Kiểu chữ (eyebrow serif in nghiêng + tiêu đề serif tracking-wide) lấy theo template /dat-lich/. */}
            <header className="px-5 pb-10 pt-28 sm:px-10 sm:pt-32 lg:px-16 lg:pt-36">
                <div className="mx-auto max-w-5xl">
                    <Breadcrumb items={breadcrumbItems} className="mb-8" />

                    {post.category && <p className="font-serif text-base italic text-subheading">{post.category}</p>}
                    <h1 className="mt-1 font-serif text-3xl leading-snug tracking-wide text-heading sm:text-4xl sm:leading-snug lg:text-5xl lg:leading-snug">
                        {title}
                    </h1>
                    {excerpt && (
                        <div
                            className="rich-content mt-4 max-w-3xl text-lg leading-relaxed text-ink/70"
                            dangerouslySetInnerHTML={{ __html: excerpt }}
                        />
                    )}

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-maha-200 py-4">
                        <p className="text-sm text-ink/60">
                            {post.author && <>{post.author} · </>}
                            {formatDate(post.published_at)} · {post.reading_minutes} phút đọc
                        </p>
                        <ArticleShare title={title} />
                    </div>
                </div>
            </header>

            {post.cover_image && (
                <div className="px-5 sm:px-10 lg:px-16">
                    <div className="mx-auto aspect-[16/9] w-full max-w-5xl overflow-hidden rounded-3xl bg-maha-200">
                        <img src={post.cover_image} alt={imageAlt} className="h-full w-full object-cover" />
                    </div>
                </div>
            )}

            {/* Nội dung — mục lục bám cuộn dạng thẻ bo tròn bên trái (desktop, giống khối tóm tắt
                sticky ở /dat-lich/), bài viết bên phải. */}
            <article ref={articleRef} className="px-5 py-12 sm:px-10 sm:py-14 lg:px-16">
                <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[2fr_5fr] lg:gap-16">
                    <TableOfContents items={toc} />

                    <div className="min-w-0">
                        {body && <div className="blog-article" dangerouslySetInnerHTML={{ __html: body }} />}

                        {post.author && <AuthorCard name={post.author} avatar={post.author_avatar} />}

                        <ArticleNav previous={previous} next={next} />
                    </div>
                </div>
            </article>

            {related.length > 0 && (
                <section className="px-5 py-14 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
                    <div className="mx-auto max-w-7xl">
                        <p className="font-serif text-base italic text-subheading">Bài viết liên quan</p>
                        <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {related.map((relatedPost) => (
                                <BlogPostCard key={relatedPost.id} data={relatedPost} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <BlogNewsletter />
        </PublicLayout>
    );
}
