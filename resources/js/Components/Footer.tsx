import { Link, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Mail } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { tr } from '@/Lib/utils';
import type { FooterBranch, SharedProps } from '@/types';

const DEFAULT_HOTLINE = '(+84) 965 80 6166';
const DEFAULT_EMAIL = 'info@mamspa.vn';
const DEFAULT_SOCIALS = [
    { label: 'Facebook', href: 'https://facebook.com/mahaSpa.danang' },
    { label: 'Instagram', href: 'https://instagram.com/mahaspa.danang' },
    { label: 'Zalo OA', href: 'https://zalo.me/0865806166' },
];

function mapUrl(branch: FooterBranch): string {
    const query = branch.lat && branch.lng ? `${branch.lat},${branch.lng}` : branch.address;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function Footer() {
    const { t } = useTranslation();
    const locale = useLocale();
    const { props } = usePage<SharedProps>();
    const branches = props.branches ?? [];
    const site = props.site ?? {};
    const brandName = site.brand_name || 'Mầm Spa';
    const tagline = site.tagline || 'Rooted in Vietnamese Healing Traditions';
    const hotline = site.hotline || DEFAULT_HOTLINE;
    const email = site.email || DEFAULT_EMAIL;
    const socials = site.social_links && site.social_links.length > 0 ? site.social_links : DEFAULT_SOCIALS;
    const year = new Date().getFullYear();

    return (
        <footer className="bg-[#2d3327] text-maha-100">
            <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1fr_1.5fr] lg:gap-16 2xl:max-w-[1440px]">
                {/* Brand + contact */}
                <div>
                    <Link href="/" className="inline-block">
                        <p className="font-serif text-3xl uppercase tracking-[0.12em] text-maha-50">{brandName}</p>
                        <p className="mt-1 font-serif text-sm italic text-maha-100/60">
                            {tagline}
                        </p>
                    </Link>

                    <div className="mt-12">
                        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#9aa87f]">
                            {t('footer.hotline')}
                        </p>
                        <a
                            href={`tel:${hotline.replace(/[^\d+]/g, '')}`}
                            className="mt-2 block font-serif text-4xl tracking-wide text-maha-50 transition-opacity hover:opacity-80"
                        >
                            {hotline}
                        </a>
                        <a
                            href={`mailto:${email}`}
                            className="mt-3 inline-flex items-center gap-2 text-maha-100/80 transition-colors hover:text-maha-50"
                        >
                            <Mail className="h-4 w-4" />
                            {email}
                        </a>
                    </div>

                    <ul className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm">
                        {socials.map((s, i) => (
                            <li key={s.label} className="flex items-center gap-2">
                                {i > 0 && <span className="text-[#9aa87f]">•</span>}
                                <a
                                    href={s.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="font-medium text-maha-100 transition-colors hover:text-maha-50"
                                >
                                    {s.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Branch cards */}
                <div className="grid gap-6 sm:grid-cols-2">
                    {branches.map((b) => (
                        <div key={b.slug} className="flex flex-col rounded-3xl bg-maha-50 p-7 text-ink">
                            <h3 className="font-serif text-xl text-ink">{tr(b.name, locale)}</h3>
                            <hr className="my-4 border-maha-200" />

                            <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#6e7a51]">
                                {t('footer.address')}
                            </p>
                            <p className="mt-1.5 text-sm leading-relaxed text-ink/80">{b.address}</p>

                            <p className="mt-5 text-xs font-bold uppercase tracking-[0.1em] text-[#6e7a51]">
                                {t('footer.hours')}
                            </p>
                            <p className="mt-1.5 text-sm text-ink/80">
                                <span className="font-bold text-ink">{b.open_hours}</span>{' '}
                                <span className="italic text-ink/50">{t('footer.holiday')}</span>
                            </p>

                            <a
                                href={mapUrl(b)}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-6 block rounded-full border border-ink py-3 text-center text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-maha-50"
                            >
                                {t('footer.viewMap')}
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/10">
                <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-sm text-maha-100/60 sm:flex-row sm:items-center sm:justify-between 2xl:max-w-[1440px]">
                    <p>{t('footer.rights', { year })}</p>
                    <nav className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <Link href="/chinh-sach" className="transition-colors hover:text-maha-50">
                            {t('footer.privacy')}
                        </Link>
                        <span>•</span>
                        <Link href="/chinh-sach" className="transition-colors hover:text-maha-50">
                            {t('footer.terms')}
                        </Link>
                        <span>•</span>
                        <Link href="/chinh-sach" className="transition-colors hover:text-maha-50">
                            {t('footer.support')}
                        </Link>
                        <span>•</span>
                        <Link href="/luu-y-dich-vu" className="transition-colors hover:text-maha-50">
                            {t('footer.guidelines', 'Lưu ý dịch vụ')}
                        </Link>
                    </nav>
                </div>
            </div>
        </footer>
    );
}
