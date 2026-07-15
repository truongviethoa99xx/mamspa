import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { tr } from '@/Lib/utils';

interface ArtBannerData {
    eyebrow?: unknown;
    heading?: unknown;
    body?: unknown;
    cta_text?: unknown;
    cta_link?: string;
    image?: string | null;
}

/** Banner chia đôi ảnh/copy — "The Art of Vietnamese Healing". */
export function ArtBannerBlock({ data }: { data: ArtBannerData }) {
    const locale = useLocale();
    const eyebrow = tr(data.eyebrow, locale);
    const heading = tr(data.heading, locale);
    const body = tr(data.body, locale);
    const ctaText = tr(data.cta_text, locale);
    const paragraphs = body.split('\n').filter((p) => p.trim());

    return (
        <section className="bg-white">
            <div className="grid md:grid-cols-2">
                <div className="aspect-[4/3] bg-maha-800 md:aspect-auto md:h-full md:min-h-[420px]">
                    {data.image && <img src={data.image} alt="" className="h-full w-full object-cover" />}
                </div>
                <div className="flex flex-col justify-center bg-[#F6F3EF] px-5 py-10 sm:px-6 sm:py-14 md:px-16 md:py-20">
                    <p className="font-serif text-sm uppercase italic tracking-[0.12em] text-[#556B3F] md:text-base">
                        {eyebrow}
                    </p>
                    <h2 className="mt-3 font-serif text-2xl uppercase tracking-wide text-heading sm:text-3xl md:mt-5 md:text-4xl">
                        {heading}
                    </h2>
                    <div className="mt-4 space-y-1 text-sm leading-relaxed text-ink/80 sm:text-base md:mt-6">
                        {paragraphs.map((p, i) => (
                            <p key={i}>{p}</p>
                        ))}
                    </div>
                    {data.cta_link && (
                        <Link
                            href={data.cta_link}
                            className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-ink md:mt-9"
                        >
                            <span>{ctaText}</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
}
