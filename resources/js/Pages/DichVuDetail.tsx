import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { Check, ChevronRight, Clock3, Minus, Plus, Sparkles, Tag } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PublicLayout from '@/Layouts/PublicLayout';
import { Seo } from '@/Components/Seo';
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/Lib/buildSchema';
import { useLocale } from '@/Hooks/useLocale';
import { formatVND, tr } from '@/Lib/utils';

interface ServiceStep {
    name: Record<string, string> | string;
    description?: Record<string, string> | string;
    duration?: number | string | null;
    image?: string | null;
}

interface ServiceBenefit {
    title: Record<string, string> | string;
    description?: Record<string, string> | string;
}

interface ExperienceImage {
    image: string;
    alt?: string;
}

interface Service {
    id: number;
    slug: string;
    name: Record<string, string> | string;
    description: Record<string, string> | string;
    category: string;
    duration: number;
    price: number;
    is_featured: boolean;
    ingredients: string[];
    steps?: ServiceStep[];
    benefits?: ServiceBenefit[];
    experience_images?: ExperienceImage[];
    images?: string[];
    branches: string[];
}

interface Faq {
    question: string;
    answer: string;
}

interface ServicePageContent {
    happy_hours_title: string | null;
    happy_hours_desc: string | null;
    benefits: string[];
    ideal_for: string[];
    faqs: Faq[];
}

interface Props {
    service: Service;
    combos: Service[];
    related: Service[];
    content: ServicePageContent;
}

