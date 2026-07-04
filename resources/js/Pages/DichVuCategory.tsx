import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import PublicLayout from '@/Layouts/PublicLayout';
import { Seo } from '@/Components/Seo';
import { ServiceCard, type ServiceCardData } from '@/Components/ServiceCard';
import { breadcrumbSchema } from '@/Lib/buildSchema';
import { useLocale } from '@/Hooks/useLocale';
import { tr } from '@/Lib/utils';

interface CategoryRef {
    slug: string;
    name: Record<string, string> | string;
    url: string;
}

interface CategoryDetail extends CategoryRef {
    is_root: boolean;
}

interface Props {
    category: CategoryDetail;
    breadcrumb: CategoryRef[];
    services: ServiceCardData[];
}

export default function DichVuCategory({ category, breadcrumb, services }: Props) {
    const { t } = useTranslation();
    const locale = useLocale();
    const name = tr(category.name, locale);

    const schema = [
        breadcrumbSchema([
            { name: t('nav.home'), url: window.location.origin },
            { name: t('nav.services'), url: window.location.origin + '/dich-vu/' },
            ...breadcrumb.map((item) => ({ name: tr(item.name, locale), url: window.location.origin + item.url })),
            { name, url: window.location.origin + category.url },
        ]),
    ];

    return (
        <PublicLayout>
            <Seo title={`${name} | Mầm Spa`} schema={schema} />

            <section className="bg-[#8C9A6B] py-16 md:py-20">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 2xl:max-w-[1440px]">
                    <nav className="flex flex-wrap items-center gap-2.5 text-sm font-semibold text-maha-50/85">
                        <Link href="/" className="transition-colors hover:text-maha-50">
                            {t('nav.home')}
                        </Link>
                        <span className="text-maha-50/50">/</span>
                        <Link href="/dich-vu/" className="transition-colors hover:text-maha-50">
                            {t('nav.services')}
                        </Link>
                        {breadcrumb.map((item) => (
                            <span key={item.slug} className="flex items-center gap-2.5">
                                <span className="text-maha-50/50">/</span>
                                <Link href={item.url} className="transition-colors hover:text-maha-50">
                                    {tr(item.name, locale)}
                                </Link>
                            </span>
                        ))}
                        <span className="text-maha-50/50">/</span>
                        <span className="font-medium text-maha-50">{name}</span>
                    </nav>

                    <h1 className="mt-5 font-serif text-4xl uppercase tracking-wide text-maha-50 sm:text-5xl md:text-6xl">
                        {name}
                    </h1>
                </div>
            </section>

            <section className="bg-maha-50 pb-16 pt-1 md:pb-24">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 2xl:max-w-[1440px]">
                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {services.map((s) => (
                            <ServiceCard key={s.id} service={s} locale={locale} />
                        ))}
                        {services.length === 0 && (
                            <p className="col-span-full text-center text-ink/60">{t('dichvu.results.empty')}</p>
                        )}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
