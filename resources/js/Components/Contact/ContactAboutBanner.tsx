import { Link } from '@inertiajs/react';
import { ArrowRight, Leaf } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { tr } from '@/Lib/utils';

export interface ContactAboutBannerData {
    text?: unknown;
    linkText?: unknown;
    linkUrl?: string | null;
}

/** Dải banner mảnh, link sang trang Giới thiệu. */
export function ContactAboutBanner({ data }: { data: ContactAboutBannerData }) {
    const locale = useLocale();
    const text = tr(data.text, locale);
    const linkText = tr(data.linkText, locale);

    if (!text && !linkText) {
        return null;
    }

    return (
        <section className="bg-maha-50 px-5 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl rounded-2xl bg-maha-100">
                <div className="flex flex-col items-start gap-2 px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                    <div className="flex items-center gap-2">
                        <Leaf className="h-4 w-4 shrink-0 text-subheading" strokeWidth={1.5} aria-hidden="true" />
                        {text && (
                            <div
                                className="rich-content text-sm text-ink/80"
                                dangerouslySetInnerHTML={{ __html: text }}
                            />
                        )}
                    </div>
                    {linkText && data.linkUrl && (
                        <Link
                            href={data.linkUrl}
                            className="group inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-heading"
                        >
                            {linkText}
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
}
