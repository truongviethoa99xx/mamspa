import { useEffect, useRef, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/Lib/utils';
import type { SharedProps } from '@/types';

interface LocaleMeta {
    label: string;
    flag: string;
}

const LOCALE_META: Record<string, LocaleMeta> = {
    vi: { label: 'Tiếng Việt', flag: '🇻🇳' },
    en: { label: 'English', flag: '🇬🇧' },
    ja: { label: '日本語', flag: '🇯🇵' },
    ko: { label: '한국어', flag: '🇰🇷' },
    zh: { label: '中文', flag: '🇨🇳' },
};

// Chỉ hiện Việt + Anh; các ngôn ngữ khác tạm ẩn dù server đã hỗ trợ sẵn.
const VISIBLE_LOCALES = ['vi', 'en'];

interface LanguageSwitcherProps {
    color?: string;
    accentColor?: string;
    className?: string;
    onNavigate?: () => void;
}

function buildLocaleHref(url: string, locale: string): string {
    const [path, query] = url.split('?');
    const params = new URLSearchParams(query);
    params.set('lang', locale);

    return `${path}?${params.toString()}`;
}

export function LanguageSwitcher({ color, accentColor = '#2F3E2E', className, onNavigate }: LanguageSwitcherProps) {
    const { props, url } = usePage<SharedProps>();
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);

    const locales = VISIBLE_LOCALES.filter((locale) => props.availableLocales?.includes(locale));

    useEffect(() => {
        if (!open) {
            return;
        }

        function handleClickOutside(event: MouseEvent) {
            if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open]);

    if (locales.length < 2) {
        return null;
    }

    const current = LOCALE_META[props.locale] ?? LOCALE_META.vi;

    return (
        <div ref={rootRef} className={cn('relative', className)}>
            <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-haspopup="true"
                aria-expanded={open}
                aria-label="Chuyển ngôn ngữ"
                className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors hover:bg-black/5"
                style={{ color, borderColor: `${color}40` }}
            >
                <span className="text-base leading-none">{current.flag}</span>
                <span>{props.locale}</span>
                <ChevronDown className={cn('h-3.5 w-3.5 transition-transform duration-200', open && 'rotate-180')} />
            </button>

            {open && (
                <div
                    role="menu"
                    className="absolute right-0 top-full z-40 mt-2 min-w-[10rem] overflow-hidden rounded-xl border border-black/5 bg-white py-1 shadow-xl"
                >
                    {locales.map((locale) => {
                        const meta = LOCALE_META[locale] ?? { label: locale.toUpperCase(), flag: '' };
                        const active = locale === props.locale;

                        return (
                            <Link
                                key={locale}
                                role="menuitem"
                                href={buildLocaleHref(url, locale)}
                                preserveScroll
                                onClick={() => {
                                    setOpen(false);
                                    onNavigate?.();
                                }}
                                className="flex items-center gap-2 px-3 py-2 text-sm text-stone-700 transition-colors hover:bg-stone-100"
                                style={active ? { color: accentColor, fontWeight: 600 } : undefined}
                            >
                                <span className="text-base leading-none">{meta.flag}</span>
                                <span className="flex-1">{meta.label}</span>
                                {active && <Check className="h-4 w-4" style={{ color: accentColor }} />}
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
