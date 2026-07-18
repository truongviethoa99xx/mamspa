import { Leaf } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { useReveal } from '@/Hooks/useReveal';
import { tr, cn } from '@/Lib/utils';
import { CUSTOMER_EXPERIENCE_ICON_MAP } from './icons';

interface StatItem {
    icon?: string;
    value?: string;
    description?: unknown;
}

export interface StatsStripData {
    items: StatItem[];
}

/** Dải 4 số liệu thống kê ngay dưới banner đầu trang. */
export function StatsStrip({ data }: { data: StatsStripData }) {
    const locale = useLocale();
    const items = data.items ?? [];
    const { ref, className } = useReveal<HTMLElement>();

    if (!items.length) return null;

    return (
        <section ref={ref} className={cn(className, 'bg-[#f5f2ed] px-5 pb-14 pt-4 sm:px-10 lg:px-[60px]')}>
            <div className="grid grid-cols-2 gap-y-8 divide-heading/15 border-y border-heading/15 py-8 sm:grid-cols-4 sm:divide-x">
                {items.map((item, index) => {
                    const Icon = CUSTOMER_EXPERIENCE_ICON_MAP[item.icon ?? ''] ?? Leaf;
                    const description = tr(item.description, locale);

                    return (
                        <div key={index} className="flex items-center gap-3 px-4 first:pl-0">
                            <Icon className="h-7 w-7 shrink-0 text-heading/70" strokeWidth={1.5} />
                            <div>
                                {item.value && <p className="font-serif text-xl text-heading">{item.value}</p>}
                                {description && <p className="text-xs leading-snug text-ink/70 sm:text-sm">{description}</p>}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
