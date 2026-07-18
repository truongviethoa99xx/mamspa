import { Link, usePage } from '@inertiajs/react';
import { Globe } from 'lucide-react';
import { cn } from '@/Lib/utils';
import type { SharedProps } from '@/types';

const LOCALE_LABELS: Record<string, string> = {
    vi: 'VI',
    en: 'EN',
    ja: 'JA',
    ko: 'KO',
    zh: 'ZH',
};

interface LanguageSwitcherProps {
    color?: string;
    className?: string;
    onNavigate?: () => void;
}

function buildLocaleHref(url: string, locale: string): string {
    const [path, query] = url.split('?');
    const params = new URLSearchParams(query);
    params.set('lang', locale);

    return `${path}?${params.toString()}`;
}

export function LanguageSwitcher({ color, className, onNavigate }: LanguageSwitcherProps) {
    const { props, url } = usePage<SharedProps>();
    const locales = props.availableLocales?.length ? props.availableLocales : ['vi', 'en'];

    if (locales.length < 2) {
        return null;
    }

    return (
        <div
            role="group"
            aria-label="Chuyển ngôn ngữ"
            className={cn('flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide', className)}
            style={{ color }}
        >
            <Globe className="h-4 w-4 opacity-60" aria-hidden="true" />
            {locales.map((locale, index) => {
                const active = locale === props.locale;

                return (
                    <span key={locale} className="flex items-center">
                        {index > 0 && <span className="mx-1 opacity-40">/</span>}
                        <Link
                            href={buildLocaleHref(url, locale)}
                            onClick={onNavigate}
                            preserveScroll
                            aria-current={active ? 'true' : undefined}
                            className={cn('transition-opacity hover:opacity-100', active ? 'opacity-100' : 'opacity-60')}
                        >
                            {LOCALE_LABELS[locale] ?? locale.toUpperCase()}
                        </Link>
                    </span>
                );
            })}
        </div>
    );
}
