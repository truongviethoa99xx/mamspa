import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { useReveal } from '@/Hooks/useReveal';
import { cn, tr } from '@/Lib/utils';

export interface OfferClosingData {
    title?: unknown;
    subtitle?: unknown;
    buttonText?: unknown;
    buttonUrl?: string | null;
    image?: string | null;
    image_alt?: unknown;
}

/** Banner CTA đóng trang Ưu đãi — thẻ 2 cột: tiêu đề + mô tả + nút bên trái, ảnh minh hoạ bên phải. */
export function OfferClosing({ data }: { data: OfferClosingData }) {
    const locale = useLocale();
    const title = tr(data.title, locale);
    const subtitle = tr(data.subtitle, locale);
    const buttonText = tr(data.buttonText, locale);
    const imageAlt = tr(data.image_alt, locale);
    const hasImage = !!data.image;
    const { ref, className } = useReveal<HTMLElement>();

    return (
        <section ref={ref} className={cn(className, 'mt-[50px] bg-[#f5f2ed] px-5 pb-16 sm:px-10 lg:px-[60px]')}>
            <div className="mx-auto grid max-w-6xl grid-cols-1 overflow-hidden rounded-2xl bg-maha-100 md:grid-cols-2">
                <div className="flex flex-col justify-center p-8 sm:p-10">
                    {title && (
                        <div
                            className="rich-content font-serif text-2xl leading-snug text-heading sm:text-3xl"
                            dangerouslySetInnerHTML={{ __html: title }}
                        />
                    )}
                    {subtitle && (
                        <div
                            className="rich-content mt-3 max-w-sm text-sm leading-relaxed text-ink/70"
                            dangerouslySetInnerHTML={{ __html: subtitle }}
                        />
                    )}
                    {buttonText && data.buttonUrl && (
                        <Link
                            href={data.buttonUrl}
                            className="group mt-7 inline-flex w-fit items-center gap-2 rounded-md bg-maha-800 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
                        >
                            <span>{buttonText}</span>
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                    )}
                </div>
                {hasImage && (
                    <div className="aspect-[4/3] w-full md:aspect-auto md:min-h-[220px]">
                        <img
                            src={data.image ?? undefined}
                            alt={imageAlt}
                            className="h-full w-full object-cover"
                            loading="lazy"
                        />
                    </div>
                )}
            </div>
        </section>
    );
}
