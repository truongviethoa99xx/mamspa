import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { cn } from '@/Lib/utils';
import type { SharedProps } from '@/types';

export function Navbar() {
    const { t } = useTranslation();
    const { props } = usePage<SharedProps>();
    const [open, setOpen] = useState(false);

    const links = [
        { href: '/', label: t('nav.home') },
        { href: '/services', label: t('nav.services') },
        { href: '/booking', label: t('nav.booking') },
        { href: '/promotions', label: t('nav.promotions') },
        { href: '/gallery', label: t('nav.gallery') },
        { href: '/blog', label: t('nav.blog') },
        { href: '/contact', label: t('nav.contact') },
    ];

    return (
        <header className="sticky top-0 z-40 w-full border-b border-maha-100 bg-white/90 backdrop-blur">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
                <Link href="/" className="font-serif text-2xl tracking-wide text-maha-700">
                    Maha Spa
                </Link>
                <ul className="hidden gap-6 md:flex">
                    {links.map((l) => (
                        <li key={l.href}>
                            <Link href={l.href} className="text-sm text-gray-700 hover:text-maha-700">
                                {l.label}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="hidden items-center gap-4 md:flex">
                    <LanguageSwitcher />
                    {props.auth?.user ? (
                        <Link href="/my-bookings" className="text-sm text-maha-700">
                            {t('nav.myBookings')}
                        </Link>
                    ) : (
                        <Link
                            href="/login"
                            className="rounded-full border border-maha-700 px-4 py-1.5 text-sm text-maha-700 hover:bg-maha-700 hover:text-white"
                        >
                            {t('nav.login')}
                        </Link>
                    )}
                </div>
                <button className="md:hidden" onClick={() => setOpen(!open)} aria-label={t('nav.toggleMenu')}>
                    {open ? <X /> : <Menu />}
                </button>
            </nav>
            <div className={cn('md:hidden border-t border-maha-100 bg-white', open ? 'block' : 'hidden')}>
                <ul className="flex flex-col gap-2 px-4 py-3">
                    {links.map((l) => (
                        <li key={l.href}>
                            <Link href={l.href} className="block py-2 text-sm">
                                {l.label}
                            </Link>
                        </li>
                    ))}
                    <li className="border-t pt-2">
                        <LanguageSwitcher />
                    </li>
                </ul>
            </div>
        </header>
    );
}
