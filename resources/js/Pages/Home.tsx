import { useTranslation } from 'react-i18next';

export default function Home() {
    const { t } = useTranslation();
    return (
        <main className="flex min-h-screen items-center justify-center bg-maha-50 p-8">
            <div className="text-center">
                <h1 className="font-serif text-4xl text-maha-700 md:text-6xl">
                    {t('home.hero.title')}
                </h1>
                <p className="mt-4 text-lg text-maha-900/80">
                    {t('home.hero.subtitle')}
                </p>
            </div>
        </main>
    );
}
