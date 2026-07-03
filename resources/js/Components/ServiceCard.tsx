import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { formatVND, tr } from '@/Lib/utils';

export interface ServiceCardData {
    id: number | string;
    slug: string;
    url: string;
    name: Record<string, string> | string;
    description: Record<string, string> | string;
    category?: string | null;
    duration: number;
    price: number;
    is_featured: boolean;
    ingredients: string[];
    images?: string[];
}

export function ServiceCard({ service, locale }: { service: ServiceCardData; locale: string }) {
    const { t } = useTranslation();

    return (
        <Link
            href={service.url}
            className="group flex flex-col rounded-3xl bg-white p-4 shadow-md shadow-maha-900/5 transition-transform hover:-translate-y-1"
        >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-maha-200">
                {service.images?.[0] && (
                    <img
                        src={service.images[0]}
                        alt={tr(service.name, locale)}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                )}
                {service.is_featured && (
                    <span className="absolute left-3 top-3 rounded-full bg-[#718255] px-3 py-1 text-xs font-semibold text-white">
                        {t('dichvu.combos.bestseller')}
                    </span>
                )}
            </div>

            <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
                {service.category && (
                    <span className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-[#8C9A6B]">
                        {t(`services.category.${service.category}`, service.category)}
                    </span>
                )}
                <h3 className="font-serif text-2xl text-ink">{tr(service.name, locale)}</h3>
                <p className="mt-1 font-bold text-[#556B3F]">
                    {service.duration} {t('blocks.menu.minute')} · {formatVND(service.price)}
                </p>
                {service.ingredients.length > 0 ? (
                    <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink/75">
                        {service.ingredients.map((item) => (
                            <li key={item}>• {item}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="mt-4 text-sm leading-relaxed text-ink/75">{tr(service.description, locale)}</p>
                )}
                <hr className="my-5 border-maha-200" />
                <div className="mt-auto flex items-center justify-between font-semibold text-ink">
                    {t('blocks.menu.book')}
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-maha-50 transition-transform group-hover:translate-x-1">
                        <ChevronRight className="h-5 w-5" />
                    </span>
                </div>
            </div>
        </Link>
    );
}
