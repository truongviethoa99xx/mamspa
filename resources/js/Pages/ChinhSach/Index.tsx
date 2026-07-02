import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Seo } from '@/Components/Seo';
import { useLocale } from '@/Hooks/useLocale';
import { tr } from '@/Lib/utils';

interface PolicyPageSummary {
    slug: string;
    name: Record<string, string> | string;
}

interface ChinhSachIndexProps {
    pages: PolicyPageSummary[];
}

export default function ChinhSachIndex({ pages }: ChinhSachIndexProps) {
    const locale = useLocale();
    const { t } = useTranslation();

    return (
        <PublicLayout>
            <Seo title={t('policy.pageTitle', 'Chính sách')} />

            <section className="bg-maha-50">
                <div className="mx-auto max-w-5xl px-4 py-16 md:py-24">
                    <header className="mx-auto max-w-2xl text-center">
                        <p className="font-serif text-lg italic text-[#556B3F]">
                            {t('policy.eyebrow', 'Minh bạch & rõ ràng')}
                        </p>
                        <h1 className="mt-2 font-serif text-4xl tracking-wide text-heading md:text-5xl">
                            {t('policy.pageTitle', 'Chính sách')}
                        </h1>
                        <span className="mx-auto mt-5 block h-px w-20 bg-[#556B3F]/60" />
                        <p className="mt-6 text-base leading-relaxed text-ink/65">
                            {t(
                                'policy.pageDescription',
                                'Toàn bộ điều khoản, quy định và cam kết của Mầm Spa dành cho khách hàng.',
                            )}
                        </p>
                    </header>

                    {pages.length > 0 ? (
                        <div className="mt-14 grid gap-6 sm:grid-cols-2">
                            {pages.map((page, index) => (
                                <PolicyCard
                                    key={page.slug}
                                    page={page}
                                    locale={locale}
                                    index={index}
                                    readMore={t('policy.readMore', 'Xem chi tiết')}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="py-16 text-center font-serif text-lg text-maha-600">
                            {t('policy.empty', 'Chưa có nội dung.')}
                        </p>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}

interface PolicyCardProps {
    page: PolicyPageSummary;
    locale: string;
    index: number;
    readMore: string;
}

function PolicyCard({ page, locale, index, readMore }: PolicyCardProps) {
    return (
        <Link
            href={`/chinh-sach/${page.slug}`}
            className="group relative flex flex-col gap-6 overflow-hidden rounded-3xl border border-maha-100 bg-white p-7 shadow-sm shadow-maha-900/[0.03] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-maha-900/10 md:p-8"
        >
            <span
                aria-hidden
                className="pointer-events-none absolute -right-6 -top-6 font-serif text-8xl font-medium text-maha-100 transition-colors duration-300 group-hover:text-maha-200"
            >
                {String(index + 1).padStart(2, '0')}
            </span>

            <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-maha-50 transition-colors duration-300 group-hover:bg-[#556B3F]">
                <ShieldCheck className="h-5 w-5" />
            </span>

            <div className="relative flex flex-1 flex-col">
                <h2 className="font-serif text-2xl leading-snug text-heading">{tr(page.name, locale)}</h2>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold tracking-wide text-ink/70 transition-colors group-hover:text-[#556B3F]">
                    {readMore}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
            </div>
        </Link>
    );
}
