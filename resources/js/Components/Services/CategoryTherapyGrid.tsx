import { useEffect, useRef, useState } from 'react';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { useReveal } from '@/Hooks/useReveal';
import { tr, cn, stripTags } from '@/Lib/utils';

export interface CategoryTherapyItem {
    url: string;
    name: unknown;
    short_description?: unknown;
    thumbnail_alt?: unknown;
    images?: string[];
}

const HEADING_LABEL: Record<string, string> = { vi: 'NHÓM LIỆU PHÁP', en: 'THERAPY GROUPS' };
const SEE_MORE_LABEL: Record<string, string> = { vi: 'Xem thêm', en: 'See more' };
const GO_TO_LABEL: Record<string, string> = { vi: 'Đi tới mục', en: 'Go to item' };
const CARD_BASIS = 'basis-[calc(50%_-_0.625rem)] sm:basis-[calc(33.333%_-_0.834rem)] lg:basis-[calc(20%_-_1rem)]';

/** "NHÓM LIỆU PHÁP" — dải thẻ dạng slider (kéo/vuốt ngang, snap từng thẻ) + chấm điều hướng ở giữa. */
export function CategoryTherapyGrid({ items, heading }: { items: CategoryTherapyItem[]; heading?: unknown }) {
    const locale = useLocale();
    const scrollRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLElement | null)[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [canScroll, setCanScroll] = useState(false);

    const updateScrollState = () => {
        const el = scrollRef.current;
        if (!el) return;

        setCanScroll(el.scrollWidth - el.clientWidth > 4);

        let closestIndex = 0;
        let closestDistance = Infinity;
        itemRefs.current.forEach((node, index) => {
            if (!node) return;
            const distance = Math.abs(node.offsetLeft - el.scrollLeft);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        });
        setActiveIndex(closestIndex);
    };

    const scrollToIndex = (index: number) => {
        const el = scrollRef.current;
        const node = itemRefs.current[index];
        if (!el || !node) return;

        el.scrollTo({ left: node.offsetLeft, behavior: 'smooth' });
    };

    useEffect(() => {
        updateScrollState();
        window.addEventListener('resize', updateScrollState);
        return () => window.removeEventListener('resize', updateScrollState);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items.length]);

    const { ref, className } = useReveal<HTMLElement>();

    if (!items.length) {
        return null;
    }

    const customLabel = tr(heading, locale);
    const fallbackLabel = HEADING_LABEL[locale] ?? HEADING_LABEL.vi;
    const seeMoreLabel = SEE_MORE_LABEL[locale] ?? SEE_MORE_LABEL.vi;
    const goToLabel = GO_TO_LABEL[locale] ?? GO_TO_LABEL.vi;

    return (
        <section ref={ref} className={cn(className, 'mt-1 bg-[#f5f2ed] pb-2 pt-4')}>
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
                className="scrollbar-hide mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 sm:px-10 lg:px-[60px]"
            >
                {items.map((item, index) => {
                    const itemName = tr(item.name, locale);
                    const itemDescription = tr(item.short_description, locale);
                    const itemImageAlt = tr(item.thumbnail_alt, locale);

                    return (
                        <article
                            key={item.url}
                            ref={(node) => {
                                itemRefs.current[index] = node;
                            }}
                            className={`group flex ${CARD_BASIS} shrink-0 snap-start flex-col overflow-hidden rounded-[8px] border border-maha-200 bg-white`}
                        >
                            <div className="aspect-square bg-maha-200">
                                {item.images?.[0] && (
                                    <img
                                        src={item.images[0]}
                                        alt={itemImageAlt || stripTags(itemName)}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        loading="lazy"
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
                <div className="mt-6 flex items-center justify-center gap-2">
                    {items.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => scrollToIndex(index)}
                            aria-label={`${goToLabel} ${index + 1}`}
                            aria-current={index === activeIndex}
                            className={cn(
                                'h-2 rounded-full transition-all',
                                index === activeIndex ? 'w-6 bg-heading/70' : 'w-2 bg-maha-200 hover:bg-maha-300',
                            )}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
