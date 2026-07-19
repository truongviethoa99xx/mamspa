import { useRef } from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { useReveal } from '@/Hooks/useReveal';
import { tr, cn, stripTags } from '@/Lib/utils';
import { SectionHeading } from '@/Components/About/SectionHeading';

interface TestimonialItem {
    source?: 'google' | 'tripadvisor' | 'quote';
    rating?: number | string | null;
    quote?: unknown;
    author_name?: string;
    author_meta?: unknown;
}

export interface ExperienceTestimonialsData {
    title?: unknown;
    intro?: unknown;
    items: TestimonialItem[];
}

function Stars({ rating }: { rating: number }) {
    return (
        <div className="flex gap-0.5" aria-label={`${rating}/5 sao`}>
            {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={cn('h-3.5 w-3.5', i < rating ? 'fill-heading text-heading' : 'text-maha-300')} />
            ))}
        </div>
    );
}

/** Dải đánh giá/trích dẫn khách hàng — thẻ trích dẫn lớn đầu tiên, các thẻ rating sao nhỏ hơn cuộn ngang tiếp theo. */
export function ExperienceTestimonials({ data }: { data: ExperienceTestimonialsData }) {
    const locale = useLocale();
    const title = tr(data.title, locale);
    const intro = tr(data.intro, locale);
    const items = data.items ?? [];
    const trackRef = useRef<HTMLDivElement>(null);
    const { ref, className } = useReveal<HTMLElement>();

    if (!items.length) return null;

    const scrollNext = () => {
        trackRef.current?.scrollBy({ left: trackRef.current.clientWidth * 0.4, behavior: 'smooth' });
    };

    return (
        <section ref={ref} className={cn(className, 'mt-[50px] bg-[#f5f2ed] px-5 py-12 sm:px-10 lg:px-[60px]')}>
            {(title || intro) && (
                <div className="mb-8 max-w-2xl">
                    {title && <SectionHeading heading={title} />}
                    {intro && (
                        <div
                            className="rich-content mt-3 text-base leading-relaxed text-ink/80"
                            dangerouslySetInnerHTML={{ __html: intro }}
                        />
                    )}
                </div>
            )}

            <div className="relative">
                <div
                    ref={trackRef}
                    className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    {items.map((item, index) => {
                        const quote = tr(item.quote, locale);
                        const meta = tr(item.author_meta, locale);
                        const rating = Number(item.rating ?? 0);
                        const isLead = index === 0;

                        const content = (
                            <>
                                {quote && (
                                    <blockquote
                                        className={cn(
                                            'rich-content leading-relaxed text-ink/80',
                                            isLead ? 'text-lg' : 'mt-4 text-sm',
                                        )}
                                        dangerouslySetInnerHTML={{ __html: quote }}
                                    />
                                )}
                                <figcaption className="mt-4 text-sm font-semibold text-heading">
                                    {item.author_name}
                                    {meta && <span className="ml-1 font-normal text-ink/60">({stripTags(meta)})</span>}
                                </figcaption>
                            </>
                        );

                        return (
                            <figure
                                key={index}
                                className={cn(
                                    'shrink-0 snap-start rounded-[4px] border border-maha-200 bg-maha-50 p-6',
                                    isLead ? 'flex w-[85%] gap-4 sm:w-[36%]' : 'w-[75%] sm:w-[20%]',
                                )}
                            >
                                {isLead ? (
                                    <>
                                        <span
                                            className="shrink-0 font-serif text-5xl leading-[0.8] text-heading/60"
                                            aria-hidden="true"
                                        >
                                            &#8220;
                                        </span>
                                        <div className="min-w-0">{content}</div>
                                    </>
                                ) : (
                                    <>
                                        {rating > 0 ? (
                                            <Stars rating={rating} />
                                        ) : (
                                            <span className="font-serif text-3xl leading-[0.8] text-heading/60" aria-hidden="true">
                                                &#8220;
                                            </span>
                                        )}
                                        {content}
                                    </>
                                )}
                            </figure>
                        );
                    })}
                </div>

                {items.length > 1 && (
                    <button
                        type="button"
                        onClick={scrollNext}
                        aria-label="Xem thêm đánh giá"
                        className="absolute -right-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-heading/20 bg-white text-heading shadow-sm transition-colors hover:bg-maha-100 sm:flex"
                    >
                        <ArrowRight className="h-4 w-4" />
                    </button>
                )}
            </div>
        </section>
    );
}
