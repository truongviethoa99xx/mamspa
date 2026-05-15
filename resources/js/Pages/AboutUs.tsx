import { Link } from '@inertiajs/react';
import { MapPin, Phone, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PublicLayout from '@/Layouts/PublicLayout';
import { Seo } from '@/Components/Seo';
import { localBusinessSchema, breadcrumbSchema } from '@/Lib/buildSchema';
import { useLocale } from '@/Hooks/useLocale';
import { formatVND, tr } from '@/Lib/utils';

interface BranchService {
    id: number;
    slug: string;
    name: string | Record<string, string>;
    category: string;
    price: number;
    duration: number;
}

interface Props {
    branch: {
        id: number;
        slug: string;
        name: string | Record<string, string>;
        address: string;
        phone: string;
        open_hours: string;
        lat: number | null;
        lng: number | null;
        services: BranchService[];
    };
}

export default function AboutUs({ branch }: Props) {
    const locale = useLocale();
    const { t } = useTranslation();
    const name = tr(branch.name, locale);
    return (
        <PublicLayout>
            <Seo
                title={name}
                description={`${name} — ${branch.address}. ${branch.open_hours}`}
                schema={[
                    localBusinessSchema({ name, address: branch.address, phone: branch.phone, url: window.location.href, lat: branch.lat, lng: branch.lng }),
                    breadcrumbSchema([
                        { name: 'Maha Spa', url: window.location.origin },
                        { name, url: window.location.href },
                    ]),
                ]}
            />
            <section className="bg-maha-50 py-16">
                <div className="mx-auto max-w-5xl px-4">
                    <h1 className="font-serif text-4xl text-maha-700">{name}</h1>
                    <div className="mt-6 grid gap-2 text-gray-700">
                        <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {branch.address}</p>
                        <p className="flex items-center gap-2"><Phone className="h-4 w-4" /> {branch.phone}</p>
                        <p className="flex items-center gap-2"><Clock className="h-4 w-4" /> {branch.open_hours}</p>
                    </div>
                </div>
            </section>
            <section className="py-12">
                <div className="mx-auto max-w-5xl px-4">
                    <h2 className="mb-6 font-serif text-2xl text-maha-700">{t('about.servicesAtBranch')}</h2>
                    <ul className="grid gap-3 md:grid-cols-2">
                        {branch.services.map((s) => (
                            <li key={s.id}>
                                <Link href={`/services/${s.slug}`}
                                    className="flex items-center justify-between rounded-lg border border-maha-100 p-4 hover:bg-maha-50">
                                    <div>
                                        <p className="font-semibold text-maha-700">{tr(s.name, locale)}</p>
                                        <p className="text-xs text-gray-500">{s.duration} {t('common.minute')} · {s.category}</p>
                                    </div>
                                    <span className="font-semibold">{formatVND(s.price)}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </PublicLayout>
    );
}
