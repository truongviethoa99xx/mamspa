import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import PublicLayout from '@/Layouts/PublicLayout';
import { Seo } from '@/Components/Seo';
import { ServiceCard, type ServiceCardData } from '@/Components/ServiceCard';
import { breadcrumbSchema } from '@/Lib/buildSchema';
import { useLocale } from '@/Hooks/useLocale';
import { tr } from '@/Lib/utils';

interface BreadcrumbEntry {
    slug?: string;
    name: Record<string, string> | string;
    url: string;
}

interface CategoryDetail {
    slug: string;
    name: Record<string, string> | string;
    description?: Record<string, string> | string | null;
    image?: string | null;
    url: string;
}

interface Props {
    category: CategoryDetail;
    breadcrumb: BreadcrumbEntry[];
    services: ServiceCardData[];
}

export default function DichVuCategory({ category, breadcrumb, services }: Props) {
    const { t } = useTranslation();
    const locale = useLocale();
    const name = tr(category.name, locale);
    const description = tr(category.description, locale);

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
            <Seo title={`${name} | Mầm Spa`} description={description} image={category.image ?? undefined} schema={schema} />

            <section className="bg-maha-50 py-12 md:py-16">
                <div className="mx-auto max-w-5xl px-5 sm:px-6">
                    <div className="grid gap-10 lg:grid-cols-[0.95fr_1fr] lg:items-center lg:gap-12">
                        <div>
                            <nav className="flex flex-wrap items-center gap-2.5 text-sm font-semibold text-[#556B3F] md:text-base">
                                <Link href="/" className="transition-colors hover:text-ink">
                                    {t('nav.home')}
                                </Link>
                                <span className="text-[#8C9A6B]">/</span>
                                <Link href="/dich-vu/" className="transition-colors hover:text-ink">
                                    {t('nav.services')}
                                </Link>
                                {breadcrumb.map((item) => (
                                    <span key={item.url} className="flex items-center gap-2.5">
                                        <span className="text-[#8C9A6B]">/</span>
                                        <Link href={item.url} className="transition-colors hover:text-ink">
                                            {tr(item.name, locale)}
                                        </Link>
                                    </span>
                                ))}
                                <span className="text-[#8C9A6B]">/</span>
                                <span className="font-medium text-[#475934]">{name}</span>
                            </nav>

                            <h1 className="mt-8 font-serif text-4xl uppercase leading-snug tracking-wide text-ink sm:text-5xl sm:leading-snug md:text-6xl md:leading-snug">{name}</h1>
                            {description && (
                                <p className="mt-5 w-[90%] text-base leading-relaxed text-[#556B3F] md:text-lg">
                                    {description}
                                </p>
                            )}

                            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                                <Link
                                    href="/dat-lich/"
                                    className="inline-flex min-w-44 items-center justify-center rounded-full bg-ink px-8 py-3.5 font-serif text-sm font-semibold tracking-wide text-maha-50 transition-colors hover:bg-[#243023]"
                                >
                                    {t('common.bookNow')}
                                </Link>
                                <Link
                                    href="/lien-he/"
                                    className="inline-flex min-w-44 items-center justify-center rounded-full border-2 border-ink px-8 py-3.5 font-serif text-sm font-semibold tracking-wide text-ink transition-colors hover:bg-ink hover:text-maha-50"
                                >
                                    {t('dichvu.detail.consult')}
                                </Link>
                            </div>
                        </div>

                        <div className="relative mx-auto w-full max-w-md pb-8 pr-8 pt-7 lg:max-w-lg">
                            <div className="absolute right-0 top-0 h-[88%] w-[90%] rounded-[1.65rem] border-2 border-[#8C9A6B]" />
                            <div className="relative aspect-[4/4.86] w-[93%] overflow-hidden rounded-[1.45rem] bg-[#CDBCA3]">
                                {category.image && <img src={category.image} alt={name} className="h-full w-full object-cover" />}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-maha-50 pb-16 md:pb-24">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 2xl:max-w-[1440px]">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {services.map((s) => (
                            <ServiceCard key={s.id} service={s} locale={locale} href={`/dat-lich/?service=${s.slug}`} />
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
