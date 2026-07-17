import { Link } from '@inertiajs/react';
import { useLocale } from '@/Hooks/useLocale';
import { tr, cn, formatDate } from '@/Lib/utils';
import { type BlogPostCardData } from './types';

/** Thẻ bài viết dạng dọc (ảnh trên, nội dung dưới) — dùng cho lưới "Khám phá thêm" và bài viết liên quan. */
export function BlogPostCard({ data, className }: { data: BlogPostCardData; className?: string }) {
    const locale = useLocale();
    const title = tr(data.title, locale);
    const imageAlt = tr(data.cover_image_alt, locale) || title;

    return (
        <Link href={`/tin-tuc/${data.slug}/`} className={cn('group block', className)}>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-maha-200">
                {data.cover_image && (
                    <img
                        src={data.cover_image}
                        alt={imageAlt}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                )}
                {data.category && (
                    <span className="absolute bottom-3 left-3 rounded-sm bg-heading/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                        {data.category}
                    </span>
                )}
            </div>

            <p className="mt-4 line-clamp-2 font-serif text-lg leading-snug text-heading transition-colors group-hover:text-subheading">
                {title}
            </p>

            <p className="mt-2 text-xs text-ink/60">
                {formatDate(data.published_at)} · {data.reading_minutes} phút đọc
            </p>
        </Link>
    );
}
