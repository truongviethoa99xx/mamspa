import { GraduationCap, HeartHandshake, Leaf, Sparkles, Sprout, ShieldCheck, Coffee, type LucideIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/Hooks/useLocale';
import { tr } from '@/Lib/utils';

const ICONS: Record<string, LucideIcon> = {
    Leaf,
    HeartHandshake,
    Sprout,
    GraduationCap,
    Sparkles,
    ShieldCheck,
    Coffee,
};

interface WhyUsItem {
    icon: string;
    title: unknown;
    description: unknown;
}

/** "Why Mầm Spa" — grid điểm nổi bật dạng icon. */
export function WhyUsBlock({ data }: { data: WhyUsItem[] }) {
    const locale = useLocale();
    const { t } = useTranslation();
    const items = data ?? [];

    if (items.length === 0) {
        return null;
    }

    return (
        <section className="bg-maha-50 py-10 sm:py-14 md:py-20">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 2xl:max-w-[1440px]">
                <p className="text-center font-serif text-sm uppercase italic tracking-[0.12em] text-[#556B3F] md:text-base">
                    {t('blocks.whyUs.eyebrow')}
                </p>

                <div className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-3 md:mt-12 lg:grid-cols-5 lg:gap-6">
                    {items.map((item, i) => {
                        const Icon = ICONS[item.icon] ?? Leaf;

                        return (
                            <div key={i} className="flex flex-col items-center text-center">
                                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-maha-300 text-[#556B3F]">
                                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                                </span>
                                <h3 className="mt-4 font-serif text-base text-ink sm:text-lg">{tr(item.title, locale)}</h3>
                                <p className="mt-1.5 text-xs leading-relaxed text-maha-600 sm:text-sm">
                                    {tr(item.description, locale)}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
