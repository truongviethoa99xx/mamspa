import { Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/Hooks/useLocale';
import { tr, cn } from '@/Lib/utils';

type Category = 'combo' | 'massage' | 'head-spa' | 'facial' | 'foot-spa';

const CATEGORIES: Category[] = ['combo', 'massage', 'head-spa', 'facial', 'foot-spa'];

interface MenuService {
    id: number | string;
    slug: string;
    name: unknown;
    description: unknown;
    category: Category;
    duration: number;
    images?: string[];
}

export function ServiceMenuBlock({ data }: { data: { services?: MenuService[] } }) {
    const locale = useLocale();
    const { t } = useTranslation();
    const services = useMemo<MenuService[]>(() => data.services ?? [], [data.services]);

    const [active, setActive] = useState<Category>('combo');

    const filtered = useMemo(
        () => services.filter((s) => s.category === active),
        [services, active],
    );

    // Chưa có dịch vụ nào thì ẩn cả khối menu.
    if (services.length === 0) {
        return null;
    }

    return (
        <section className="bg-maha-50 py-10 sm:py-14 md:py-16 lg:h-[900px] lg:py-20">
            <div className="mx-auto grid h-full max-w-7xl grid-cols-1 gap-6 px-5 sm:px-6 lg:grid-cols-[280px_1fr] lg:gap-12 2xl:max-w-[1440px]">
                {/* Sidebar */}
                <div>
                    <h2 className="font-serif text-2xl uppercase tracking-wide text-ink sm:text-4xl">
                        {t('blocks.menu.title')}
                    </h2>
                    <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 lg:mt-12 lg:block lg:space-y-6">
                        {CATEGORIES.map((cat) => (
                            <li key={cat}>
                                <button
                                    onClick={() => setActive(cat)}
                                    className={cn(
                                        'font-serif text-base transition-colors sm:text-lg',
                                        cat === active
                                            ? 'border-b-2 border-ink pb-1 font-bold text-ink'
                                            : 'text-maha-600 hover:text-ink',
                                    )}
                                >
                                    {t(`blocks.menu.cat.${cat}`)}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Service list */}
                <div className="lg:min-h-0 lg:overflow-y-auto lg:pr-1">
                    {filtered.length === 0 && (
                        <p className="py-8 text-maha-600">{t('services.empty')}</p>
                    )}
                    {filtered.map((s) => (
                        <article
                            key={s.id}
                            className="grid grid-cols-1 gap-4 border-b border-maha-200 py-5 first:pt-0 last:border-0 md:grid-cols-[280px_1fr] md:gap-8 md:py-6"
                        >
                            {/* Image */}
                            <div className="h-[150px] overflow-hidden rounded-xl bg-maha-200 sm:h-[200px] sm:rounded-2xl md:h-[150px] lg:h-[170px]">
                                {s.images?.[0] && (
                                    <img
                                        src={s.images[0]}
                                        alt={tr(s.name, locale)}
                                        className="h-full w-full object-cover"
                                    />
                                )}
                            </div>

                            {/* Detail */}
                            <div className="flex flex-col">
                                <h3 className="font-serif text-xl text-ink md:text-3xl">{tr(s.name, locale)}</h3>
                                <p className="mt-2 max-w-md text-sm leading-relaxed text-maha-700 sm:text-base md:mt-3">
                                    {tr(s.description, locale)}
                                </p>
                                <p className="mt-3 font-serif text-base font-bold text-ink sm:text-lg md:mt-4">
                                    {s.duration} {t('blocks.menu.minute')}
                                </p>

                                <Link
                                    href={`/dat-lich?service=${s.slug}`}
                                    className="group mt-auto flex items-center justify-end gap-2 pt-3 text-sm font-semibold text-ink sm:gap-3 sm:pt-4 sm:text-base"
                                >
                                    {t('blocks.menu.book')}
                                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-maha-50 transition-transform group-hover:translate-x-1 sm:h-10 sm:w-10">
                                        <ChevronRight className="h-5 w-5" />
                                    </span>
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
