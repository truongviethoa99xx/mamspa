import { router } from '@inertiajs/react';
import { useLocale } from '@/Hooks/useLocale';

export function LanguageSwitcher() {
    const locale = useLocale();

    const switchTo = (lang: 'vi' | 'en') => {
        const url = new URL(window.location.href);
        url.searchParams.set('lang', lang);
        router.visit(url.pathname + url.search, { preserveScroll: true });
    };

    return (
        <div className="flex items-center gap-2 text-sm">
            <button
                onClick={() => switchTo('vi')}
                className={locale === 'vi' ? 'font-bold text-maha-700' : 'text-gray-500'}
                aria-pressed={locale === 'vi'}
            >
                VI
            </button>
            <span className="text-gray-300">|</span>
            <button
                onClick={() => switchTo('en')}
                className={locale === 'en' ? 'font-bold text-maha-700' : 'text-gray-500'}
                aria-pressed={locale === 'en'}
            >
                EN
            </button>
        </div>
    );
}
