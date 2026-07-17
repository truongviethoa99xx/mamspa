import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/Lib/utils';

const SHOW_AFTER_PX = 400;

export function BackToTop() {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let ticking = false;

        const updateVisibility = () => {
            setIsVisible(window.scrollY > SHOW_AFTER_PX);
            ticking = false;
        };

        const handleScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(updateVisibility);
        };

        updateVisibility();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    };

    return (
        <button
            type="button"
            onClick={scrollToTop}
            className={cn(
                'fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-maha-600 text-white shadow-[0_8px_24px_rgba(85,107,63,0.36)] ring-4 ring-white transition duration-200 hover:-translate-y-0.5 hover:bg-maha-700',
                isVisible
                    ? 'translate-y-0 scale-100 opacity-100'
                    : 'pointer-events-none translate-y-4 scale-90 opacity-0',
            )}
            aria-label={t('common.backToTop')}
            title={t('common.backToTop')}
            tabIndex={isVisible ? 0 : -1}
        >
            <ArrowUp className="h-6 w-6" strokeWidth={2.6} />
        </button>
    );
}