export default function DichVuDetail({ service, combos, related, content }: Props) {
    const { t } = useTranslation();
    const locale = useLocale();
    const [openFaq, setOpenFaq] = useState(0);

    const benefits = content.benefits ?? [];
    const idealFor = content.ideal_for ?? [];
    const faqs = content.faqs ?? [];

    const name = tr(service.name, locale);
    const description = tr(service.description, locale);
    const bookHref = `/dat-lich/?service=${service.slug}`;
    const heroImage = service.images?.[0];

    const serviceUrl = `${window.location.origin}/dich-vu/${service.slug}`;
    const schema = [
        serviceSchema({
            name,
            description,
            url: serviceUrl,
            price: service.price,
            duration: service.duration,
            category: service.category,
            image: heroImage,
        }),
        breadcrumbSchema([
            { name: t('nav.home'), url: window.location.origin },
            { name: t('nav.services'), url: window.location.origin + '/dich-vu/' },
            { name, url: serviceUrl },
        ]),
        ...(faqs.length > 0 ? [faqSchema(faqs)] : []),
    ];

    return (
        <PublicLayout>
            <Seo title={`${name} | Mầm Spa`} description={description} image={heroImage} schema={schema} />

            <section className="bg-maha-50 py-12 md:py-16">
                <div className="mx-auto max-w-5xl px-5 sm:px-6">
                    <div className="grid gap-10 lg:grid-cols-[0.95fr_1fr] lg:items-center lg:gap-12">
                        <div>
                            <nav className="flex flex-wrap items-center gap-2.5 text-sm font-semibold text-[#556B3F]">
                                <Link href="/" className="transition-colors hover:text-ink">
                                    {t('nav.home')}
                                </Link>
                                <span className="text-[#8C9A6B]">/</span>
                                <Link href="/dich-vu/" className="transition-colors hover:text-ink">
                                    {t('nav.services')}
                                </Link>
                                <span className="text-[#8C9A6B]">/</span>
                                <span className="font-medium text-[#475934]">{name}</span>
                            </nav>

                            <h1 className="mt-8 font-serif text-4xl uppercase tracking-wide text-ink md:text-5xl">{name}</h1>
                            <p className="mt-4 font-serif text-xl italic leading-relaxed text-[#475934] md:text-2xl">
                                {description}
                            </p>

                            {service.ingredients.length > 0 && (
                                <ul className="mt-7 flex flex-wrap gap-2">
                                    {service.ingredients.map((ing) => (
                                        <li
                                            key={ing}
                                            className="rounded-full border border-maha-200 bg-white px-4 py-1.5 text-sm text-[#475934]"
                                        >
                                            {ing}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            <div className="mt-9 grid max-w-lg grid-cols-2 overflow-hidden rounded-2xl border border-maha-100 bg-white shadow-sm shadow-maha-900/5">
                                <div className="flex items-center gap-3 px-5 py-4">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#8C9A6B] text-[#8C9A6B]">
                                        <Clock3 className="h-5 w-5" />
                                    </span>
                                    <strong className="font-serif text-xl text-ink">
                                        {service.duration} {t('blocks.menu.minute')}
                                    </strong>
                                </div>
                                <div className="flex items-center gap-3 border-l border-maha-100 px-5 py-4">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#8C9A6B] text-[#8C9A6B]">
                                        <Tag className="h-5 w-5" />
                                    </span>
                                    <strong className="font-serif text-xl text-ink">{formatVND(service.price)}</strong>
                                </div>
                            </div>

                            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                                <Link
                                    href={bookHref}
                                    className="inline-flex min-w-44 items-center justify-center rounded-full bg-ink px-8 py-3.5 font-serif text-sm font-semibold tracking-wide text-maha-50 transition-colors hover:bg-[#243023]"
                                >
                                    {t('common.bookNow')}
                                </Link>
                                <Link
                                    href="/contact/"
                                    className="inline-flex min-w-44 items-center justify-center rounded-full border-2 border-ink px-8 py-3.5 font-serif text-sm font-semibold tracking-wide text-ink transition-colors hover:bg-ink hover:text-maha-50"
                                >
                                    {t('dichvu.detail.consult')}
                                </Link>
                            </div>
                        </div>

                        <div className="relative mx-auto w-full max-w-md pb-8 pr-8 pt-7 lg:max-w-lg">
                            <div className="absolute right-0 top-0 h-[88%] w-[90%] rounded-[1.65rem] border-2 border-[#8C9A6B]" />
                            <div className="relative aspect-[4/4.86] w-[93%] overflow-hidden rounded-[1.45rem] bg-[#CDBCA3]">
                                {heroImage && <img src={heroImage} alt={name} className="h-full w-full object-cover" />}
                            </div>
                            {service.is_featured && (
                                <div className="absolute bottom-12 right-0 flex items-center gap-2.5 rounded-full bg-white px-6 py-3 font-serif text-sm font-bold text-ink shadow-sm">
                                    <span className="h-3 w-3 rounded-full bg-[#8C9A6B]" />
                                    {t('dichvu.combos.bestseller')}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-maha-50 pb-12 md:pb-16">
                <div className="mx-auto max-w-5xl px-5 sm:px-6">
                    <div className="rounded-3xl bg-ink p-1.5 shadow-sm shadow-maha-900/10">
                        <div className="flex flex-col gap-5 rounded-[1.25rem] border border-[#556B3F] px-6 py-5 sm:px-8 md:flex-row md:items-center md:justify-between">
                            <div className="flex items-start gap-5">
                                <Sparkles className="mt-1 h-8 w-8 shrink-0 text-[#8C9A6B]" />
                                <div>
                                    <h2 className="font-serif text-xl font-bold uppercase tracking-wide text-[#8C9A6B] md:text-2xl">
                                        {content.happy_hours_title || 'Happy Hours - Ưu đãi đặc quyền'}
                                    </h2>
                                    <p className="mt-1 text-base leading-relaxed text-maha-50 md:text-lg">
                                        {content.happy_hours_desc ||
                                            'Thư giãn thảnh thơi, giảm ngay ...% tổng hóa đơn cho mọi lịch hẹn hoàn tất trước 19:00.'}
                                    </p>
                                </div>
                            </div>

                            <Link
                                href={bookHref}
                                className="inline-flex shrink-0 items-center justify-center rounded-full bg-maha-50 px-8 py-3.5 font-serif text-base font-bold text-ink transition-colors hover:bg-white"
                            >
                                {t('dichvu.detail.getOffer')}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {(service.steps ?? []).filter((s) => tr(s.name, locale)).length > 0 && (
                <section className="bg-maha-50 pb-12 md:pb-16">
                    <div className="mx-auto max-w-3xl px-5 sm:px-6">
                        <p className="text-center font-serif text-sm italic text-[#556B3F] md:text-base">
                            {t('dichvu.detail.stepsEyebrow', 'Trải nghiệm từng bước')}
                        </p>
                        <h2 className="mt-1.5 text-center font-serif text-2xl uppercase tracking-wide text-ink md:text-3xl">
                            {t('dichvu.detail.stepsTitle', 'Quy trình liệu trình')}
                        </h2>
                        <ol className="mt-8 space-y-4 md:mt-12">
                            {(service.steps ?? [])
                                .filter((s) => tr(s.name, locale))
                                .map((step, i) => (
                                    <li
                                        key={i}
                                        className="flex gap-5 rounded-2xl border border-maha-100 bg-white p-5 shadow-sm shadow-maha-900/5 md:p-6"
                                    >
                                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink font-serif text-lg font-bold text-maha-50">
                                            {i + 1}
                                        </span>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                                                <h3 className="font-serif text-lg font-bold text-ink md:text-xl">
                                                    {tr(step.name, locale)}
                                                </h3>
                                                {step.duration ? (
                                                    <span className="shrink-0 text-sm font-medium text-[#8C9A6B]">
                                                        {step.duration} {t('common.minute', 'phút')}
                                                    </span>
                                                ) : null}
                                            </div>
                                            {tr(step.description, locale) && (
                                                <p className="mt-2 text-sm leading-relaxed text-ink/75 md:text-base">
                                                    {tr(step.description, locale)}
                                                </p>
                                            )}
                                        </div>
                                        {step.image && (
                                            <img
                                                src={step.image}
                                                alt={tr(step.name, locale)}
                                                loading="lazy"
                                                className="h-20 w-20 shrink-0 rounded-xl object-cover sm:h-24 sm:w-24"
                                            />
                                        )}
                                    </li>
                                ))}
                        </ol>
                    </div>
                </section>
            )}

            {(service.benefits ?? []).filter((b) => tr(b.title, locale)).length > 0 && (
                <section className="bg-maha-50 pb-12 md:pb-16">
                    <div className="mx-auto max-w-4xl px-5 sm:px-6">
                        <p className="text-center font-serif text-sm italic text-[#556B3F] md:text-base">
                            {t('dichvu.detail.benefitsEyebrow')}
                        </p>
                        <h2 className="mt-1.5 text-center font-serif text-2xl uppercase tracking-wide text-ink md:text-3xl">
                            {t('dichvu.detail.benefitsHeading')}
                        </h2>
                        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:mt-12">
                            {(service.benefits ?? [])
                                .filter((b) => tr(b.title, locale))
                                .map((b, i) => (
                                    <div
                                        key={i}
                                        className="rounded-2xl border border-maha-100 bg-white p-5 shadow-sm shadow-maha-900/5 md:p-6"
                                    >
                                        <h3 className="font-serif text-lg font-bold text-ink">{tr(b.title, locale)}</h3>
                                        {tr(b.description, locale) && (
                                            <p className="mt-2 text-sm leading-relaxed text-ink/75">
                                                {tr(b.description, locale)}
                                            </p>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </div>
                </section>
            )}

            {(service.experience_images ?? []).length > 0 && (
                <section className="bg-maha-50 pb-14 md:pb-20">
                    <div className="mx-auto max-w-6xl px-5 sm:px-6">
                        <p className="text-center font-serif text-sm italic text-[#556B3F] md:text-base">
                            {t('dichvu.detail.experienceEyebrow', 'Khoảnh khắc tại Mầm Spa')}
                        </p>
                        <h2 className="mt-1.5 text-center font-serif text-2xl uppercase tracking-wide text-ink md:text-3xl">
                            {t('dichvu.detail.experienceTitle', 'Hình ảnh trải nghiệm khách hàng')}
                        </h2>
                        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:mt-12 lg:grid-cols-4">
                            {(service.experience_images ?? []).map((img, i) => (
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

            {combos.length > 0 && (
                <section className="bg-maha-50 pb-14 md:pb-20">
                    <div className="mx-auto max-w-5xl px-5 sm:px-6">
                        <p className="text-center font-serif text-sm italic text-[#556B3F]">{t('dichvu.combos.eyebrow')}</p>
                        <h2 className="mt-1.5 text-center font-serif text-2xl uppercase tracking-wide text-ink md:text-3xl">
                            {t('dichvu.combos.title')}
                        </h2>
                        <span className="mx-auto mt-3 block h-px w-14 bg-[#556B3F]" />

                        <div className="mt-8 grid gap-6 md:grid-cols-3 md:gap-7">
                            {combos.map((item) => (
                                <Link
                                    key={item.id}
                                    href={`/dich-vu/${item.slug}/`}
                                    className="group flex flex-col rounded-2xl border border-maha-100 bg-white p-4 shadow-sm shadow-maha-900/5 transition-transform hover:-translate-y-1"
                                >
                                    <div className="relative aspect-[16/9.6] overflow-hidden rounded-xl bg-[#CDBCA3]">
                                        {item.images?.[0] && <img src={item.images[0]} alt={tr(item.name, locale)} className="h-full w-full object-cover transition-transform group-hover:scale-105" />}
                                        {item.is_featured && (
                                            <span className="absolute left-3 top-3 rounded-full bg-[#8C9A6B] px-3 py-1 text-xs font-semibold text-white">
                                                {t('dichvu.combos.bestseller')}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex flex-1 flex-col px-1 pt-6">
                                        <h3 className="font-serif text-xl font-bold text-ink">{tr(item.name, locale)}</h3>
                                        <p className="mt-2 font-bold text-[#8C9A6B]">
                                            {item.duration} {t('blocks.menu.minute')} · {formatVND(item.price)}
                                        </p>
                                        <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#475934]">
                                            {tr(item.description, locale)}
                                        </p>
                                        <hr className="my-6 border-maha-100" />
                                        <div className="mt-auto flex items-center justify-between font-serif text-base font-bold text-ink">
                                            {t('blocks.menu.book')}
                                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-maha-50 transition-transform group-hover:translate-x-1">
                                                <ChevronRight className="h-5 w-5" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {(benefits.length > 0 || idealFor.length > 0) && (
                <section className="bg-maha-50 pb-14 md:pb-20">
                    <div className="mx-auto max-w-5xl px-5 sm:px-6">
                        <p className="text-center font-serif text-sm italic text-[#556B3F]">
                            {t('dichvu.detail.benefitsEyebrow')}
                        </p>
                        <h2 className="mt-1.5 text-center font-serif text-2xl uppercase tracking-wide text-ink md:text-3xl">
                            {t('dichvu.detail.benefitsTitle')}
                        </h2>
                        <span className="mx-auto mt-3 block h-px w-14 bg-[#556B3F]" />

                        <div className="mt-8 grid gap-7 md:grid-cols-2">
                            {benefits.length > 0 && (
                                <article className="rounded-2xl border border-maha-100 bg-white px-7 py-8 shadow-sm shadow-maha-900/5 md:px-9">
                                    <h3 className="font-serif text-2xl font-bold text-ink">{t('dichvu.detail.benefitsHeading')}</h3>
                                    <ul className="mt-7 space-y-6">
                                        {benefits.map((benefit) => (
                                            <li key={benefit} className="flex items-start gap-4 text-sm leading-7 text-[#475934] md:text-base">
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
                        <p className="text-center font-serif text-sm italic text-[#556B3F]">{t('dichvu.detail.faqEyebrow')}</p>
                        <h2 className="mt-1.5 text-center font-serif text-2xl uppercase tracking-wide text-ink md:text-3xl">
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

            {related.length > 0 && (
                <section className="bg-maha-50 pb-14 md:pb-20">
                    <div className="mx-auto max-w-5xl px-5 sm:px-6">
                        <p className="text-center font-serif text-sm italic text-[#556B3F]">{t('dichvu.detail.relatedEyebrow')}</p>
                        <h2 className="mt-1.5 text-center font-serif text-2xl uppercase tracking-wide text-ink md:text-3xl">
                            {t('dichvu.detail.relatedTitle')}
                        </h2>

                        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {related.map((item) => (
                                <Link
                                    key={item.id}
                                    href={`/dich-vu/${item.slug}/`}
                                    className="group flex flex-col rounded-2xl border border-maha-100 bg-white p-4 shadow-sm shadow-maha-900/5 transition-transform hover:-translate-y-1"
                                >
                                    <div className="aspect-[4/3] rounded-xl bg-[#CDBCA3]" />
                                    <div className="flex flex-1 flex-col px-1 pt-6">
                                        <h3 className="font-serif text-xl font-bold text-ink">{tr(item.name, locale)}</h3>
                                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#475934]">
                                            {tr(item.description, locale)}
                                        </p>
                                        <hr className="my-5 border-maha-100" />
                                        <div className="mt-auto flex items-center justify-between font-serif text-base font-bold text-ink">
                                            Khám phá
                                            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </PublicLayout>
    );
}
