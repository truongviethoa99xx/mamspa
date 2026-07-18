import type { ReactNode } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import { publicAssetUrl } from '@/Lib/utils';
import { googleMapsSearchUrl } from '@/Lib/maps';
import { trackContactClick } from '@/Lib/analytics';
import type { SharedProps } from '@/types';

const DEFAULT_HOTLINE = '(+84) 965 80 6166';
const DEFAULT_EMAIL = 'info@mamspa.vn';
const DEFAULT_SOCIALS = [
    { label: 'Facebook', href: 'https://facebook.com/mahaSpa.danang' },
    { label: 'Instagram', href: 'https://instagram.com/mahaspa.danang' },
    { label: 'Zalo OA', href: 'https://zalo.me/0865806166' },
];

function SocialIcon({ label }: { label: string }) {
    const key = label.toLowerCase();

    if (key.includes('facebook')) {
        return (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.7c0-.9.3-1.6 1.7-1.6h1.5V3.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.6H7.8V13h2.7v8h3z" />
            </svg>
        );
    }
    if (key.includes('instagram')) {
        return (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
            </svg>
        );
    }
    if (key.includes('zalo')) {
        return (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
        );
    }
    if (key.includes('tiktok')) {
        return (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19.6 7.1a5 5 0 0 1-3.6-1.6v7.6a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1v2.9a2.7 2.7 0 1 0 1.9 2.6V2h2.8a5 5 0 0 0 3.6 4.3v2.8z" />
            </svg>
        );
    }
    if (key.includes('youtube')) {
        return (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M22 12s0-3.2-.4-4.7a2.9 2.9 0 0 0-2-2C17.9 5 12 5 12 5s-5.9 0-7.6.3a2.9 2.9 0 0 0-2 2C2 8.8 2 12 2 12s0 3.2.4 4.7a2.9 2.9 0 0 0 2 2C6.1 19 12 19 12 19s5.9 0 7.6-.3a2.9 2.9 0 0 0 2-2C22 15.2 22 12 22 12z" />
                <path d="M10 9.5v5l4.5-2.5z" fill="#0E1611" />
            </svg>
        );
    }

    return <ExternalLink className="h-3.5 w-3.5" />;
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
    return (
        <div>
            <h3 className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-maha-400">
                <span className="h-px w-4 bg-maha-500/60" aria-hidden="true" />
                {title}
            </h3>
            <ul className="mt-5 space-y-3">{children}</ul>
        </div>
    );
}

