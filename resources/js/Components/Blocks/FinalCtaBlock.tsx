import { Link } from '@inertiajs/react';
import { useLocale } from '@/Hooks/useLocale';
import { tr } from '@/Lib/utils';

interface FinalCtaData {
    heading?: unknown;
    cta_text?: unknown;
    cta_link?: string;
    image?: string | null;
}

/** Band CTA cuối trang — "Take a moment for yourself". */
export function FinalCtaBlock({ data }: { data: FinalCtaData }) {
    const locale = useLocale();
    const heading = tr(data.heading, locale);
    const ctaText = tr(data.cta_text, locale);
    const ctaLink = data.cta_link || '/dat-lich/';

    return (
        <section
            className="relative isolate flex min-h-[320px] items-center justify-center overflow-hidden bg-[#2F3E2E] px-5 py-16 text-center sm:min-h-[380px] sm:px-6 md:min-h-[440px]"
            style={
                data.image
                    ? {
                          backgroundImage: `linear-gradient(rgba(47,62,46,0.6), rgba(47,62,46,0.6)), url(${data.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                      }
                    : undefined
            }
        >
            <div className="relative z-10 flex flex-col items-center gap-6 sm:gap-8">
                <h2 className="max-w-2xl font-serif text-2xl leading-snug text-maha-50 sm:text-4xl md:text-5xl">
                    {heading}
                </h2>
                <Link
                    href={ctaLink}
                    className="inline-flex items-center rounded-full bg-maha-50 px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-[#2F3E2E] shadow-xl shadow-black/20 transition-transform hover:-translate-y-0.5 sm:px-10 sm:py-4 sm:text-base"
                >
                    {ctaText}
                </Link>
            </div>
        </section>
    );
}
