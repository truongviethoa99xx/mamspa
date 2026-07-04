import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { Check, Minus, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PublicLayout from '@/Layouts/PublicLayout';
import { Seo } from '@/Components/Seo';
import { ServiceCard, type ServiceCardData } from '@/Components/ServiceCard';
import { breadcrumbSchema, faqSchema } from '@/Lib/buildSchema';
import { useLocale } from '@/Hooks/useLocale';
import { tr } from '@/Lib/utils';

interface CategoryBenefit {
    title: Record<string, string> | string;
    description?: Record<string, string> | string;
}

interface ExperienceImage {
    image: string;
    alt?: string;
}

interface CategoryFaq {
    question: Record<string, string> | string;
    answer: Record<string, string> | string;
}

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
    benefits?: CategoryBenefit[];
    ideal_for?: string[];
    faqs?: CategoryFaq[];
    experience_images?: ExperienceImage[];
}

interface Props {
    category: CategoryDetail;
    breadcrumb: BreadcrumbEntry[];
    services: ServiceCardData[];
}

export default function DichVuCategory({ category, breadcrumb, services }: Props) {
    const { t } = useTranslation();
    const locale = useLocale();
    const [openFaq, setOpenFaq] = useState(0);

    const name = tr(category.name, locale);
    const description = tr(category.description, locale);

    const benefitPoints = (category.benefits ?? []).map((b) => tr(b.title, locale)).filter(Boolean);
    const idealFor = category.ideal_for ?? [];
    const faqs = (category.faqs ?? [])
        .filter((f) => tr(f.question, locale))
        .map((f) => ({ question: tr(f.question, locale), answer: tr(f.answer, locale) }));

    const schema = [
        breadcrumbSchema([
            { name: t('nav.home'), url: window.location.origin },
            { name: t('nav.services'), url: window.location.origin + '/dich-vu/' },
            ...breadcrumb.map((item) => ({ name: tr(item.name, locale), url: window.location.origin + item.url })),
            { name, url: window.location.origin + category.url },
        ]),
        ...(faqs.length > 0 ? [faqSchema(faqs)] : []),
    ];

    return (
        <PublicLayout>
            <Seo title={`${name} | Mầm Spa`} description={description} image={category.image ?? undefined} schema={schema} />

            <section className="bg-maha-50 py-12 md:py-16">
                <div className="mx-auto max-w-5xl px-5 sm:px-6">
                    <div className="grid gap-10 lg:grid-cols-[0.95fr_1fr] lg:items-center lg:gap-12">
                        <div>
                            <nav className="flex items-center gap-2.5 overflow-x-auto whitespace-nowrap text-sm font-semibold text-[#556B3F] md:text-base">
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

            <section className="bg-maha-50 pb-16 md:pb-20">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 2xl:max-w-[1440px]">
                    <p className="text-center font-serif text-base italic text-[#556B3F] md:text-lg">
                        {t('dichvu.category.servicesEyebrow')}
                    </p>
                    <h2 className="mt-1.5 text-center font-serif text-3xl uppercase tracking-wide text-ink sm:text-4xl md:text-5xl">
                        {t('dichvu.category.servicesTitle')}
                    </h2>
                    <span className="mx-auto mt-3 block h-px w-14 bg-[#556B3F]" />

                    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {services.map((s) => (
                            <ServiceCard key={s.id} service={s} locale={locale} href={`/dat-lich/?service=${s.slug}`} />
                        ))}
                        {services.length === 0 && (
                            <p className="col-span-full text-center text-ink/60">{t('dichvu.results.empty')}</p>
                        )}
                    </div>
                </div>
            </section>

            {(category.experience_images ?? []).length > 0 && (
                <section className="bg-maha-50 pb-14 md:pb-20">
                    <div className="mx-auto max-w-6xl px-5 sm:px-6">
                        <p className="text-center font-serif text-base italic text-[#556B3F] md:text-lg">
                            {t('dichvu.detail.experienceEyebrow', 'Khoảnh khắc tại Mầm Spa')}
                        </p>
                        <h2 className="mt-1.5 text-center font-serif text-3xl uppercase tracking-wide text-ink sm:text-4xl md:text-5xl">
                            {t('dichvu.detail.experienceTitle', 'Hình ảnh trải nghiệm khách hàng')}
                        </h2>
                        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:mt-12 lg:grid-cols-4">
                            {(category.experience_images ?? []).map((img, i) => (
                                <div key={i} className="aspect-square overflow-hidden rounded-2xl bg-maha-100">
                                    <img
                                        src={img.image}
                                        alt={img.alt || ''}
                                        loading="lazy"
                                        className="h-full w-full object-cover transition-transform hover:scale-105"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {(benefitPoints.length > 0 || idealFor.length > 0) && (
                <section className="bg-maha-50 pb-14 md:pb-20">
                    <div className="mx-auto max-w-5xl px-5 sm:px-6">
                        <p className="text-center font-serif text-base italic text-[#556B3F] md:text-lg">
                            {t('dichvu.detail.benefitsEyebrow')}
                        </p>
                        <h2 className="mt-1.5 text-center font-serif text-3xl uppercase tracking-wide text-ink sm:text-4xl md:text-5xl">
                            {t('dichvu.detail.benefitsTitle')}
                        </h2>
                        <span className="mx-auto mt-3 block h-px w-14 bg-[#556B3F]" />

                        <div className="mt-8 grid gap-7 md:grid-cols-2">
                            {benefitPoints.length > 0 && (
                                <article className="rounded-2xl border border-maha-100 bg-white px-7 py-8 shadow-sm shadow-maha-900/5 md:px-9">
                                    <h3 className="font-serif text-2xl font-bold text-ink">{t('dichvu.detail.benefitsHeading')}</h3>
                                    <ul className="mt-7 space-y-6">
                                        {benefitPoints.map((benefit, idx) => (
                                            <li key={idx} className="flex items-start gap-4 text-sm leading-7 text-[#475934] md:text-base">
                                                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-maha-50 text-[#8C9A6B]">
                                                    <Check className="h-4 w-4" />
                                                </span>
                                                <span>{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </article>
                            )}

                            {idealFor.length > 0 && (
                                <article className="rounded-2xl bg-ink px-7 py-8 shadow-sm shadow-maha-900/5 md:px-9">
                                    <h3 className="font-serif text-2xl font-bold text-maha-50">{t('dichvu.detail.idealHeading')}</h3>
                                    <ul className="mt-7 space-y-7">
                                        {idealFor.map((person) => (
                                            <li key={person} className="flex items-start gap-5 text-sm leading-7 text-maha-50/85 md:text-base">
                                                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#8C9A6B]" />
                                                <span>{person}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </article>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {faqs.length > 0 && (
                <section className="bg-maha-50 pb-14 md:pb-20">
                    <div className="mx-auto max-w-4xl px-5 sm:px-6">
                        <p className="text-center font-serif text-base italic text-[#556B3F] md:text-lg">{t('dichvu.detail.faqEyebrow')}</p>
                        <h2 className="mt-1.5 text-center font-serif text-3xl uppercase tracking-wide text-ink sm:text-4xl md:text-5xl">
                            {t('dichvu.detail.faqTitle')}
                        </h2>

                        <div className="mt-8 space-y-5">
                            {faqs.map((faq, index) => {
                                const isOpen = openFaq === index;

                                return (
                                    <button
                                        key={faq.question}
                                        type="button"
                                        onClick={() => setOpenFaq(isOpen ? -1 : index)}
                                        className={[
                                            'w-full rounded-2xl bg-white px-7 py-5 text-left shadow-sm shadow-maha-900/5 transition-colors',
                                            isOpen ? 'border-2 border-[#8C9A6B]' : 'border border-maha-100',
                                        ].join(' ')}
                                        aria-expanded={isOpen}
                                    >
                                        <div className="flex items-start justify-between gap-5">
                                            <h3 className="font-serif text-lg font-bold leading-relaxed text-ink">{faq.question}</h3>
                                            <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-maha-50 text-[#556B3F]">
                                                {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                                            </span>
                                        </div>

                                        {isOpen && (
                                            <p className="mt-5 text-sm leading-7 text-[#475934] md:text-base">{faq.answer}</p>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}
        </PublicLayout>
    );
}
