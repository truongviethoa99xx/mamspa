import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { useReveal } from '@/Hooks/useReveal';
import { tr, cn } from '@/Lib/utils';

export interface ServicesClosingData {
    heading?: unknown;
    body?: unknown;
    ctaText?: unknown;
    ctaLink?: string | null;
    image?: string | null;
    image_alt?: unknown;
}

/** Banner CTA khép lại trang /dich-vu, mời khách đặt lịch. */
export function ServicesClosing({ data }: { data: ServicesClosingData }) {
    const locale = useLocale();
    const heading = tr(data.heading, locale);
    const body = tr(data.body, locale);
    const ctaText = tr(data.ctaText, locale);
    const imageAlt = tr(data.image_alt, locale);
    const hasImage = !!data.image;
    const { ref, className } = useReveal<HTMLElement>();

    return (
        <section
            ref={ref}
            className={cn(
                className,
                'relative isolate overflow-hidden px-5 py-16 sm:px-10 sm:py-20 lg:px-[60px]',
                !hasImage && 'bg-maha-100',
            )}
        >
            {hasImage && (
                <img
                    src={data.image ?? undefined}
                    alt={imageAlt}
                    aria-hidden={imageAlt ? undefined : 'true'}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                />
            )}
            <div className="relative ml-auto max-w-4xl">
                {heading && (
                    <div
                        className="rich-content font-serif text-2xl leading-snug text-heading sm:text-3xl"
                        dangerouslySetInnerHTML={{ __html: heading }}
                    />
                )}
                {body && (
                    <div
                        className="rich-content mt-3 max-w-lg text-sm leading-relaxed text-ink/75 sm:text-base"
                        dangerouslySetInnerHTML={{ __html: body }}
                    />
                )}
                {ctaText && data.ctaLink && (
                    <Link
                        href={data.ctaLink}
                        className="group mt-6 inline-flex w-fit items-center gap-2 rounded-md bg-[#2F3E2E] px-7 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
                    >
                        <span dangerouslySetInnerHTML={{ __html: ctaText }} />
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                )}
            </div>
        </section>
    );
}
