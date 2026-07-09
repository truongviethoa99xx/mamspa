import { Link, router, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronRight, LogOut, Menu, X } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { cn, publicAssetUrl, tr } from '@/Lib/utils';
import { useLocale } from '@/Hooks/useLocale';
import { trackContactClick } from '@/Lib/analytics';
import type { SharedProps } from '@/types';

interface MenuItem {
    href: string;
    label: string;
    children?: MenuItem[];
}

function NavDropdown({ label, items, href }: { label: string; items: MenuItem[]; href?: string }) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const triggerClass =
        'flex items-center gap-1.5 text-base font-medium tracking-wide text-maha-900 transition-colors hover:text-maha-600';
    const chevron = (
        <ChevronDown className={cn('h-4 w-4 transition-transform duration-200', open && 'rotate-180')} />
    );

    return (
        <div
            ref={ref}
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            {href ? (
                <Link href={href} className={triggerClass} aria-haspopup="true" aria-expanded={open}>
                    {label}
                    {chevron}
                </Link>
            ) : (
                <button
                    onClick={() => setOpen((v) => !v)}
                    className={triggerClass}
                    aria-haspopup="true"
                    aria-expanded={open}
                >
                    {label}
                    {chevron}
                </button>
            )}

            {open && (
                <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3">
                    <ul className="w-64 rounded-2xl border border-maha-100 bg-white p-2 shadow-xl shadow-maha-900/10">
                        {items.map((item) => {
                            const hasChildren = (item.children?.length ?? 0) > 0;

                            return (
                                <li key={item.href} className="group/item relative">
                                    <Link
                                        href={item.href}
                                        onClick={() => setOpen(false)}
                                        className="flex items-center justify-between rounded-xl px-5 py-3 font-serif text-[15px] text-[#475934] transition-colors group-hover/item:bg-maha-50 group-hover/item:font-bold group-hover/item:text-ink"
                                    >
                                        {item.label}
                                        <ChevronRight
                                            className={cn(
                                                'h-4 w-4 transition-opacity',
                                                hasChildren ? 'opacity-60' : 'opacity-0 group-hover/item:opacity-100',
                                            )}
                                        />
                                    </Link>

                                    {hasChildren && (
                                        <div className="invisible absolute left-full top-0 z-50 pl-2 opacity-0 transition-opacity group-hover/item:visible group-hover/item:opacity-100">
                                            <ul className="w-64 rounded-2xl border border-maha-100 bg-white p-2 shadow-xl shadow-maha-900/10">
                                                {item.children!.map((child) => (
                                                    <li key={child.href}>
                                                        <Link
                                                            href={child.href}
                                                            onClick={() => setOpen(false)}
                                                            className="group/child flex items-center justify-between rounded-xl px-5 py-3 font-serif text-[15px] text-[#475934] transition-colors hover:bg-maha-50 hover:font-bold hover:text-ink"
                                                        >
                                                            {child.label}
                                                            <ChevronRight className="h-4 w-4 opacity-0 transition-opacity group-hover/child:opacity-100" />
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
}

export function Navbar() {
    const { t } = useTranslation();
    const locale = useLocale();
    const { props } = usePage<SharedProps>();
    const [open, setOpen] = useState(false);
    const serviceMenu: MenuItem[] = props.site?.service_menu ?? [];
    const brandName = props.site?.brand_name || 'Mầm Spa';
    const logoUrl = publicAssetUrl(props.site?.logo_path) || '/images/logo.svg';

    const branchItems: MenuItem[] = (props.branches ?? []).map((b) => ({
        href: `/chi-nhanh/${b.slug}/`,
        label: tr(b.name, locale),
    }));

    return (
        <header className="relative z-40 w-full border-b border-maha-100 bg-maha-50/95 backdrop-blur">
            <nav className="mx-auto grid h-20 max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6 md:h-24 lg:h-[120px] 2xl:max-w-[1440px]">
                {/* Left navigation */}
                <ul className="hidden items-center gap-8 md:flex">
                    <li>
                        <Link
                            href="/gioi-thieu/"
                            className="text-base font-medium tracking-wide text-maha-900 transition-colors hover:text-maha-600"
                        >
                            {t('nav.about')}
                        </Link>
                    </li>
                    <li>
                        <NavDropdown label={t('nav.services')} items={serviceMenu} href="/dich-vu/" />
                    </li>
                    <li>
                        <Link
                            href="/lien-he/"
                            onClick={() => trackContactClick('nav_link', 'navbar')}
                            className="text-base font-medium tracking-wide text-maha-900 transition-colors hover:text-maha-600"
                        >
                            {t('nav.contact')}
                        </Link>
                    </li>
                </ul>

                {/* Center logo */}
                <Link href="/" className="flex items-center justify-center md:col-start-2">
                    <img
                        src={logoUrl}
                        alt={brandName}
                        width={120}
                        height={120}
                        className="h-16 w-16 object-contain md:h-20 md:w-20 lg:h-[112px] lg:w-[112px]"
                    />
                </Link>

                {/* Right actions */}
                <div className="hidden items-center justify-end gap-7 md:flex">
                    <NavDropdown label={t('footer.branches')} items={branchItems} />
                    <LanguageSwitcher />
                    {props.auth?.user ? (
                        <>
                            <Link
                                href="/my-bookings/"
                                className="rounded-lg bg-maha-900 px-6 py-3 text-sm font-semibold tracking-wide text-maha-50 transition-colors hover:bg-maha-800"
                            >
                                {t('nav.myBookings')}
                            </Link>
                            <button
                                onClick={() => router.post('/logout')}
                                className="flex items-center gap-1.5 text-sm font-medium tracking-wide text-maha-700 transition-colors hover:text-maha-900"
                                aria-label={t('nav.logout')}
                            >
                                <LogOut className="h-4 w-4" />
                                {t('nav.logout')}
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/my-bookings/"
                                className="text-sm font-medium tracking-wide text-maha-700 transition-colors hover:text-maha-900"
                            >
                                {t('nav.myBookings')}
                            </Link>
                            <Link
                                href="/dat-lich/"
                                className="rounded-lg bg-maha-900 px-6 py-3 text-sm font-semibold tracking-wide text-maha-50 transition-colors hover:bg-maha-800"
                            >
                                {t('common.bookNow')}
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile toggle */}
                <button
                    className="col-start-3 justify-self-end md:hidden"
                    onClick={() => setOpen(!open)}
                    aria-label={t('nav.toggleMenu')}
                >
                    {open ? <X /> : <Menu />}
                </button>
            </nav>

            {/* Mobile menu */}
            <div className={cn('border-t border-maha-100 bg-maha-50 md:hidden', open ? 'block' : 'hidden')}>
                <ul className="flex flex-col gap-1 px-6 py-4">
                    <li>
                        <Link href="/gioi-thieu/" className="block py-2 text-base text-maha-900">
                            {t('nav.about')}
                        </Link>
                    </li>
                    <li>
                        <Link href="/dich-vu/" className="block py-2 text-base text-maha-900">
                            {t('nav.services')}
                        </Link>
                    </li>
                    {serviceMenu.map((item) => (
                        <li key={item.href}>
                            <Link href={item.href} className="block py-2 pl-3 text-sm text-maha-800">
                                {item.label}
                            </Link>
                            {(item.children?.length ?? 0) > 0 && (
                                <ul>
                                    {item.children!.map((child) => (
                                        <li key={child.href}>
                                            <Link href={child.href} className="block py-1.5 pl-7 text-sm text-maha-700">
                                                {child.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                    <li>
                        <Link
                            href="/lien-he/"
                            onClick={() => trackContactClick('nav_link', 'navbar_mobile')}
                            className="block py-2 text-base text-maha-900"
                        >
                            {t('nav.contact')}
                        </Link>
                    </li>
                    <li className="pt-2 text-sm font-semibold uppercase tracking-wider text-maha-500">
                        {t('footer.branches')}
                    </li>
                    {branchItems.map((item) => (
                        <li key={item.href}>
                            <Link href={item.href} className="block py-2 pl-3 text-sm text-maha-800">
                                {item.label}
                            </Link>
                        </li>
                    ))}
                    {props.auth?.user ? (
                        <>
                            <li className="mt-3">
                                <Link
                                    href="/my-bookings/"
                                    className="block rounded-lg bg-maha-900 px-6 py-3 text-center text-sm font-semibold tracking-wide text-maha-50"
                                >
                                    {t('nav.myBookings')}
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={() => router.post('/logout')}
                                    className="flex w-full items-center justify-center gap-1.5 py-3 text-base text-maha-700"
                                >
                                    <LogOut className="h-4 w-4" />
                                    {t('nav.logout')}
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link href="/my-bookings/" className="block py-2 text-base text-maha-900">
                                    {t('nav.myBookings')}
                                </Link>
                            </li>
                            <li className="mt-3">
                                <Link
                                    href="/dat-lich/"
                                    className="block rounded-lg bg-maha-900 px-6 py-3 text-center text-sm font-semibold tracking-wide text-maha-50"
                                >
                                    {t('common.bookNow')}
                                </Link>
                            </li>
                        </>
                    )}
                    <li className="border-t border-maha-100 pt-3">
                        <LanguageSwitcher />
                    </li>
                </ul>
            </div>
        </header>
    );
}
