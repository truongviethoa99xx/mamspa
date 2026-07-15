import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/Hooks/useLocale';
import { tr, firstSentence } from '@/Lib/utils';

interface ServiceItem {
    id: number | string;
    slug: string;
    name: unknown;
    description?: unknown;
    images?: string[];
}

/** "Four Healing Journeys" — thẻ dịch vụ nổi bật: ảnh trên, tên + mô tả ngắn dưới. */
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
                <p className="text-center font-serif text-sm italic text-[#556B3F] md:text-lg">
                    {t('blocks.services.eyebrow')}
                </p>
                {data.title && (
                    <h2 className="mt-2 text-center font-serif text-2xl uppercase tracking-wide text-ink sm:text-4xl md:text-5xl">
                        {tr(data.title, locale)}
                    </h2>
                )}

                {/* Cards */}
                <div className="mt-8 grid grid-cols-1 gap-6 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
                    {services.map((s) => (
                        <Link
                            key={s.id}
                            href={`/services/${s.slug}/`}
                            className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-lg"
                        >
                            <div className="aspect-square overflow-hidden bg-maha-200">
                                {s.images?.[0] && (
                                    <img
                                        src={s.images[0]}
                                        alt={tr(s.name, locale)}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                )}
                            </div>

                            <div className="flex flex-1 flex-col p-5">
                                <h3 className="font-serif text-lg text-ink">{tr(s.name, locale)}</h3>
                                {s.description && (
                                    <p className="mt-2 text-sm leading-relaxed text-maha-600">
                                        {firstSentence(tr(s.description, locale))}
                                    </p>
                                )}
                                <span className="mt-auto flex justify-end pt-4">
                                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-maha-50 text-ink transition-colors group-hover:bg-maha-100">
                                        <ArrowRight className="h-4 w-4" />
                                    </span>
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
