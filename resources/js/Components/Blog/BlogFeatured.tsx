import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { tr, cn, formatDate } from '@/Lib/utils';
import { type BlogPostCardData } from './types';

/** Khối "Bài viết nổi bật" (carousel) + "Bài viết mới" (danh sách) — phần mở đầu nội dung trang Blog. */
export function BlogFeatured({
    featured,
    recentPosts,
}: {
    featured: BlogPostCardData[];
    recentPosts: BlogPostCardData[];
}) {
    const locale = useLocale();
    const [activeIndex, setActiveIndex] = useState(0);

    if (!featured.length) {
        return null;
    }

    const current = featured[activeIndex];
    const title = tr(current.title, locale);
    const excerpt = tr(current.excerpt, locale);
    const imageAlt = tr(current.cover_image_alt, locale) || title;
    const hasCarousel = featured.length > 1;

    const goTo = (index: number) => setActiveIndex((index + featured.length) % featured.length);

    return (
        <section className="px-5 py-14 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[7fr_5fr] lg:gap-12">
                <div>
                    <p className="font-serif text-xs uppercase tracking-[0.2em] text-subheading">Bài viết nổi bật</p>

                    <Link href={`/tin-tuc/${current.slug}/`} className="group mt-5 block">
                        <div className="relative aspect-[16/11] w-full overflow-hidden rounded-sm bg-maha-200">
                            {current.cover_image && (
                                <img
                                    src={current.cover_image}
                                    alt={imageAlt}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            )}
                            {current.category && (
                                <span className="absolute bottom-4 left-4 rounded-sm bg-heading/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                                    {current.category}
                                </span>
                            )}
                        </div>
                    </Link>

                    <p className="mt-5 text-xs text-ink/60">
                        {formatDate(current.published_at)} · {current.reading_minutes} phút đọc
                    </p>
                    <Link href={`/tin-tuc/${current.slug}/`} className="mt-2 block">
                        <h2 className="font-serif text-2xl leading-snug text-heading transition-colors hover:text-subheading sm:text-3xl">
                            {title}
                        </h2>
                    </Link>
                    {excerpt && (
                        <div
                            className="rich-content mt-3 max-w-xl text-sm leading-relaxed text-ink/70"
                            dangerouslySetInnerHTML={{ __html: excerpt }}
                        />
                    )}

                    <div className="mt-5 flex items-center justify-between">
                        <Link
                            href={`/tin-tuc/${current.slug}/`}
                            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-heading transition-colors hover:text-subheading"
                        >
                            Đọc tiếp
                            <ArrowRight className="h-4 w-4" />
                        </Link>

                        {hasCarousel && (
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5">
                                    {featured.map((item, index) => (
                                        <button
                                            key={item.id}
                                            type="button"
                                            onClick={() => setActiveIndex(index)}
                                            aria-label={`Xem bài viết nổi bật ${index + 1}`}
                                            aria-current={index === activeIndex}
                                            className={cn(
                                                'h-1.5 rounded-full transition-all',
                                                index === activeIndex ? 'w-6 bg-heading' : 'w-1.5 bg-maha-300',
                                            )}
                                        />
                                    ))}
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => goTo(activeIndex - 1)}
                                        aria-label="Bài viết nổi bật trước"
                                        className="flex h-8 w-8 items-center justify-center rounded-full border border-maha-200 text-heading transition-colors hover:bg-maha-100"
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => goTo(activeIndex + 1)}
                                        aria-label="Bài viết nổi bật tiếp theo"
                                        className="flex h-8 w-8 items-center justify-center rounded-full border border-maha-200 text-heading transition-colors hover:bg-maha-100"
                                    >
                                        <ArrowRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {recentPosts.length > 0 && (
                    <div>
                        <div className="flex items-center justify-between">
                            <p className="font-serif text-xs uppercase tracking-[0.2em] text-subheading">Bài viết mới</p>
                            <a href="#kham-pha-them" className="text-xs font-semibold uppercase tracking-wide text-heading hover:text-subheading">
                                Xem tất cả →
                            </a>
                        </div>

                        <ul className="mt-5 space-y-5">
                            {recentPosts.map((post) => (
                                <RecentPostRow key={post.id} data={post} />
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </section>
    );
}

function RecentPostRow({ data }: { data: BlogPostCardData }) {
    const locale = useLocale();
    const title = tr(data.title, locale);
    const imageAlt = tr(data.cover_image_alt, locale) || title;

    return (
        <li className="border-b border-maha-100 pb-5 last:border-b-0 last:pb-0">
            <Link href={`/tin-tuc/${data.slug}/`} className="group flex items-start gap-4">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-sm bg-maha-200">
                    {data.cover_image && (
                        <img src={data.cover_image} alt={imageAlt} className="h-full w-full object-cover" loading="lazy" />
                    )}
                </div>
                <div className="min-w-0">
                    {data.category && (
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-subheading">{data.category}</p>
                    )}
                    <p className="mt-1 line-clamp-2 font-serif text-sm leading-snug text-heading transition-colors group-hover:text-subheading">
                        {title}
                    </p>
                    <p className="mt-1 text-xs text-ink/50">
                        {formatDate(data.published_at)} · {data.reading_minutes} phút đọc
                    </p>
                </div>
            </Link>
        </li>
    );
}
