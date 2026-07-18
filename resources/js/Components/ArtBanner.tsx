import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { useReveal } from '@/Hooks/useReveal';
import { tr, cn } from '@/Lib/utils';

export interface ArtBannerCta {
    text: unknown;
    link: string;
    text_color: string;
}

export interface ArtBannerData {
    eyebrow?: unknown;
    body?: unknown;
    image?: string | null;
    image_alt?: unknown;
    cta?: ArtBannerCta;
}

/** Banner "The Art of Vietnamese Healing" — ảnh trái, chữ phải, nút link tự do (vd: 1 bài blog). */
export function ArtBanner({ data }: { data: ArtBannerData }) {
    const locale = useLocale();
    const eyebrow = tr(data.eyebrow, locale);
    const body = tr(data.body, locale);
    const ctaText = tr(data.cta?.text, locale);
    const imageAlt = tr(data.image_alt, locale);

    const { ref, className } = useReveal<HTMLElement>();

    return (
        <section ref={ref} className={cn(className, 'bg-maha-50')}>
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative aspect-[4/3] bg-maha-200 md:aspect-auto">
                    {data.image && (
                        <img src={data.image} alt={imageAlt} className="absolute inset-0 h-full w-full object-cover" />
                    )}
                </div>
                <div className="flex flex-col justify-center bg-[#f4eae1] px-6 py-10 sm:px-10 sm:py-12 lg:px-16">
                    {eyebrow && (
                        <div
                            className="rich-content font-serif text-xs uppercase tracking-[0.2em] text-subheading"
                            dangerouslySetInnerHTML={{ __html: eyebrow }}
                        />
                    )}
                    {body && (
                        <div
                            className="rich-content mt-5 font-serif text-lg leading-relaxed text-heading sm:text-xl"
                            dangerouslySetInnerHTML={{ __html: body }}
                        />
                    )}
                    {ctaText && data.cta && (
                        <Link
                            href={data.cta.link || '#'}
                            className="group mt-7 inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-wide"
                            style={{ color: data.cta.text_color }}
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
