import { useEffect, useRef, useState, type MouseEvent, type PointerEvent } from 'react';
import { Quote, Star } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { useReveal } from '@/Hooks/useReveal';
import { tr, cn } from '@/Lib/utils';
import { SectionHeading } from './SectionHeading';

interface TestimonialItem {
    source?: 'google' | 'tripadvisor' | 'quote';
    rating?: number | string | null;
    quote?: unknown;
    author_name?: string;
    author_meta?: unknown;
}

export interface AboutExperiencesData {
    title?: unknown;
    intro?: unknown;
    items: TestimonialItem[];
}

const stripTags = (html: string) => html.replace(/<[^>]+>/g, '');

function Stars({ rating, className }: { rating: number; className?: string }) {
    return (
        <div className={cn('flex gap-0.5', className)} aria-label={`${rating}/5 sao`}>
            {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={cn('h-3.5 w-3.5', i < rating ? 'fill-amber-400 text-amber-400' : 'text-maha-300')} />
            ))}
        </div>
    );
}

function SourceMark({ source }: { source: 'google' | 'tripadvisor' }) {
    if (source === 'google') {
        return (
            <p className="font-serif text-xl font-semibold">
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#EA4335]">o</span>
                <span className="text-[#FBBC05]">o</span>
                <span className="text-[#4285F4]">g</span>
                <span className="text-[#34A853]">l</span>
                <span className="text-[#EA4335]">e</span>
            </p>
        );
    }

    return <p className="font-serif text-xl font-semibold text-[#34E0A1]">Tripadvisor</p>;
}

function TestimonialCard({ item, locale }: { item: TestimonialItem; locale: string }) {
    const quote = tr(item.quote, locale);
    const meta = tr(item.author_meta, locale);
    const rating = Number(item.rating ?? 0);

    return (
        <figure>
            {item.source === 'google' || item.source === 'tripadvisor' ? (
                <div>
                    <SourceMark source={item.source} />
                    {!!rating && <Stars rating={rating} className="mt-2" />}
                </div>
            ) : (
                <Quote className="h-6 w-6 text-maha-300" strokeWidth={1.5} aria-hidden="true" />
            )}
            {quote && (
                <blockquote
                    className="rich-content mt-4 text-sm leading-relaxed text-ink/80"
                    dangerouslySetInnerHTML={{ __html: quote }}
                />
            )}
            <figcaption className="mt-4 text-sm font-semibold text-heading">
                {item.author_name}
                {meta && <span className="ml-1 font-normal text-ink/60">({stripTags(meta)})</span>}
            </figcaption>
        </figure>
    );
}

/** Customer Experiences — col-3 tiêu đề/mô tả cố định, col-9 danh sách đánh giá cuộn ngang (3 thẻ/lượt). */
export function AboutExperiences({ data }: { data: AboutExperiencesData }) {
    const locale = useLocale();
    const title = tr(data.title, locale);
    const intro = tr(data.intro, locale);
    const items = data.items ?? [];
    const { ref, className } = useReveal<HTMLElement>();

    const trackRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const dragState = useRef<{ dragging: boolean; startX: number; startScrollLeft: number; moved: boolean }>({
        dragging: false,
        startX: 0,
        startScrollLeft: 0,
        moved: false,
    });

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const intersecting = new Set<number>();

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const index = Number((entry.target as HTMLElement).dataset.slideIndex);
                    if (entry.isIntersecting) {
                        intersecting.add(index);
                    } else {
                        intersecting.delete(index);
                    }
                });
                if (intersecting.size) {
                    setActiveIndex(Math.min(...intersecting));
                }
            },
            { root: track, threshold: 0.6 },
        );

        itemRefs.current.forEach((el) => el && observer.observe(el));
        return () => observer.disconnect();
    }, [items.length]);

    const goToSlide = (index: number) => {
        itemRefs.current[index]?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    };

    const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
        const track = trackRef.current;
        if (!track) return;
        dragState.current = { dragging: true, startX: e.clientX, startScrollLeft: track.scrollLeft, moved: false };
        track.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
        const track = trackRef.current;
        const state = dragState.current;
        if (!track || !state.dragging) return;
        const delta = e.clientX - state.startX;
        if (Math.abs(delta) > 3) state.moved = true;
        track.scrollLeft = state.startScrollLeft - delta;
    };

    const endDrag = () => {
        dragState.current.dragging = false;
    };

    const onClickCapture = (e: MouseEvent<HTMLDivElement>) => {
        if (dragState.current.moved) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    return (
        <section ref={ref} className={cn(className, 'mt-[50px] bg-[#f5f2ed] px-5 py-12 sm:px-10 lg:px-[60px]')}>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                <div className="lg:col-span-3">
                    <SectionHeading heading={title} />
                    {intro && (
                        <div
                            className="rich-content mt-4 text-base leading-relaxed text-ink/80"
                            dangerouslySetInnerHTML={{ __html: intro }}
                        />
                    )}
                </div>

                <div className="lg:col-span-9">
                    <div
                        ref={trackRef}
                        onPointerDown={onPointerDown}
                        onPointerMove={onPointerMove}
                        onPointerUp={endDrag}
                        onPointerLeave={endDrag}
                        onClickCapture={onClickCapture}
                        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
                        style={{ cursor: 'grab' }}
                    >
                        {items.map((item, index) => (
                            <div
                                key={index}
                                ref={(el) => (itemRefs.current[index] = el)}
                                data-slide-index={index}
                                className="w-[85%] shrink-0 snap-start rounded-[4px] border border-maha-200 p-6 sm:w-[calc((100%_-_1.25rem)/2)] lg:w-[calc((100%_-_2.5rem)/3)]"
                            >
                                <TestimonialCard item={item} locale={locale} />
                            </div>
                        ))}
                    </div>

                    {items.length > 1 && (
                        <div className="mt-6 flex justify-center gap-2">
                            {items.map((_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => goToSlide(index)}
                                    aria-label={`Xem đánh giá ${index + 1}`}
                                    className={cn(
                                        'h-1.5 rounded-full transition-all',
                                        index === activeIndex ? 'w-5 bg-maha-500' : 'w-1.5 bg-maha-300',
                                    )}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
