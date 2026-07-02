import { Link, router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import PublicLayout from '@/Layouts/PublicLayout';
import { Seo } from '@/Components/Seo';
import { useLocale } from '@/Hooks/useLocale';
import { formatVND, tr } from '@/Lib/utils';
import { itemListSchema } from '@/Lib/buildSchema';

interface ServiceItem {
    id: number;
    slug: string;
    name: string | Record<string, string>;
    description: string | Record<string, string>;
    category: string;
    duration: number;
    price: number;
    is_featured: boolean;
    branches: string[];
}

interface Props {
    filters: { category?: string; branch?: string };
    services: ServiceItem[];
    branches: { slug: string; name: string | Record<string, string> }[];
}

const CATEGORY_KEYS = ['', 'massage', 'facial', 'head-spa', 'foot-spa', 'combo'] as const;

export default function ServicesIndex({ filters, services, branches }: Props) {
    const locale = useLocale();
    const { t } = useTranslation();

    const apply = (key: string, value: string) => {
        const params: Record<string, string> = { ...filters };
        if (value) params[key] = value;
        else delete params[key];
        router.get('/services', params, { preserveScroll: true });
    };

    return (
        <PublicLayout>
            <Seo
                title={t('nav.services')}
                description="Khám phá các dịch vụ massage, facial, head spa, foot spa tại Mầm Spa."
                schema={itemListSchema(services.map(s => ({
                    name: tr(s.name, locale),
                    url: window.location.origin + '/services/' + s.slug,
                })))}
            />
            <section className="bg-maha-50 py-12">
                <div className="mx-auto max-w-7xl px-4">
                    <h1 className="font-serif text-4xl text-maha-700">{t('nav.services')}</h1>
                    <div className="mt-6 flex flex-wrap gap-2">
                        {CATEGORY_KEYS.map((cat) => (
                            <button key={cat || 'all'}
                                onClick={() => apply('category', cat)}
                                className={`rounded-full border px-4 py-1.5 text-sm ${
                                    (filters.category ?? '') === cat
                                        ? 'border-maha-700 bg-maha-700 text-white'
                                        : 'border-maha-200 bg-white text-maha-700'
                                }`}>
                                {cat ? t(`services.category.${cat}`) : t('services.category.all')}
                            </button>
                        ))}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                        <button onClick={() => apply('branch', '')}
                            className={`text-sm ${!filters.branch ? 'font-bold text-maha-700' : 'text-gray-500'}`}>
                            {t('services.allBranches')}
                        </button>
                        {branches.map((b) => (
                            <button key={b.slug} onClick={() => apply('branch', b.slug)}
                                className={`text-sm ${filters.branch === b.slug ? 'font-bold text-maha-700' : 'text-gray-500'}`}>
                                {tr(b.name, locale)}
                            </button>
                        ))}
                    </div>
                </div>
            </section>
            <section className="py-12">
                <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-3">
                    {services.map((s) => (
                        <Link key={s.id} href={`/services/${s.slug}`}
                            className="overflow-hidden rounded-xl border border-maha-100 bg-white transition hover:shadow-lg">
                            <div className="aspect-[4/3] bg-maha-100" />
                            <div className="p-5">
                                <p className="text-xs uppercase tracking-wider text-maha-600">{s.category}</p>
                                <h3 className="mt-1 font-serif text-xl text-maha-700">{tr(s.name, locale)}</h3>
                                <p className="mt-2 line-clamp-2 text-sm text-gray-600">{tr(s.description, locale)}</p>
                                <div className="mt-3 flex items-center justify-between">
                                    <span className="text-sm text-gray-500">{s.duration} {t('common.minute')}</span>
                                    <span className="font-semibold text-maha-700">{formatVND(s.price)}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                    {services.length === 0 && (
                        <p className="col-span-3 py-12 text-center text-gray-500">{t('services.empty')}</p>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
