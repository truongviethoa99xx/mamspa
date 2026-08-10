import { useEffect, useRef, useState } from 'react';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { useReveal } from '@/Hooks/useReveal';
import { tr, stripTags, cn } from '@/Lib/utils';

export interface FeaturedService {
    id: number;
    slug: string;
    url: string;
    name: unknown;
    description: unknown;
    thumbnail_alt?: unknown;
    images: string[];
}

export interface FeaturedServicesData {
    heading?: unknown;
    title?: unknown;
    services: FeaturedService[];
}

const GO_TO_LABEL: Record<string, string> = { vi: 'Đi tới dịch vụ', en: 'Go to service' };

/**
 * "Four Healing Journeys" — tiêu đề lớn căn giữa + nhãn nhỏ, 4 dịch vụ nổi bật.
 * Dưới lg: dải thẻ vuốt/kéo ngang, snap từng thẻ (gần trọn màn hình) + chấm điều hướng
 * — cùng kiểu tương tác với Services/CategoryTherapyGrid.tsx. Từ lg trở lên: grid 4 cột
 * tĩnh như cũ, không đổi.
 */
export function FeaturedServices({ data }: { data: FeaturedServicesData }) {
    const locale = useLocale();
    const heading = tr(data.heading, locale);
    const title = tr(data.title, locale);
    const { ref, className } = useReveal<HTMLElement>();

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
    }, [data.services?.length]);

    if (!data.services?.length) {
        return null;
    }

    const goToLabel = GO_TO_LABEL[locale] ?? GO_TO_LABEL.vi;

    const renderCard = (service: FeaturedService, index: number, forCarousel: boolean) => {
        const name = tr(service.name, locale);
        const description = tr(service.description, locale);
        const imageAlt = tr(service.thumbnail_alt, locale);
        const image = service.images?.[0];

        return (
            <Link
                key={service.id}
                ref={
                    forCarousel
                        ? (node: HTMLAnchorElement | null) => {
                              itemRefs.current[index] = node;
                          }
                        : undefined
                }
                href={service.url}
                className={cn(
                    'group flex h-full flex-col',
                    forCarousel && 'shrink-0 snap-center basis-[86%] sm:basis-[45%]',
                )}
            >
                <div className="aspect-[4/3] shrink-0 overflow-hidden rounded-t-[4px] bg-maha-200">
                    {image && (
                        <img
                            src={image}
                            alt={imageAlt || stripTags(name)}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    )}
                </div>
                <div className="flex flex-1 flex-col rounded-b-[4px] bg-[#f4eae1] p-5">
                    <h3
                        className="rich-content featured-service-title font-serif text-xl leading-snug text-heading"
                        dangerouslySetInnerHTML={{ __html: name }}
                    />
                    {description && (
                        <div
                            className="rich-content mt-2 text-sm leading-relaxed text-ink/70"
                            dangerouslySetInnerHTML={{ __html: description }}
                        />
                    )}
                    {/* Styled to look like a button, but stays a <span> — the whole card above
                        is already a <Link>, and nesting a real <button>/<a> inside it would be
                        invalid, non-focusable markup. */}
                    <span className="mt-5 inline-flex w-fit items-center gap-2 self-start rounded-md bg-heading px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-opacity group-hover:opacity-90">
                        Xem thêm
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                </div>
            </Link>
        );
    };

    return (
        <section
            ref={ref}
            className={cn(className, 'bg-maha-50 px-5 pb-8 pt-4 sm:px-10 sm:pb-8 sm:pt-6 lg:px-16 lg:pb-8 lg:pt-8')}
        >
            <div className="mx-auto max-w-7xl">
                {heading && (
                    <div
                        className="rich-content text-center font-serif text-3xl font-semibold text-heading sm:text-4xl"
                        dangerouslySetInnerHTML={{ __html: heading }}
                    />
                )}
                {title && (
                    <p className="mt-8 font-serif text-xs uppercase tracking-[0.2em] text-subheading">{title}</p>
                )}

                {/* Dưới lg: vuốt/kéo ngang, mỗi thẻ chiếm gần trọn chiều rộng (snap-center). */}
                <div
                    ref={scrollRef}
                    onScroll={updateScrollState}
                    className="scrollbar-hide -mx-5 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-1 lg:hidden"
                >
                    {data.services.map((service, index) => renderCard(service, index, true))}
                </div>

                {canScroll && (
                    <div className="mt-5 flex items-center justify-center gap-2 lg:hidden">
                        {data.services.map((_, index) => (
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

                {/* Từ lg: grid 4 cột tĩnh như trước, không đổi. */}
                <div className="mt-1 hidden lg:grid lg:grid-cols-4 lg:gap-x-6 lg:gap-y-10">
                    {data.services.map((service, index) => renderCard(service, index, false))}
                </div>
            </div>
        </section>
    );
}
