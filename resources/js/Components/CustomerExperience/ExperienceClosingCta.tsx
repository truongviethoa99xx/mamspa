import { Link, usePage } from '@inertiajs/react';
import { Phone } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { useReveal } from '@/Hooks/useReveal';
import { tr, cn } from '@/Lib/utils';
import type { SharedProps } from '@/types';

export interface ExperienceClosingCtaData {
    title?: unknown;
    buttonText?: unknown;
    buttonUrl?: string;
}

/** Banner CTA đóng trang — số hotline lấy từ Thiết lập chung (site-wide), cùng nguồn với nút CTA ở header. */
export function ExperienceClosingCta({ data }: { data: ExperienceClosingCtaData }) {
    const locale = useLocale();
    const { props } = usePage<SharedProps>();
    const title = tr(data.title, locale);
    const buttonText = tr(data.buttonText, locale);
    const hotline = props.site?.hotline;
    const { ref, className } = useReveal<HTMLElement>();

    return (
        <section ref={ref} className={cn(className, 'mt-[50px] bg-[#2F3E2E] px-5 py-10 sm:px-10 lg:px-[60px]')}>
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                {title && (
                    <div
                        className="rich-content max-w-lg font-serif text-2xl leading-snug text-white sm:text-3xl"
                        dangerouslySetInnerHTML={{ __html: title }}
                    />
                )}

                <div className="flex shrink-0 flex-col items-start gap-4 sm:flex-row sm:items-center">
                    {buttonText && data.buttonUrl && (
                        <Link
                            href={data.buttonUrl}
                            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-wide text-heading transition-opacity hover:opacity-90"
                        >
                            {buttonText}
                        </Link>
                    )}
                    {hotline && (
                        <a href={`tel:${hotline.replace(/\s+/g, '')}`} className="flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white">
                            <Phone className="h-4 w-4" strokeWidth={1.5} />
                            {hotline}
                        </a>
                    )}
                </div>
            </div>
        </section>
    );
}
