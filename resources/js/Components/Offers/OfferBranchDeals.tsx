import { Link } from '@inertiajs/react';
import { ArrowRight, MapPin } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { tr } from '@/Lib/utils';

interface BranchOfferItem {
    image?: string | null;
    image_alt?: unknown;
    title?: unknown;
    description?: unknown;
    button_label?: unknown;
    button_link?: string | null;
}

export interface OfferBranchDealsData {
    heading?: unknown;
    items: BranchOfferItem[];
}

/** "Ưu đãi nổi bật" — lưới thẻ ảnh full-bleed. */
export function OfferBranchDeals({ data }: { data: OfferBranchDealsData }) {
    const locale = useLocale();
    const heading = tr(data.heading, locale);
    const items = data.items ?? [];

    if (!items.length) return null;

    return (
        <section className="mt-[50px] bg-[#f5f2ed] px-5 py-12 sm:px-10 lg:px-[60px] lg:py-16">
            <div className="mx-auto max-w-6xl">
                {heading && (
                    <div className="flex items-center justify-center gap-2 text-center">
                        <MapPin className="h-4 w-4 shrink-0 text-subheading" strokeWidth={1.5} />
                        <h2 className="font-serif text-2xl uppercase tracking-wide text-heading sm:text-3xl">{heading}</h2>
                    </div>
                )}

                <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
                    {items.map((item, index) => {
                        const title = tr(item.title, locale);
                        const description = tr(item.description, locale);
                        const buttonLabel = tr(item.button_label, locale);
                        const imageAlt = tr(item.image_alt, locale);
                        const hasImage = !!item.image;

                        return (
                            <article
                                key={index}
                                className="group relative isolate aspect-[4/3] overflow-hidden rounded-2xl bg-maha-800 sm:aspect-[16/11]"
                            >
                                {hasImage && (
                                    <img
                                        src={item.image ?? undefined}
                                        alt={imageAlt || title}
                                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                )}
                                <div
                                    className="absolute inset-0"
                                    style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.75) 100%)' }}
                                    aria-hidden="true"
                                />

                                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                                    {title && (
                                        <h3 className="font-serif text-2xl leading-snug text-white sm:text-3xl">{title}</h3>
                                    )}
                                    {description && (
                                        <div
                                            className="rich-content mt-2 max-w-sm text-sm leading-relaxed text-white/80"
                                            dangerouslySetInnerHTML={{ __html: description }}
                                        />
                                    )}
                                    {buttonLabel && item.button_link && (
                                        <Link
                                            href={item.button_link}
                                            className="group/btn mt-5 inline-flex items-center gap-2 rounded-md border border-white/60 px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white/10"
                                        >
                                            <span>{buttonLabel}</span>
                                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                                        </Link>
                                    )}
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
