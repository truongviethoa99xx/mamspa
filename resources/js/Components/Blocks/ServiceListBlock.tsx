import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/Hooks/useLocale';
import { tr } from '@/Lib/utils';

interface ServiceItem {
    id: number | string;
    slug: string;
    name: unknown;
    images?: string[];
}

export function ServiceListBlock({ data }: { data: { title?: unknown; services?: ServiceItem[] } }) {
    const locale = useLocale();
    const { t } = useTranslation();
    const services: ServiceItem[] = (data.services ?? []).slice(0, 4);

    // Không có dịch vụ thì ẩn cả khối thay vì hiện tiêu đề + lưới rỗng.
    if (services.length === 0) {
        return null;
    }

    return (
        <section className="bg-[#F6F3EF] py-10 sm:py-14 md:py-16 lg:py-20">
            <div className="mx-auto flex w-full max-w-7xl flex-col px-5 sm:px-6 2xl:max-w-[1440px]">
                {/* Header */}
                <p className="font-serif text-sm italic text-[#556B3F] md:text-lg">{t('blocks.services.eyebrow')}</p>
                {data.title && (
                    <h2 className="mt-2 font-serif text-2xl uppercase tracking-wide text-ink sm:text-4xl md:text-5xl">
                        {tr(data.title, locale)}
                    </h2>
                )}

                {/* Cards */}
                <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
                    {services.map((s) => (
                        <Link
                            key={s.id}
                            href={`/services/${s.slug}`}
                            className="group relative flex h-[260px] flex-col overflow-hidden rounded-xl bg-maha-200 p-4 sm:h-[400px] sm:rounded-2xl sm:p-5"
                        >
                            {s.images?.[0] && (
                                <img
                                    src={s.images[0]}
                                    alt={tr(s.name, locale)}
                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            )}

                            {/* Title chip */}
                            <div className="relative inline-flex w-fit items-center gap-3 rounded-lg bg-maha-50 px-4 py-2.5 shadow-sm">
                                <span className="h-5 w-1 rounded-full bg-[#475934]" />
                                <span className="font-serif text-sm font-bold uppercase tracking-wide text-ink">
                                    {tr(s.name, locale)}
                                </span>
                            </div>

                            {/* Arrow */}
                            <span className="relative mt-auto flex h-10 w-10 items-center justify-center self-end rounded-full bg-maha-50 text-ink shadow-sm transition-colors group-hover:bg-white sm:h-11 sm:w-11">
                                <ChevronRight className="h-5 w-5" />
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
