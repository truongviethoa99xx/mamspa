import { Head, Link } from '@inertiajs/react';
import { useRef, type MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { CalendarDays, ChevronDown } from 'lucide-react';
import { tr } from '@/Lib/utils';
import { useLocale } from '@/Hooks/useLocale';

interface HeroData {
    image?: string;
    eyebrow?: unknown;
    title?: unknown;
    subtitle?: unknown;
    cta_text?: unknown;
    cta_link?: string;
}

export function HeroBlock({ data }: { data: HeroData }) {
    const locale = useLocale();
    const { t } = useTranslation();

    const eyebrow = tr(data.eyebrow, locale) || t('home.hero.eyebrow');
    const heading = tr(data.title, locale) || t('home.hero.heading');
    const body = tr(data.subtitle, locale) || t('home.hero.body');
    const ctaText = tr(data.cta_text, locale) || t('common.bookNow');
    const ctaLink = data.cta_link || '/dat-lich';
    const sectionRef = useRef<HTMLElement>(null);

    const handleExplore = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const target = document.getElementById('main') ?? sectionRef.current?.nextElementSibling;
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <>
        {data.image && (
            <Head>
                <link rel="preload" as="image" href={data.image} fetchPriority="high" />
            </Head>
        )}
        <section
            ref={sectionRef}
            className="relative isolate flex h-[520px] max-h-[78svh] min-h-[440px] flex-col overflow-hidden bg-[#474c3c] bg-cover bg-center sm:h-[72vh] sm:min-h-[500px] md:h-[78vh] lg:h-[88vh] lg:min-h-[560px] lg:max-h-[940px]"
            style={data.image ? { backgroundImage: `linear-gradient(rgba(45, 51, 39, 0.58), rgba(45, 51, 39, 0.58)), url(${data.image})` } : undefined}
        >
            {/* Brand wordmark */}
            <Link
                href="/"
                className="absolute left-5 top-5 z-10 font-serif text-lg font-semibold uppercase tracking-[0.12em] text-maha-50 sm:text-2xl md:left-10 md:top-10 md:text-3xl"
            >
                Mầm Spa
            </Link>

            {/* Main content */}
            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pb-24 pt-20 sm:px-6 sm:py-16 md:py-20 2xl:max-w-[1440px]">
                <p className="font-serif text-sm italic tracking-wide text-maha-100/70 sm:text-lg md:text-xl">
                    {eyebrow}
                </p>
                <h1 className="mt-3 max-w-4xl whitespace-pre-line font-serif text-[2rem] uppercase leading-[1.08] text-maha-50 sm:text-5xl md:mt-6 md:text-6xl lg:text-7xl 2xl:text-8xl">
                    {heading}
                </h1>
                <p className="mt-4 max-w-2xl whitespace-pre-line text-sm leading-relaxed text-maha-100/75 sm:text-base md:mt-8 md:text-lg">
                    {body}
                </p>
            </div>

            {/* Scroll-down indicator */}
            <a
                href="#main"
                onClick={handleExplore}
                className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 text-maha-100/80 transition-colors hover:text-maha-50 sm:flex md:bottom-10"
                aria-label={t('home.hero.explore')}
            >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-maha-100/40 transition-colors hover:border-maha-50 md:h-12 md:w-12">
                    <ChevronDown className="h-5 w-5" />
                </span>
                <span className="text-sm tracking-wide">{t('home.hero.explore')}</span>
            </a>

            {/* Booking CTA pill */}
            <Link
                href={ctaLink}
                className="absolute bottom-5 right-5 z-10 inline-flex items-center gap-2 rounded-full bg-maha-50 px-4 py-2.5 text-sm font-semibold tracking-wide text-[#474c3c] shadow-xl shadow-black/20 transition-transform hover:-translate-y-0.5 sm:gap-3 sm:px-8 sm:py-4 sm:text-base md:bottom-10 md:right-10"
            >
                <CalendarDays className="h-5 w-5" />
                {ctaText}
            </Link>
        </section>
        </>
    );
}
