import { Clock, Gift, HeartHandshake, Leaf, ShieldCheck, Sparkles, type LucideIcon } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { tr } from '@/Lib/utils';

const ICONS: Record<string, LucideIcon> = {
    Clock,
    Gift,
    Leaf,
    HeartHandshake,
    ShieldCheck,
    Sparkles,
};

interface CommitmentItem {
    icon?: string;
    title?: unknown;
    description?: unknown;
}

export interface ContactCommitmentsData {
    items: CommitmentItem[];
}

/** Dải icon cam kết cuối trang Liên hệ — xếp hàng ngang, ngăn cách bằng đường kẻ mảnh. */
export function ContactCommitments({ data }: { data: ContactCommitmentsData }) {
    const locale = useLocale();
    const items = data.items ?? [];

    if (!items.length) {
        return null;
    }

    return (
        <section className="bg-maha-50 px-5 py-10 sm:px-10 sm:py-12 lg:px-16">
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-2 divide-y divide-maha-200 sm:grid-cols-4 sm:divide-y-0">
                    {items.map((item, index) => {
                        const Icon = (item.icon && ICONS[item.icon]) || Leaf;
                        const title = tr(item.title, locale);
                        const description = tr(item.description, locale);

                        return (
                            <div
                                key={index}
                                className="flex flex-col items-center gap-2 border-maha-200 px-4 py-6 text-center sm:border-l sm:first:border-l-0"
                            >
                                <Icon className="h-7 w-7 text-subheading" strokeWidth={1.25} />
                                {title && (
                                    <div
                                        className="rich-content mt-2 text-sm font-semibold text-heading"
                                        dangerouslySetInnerHTML={{ __html: title }}
                                    />
                                )}
                                {description && (
                                    <div
                                        className="rich-content text-xs leading-relaxed text-ink/70"
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
