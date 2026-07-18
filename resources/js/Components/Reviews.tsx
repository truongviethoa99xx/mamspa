import { Link } from '@inertiajs/react';
import { ArrowRight, Play, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocale } from '@/Hooks/useLocale';
import { useReducedMotion } from '@/Hooks/useReducedMotion';
import { useReveal } from '@/Hooks/useReveal';
import { tr, cn } from '@/Lib/utils';

const QUOTE_ROTATE_INTERVAL_MS = 6000;
const QUOTE_FADE_DURATION_MS = 300;

interface RatingCardData {
    rating: string;
    count: number;
    link: string;
}

interface QuoteData {
    name?: string | null;
    rating: number;
    content?: unknown;
}

interface VideoData {
    type: 'file' | 'youtube' | 'vimeo' | 'link' | null;
    thumbnail?: string | null;
    url?: string | null;
    embed_url?: string | null;
}

export interface ReviewsData {
    google: RatingCardData;
    tripadvisor: RatingCardData;
    quotes: QuoteData[];
    quote_cta_link: string;
    video: VideoData;
}

function Stars({ count, className }: { count: number; className?: string }) {
    return (
        <div className={cn('flex items-center gap-0.5', className)}>
            {Array.from({ length: 5 }, (_, i) => (
                <Star
                    key={i}
                    className={cn('h-3.5 w-3.5', i < Math.round(count) ? 'fill-amber-400 text-amber-400' : 'text-maha-300')}
                />
            ))}
        </div>
    );
}

/** Trích dẫn khách hàng — tự trượt qua từng đánh giá nếu có nhiều hơn 1, không cần bấm hay mũi tên. */
function QuoteCarousel({ quotes, ctaLink }: { quotes: QuoteData[]; ctaLink: string }) {
    const locale = useLocale();
    const prefersReducedMotion = useReducedMotion();
    const [activeIndex, setActiveIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (quotes.length <= 1) return;

        const timer = setInterval(() => {
            if (prefersReducedMotion) {
                setActiveIndex((current) => (current + 1) % quotes.length);
                return;
            }

            setIsVisible(false);
            setTimeout(() => {
                setActiveIndex((current) => (current + 1) % quotes.length);
                setIsVisible(true);
            }, QUOTE_FADE_DURATION_MS);
        }, QUOTE_ROTATE_INTERVAL_MS);

        return () => clearInterval(timer);
    }, [quotes.length, prefersReducedMotion]);

    const activeQuote = quotes[activeIndex];
    const quoteText = tr(activeQuote.content, locale);

    return (
        <Link href={ctaLink} className="flex flex-col justify-between rounded-[4px] bg-white/60 p-6">
            <div
                className={cn(
                    'rich-content text-sm leading-relaxed text-ink/80 transition-opacity duration-300',
                    isVisible ? 'opacity-100' : 'opacity-0',
                )}
                dangerouslySetInnerHTML={{ __html: quoteText }}
            />
            <div className="mt-4">
                <Stars count={activeQuote.rating} />
                <span className="mt-3 inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-wide text-heading">
                    Xem thêm đánh giá
                    <ArrowRight className="h-3.5 w-3.5" />
                </span>
            </div>
        </Link>
    );
}

/** Đánh giá khách hàng — Google, TripAdvisor (nhập tay), trích dẫn nổi bật, và video. */
export function Reviews({ data }: { data: ReviewsData }) {
    const video = data.video;
    const hasVideo = !!video.url;
    const hasQuote = data.quotes.length > 0;

    const { ref, className } = useReveal<HTMLElement>();

    return (
        <section
            ref={ref}
            className={cn(className, 'bg-maha-50 px-5 pb-4 pt-4 sm:px-10 sm:pb-6 sm:pt-6 lg:px-16 lg:pb-8 lg:pt-8')}
        >
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <a
                    href={data.google.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col justify-between rounded-[4px] bg-white/60 p-6"
                >
                    <div>
                        <p className="font-serif text-2xl font-semibold">
                            <span className="text-[#4285F4]">G</span>
                            <span className="text-[#EA4335]">o</span>
                            <span className="text-[#FBBC05]">o</span>
                            <span className="text-[#4285F4]">g</span>
                            <span className="text-[#34A853]">l</span>
                            <span className="text-[#EA4335]">e</span>
                        </p>
                        <p className="mt-4 font-serif text-3xl text-heading">{data.google.rating}</p>
                        <Stars count={Number(data.google.rating)} className="mt-1" />
                        <p className="mt-1 text-xs text-ink/60">({data.google.count} reviews)</p>
                    </div>
                    <span className="mt-4 inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-wide text-heading">
                        Xem trên Google
                        <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                </a>

                <a
                    href={data.tripadvisor.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col justify-between rounded-[4px] bg-white/60 p-6"
                >
                    <div>
                        <p className="font-serif text-2xl font-semibold text-[#34E0A1]">Tripadvisor</p>
                        <p className="mt-4 font-serif text-3xl text-heading">{data.tripadvisor.rating}</p>
                        <Stars count={Number(data.tripadvisor.rating)} className="mt-1" />
                        <p className="mt-1 text-xs text-ink/60">({data.tripadvisor.count} reviews)</p>
                    </div>
                    <span className="mt-4 inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-wide text-heading">
                        Xem trên Tripadvisor
                        <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                </a>

                {hasQuote && <QuoteCarousel quotes={data.quotes} ctaLink={data.quote_cta_link} />}

                {hasVideo && (
                    <div className="relative min-h-[220px] overflow-hidden rounded-[4px] bg-maha-800">
                        {video.type === 'file' ? (
                            <video
                                src={video.url ?? undefined}
                                poster={video.thumbnail ?? undefined}
                                controls
                                preload="metadata"
                                className="h-full w-full object-cover"
                            />
                        ) : video.embed_url ? (
                            <iframe
                                src={video.embed_url}
                                title="Video trải nghiệm khách hàng"
                                loading="lazy"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="h-full w-full"
                            />
                        ) : (
                            <a
                                href={video.url ?? '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex h-full min-h-[220px] flex-col justify-end p-6 text-white"
                            >
                                {video.thumbnail && (
                                    <img
                                        src={video.thumbnail}
                                        alt="Video trải nghiệm khách hàng"
                                        className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
                                    />
                                )}
                                <div className="absolute inset-0 bg-black/30" />
                                <span className="absolute inset-0 flex items-center justify-center">
                                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-heading transition-transform group-hover:scale-110">
                                        <Play className="h-5 w-5 translate-x-0.5" fill="currentColor" />
                                    </span>
                                </span>
                                <span className="relative z-10 mt-4 inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-wide">
                                    Xem thêm video
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </span>
                            </a>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
