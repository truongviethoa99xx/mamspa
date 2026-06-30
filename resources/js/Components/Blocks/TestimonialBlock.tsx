import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { BadgeCheck, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { tr } from '@/Lib/utils';
import { ReviewEmbed } from '@/Components/ReviewEmbed';

interface ReviewWidget {
    name?: unknown;
    html: string;
}

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
    widgets?: ReviewWidget[];
}

const AVATAR_COLORS = ['#3b6f5e', '#1f6f8b', '#9a6b3f', '#7d8b5a', '#8b5e83', '#b0623a'];

function avatarColor(name: string): string {
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

/** Multi-colour Google "G" mark. */
function GoogleG({ className = 'h-5 w-5' }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
            <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
            <path fill="#FBBC05" d="M11.69 28.18A13.7 13.7 0 0 1 10.96 24c0-1.45.25-2.86.69-4.18v-5.7H4.34A22 22 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z" />
            <path fill="#EA4335" d="M24 9.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 2.95 29.93 1 24 1 15.4 1 7.96 5.93 4.34 13.12l7.35 5.7C13.42 13.62 18.27 9.75 24 9.75z" />
        </svg>
    );
}

function Stars({ count = 5 }: { count?: number }) {
    return (
        <div className="flex gap-0.5">
            {Array.from({ length: count }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-[#FBBC05] text-[#FBBC05]" />
            ))}
        </div>
    );
}

export function TestimonialBlock({ data }: { data: TestimonialData }) {
    const locale = useLocale();
    const { t } = useTranslation();
    const items = data.items ?? [];
    const overall = data.rating ?? 5;
    const count = data.review_count ?? items.length;
    const widgets = (data.widgets ?? []).filter((w) => w.html);
    const scroller = useRef<HTMLDivElement>(null);

    const scrollBy = (dir: number) => {
        const el = scroller.current;
        if (!el) return;
        // Advance by one full page (the visible width = 3 cards on desktop).
        el.scrollBy({ left: dir * el.clientWidth, behavior: 'smooth' });
    };

    // Không có review thủ công lẫn widget thì ẩn cả khối.
    if (items.length === 0 && widgets.length === 0) {
        return null;
    }

    return (
        <section className="bg-maha-50 py-10 sm:py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 2xl:max-w-[1440px]">
                {/* Header */}
                <p className="text-center font-serif text-sm italic text-[#6e7a51] md:text-lg">
                    {t('blocks.testimonial.eyebrow')}
                </p>
                <h2 className="mt-2 text-center font-serif text-2xl uppercase tracking-wide text-ink sm:text-4xl md:text-5xl">
                    {t('blocks.testimonial.title')}
                </h2>

                {items.length > 0 && (
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
                            {items.map((item, i) => {
                                const name = item.name;
                                const content = tr(item.content, locale);
                                return (
                                    <article
                                        key={i}
                                        className="flex shrink-0 basis-full snap-start flex-col rounded-xl border border-maha-100 bg-white p-4 shadow-sm sm:basis-[calc((100%-1.25rem)/2)] sm:rounded-2xl sm:p-6 lg:basis-[calc((100%-2.5rem)/3)]"
                                    >
                                        <header className="flex items-start justify-between">
                                            <div className="flex items-center gap-3">
                                                <span
                                                    className="flex h-10 w-10 items-center justify-center rounded-full font-semibold text-white sm:h-11 sm:w-11"
                                                    style={{ backgroundColor: avatarColor(name) }}
                                                >
                                                    {name.trim().charAt(0).toUpperCase()}
                                                </span>
                                                <div>
                                                    <p className="font-semibold text-ink">{name}</p>
                                                    {item.time && (
                                                        <p className="text-sm text-maha-500">{item.time}</p>
                                                    )}
                                                </div>
                                            </div>
                                            <GoogleG />
                                        </header>

                                        <div className="mt-4 flex items-center gap-2">
                                            <Stars count={item.rating ?? 5} />
                                            <BadgeCheck className="h-4 w-4 text-[#4285F4]" />
                                        </div>

                                        <p className="mt-4 line-clamp-4 leading-relaxed text-ink/80">
                                            {content}
                                        </p>

                                        <button className="mt-4 self-start text-sm font-medium text-maha-600 hover:text-maha-800">
                                            {t('blocks.testimonial.readMore')}
                                        </button>
                                    </article>
                                );
                            })}
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
                )}

                {/* Widget đánh giá Google (Elfsight...) theo từng chi nhánh */}
                {widgets.length > 0 && (
                    <div className="mt-12 space-y-10 sm:mt-16">
                        {widgets.map((w, i) => {
                            const name = tr(w.name, locale);
                            return (
                                <div key={i}>
                                    {widgets.length > 1 && name && (
                                        <h3 className="mb-5 text-center font-serif text-xl uppercase tracking-wide text-ink sm:text-2xl">
                                            {name}
                                        </h3>
                                    )}
                                    <ReviewEmbed html={w.html} />
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}
