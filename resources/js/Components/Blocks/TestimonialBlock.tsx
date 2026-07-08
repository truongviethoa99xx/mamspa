import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { tr } from '@/Lib/utils';
import { GoogleReviewCard, Stars } from '@/Components/GoogleReviewCard';

interface ReviewItem {
    name: string;
    content: unknown;
    rating?: number;
    time?: string;
}

interface TestimonialData {
    rating?: number;
    review_count?: number;
    items?: ReviewItem[];
}

export function TestimonialBlock({ data }: { data: TestimonialData }) {
    const locale = useLocale();
    const { t } = useTranslation();
    const items = data.items ?? [];
    const overall = data.rating ?? 5;
    const count = data.review_count ?? items.length;
    const scroller = useRef<HTMLDivElement>(null);

    const scrollBy = (dir: number) => {
        const el = scroller.current;
        if (!el) return;
        // Advance by one full page (the visible width = 3 cards on desktop).
        el.scrollBy({ left: dir * el.clientWidth, behavior: 'smooth' });
    };

    if (items.length === 0) {
        return null;
    }

    return (
        <section className="bg-maha-50 py-10 sm:py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 2xl:max-w-[1440px]">
                {/* Header */}
                <p className="text-center font-serif text-sm italic text-[#556B3F] md:text-lg">
                    {t('blocks.testimonial.eyebrow')}
                </p>
                <h2 className="mt-2 text-center font-serif text-2xl uppercase tracking-wide text-ink sm:text-4xl md:text-5xl">
                    {t('blocks.testimonial.title')}
                </h2>

                <div className="mt-8 grid items-center gap-7 sm:mt-12 sm:gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
                    {/* Rating summary */}
                    <div className="text-center lg:text-left">
                        <p className="font-serif text-xl uppercase tracking-wide text-ink sm:text-2xl">
                            {t('blocks.testimonial.ratingLabel')}
                        </p>
                        <div className="mt-3 flex justify-center lg:justify-start">
                            <Stars count={overall} />
                        </div>
                        <p className="mt-3 text-sm text-maha-700">
                            {/* eslint-disable-next-line react/jsx-no-literals */}
                            {t('blocks.testimonial.basedOn', { count }).split(String(count)).map((part, i, arr) => (
                                <span key={i}>
                                    {part}
                                    {i < arr.length - 1 && <strong className="font-bold text-ink">{count}</strong>}
                                </span>
                            ))}
                        </p>
                        <div className="mt-4 flex items-center justify-center gap-1 text-2xl font-medium lg:justify-start">
                            <span style={{ color: '#4285F4' }}>G</span>
                            <span style={{ color: '#EA4335' }}>o</span>
                            <span style={{ color: '#FBBC05' }}>o</span>
                            <span style={{ color: '#4285F4' }}>g</span>
                            <span style={{ color: '#34A853' }}>l</span>
                            <span style={{ color: '#EA4335' }}>e</span>
                        </div>
                    </div>

                    {/* Reviews carousel */}
                    <div className="relative min-w-0">
                        <button
                            type="button"
                            onClick={() => scrollBy(-1)}
                            aria-label="Previous"
                            className="absolute -left-1 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-maha-200 bg-white text-ink shadow-sm transition-colors hover:bg-maha-50 sm:h-10 sm:w-10 lg:-left-5"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>

                        <div
                            ref={scroller}
                            className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                        >
                            {items.map((item, i) => (
                                <GoogleReviewCard
                                    key={i}
                                    item={{ name: item.name, content: tr(item.content, locale), rating: item.rating, time: item.time }}
                                    className="flex shrink-0 basis-full snap-start flex-col rounded-xl border border-maha-100 bg-white p-4 shadow-sm sm:basis-[calc((100%-1.25rem)/2)] sm:rounded-2xl sm:p-6 lg:basis-[calc((100%-2.5rem)/3)]"
                                />
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={() => scrollBy(1)}
                            aria-label="Next"
                            className="absolute -right-1 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-maha-200 bg-white text-ink shadow-sm transition-colors hover:bg-maha-50 sm:h-10 sm:w-10 lg:-right-5"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
