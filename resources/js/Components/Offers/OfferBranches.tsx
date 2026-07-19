import { Link } from '@inertiajs/react';
import { ArrowRight, Clock, Gift, HeartHandshake, Leaf, MapPin, ShieldCheck, User, type LucideIcon } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { useReveal } from '@/Hooks/useReveal';
import { cn, tr } from '@/Lib/utils';

const ICONS: Record<string, LucideIcon> = {
    Leaf,
    Clock,
    User,
    Gift,
    HeartHandshake,
    ShieldCheck,
};

interface BranchOfferItem {
    icon?: string;
    title?: unknown;
    description?: unknown;
    button_label?: unknown;
    button_link?: string | null;
}

interface BranchItem {
    image?: string | null;
    image_alt?: unknown;
    name?: unknown;
    tagline?: unknown;
    offers?: BranchOfferItem[];
}

export interface OfferBranchesData {
    heading?: unknown;
    items: BranchItem[];
}

/** "Bạn sẽ trải nghiệm tại chi nhánh nào?" — mỗi chi nhánh: ảnh + thẻ ưu đãi riêng, so le trái/phải. */
export function OfferBranches({ data }: { data: OfferBranchesData }) {
    const locale = useLocale();
    const heading = tr(data.heading, locale);
    const items = data.items ?? [];
    const { ref, className } = useReveal<HTMLElement>();

    if (!items.length) return null;

    return (
        <section ref={ref} className={cn(className, 'mt-[50px] bg-[#f5f2ed] px-5 py-12 sm:px-10 lg:px-[60px] lg:py-16')}>
            <div className="mx-auto max-w-6xl">
                {heading && (
                    <div className="flex items-center justify-center gap-2 text-center">
                        <Leaf className="h-4 w-4 shrink-0 text-subheading" strokeWidth={1.5} />
                        <h2 className="font-serif text-2xl uppercase tracking-wide text-heading sm:text-3xl">{heading}</h2>
                    </div>
                )}

                <div className="mt-10 flex flex-col gap-8">
                    {items.map((branch, index) => {
                        const name = tr(branch.name, locale);
                        const tagline = tr(branch.tagline, locale);
                        const imageAlt = tr(branch.image_alt, locale) || name;
                        const hasImage = !!branch.image;
                        const offers = branch.offers ?? [];
                        const isReversed = index % 2 === 1;

                        return (
                            <article key={index} className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-stretch">
                                <div
                                    className={cn(
                                        'aspect-[4/3] overflow-hidden rounded-2xl border border-maha-200 bg-maha-200 md:aspect-auto md:min-h-[320px]',
                                        isReversed ? 'md:order-2' : 'md:order-1',
                                    )}
                                >
                                    {hasImage && (
                                        <img
                                            src={branch.image ?? undefined}
                                            alt={imageAlt}
                                            className="h-full w-full object-cover"
                                            loading="lazy"
                                        />
                                    )}
                                </div>

                                <div
                                    className={cn(
                                        'rounded-2xl border border-maha-200 bg-white p-7 sm:p-8',
                                        isReversed ? 'md:order-1' : 'md:order-2',
                                    )}
                                >
                                    <div className="flex items-start gap-3">
                                        <MapPin className="mt-1 h-5 w-5 shrink-0 text-subheading" strokeWidth={1.5} />
                                        <div>
                                            {name && (
                                                <h3 className="font-serif text-2xl uppercase tracking-wide text-heading">{name}</h3>
                                            )}
                                            {tagline && <p className="mt-1 text-xs text-ink/60">{tagline}</p>}
                                        </div>
                                    </div>

                                    <div className="mt-5 flex flex-col">
                                        {offers.map((offer, offerIndex) => {
                                            const Icon = (offer.icon && ICONS[offer.icon]) || Leaf;
                                            const offerTitle = tr(offer.title, locale);
                                            const offerDescription = tr(offer.description, locale);
                                            const offerButtonLabel = tr(offer.button_label, locale);

                                            return (
                                                <div
                                                    key={offerIndex}
                                                    className={cn(
                                                        'flex items-center gap-4 py-4',
                                                        offerIndex > 0 && 'border-t border-maha-200',
                                                    )}
                                                >
                                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-maha-200 bg-maha-100">
                                                        <Icon className="h-5 w-5 text-subheading" strokeWidth={1.4} />
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        {offerTitle && (
                                                            <h4 className="font-serif text-base text-heading sm:text-lg">{offerTitle}</h4>
                                                        )}
                                                        {offerDescription && (
                                                            <div
                                                                className="rich-content mt-0.5 text-xs leading-relaxed text-ink/65"
                                                                dangerouslySetInnerHTML={{ __html: offerDescription }}
                                                            />
                                                        )}
                                                    </div>
                                                    {offerButtonLabel && offer.button_link && (
                                                        <Link
                                                            href={offer.button_link}
                                                            className="group inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-xs font-semibold uppercase tracking-wide text-heading transition-colors hover:text-subheading"
                                                        >
                                                            <span>{offerButtonLabel}</span>
                                                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                                                        </Link>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
