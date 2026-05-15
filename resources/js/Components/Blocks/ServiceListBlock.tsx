import { Link } from '@inertiajs/react';
import { useLocale } from '@/Hooks/useLocale';
import { formatVND, tr } from '@/Lib/utils';
import { useTranslation } from 'react-i18next';

export function ServiceListBlock({ data }: { data: any }) {
    const locale = useLocale();
    const { t } = useTranslation();
    const services = data.services ?? [];
    const cols = data.columns ?? 3;

    return (
        <section className="bg-white py-16">
            <div className="mx-auto max-w-7xl px-4">
                {data.title && (
                    <h2 className="mb-10 text-center font-serif text-3xl text-maha-700 md:text-4xl">
                        {tr(data.title, locale)}
                    </h2>
                )}
                <div
                    className="grid gap-6"
                    style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
                >
                    {services.map((s: any) => (
                        <Link
                            key={s.id}
                            href={`/services/${s.slug}`}
                            className="group overflow-hidden rounded-xl border border-maha-100 bg-maha-50 transition hover:shadow-lg"
                        >
                            <div className="aspect-[4/3] bg-maha-200" />
                            <div className="p-5">
                                <h3 className="font-serif text-xl text-maha-700">{tr(s.name, locale)}</h3>
                                <p className="mt-2 line-clamp-2 text-sm text-gray-600">{tr(s.description, locale)}</p>
                                <div className="mt-3 flex items-center justify-between">
                                    <span className="text-sm text-gray-500">{s.duration} min</span>
                                    <span className="font-semibold text-maha-700">{formatVND(s.price)}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
