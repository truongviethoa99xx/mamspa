import { useLocale } from '@/Hooks/useLocale';
import { useReveal } from '@/Hooks/useReveal';
import { tr, cn } from '@/Lib/utils';

export interface PhilosophyData {
    eyebrow?: unknown;
    quote?: unknown;
}

/** "Our Philosophy" — trích dẫn triết lý trị liệu, căn giữa trang, nền màu trơn. */
export function Philosophy({ data }: { data: PhilosophyData }) {
    const locale = useLocale();
    const eyebrow = tr(data.eyebrow, locale);
    const quote = tr(data.quote, locale);
    const { ref, className } = useReveal<HTMLElement>();

    if (!eyebrow && !quote) {
        return null;
    }

    return (
        <section ref={ref} className={cn(className, 'bg-maha-50 px-5 pb-4 pt-12 sm:pb-5 sm:pt-14 lg:pb-6 lg:pt-16')}>
            <div className="mx-auto max-w-3xl text-center">
                {eyebrow && (
                    <div
                        className="rich-content font-serif text-xs uppercase tracking-[0.2em] text-subheading"
                        dangerouslySetInnerHTML={{ __html: eyebrow }}
                    />
                )}
                {quote && (
                    <div
                        className="rich-content mt-6 font-serif text-2xl leading-relaxed text-heading sm:text-3xl md:text-4xl"
                        dangerouslySetInnerHTML={{ __html: quote }}
                    />
                )}
                <div className="mx-auto mt-9 h-[3px] w-16 bg-heading" />
            </div>
        </section>
    );
}
