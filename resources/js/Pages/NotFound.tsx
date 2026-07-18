import { Head, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import PublicLayout from '@/Layouts/PublicLayout';

export default function NotFound() {
    const { t } = useTranslation();

    return (
        <PublicLayout>
            <Head title={t('notFound.title')} />
            <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 py-24 text-center sm:py-32">
                <p className="font-serif text-6xl text-maha-800 sm:text-7xl">{t('notFound.heading')}</p>
                <h1 className="mt-4 font-serif text-2xl text-ink sm:text-3xl">{t('notFound.title')}</h1>
                <p className="mt-4 text-sm font-light text-ink/70 sm:text-base">{t('notFound.description')}</p>

                <Link
                    href="/"
                    className="mt-8 rounded-full bg-maha-800 px-8 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-90"
                >
                    {t('notFound.backHome')}
                </Link>

                <div className="mt-10 border-t border-maha-200 pt-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-maha-500">
                        {t('notFound.suggestionsTitle')}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
                        <Link href="/dich-vu/" className="text-maha-800 underline underline-offset-4 hover:text-maha-500">
                            {t('notFound.exploreServices')}
                        </Link>
                        <Link href="/lien-he/" className="text-maha-800 underline underline-offset-4 hover:text-maha-500">
                            {t('notFound.contact')}
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