export function Footer() {
    const { t } = useTranslation();
    const { props } = usePage<SharedProps>();
    const site = props.site ?? {};
    const brandName = site.brand_name || 'Mầm Spa';
    const logoUrl = publicAssetUrl(site.logo_path);
    const tagline = site.tagline || t('footer.tagline');
    const description = t('footer.description');
    const hotline = site.hotline || DEFAULT_HOTLINE;
    const email = site.email || DEFAULT_EMAIL;
    const address = site.address;
    const openHours = site.open_hours;
    const socials = site.social_links && site.social_links.length > 0 ? site.social_links : DEFAULT_SOCIALS;
    const serviceLinks = (site.service_menu ?? []).slice(0, 6);
    const year = new Date().getFullYear();

    const exploreLinks = [
        { label: t('nav.about'), href: '/gioi-thieu/' },
        { label: t('nav.offers'), href: '/uu-dai/' },
        { label: t('nav.blog'), href: '/tin-tuc/' },
        { label: t('nav.experience'), href: '/trai-nghiem-khach-hang/' },
    ];

    return (
        <footer className="relative overflow-hidden bg-maha-900 text-maha-50">
            <div className="relative mx-auto max-w-7xl px-6 2xl:max-w-[1440px]">
                {/* CTA band */}
                <div className="flex flex-col gap-6 border-b border-white/10 py-9 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:py-11">
                    <h2 className="font-serif text-[28px] leading-tight sm:text-4xl">
                        {t('footer.ctaLine1')}
                        <br />
                        <em className="not-italic text-maha-400">{t('footer.ctaLine2')}</em>
                    </h2>
                    <a
                        href={`tel:${hotline.replace(/[^\d+]/g, '')}`}
                        onClick={() => trackContactClick('phone', 'footer_cta')}
                        className="flex h-16 items-center gap-3 rounded-full border border-maha-400/30 bg-maha-800 pl-4 pr-6 transition-colors hover:border-maha-400"
                    >
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-maha-400/15 text-maha-400">
                            <Phone className="h-4 w-4" />
                        </span>
                        <span>
                            <span className="block text-[10px] uppercase tracking-[0.18em] text-maha-300">
                                {t('footer.hotline')}
                            </span>
                            <span className="font-sans text-base font-semibold tracking-wide sm:text-lg">{hotline}</span>
                        </span>
                    </a>
                </div>

                {/* Columns */}
                <div className="grid gap-x-10 gap-y-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr] lg:gap-10">
                    <div>
                        <Link href="/" className="inline-block">
                            {logoUrl ? (
                                <img src={logoUrl} alt={brandName} className="h-12 w-auto object-contain" />
                            ) : (
                                <span className="font-serif text-2xl uppercase tracking-[0.2em] text-maha-50">{brandName}</span>
                            )}
                        </Link>
                        <p className="mt-2 font-serif text-base italic text-maha-400">{tagline}</p>
                        <p className="mt-5 max-w-[34ch] text-sm font-light leading-relaxed text-maha-50/65">{description}</p>

                        <ul className="mt-6 flex flex-wrap gap-2.5">
                            {socials.map((s) => (
                                <li key={s.label}>
                                    <a
                                        href={s.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={s.label}
                                        onClick={() => trackContactClick(s.label.toLowerCase(), 'footer_social')}
                                        className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-maha-300 transition-colors hover:border-maha-400 hover:text-maha-400"
                                    >
                                        <SocialIcon label={s.label} />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {serviceLinks.length > 0 && (
                        <FooterColumn title={t('footer.servicesTitle')}>
                            {serviceLinks.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="text-sm font-light text-maha-50/80 transition-colors hover:text-maha-400"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </FooterColumn>
                    )}

                    <FooterColumn title={t('footer.exploreTitle')}>
                        {exploreLinks.map((item) => (
                            <li key={item.href}>
                                <Link href={item.href} className="text-sm font-light text-maha-50/80 transition-colors hover:text-maha-400">
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </FooterColumn>

                    <FooterColumn title={t('footer.contact')}>
                        {address && (
                            <li className="flex items-start gap-3 text-sm font-light leading-relaxed text-maha-50/80">
                                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-maha-400" />
                                <span>{address}</span>
                            </li>
                        )}
                        <li className="flex items-start gap-3 text-sm font-light text-maha-50/80">
                            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-maha-400" />
                            <a
                                href={`mailto:${email}`}
                                onClick={() => trackContactClick('email', 'footer')}
                                className="transition-colors hover:text-maha-400"
                            >
                                {email}
                            </a>
                        </li>

                        {openHours && (
                            <li className="mt-2 border-t border-white/10 pt-4 text-sm font-light text-maha-50/80">
                                <span className="block text-xs uppercase tracking-[0.1em] text-maha-300">{t('footer.hours')}</span>
                                <span className="mt-1 block font-medium text-maha-50">{openHours}</span>
                            </li>
                        )}

                        {address && (
                            <li>
                                <a
                                    href={googleMapsSearchUrl(brandName, address)}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-1 inline-block text-sm font-light text-maha-400 underline underline-offset-4 transition-colors hover:text-maha-300"
                                >
                                    {t('footer.viewMap')}
                                </a>
                            </li>
                        )}
                    </FooterColumn>
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col items-center gap-3 border-t border-white/10 py-6 text-center text-xs text-maha-50/45 sm:flex-row sm:justify-between sm:text-left">
                    <p>{t('footer.rights', { year })}</p>
                    <nav className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 sm:justify-end">
                        <Link href="/chinh-sach/" className="transition-colors hover:text-maha-400">
                            {t('footer.privacy')}
                        </Link>
                        <span>•</span>
                        <Link href="/chinh-sach/" className="transition-colors hover:text-maha-400">
                            {t('footer.terms')}
                        </Link>
                        <span>•</span>
                        <Link href="/chinh-sach/" className="transition-colors hover:text-maha-400">
                            {t('footer.support')}
                        </Link>
                        <span>•</span>
                        <Link href="/luu-y-dich-vu/" className="transition-colors hover:text-maha-400">
                            {t('footer.guidelines')}
                        </Link>
                    </nav>
                </div>
            </div>
        </footer>
    );
}
