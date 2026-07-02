import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { ChevronRight, ShieldCheck } from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Seo } from '@/Components/Seo';
import { useLocale } from '@/Hooks/useLocale';
import { tr } from '@/Lib/utils';
import { breadcrumbSchema } from '@/Lib/buildSchema';

interface PolicyPageSummary {
    slug: string;
    name: Record<string, string> | string;
}

interface PolicyPageDetail {
    slug: string;
    name: Record<string, string> | string;
    content: Record<string, string> | string;
    featured_image: string | null;
    updated_at: string | null;
}

interface ChinhSachShowProps {
    page: PolicyPageDetail;
    other: PolicyPageSummary[];
}

const DATE_LOCALES: Record<string, string> = {
    en: 'en-US',
    ja: 'ja-JP',
    ko: 'ko-KR',
    zh: 'zh-CN',
    vi: 'vi-VN',
};

function formatDate(value: string | null, locale: string): string | null {
    if (!value) return null;
    return new Date(value).toLocaleDateString(DATE_LOCALES[locale] ?? 'vi-VN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

const BODY_CLASS = [
    'max-w-none text-ink/75',
    '[&_p]:mt-5 [&_p]:leading-[1.85]',
    '[&_h2]:mt-12 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:leading-snug [&_h2]:text-heading md:[&_h2]:text-3xl',
    '[&_h3]:mt-9 [&_h3]:font-serif [&_h3]:text-xl [&_h3]:text-heading',
    '[&_a]:text-[#6b7a4f] [&_a]:underline [&_a]:underline-offset-2',
    '[&_strong]:text-ink [&_strong]:font-semibold',
    '[&_ul]:mt-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6',
    '[&_ol]:mt-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6',
    '[&_img]:mt-8 [&_img]:w-full [&_img]:rounded-2xl',
    '[&_blockquote]:my-8 [&_blockquote]:border-l-4 [&_blockquote]:border-[#6b7a4f] [&_blockquote]:pl-6 [&_blockquote]:font-serif [&_blockquote]:text-xl [&_blockquote]:italic [&_blockquote]:leading-relaxed [&_blockquote]:text-heading',
].join(' ');

export default function ChinhSachShow({ page, other }: ChinhSachShowProps) {
    const locale = useLocale();
    const { t } = useTranslation();

    const name = tr(page.name, locale);
    const contentHtml = tr(page.content, locale);
    const url = window.location.href;
    const updatedAt = formatDate(page.updated_at, locale);

    const schema = breadcrumbSchema([
        { name: 'Mầm Spa', url: window.location.origin },
        { name: t('policy.pageTitle', 'Chính sách'), url: window.location.origin + '/chinh-sach' },
        { name, url },
    ]);

    return (
        <PublicLayout>
            <Seo title={name} image={page.featured_image ?? undefined} schema={schema} />

            <div className="bg-maha-50">
                <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
                    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-maha-600">
                        <Link href="/" className="transition-colors hover:text-[#6b7a4f]">
                            {t('nav.home')}
                        </Link>
                        <span className="text-maha-300">/</span>
                        <Link href="/chinh-sach" className="transition-colors hover:text-[#6b7a4f]">
                            {t('policy.pageTitle', 'Chính sách')}
                        </Link>
                        <span className="text-maha-300">/</span>
                        <span className="truncate text-ink/50">{name}</span>
                    </nav>

                    <header className="mt-7 max-w-3xl">
                        <p className="font-serif text-sm italic text-[#6b7a4f]">
                            {t('policy.pageTitle', 'Chính sách')}
                        </p>
                        <h1 className="mt-2 font-serif text-4xl leading-[1.1] text-heading md:text-5xl">{name}</h1>
                        {updatedAt && (
                            <p className="mt-5 text-sm text-ink/50">
                                {t('policy.updatedAt', 'Cập nhật lần cuối: {{date}}', { date: updatedAt })}
                            </p>
                        )}
                    </header>

                    {page.featured_image && (
                        <div className="mt-8 aspect-[16/9] w-full overflow-hidden rounded-3xl bg-maha-200">
                            <img src={page.featured_image} alt={name} className="h-full w-full object-cover" />
                        </div>
                    )}

                    <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px]">
                        <article className={BODY_CLASS} dangerouslySetInnerHTML={{ __html: contentHtml }} />

                        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
                            {other.length > 0 && (
                                <section className="rounded-3xl border border-maha-100 bg-white p-7 shadow-sm">
                                    <h2 className="font-serif text-xl text-heading">
                                        {t('policy.otherPages', 'Chính sách khác')}
                                    </h2>
                                    <ul className="mt-5 space-y-1">
                                        {other.map((p) => (
                                            <li key={p.slug}>
                                                <Link
                                                    href={`/chinh-sach/${p.slug}`}
                                                    className="group flex items-center gap-3 rounded-xl px-3 py-3 -mx-3 transition-colors hover:bg-maha-50"
                                                >
                                                    <ShieldCheck className="h-4 w-4 shrink-0 text-[#6b7a4f]" />
                                                    <span className="flex-1 text-sm leading-snug text-ink/80 transition-colors group-hover:text-heading">
                                                        {tr(p.name, locale)}
                                                    </span>
                                                    <ChevronRight className="h-3.5 w-3.5 shrink-0 text-maha-300 transition-transform group-hover:translate-x-0.5" />
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}

                            <section className="rounded-3xl bg-ink px-7 py-8 text-center shadow-lg">
                                <p className="font-serif text-sm italic text-[#9aa97a]">
                                    {t('policy.ctaEyebrow', 'Cần hỗ trợ thêm?')}
                                </p>
                                <h3 className="mt-1 font-serif text-xl tracking-wide text-maha-50">
                                    {t('policy.ctaTitle', 'Liên hệ với chúng tôi')}
                                </h3>
                                <Link
                                    href="/contact"
                                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-maha-50 px-6 py-3 text-sm font-semibold tracking-wide text-ink transition-colors hover:bg-white"
                                >
                                    {t('policy.ctaButton', 'Liên hệ ngay')}
                                    <ChevronRight className="h-4 w-4" />
                                </Link>
                            </section>
                        </aside>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
