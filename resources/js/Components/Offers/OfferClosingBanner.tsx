import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { tr } from '@/Lib/utils';

export interface OfferClosingBannerData {
    title?: unknown;
    subtitle?: unknown;
    primaryButtonText?: unknown;
    primaryButtonUrl?: string | null;
    secondaryButtonText?: unknown;
    secondaryButtonUrl?: string | null;
}

/** Banner CTA đóng trang Ưu đãi — nền màu đặc, tiêu đề + mô tả + 2 nút hành động. */
export function OfferClosingBanner({ data }: { data: OfferClosingBannerData }) {
    const locale = useLocale();
    const title = tr(data.title, locale);
    const subtitle = tr(data.subtitle, locale);
    const primaryText = tr(data.primaryButtonText, locale);
    const secondaryText = tr(data.secondaryButtonText, locale);

    return (
        <section className="bg-maha-800 px-5 py-14 sm:px-10 sm:py-16 lg:px-16">
            <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-xl">
                    {title && (
                        <div
                            className="rich-content font-serif text-2xl uppercase leading-snug text-white sm:text-3xl"
                            dangerouslySetInnerHTML={{ __html: title }}
                        />
                    )}
                    {subtitle && (
                        <div
                            className="rich-content mt-4 text-sm leading-relaxed text-white/75 sm:text-base"
                            dangerouslySetInnerHTML={{ __html: subtitle }}
                        />
                    )}
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    {primaryText && data.primaryButtonUrl && (
                        <Link
                            href={data.primaryButtonUrl}
                            className="group inline-flex items-center gap-2 rounded-md bg-maha-900 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
                        >
                            <span>{primaryText}</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    )}
                    {secondaryText && data.secondaryButtonUrl && (
                        <Link
                            href={data.secondaryButtonUrl}
                            className="inline-flex items-center gap-2 rounded-md border border-white/60 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white/10"
                        >
                            <span>{secondaryText}</span>
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
}
