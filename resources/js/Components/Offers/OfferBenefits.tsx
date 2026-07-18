import { Link } from '@inertiajs/react';
import { ArrowRight, Clock, Gift, HeartHandshake, Leaf, ShieldCheck, User, type LucideIcon } from 'lucide-react';
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

interface BenefitItem {
    icon?: string;
    title?: unknown;
    description?: unknown;
    button_label?: unknown;
    button_link?: string | null;
}

export interface OfferBenefitsData {
    heading?: unknown;
    subtitle?: unknown;
    items: BenefitItem[];
}

/** "Quyền lợi toàn hệ thống" — nhãn khối + tối đa 3 thẻ quyền lợi áp dụng tại mọi chi nhánh. */
export function OfferBenefits({ data }: { data: OfferBenefitsData }) {
    const locale = useLocale();
    const heading = tr(data.heading, locale);
    const subtitle = tr(data.subtitle, locale);
    const items = data.items ?? [];
    const { ref, className } = useReveal<HTMLElement>();

    if (!items.length) return null;

    return (
        <section ref={ref} className={cn(className, 'mt-[50px] bg-[#f5f2ed] px-5 py-12 sm:px-10 lg:px-[60px] lg:py-16')}>
            <div className="mx-auto max-w-6xl">
                <div className="flex flex-col items-center gap-2 text-center">
                    {heading && (
                        <div className="flex items-center gap-2">
                            <Leaf className="h-4 w-4 shrink-0 text-subheading" strokeWidth={1.5} />
                            <h2 className="font-serif text-2xl uppercase tracking-wide text-heading sm:text-3xl">{heading}</h2>
                        </div>
                    )}
                    {subtitle && <p className="max-w-md text-sm text-ink/70">{subtitle}</p>}
                </div>

                <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
                    {items.map((item, index) => {
                        const Icon = (item.icon && ICONS[item.icon]) || Leaf;
                        const title = tr(item.title, locale);
                        const description = tr(item.description, locale);
                        const buttonLabel = tr(item.button_label, locale);

                        return (
                            <article
                                key={index}
                                className="flex flex-col items-center rounded-xl border border-maha-200 bg-white p-8 text-center"
                            >
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-maha-100">
                                    <Icon className="h-7 w-7 text-subheading" strokeWidth={1.25} />
                                </div>
                                {title && <h3 className="mt-5 font-serif text-lg uppercase tracking-wide text-heading">{title}</h3>}
                                {description && (
                                    <div
                                        className="rich-content mt-2 text-sm leading-relaxed text-ink/70"
                                        dangerouslySetInnerHTML={{ __html: description }}
                                    />
                                )}
                                {buttonLabel && item.button_link && (
                                    <Link
                                        href={item.button_link}
                                        className="group mt-6 inline-flex items-center gap-2 rounded-md border border-maha-300 px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-heading transition-colors hover:bg-maha-50"
                                    >
                                        <span>{buttonLabel}</span>
                                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                )}
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
