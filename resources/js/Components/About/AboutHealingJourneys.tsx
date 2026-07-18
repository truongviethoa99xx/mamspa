import { Link } from '@inertiajs/react';
import { useLocale } from '@/Hooks/useLocale';
import { useReveal } from '@/Hooks/useReveal';
import { tr, stripTags, cn } from '@/Lib/utils';

interface HealingJourneyItem {
    url?: string | null;
    image?: string | null;
    image_alt?: unknown;
    title?: unknown;
    description?: unknown;
}

export interface AboutHealingJourneysData {
    eyebrow?: unknown;
    items: HealingJourneyItem[];
}

/** 4 Healing Journeys — nhãn khối nhỏ + lưới 4 danh mục dịch vụ cấp 1, cùng phong cách thẻ dịch vụ nổi bật ở trang chủ. */
export function AboutHealingJourneys({ data }: { data: AboutHealingJourneysData }) {
    const locale = useLocale();
    const eyebrow = tr(data.eyebrow, locale);
    const { ref, className } = useReveal<HTMLElement>();

    if (!data.items?.length) return null;

    return (
        <section ref={ref} className={cn(className, 'mt-[50px] bg-[#f5f2ed] px-5 sm:px-10 lg:px-[60px]')}>
            {eyebrow && (
                <span className="block text-center font-serif text-xs uppercase tracking-[0.25em] text-subheading sm:text-left">
                    {eyebrow}
                </span>
            )}
            <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                {data.items.map((item, index) => {
                    const title = tr(item.title, locale);
                    const description = tr(item.description, locale);
                    const imageAlt = tr(item.image_alt, locale);
                    const hasImage = !!item.image;

                    const body = (
                        <>
                            <div className="aspect-[4/3] shrink-0 overflow-hidden rounded-t-[4px] bg-maha-200">
                                {hasImage && (
                                    <img
                                        src={item.image ?? undefined}
                                        alt={imageAlt || stripTags(title)}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                )}
                            </div>
                            <div className="flex flex-1 flex-col rounded-b-[4px] bg-[#f4eae1] p-5">
                                {title && (
                                    <h3
                                        className="rich-content font-serif text-xl leading-snug text-heading"
                                        dangerouslySetInnerHTML={{ __html: title }}
                                    />
                                )}
                                {description && (
                                    <div
                                        className="rich-content mt-2 text-sm leading-relaxed text-ink/70"
                                        dangerouslySetInnerHTML={{ __html: description }}
                                    />
                                )}
                            </div>
                        </>
                    );

                    if (item.url) {
                        return (
                            <Link key={index} href={item.url} className="group flex h-full flex-col">
                                {body}
                            </Link>
                        );
                    }

                    return (
                        <article key={index} className="group flex h-full flex-col">
                            {body}
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
