import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import PublicLayout from '@/Layouts/PublicLayout';
import { useLocale } from '@/Hooks/useLocale';
import { tr } from '@/Lib/utils';

interface Promo {
    id: number;
    slug: string;
    title: any;
    description: any;
    image: string | null;
    link: string | null;
    ends_at: string | null;
}

export default function Promotions({ promotions }: { promotions: Promo[] }) {
    const locale = useLocale();
    const { t } = useTranslation();
    return (
        <PublicLayout>
            <Head title={t('nav.promotions')} />
            <section className="bg-maha-50 py-12">
                <div className="mx-auto max-w-5xl px-4">
                    <h1 className="font-serif text-4xl text-maha-700">{t('nav.promotions')}</h1>
                </div>
            </section>
            <section className="py-12">
                <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-2">
                    {promotions.map((p) => (
                        <a key={p.id} href={p.link ?? '#'}
                            className="overflow-hidden rounded-xl border border-maha-100 bg-white hover:shadow-lg">
                            {p.image && <img src={p.image} alt="" className="w-full" />}
                            <div className="p-6">
                                <h3 className="font-serif text-xl text-maha-700">{tr(p.title, locale)}</h3>
                                <p className="mt-2 text-sm text-gray-600">{tr(p.description, locale)}</p>
                                {p.ends_at && (
                                    <p className="mt-3 text-xs text-red-500">
                                        Đến: {new Date(p.ends_at).toLocaleDateString()}
                                    </p>
                                )}
                            </div>
                        </a>
                    ))}
                </div>
            </section>
        </PublicLayout>
    );
}
