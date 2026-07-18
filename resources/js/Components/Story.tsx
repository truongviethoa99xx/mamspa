import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { useReveal } from '@/Hooks/useReveal';
import { tr, cn } from '@/Lib/utils';

export interface StoryCta {
    text: unknown;
    link: string;
    text_color: string;
}

export interface StoryData {
    heading?: unknown;
    caption?: unknown;
    image?: string | null;
    image_alt?: unknown;
    cta?: StoryCta;
}

/**
 * Banner 2 "A Place To Pause" — ảnh tràn full-bleed toàn bộ section, cao bằng 2/3
 * banner chính (Hero: h-[85vh]/sm:h-[75vh]). Khối chữ đè lên bên trái (~1/3 chiều
 * rộng ở desktop, full ở mobile), cao 100% banner, trên nền #ece1db mờ dần từ trái
 * (đậm, đủ tương phản cho chữ tối) sang phải (trong suốt, lộ ảnh).
 */
export function Story({ data }: { data: StoryData }) {
    const locale = useLocale();
    const heading = tr(data.heading, locale);
    const caption = tr(data.caption, locale);
    const ctaText = tr(data.cta?.text, locale);
    const imageAlt = tr(data.image_alt, locale);
    const { ref, className } = useReveal<HTMLElement>();

    return (
        <section
            ref={ref}
            className={cn(className, 'relative isolate h-[calc(85vh/1.5)] overflow-hidden bg-[#ece1db] sm:h-[50vh]')}
        >
            {data.image && (
                <img src={data.image} alt={imageAlt} className="absolute inset-0 z-0 h-full w-full object-cover" />
            )}

            <div className="relative z-10 flex h-full w-full flex-col justify-center px-5 py-10 sm:px-10 md:w-1/2 md:px-12 lg:w-1/3 lg:px-16">
                <div
                    className="absolute inset-0 -z-10"
                    style={{
                        background:
                            'linear-gradient(90deg, rgba(236,225,219,0.97) 0%, rgba(236,225,219,0.9) 55%, rgba(236,225,219,0) 100%)',
                    }}
                />
                {heading && (
                    <div
                        className="rich-content font-serif text-xs uppercase tracking-[0.15em] text-subheading"
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
        </section>
    );
}
