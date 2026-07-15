import { router } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/Hooks/useLocale';
import type { Locale } from '@/types';

const LANGUAGES: { code: Locale; label: string; flag: string }[] = [
    { code: 'vi', label: 'VIE', flag: '🇻🇳' },
    { code: 'en', label: 'ENG', flag: '🇬🇧' },
    { code: 'ja', label: 'JPN', flag: '🇯🇵' },
    { code: 'ko', label: 'KOR', flag: '🇰🇷' },
    { code: 'zh', label: 'CHN', flag: '🇨🇳' },
];

export function LanguageSwitcher() {
    const locale = useLocale();
    const { i18n } = useTranslation();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const current = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];

    const switchTo = (lang: Locale) => {
        setOpen(false);
        void i18n.changeLanguage(lang);
        const url = new URL(window.location.href);
        url.searchParams.set('lang', lang);
        router.visit(url.pathname + url.search, { preserveScroll: true });
    };

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-maha-700 hover:bg-maha-50 transition-colors"
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <span className="text-base leading-none">{current.flag}</span>
                <span className="tracking-wide">{current.label}</span>
                <svg
                    className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                >
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {open && (
                <ul
                    role="listbox"
                    className="absolute right-0 top-full z-50 mt-1.5 w-36 overflow-hidden rounded-xl border border-maha-100 bg-white shadow-lg"
                >
                    {LANGUAGES.map((lang) => {
                        const isActive = lang.code === locale;
                        return (
                            <li key={lang.code} role="option" aria-selected={isActive}>
                                <button
                                    onClick={() => switchTo(lang.code)}
                                    className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                                        isActive
                                            ? 'bg-maha-50 font-semibold text-maha-700'
                                            : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <span className="text-base leading-none">{lang.flag}</span>
                                    <span className="tracking-wide">{lang.label}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
