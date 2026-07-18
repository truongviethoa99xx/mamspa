import { useEffect, useRef, useState } from 'react';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { tr, stripTags } from '@/Lib/utils';

export interface CategoryTherapyItem {
    url: string;
    name: unknown;
    short_description?: unknown;
    thumbnail_alt?: unknown;
    images?: string[];
}

interface ScrollState {
    /** Tỉ lệ 0..1 giữa thanh cuộn đang ở đâu (0 = đầu, 1 = cuối). */
    progress: number;
    /** Tỉ lệ 0..1 độ rộng phần đang hiện thấy so với toàn bộ nội dung — quyết định độ rộng thanh tiến trình. */
    visibleRatio: number;
}

const HEADING_LABEL: Record<string, string> = { vi: 'NHÓM LIỆU PHÁP', en: 'THERAPY GROUPS' };
const SEE_MORE_LABEL: Record<string, string> = { vi: 'Xem thêm', en: 'See more' };
const CARD_BASIS = 'basis-[calc(50%-0.625rem)] sm:basis-[calc(33.333%-0.834rem)] lg:basis-[calc(20%-1rem)]';

/** "NHÓM LIỆU PHÁP" — dải thẻ cuộn ngang (không hiện scrollbar) + thanh tiến trình báo còn nội dung bên phải hay không. */
export function CategoryTherapyGrid({ items, heading }: { items: CategoryTherapyItem[]; heading?: unknown }) {
    const locale = useLocale();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [scrollState, setScrollState] = useState<ScrollState>({ progress: 0, visibleRatio: 1 });
    const [canScroll, setCanScroll] = useState(false);

    const updateScrollState = () => {
        const el = scrollRef.current;
        if (!el) return;

        const maxScroll = el.scrollWidth - el.clientWidth;
        setCanScroll(maxScroll > 4);
        setScrollState({
            progress: maxScroll > 0 ? el.scrollLeft / maxScroll : 0,
            visibleRatio: el.scrollWidth > 0 ? Math.min(1, el.clientWidth / el.scrollWidth) : 1,
        });
    };

    useEffect(() => {
        updateScrollState();
        window.addEventListener('resize', updateScrollState);
        return () => window.removeEventListener('resize', updateScrollState);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items.length]);

    if (!items.length) {
        return null;
    }

    const customLabel = tr(heading, locale);
    const fallbackLabel = HEADING_LABEL[locale] ?? HEADING_LABEL.vi;
    const seeMoreLabel = SEE_MORE_LABEL[locale] ?? SEE_MORE_LABEL.vi;
    const thumbLeft = scrollState.progress * (1 - scrollState.visibleRatio) * 100;

    return (
        <section className="mt-1 bg-[#f5f2ed] pb-2 pt-4">
            <div className="text-center">
                <h2 className="font-serif text-sm uppercase tracking-[0.25em] text-heading">
                    {customLabel ? (
                        <span className="rich-content inline [&>p]:inline" dangerouslySetInnerHTML={{ __html: customLabel }} />
                    ) : (
                        fallbackLabel
                    )}
                </h2>
                <span className="mx-auto mt-3 block h-px w-10 bg-maha-300" aria-hidden="true" />
            </div>

            <div
                ref={scrollRef}
                onScroll={updateScrollState}
                className="scrollbar-hide mt-10 flex gap-5 overflow-x-auto scroll-smooth px-5 sm:px-10 lg:px-[60px]"
            >
                {items.map((item) => {
                    const itemName = tr(item.name, locale);
                    const itemDescription = tr(item.short_description, locale);
                    const itemImageAlt = tr(item.thumbnail_alt, locale);

                    return (
                        <article
                            key={item.url}
                            className={`group flex ${CARD_BASIS} shrink-0 flex-col overflow-hidden rounded-[8px] border border-maha-200 bg-white`}
                        >
                            <div className="aspect-square bg-maha-200">
                                {item.images?.[0] && (
                                    <img
                                        src={item.images[0]}
                                        alt={itemImageAlt || stripTags(itemName)}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                )}
                            </div>
                            <div className="flex flex-1 flex-col p-4">
                                <h3
                                    className="rich-content font-serif text-lg leading-snug text-heading"
                                    dangerouslySetInnerHTML={{ __html: itemName }}
                                />
                                {itemDescription && (
                                    <div
                                        className="rich-content mt-1 text-xs leading-relaxed text-ink/70"
                                        dangerouslySetInnerHTML={{ __html: itemDescription }}
                                    />
                                )}
                                <Link
                                    href={item.url}
                                    aria-label={stripTags(itemName)}
                                    className="mt-auto inline-flex w-fit items-center gap-1.5 pt-3 text-xs font-semibold uppercase tracking-wide text-heading transition-transform hover:translate-x-1"
                                >
                                    <span>{seeMoreLabel}</span>
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </Link>
                            </div>
                        </article>
                    );
                })}
            </div>

            {canScroll && (
                <div className="mx-auto mt-5 px-5 sm:px-10 lg:px-[60px]">
                    <div className="relative h-1 w-full overflow-hidden rounded-full bg-maha-100">
                        <div
                            className="absolute inset-y-0 rounded-full bg-heading/70 transition-[left] duration-150"
                            style={{ width: `${scrollState.visibleRatio * 100}%`, left: `${thumbLeft}%` }}
                        />
                    </div>
                </div>
            )}
        </section>
    );
}
