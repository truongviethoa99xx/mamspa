import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { tr } from '@/Lib/utils';

export interface StoryCta {
    text: unknown;
    link: string;
    text_color: string;
}

export interface StoryData {
    heading?: unknown;
    caption?: unknown;
    image?: string | null;
    cta?: StoryCta;
}

/** Banner 2 "A Place To Pause" — chữ trái, ảnh phải chiếm ~2/3 chiều rộng (không full-bleed như Hero). */
export function Story({ data }: { data: StoryData }) {
    const locale = useLocale();
    const heading = tr(data.heading, locale);
    const caption = tr(data.caption, locale);
    const ctaText = tr(data.cta?.text, locale);

    return (
        <section className="bg-maha-50 py-10 sm:py-14 md:py-20 lg:py-24">
            <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 sm:px-6 md:grid-cols-[1fr_2fr] md:gap-12 lg:gap-16 2xl:max-w-[1440px]">
                <div>
                    {heading && (
                        <div
                            className="rich-content font-serif text-xs uppercase tracking-[0.15em] text-[#556B3F]"
                            dangerouslySetInnerHTML={{ __html: heading }}
                        />
                    )}
                    {caption && (
                        <div
                            className="rich-content mt-5 font-serif text-xl leading-relaxed text-ink sm:text-2xl md:mt-8"
                            dangerouslySetInnerHTML={{ __html: caption }}
                        />
                    )}
                    {ctaText && data.cta && (
                        <Link
                            href={data.cta.link || '#'}
                            className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide md:mt-10"
                            style={{ color: data.cta.text_color }}
                        >
                            <span>{ctaText}</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    )}
                </div>

                <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-maha-200 md:aspect-[16/10]">
                    {data.image && <img src={data.image} alt="" className="h-full w-full object-cover" />}
                </div>
            </div>
        </section>
    );
}
