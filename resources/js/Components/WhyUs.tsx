import {
    Droplet,
    Flower2,
    GraduationCap,
    Heart,
    HeartHandshake,
    Leaf,
    ShieldCheck,
    Sparkles,
    Sprout,
    Star,
    Sun,
    Users,
    type LucideIcon,
} from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { useReveal } from '@/Hooks/useReveal';
import { tr, cn } from '@/Lib/utils';

const ICONS: Record<string, LucideIcon> = {
    Leaf,
    Sprout,
    Flower2,
    HeartHandshake,
    Heart,
    Users,
    GraduationCap,
    ShieldCheck,
    Sparkles,
    Sun,
    Droplet,
    Star,
};

export interface WhyUsItem {
    icon?: string;
    title?: unknown;
    description?: unknown;
}

export interface WhyUsData {
    title?: unknown;
    items: WhyUsItem[];
}

/** "Why Mầm" — 5 điểm nổi bật dạng icon, xếp hàng ngang, ngăn cách bằng đường kẻ mảnh. */
export function WhyUs({ data }: { data: WhyUsData }) {
    const locale = useLocale();
    const title = tr(data.title, locale);
    const items = data.items ?? [];
    const { ref, className } = useReveal<HTMLElement>();

    if (!items.length) {
        return null;
    }

    return (
        <section
            ref={ref}
            className={cn(className, 'bg-maha-50 px-5 pb-16 pt-4 sm:px-10 sm:pb-20 sm:pt-6 lg:px-16 lg:pb-24 lg:pt-8')}
        >
            <div className="mx-auto max-w-7xl">
                {title && (
                    <p className="font-serif text-xs uppercase tracking-[0.2em] text-subheading">{title}</p>
                )}

                <div className="mt-10 grid grid-cols-2 divide-y divide-maha-200 sm:mt-12 sm:grid-cols-3 sm:divide-y-0 lg:grid-cols-5">
                    {items.map((item, index) => {
                        const Icon = (item.icon && ICONS[item.icon]) || Leaf;
                        const itemTitle = tr(item.title, locale);
                        const description = tr(item.description, locale);

                        return (
                            <div
                                key={index}
                                className="flex flex-col items-center border-maha-200 px-4 py-6 text-center sm:border-l sm:first:border-l-0"
                            >
                                <Icon className="h-9 w-9 text-subheading" strokeWidth={1.25} />
                                {itemTitle && (
                                    <div
                                        className="rich-content mt-4 min-h-[4.125rem] font-serif text-base leading-snug text-heading"
                                        dangerouslySetInnerHTML={{ __html: itemTitle }}
                                    />
                                )}
                                {description && (
                                    <div
                                        className="rich-content mt-2 text-xs leading-relaxed text-ink/70"
                                        dangerouslySetInnerHTML={{ __html: description }}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
