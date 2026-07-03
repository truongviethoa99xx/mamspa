import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Leaf, Home, Sparkles, PhoneCall } from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Seo } from '@/Components/Seo';
import { useLocale } from '@/Hooks/useLocale';

export default function NotFound() {
    useLocale();
    const { t } = useTranslation();

    return (
        <PublicLayout>
            <Seo title={t('notFound.title')} description={t('notFound.description')} noIndex />

            <section className="relative overflow-hidden bg-maha-50 py-24">
                <div
                    aria-hidden
                    className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-maha-100 blur-3xl"
                />
                <div
                    aria-hidden
                    className="pointer-events-none absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-maha-200/60 blur-3xl"
                />

                <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 text-center">
                    <Leaf className="h-10 w-10 text-maha-400" strokeWidth={1.5} />

                    <p className="mt-6 font-serif text-[6rem] leading-[0.85] text-maha-200 sm:text-[8rem]">
                        {t('notFound.heading')}
                    </p>

                    <h1 className="mt-4 font-serif text-3xl text-heading sm:text-4xl">
                        {t('notFound.title')}
                    </h1>
                    <p className="mt-4 max-w-md text-ink/70">{t('notFound.description')}</p>

                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 rounded-full bg-maha-700 px-8 py-3 text-sm font-semibold text-white transition hover:bg-maha-800"
                        >
                            <Home className="h-4 w-4" />
                            {t('notFound.backHome')}
                        </Link>
                        <Link
                            href="/dich-vu/"
                            className="inline-flex items-center gap-2 rounded-full border border-maha-300 px-8 py-3 text-sm font-semibold text-maha-700 transition hover:bg-maha-100"
                        >
                            <Sparkles className="h-4 w-4" />
                            {t('notFound.exploreServices')}
                        </Link>
                    </div>

                    <div className="mt-12 w-full border-t border-maha-200 pt-6">
                        <p className="text-xs uppercase tracking-widest text-subheading">
                            {t('notFound.suggestionsTitle')}
                        </p>
                        <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
                            <Link href="/dat-lich/" className="text-maha-700 underline-offset-4 hover:underline">
                                {t('nav.booking')}
                            </Link>
                            <Link href="/gioi-thieu/" className="text-maha-700 underline-offset-4 hover:underline">
                                {t('nav.about')}
                            </Link>
                            <Link href="/tin-tuc/" className="text-maha-700 underline-offset-4 hover:underline">
                                {t('nav.blog')}
                            </Link>
                            <Link
                                href="/contact/"
                                className="inline-flex items-center gap-1 text-maha-700 underline-offset-4 hover:underline"
                            >
                                <PhoneCall className="h-3.5 w-3.5" />
                                {t('notFound.contact')}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
