import { Link } from '@inertiajs/react';
import { useLocale } from '@/Hooks/useLocale';
import { useReveal } from '@/Hooks/useReveal';
import { tr, cn } from '@/Lib/utils';

export interface BookingStripData {
    heading?: unknown;
    cta_text?: unknown;
    cta_link?: string;
    image?: string | null;
}

/** Dải CTA mảnh ngay trên footer — "Take a moment for yourself." + nút đặt lịch, ảnh nền tải lên qua /admin. */
export function BookingStrip({ data }: { data: BookingStripData }) {
    const locale = useLocale();
    const heading = tr(data.heading, locale);
    const ctaText = tr(data.cta_text, locale);
    const { ref, className } = useReveal<HTMLElement>();

    return (
        <section ref={ref} className={cn(className, 'relative overflow-hidden bg-maha-800')}>
            {data.image && (
                <>
                    <img src={data.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-maha-900/45" />
                </>
            )}
            <div className="relative mx-auto flex min-h-[100px] max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-10 lg:px-16">
                {heading && (
                    <p className="font-serif text-xl italic text-maha-50 sm:text-2xl">{heading}</p>
                )}
                {ctaText && (
                    <Link
                        href={data.cta_link || '/dat-lich/'}
                        className="shrink-0 rounded-full bg-maha-50 px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-heading transition-transform hover:-translate-y-0.5"
                    >
                        {ctaText}
                    </Link>
                )}
            </div>
        </section>
    );
}
