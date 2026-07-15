import { Link } from '@inertiajs/react';
import { useLocale } from '@/Hooks/useLocale';
import { tr } from '@/Lib/utils';

interface HeroCta {
    text: string;
    link: string;
    background_color: string;
    text_color: string;
    border_color: string;
}

interface HeroData {
    heading?: unknown;
    subtitle?: unknown;
    image?: string | null;
    cta?: HeroCta;
    secondary_cta?: HeroCta;
}

const isVideoUrl = (url: string) => /\.(mp4|webm|ogv)$/i.test(url);

/** Banner đầu trang chủ — nằm ngay dưới header (header trong suốt sẽ nổi đè lên phần trên của banner). */
export function Hero({ data }: { data: HeroData }) {
    const locale = useLocale();
    const heading = tr(data.heading, locale);
    const subtitle = tr(data.subtitle, locale);
    const image = data.image;
    const isVideo = !!image && isVideoUrl(image);

    return (
        <section
            className="relative isolate flex min-h-[560px] flex-col justify-end overflow-hidden bg-[#2F3E2E] px-6 pb-16 pt-32 sm:px-10 sm:pb-20 md:min-h-[680px] md:pt-40 lg:min-h-[760px]"
            style={
                image && !isVideo
                    ? {
                          backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.55)), url(${image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                      }
                    : undefined
            }
        >
            {isVideo && image && (
                <>
                    <video
                        className="absolute inset-0 z-0 h-full w-full object-cover"
                        src={image}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                    />
                    <div className="absolute inset-0 z-0 bg-black/40" />
                </>
            )}

            <div className="relative z-10 max-w-2xl">
                {heading && (
                    <div
                        className="rich-content font-serif text-4xl leading-tight text-white sm:text-5xl md:text-6xl"
                        dangerouslySetInnerHTML={{ __html: heading }}
                    />
                )}
                {subtitle && (
                    <div
                        className="rich-content mt-4 text-base text-white/85 sm:text-lg"
                        dangerouslySetInnerHTML={{ __html: subtitle }}
                    />
                )}

                <div className="mt-8 flex flex-wrap items-center gap-4">
                    {data.cta?.text && (
                        <Link
                            href={data.cta.link || '#'}
                            className="rounded-md border px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-opacity hover:opacity-90"
                            style={{
                                backgroundColor: data.cta.background_color,
                                color: data.cta.text_color,
                                borderColor: data.cta.border_color,
                            }}
                        >
                            {data.cta.text}
                        </Link>
                    )}
                    {data.secondary_cta?.text && (
                        <Link
                            href={data.secondary_cta.link || '#'}
                            className="rounded-md border px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-opacity hover:opacity-90"
                            style={{
                                backgroundColor: data.secondary_cta.background_color,
                                color: data.secondary_cta.text_color,
                                borderColor: data.secondary_cta.border_color,
                            }}
                        >
                            {data.secondary_cta.text}
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
}
