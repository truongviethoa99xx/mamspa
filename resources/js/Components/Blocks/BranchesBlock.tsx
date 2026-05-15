import { Link } from '@inertiajs/react';
import { MapPin, Phone, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/Hooks/useLocale';
import { tr } from '@/Lib/utils';

export function BranchesBlock({ data }: { data: any }) {
    const locale = useLocale();
    const { t } = useTranslation();
    const branches = data.branches ?? [];

    return (
        <section className="bg-maha-50 py-16">
            <div className="mx-auto max-w-6xl px-4">
                <h2 className="mb-10 text-center font-serif text-3xl text-maha-700">{t('blocks.branches.title')}</h2>
                <div className="grid gap-6 md:grid-cols-2">
                    {branches.map((b: any) => (
                        <Link key={b.id} href={`/about-us/${b.slug}`}
                            className="rounded-xl border border-maha-100 bg-white p-6 transition hover:shadow-lg">
                            <h3 className="font-serif text-2xl text-maha-700">{tr(b.name, locale)}</h3>
                            <p className="mt-3 flex items-center gap-2 text-sm text-gray-700">
                                <MapPin className="h-4 w-4" /> {b.address}
                            </p>
                            <p className="mt-1 flex items-center gap-2 text-sm text-gray-700">
                                <Phone className="h-4 w-4" /> {b.phone}
                            </p>
                            <p className="mt-1 flex items-center gap-2 text-sm text-gray-700">
                                <Clock className="h-4 w-4" /> {b.open_hours}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
