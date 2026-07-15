import { Link } from '@inertiajs/react';
import { useLocale } from '@/Hooks/useLocale';
import { tr, cn } from '@/Lib/utils';

export interface HeroCta {
    text: unknown;
    link: string;
    background_color: string;
    text_color: string;
    border_color: string;
}

export interface HeroData {
    heading?: unknown;
    subtitle?: unknown;
    image?: string | null;
    image_alt?: unknown;
    cta?: HeroCta;
    secondary_cta?: HeroCta;
}

const isVideoUrl = (url: string) => /\.(mp4|webm|ogv)$/i.test(url);

/** Banner đầu trang chủ — nằm ngay dưới header (header trong suốt sẽ nổi đè lên phần trên của banner). */
export function Hero({ data }: { data: HeroData }) {
    const locale = useLocale();
    const heading = tr(data.heading, locale);
    const subtitle = tr(data.subtitle, locale);
    const ctaText = tr(data.cta?.text, locale);
    const secondaryCtaText = tr(data.secondary_cta?.text, locale);
    const image = data.image;
    const imageAlt = tr(data.image_alt, locale);
    const isVideo = !!image && isVideoUrl(image);
    const hasImage = !!image;

    return (
        <section
            className={cn(
                'relative isolate flex h-[85vh] min-h-[440px] flex-col justify-end overflow-hidden px-5 pb-12 pt-28 sm:h-[75vh] sm:px-10 sm:pb-16 sm:pt-32 md:pb-20 md:pt-40 lg:pl-[150px] lg:pr-6',
                hasImage ? 'bg-[#2F3E2E]' : 'bg-maha-200',
            )}
        >
            {/* Real <img>/<video> (not CSS background-image) so the banner has proper alt
                text — a decorative gradient overlay sits on top for text legibility. Using
                role="img" on the section itself would've hidden the heading/links below
                from screen readers, so the alt lives on the image element instead. */}
            {hasImage && !isVideo && (
                <img src={image} alt={imageAlt} className="absolute inset-0 z-0 h-full w-full object-cover" />
            )}
            {isVideo && image && (
                <video
                    className="absolute inset-0 z-0 h-full w-full object-cover"
                    src={image}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    aria-label={imageAlt}
                />
            )}
            {hasImage && (
                <div
                    className="absolute inset-0 z-0"
                    style={{ background: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.55))' }}
                />
            )}

            <div className="relative z-10 max-w-2xl">
                {heading && (
                    <div
                        className={cn(
                            'rich-content font-serif text-4xl leading-tight sm:text-5xl md:text-6xl',
                            hasImage ? 'text-white' : 'text-ink',
                        )}
                        dangerouslySetInnerHTML={{ __html: heading }}
                    />
                )}
                {subtitle && (
                    <div
                        className={cn(
                            'rich-content mt-4 text-base sm:text-lg',
                            hasImage ? 'text-white/85' : 'text-ink/80',
                        )}
                        dangerouslySetInnerHTML={{ __html: subtitle }}
                    />
                )}

                <div className="mt-8 flex flex-wrap items-center gap-4">
                    {ctaText && data.cta && (
                        <Link
                            href={data.cta.link || '#'}
                            className="rounded-md border px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-opacity hover:opacity-90"
                            style={{
                                backgroundColor: data.cta.background_color,
                                color: data.cta.text_color,
                                borderColor: data.cta.border_color,
                            }}
                        >
                            {ctaText}
                        </Link>
                    )}
                    {secondaryCtaText && data.secondary_cta && (
                        <Link
                            href={data.secondary_cta.link || '#'}
                            className="rounded-md border px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-opacity hover:opacity-90"
                            style={{
                                backgroundColor: data.secondary_cta.background_color,
                                color: data.secondary_cta.text_color,
                                borderColor: data.secondary_cta.border_color,
                            }}
                        >
                            {secondaryCtaText}
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
}
