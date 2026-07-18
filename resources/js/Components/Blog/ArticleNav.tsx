import { Link } from '@inertiajs/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { tr, cn } from '@/Lib/utils';
import { type BlogPostCardData } from './types';

interface ArticleNavProps {
    previous: BlogPostCardData | null;
    next: BlogPostCardData | null;
}

/** Điều hướng "bài trước / bài sau" theo thứ tự ngày đăng — chỉ hiện các ô có dữ liệu thật. */
export function ArticleNav({ previous, next }: ArticleNavProps) {
    if (!previous && !next) {
        return null;
    }

    return (
        <div className="mt-12 grid grid-cols-1 gap-4 border-t border-maha-200 pt-8 sm:grid-cols-2">
            <NavCard post={previous} direction="previous" />
            <NavCard post={next} direction="next" />
        </div>
    );
}

function NavCard({ post, direction }: { post: BlogPostCardData | null; direction: 'previous' | 'next' }) {
    const locale = useLocale();

    if (!post) {
        return <div aria-hidden="true" />;
    }

    const title = tr(post.title, locale);
    const isNext = direction === 'next';

    return (
        <Link
            href={`/tin-tuc/${post.slug}/`}
            className={cn(
                'group flex items-center gap-3 rounded-2xl border border-maha-200 bg-white p-4 transition-colors hover:border-[#CDBCA3]',
                isNext && 'sm:flex-row-reverse sm:text-right',
            )}
        >
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-maha-200">
                {post.cover_image && (
                    <img src={post.cover_image} alt="" className="h-full w-full object-cover" loading="lazy" />
                )}
            </div>
            <div className="min-w-0">
                <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-subheading">
                    {!isNext && <ArrowLeft className="h-3.5 w-3.5" />}
                    {isNext ? 'Bài sau' : 'Bài trước'}
                    {isNext && <ArrowRight className="h-3.5 w-3.5" />}
                </p>
                <p className="mt-1 line-clamp-2 font-serif text-sm leading-snug text-heading transition-colors group-hover:text-subheading">
                    {title}
                </p>
            </div>
        </Link>
    );
}
