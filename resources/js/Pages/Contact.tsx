import { useForm, usePage } from '@inertiajs/react';
import { Seo } from '@/Components/Seo';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PublicLayout from '@/Layouts/PublicLayout';
import type { SharedProps } from '@/types';
import { tr } from '@/Lib/utils';
import { useLocale } from '@/Hooks/useLocale';

interface ContactBranch {
    slug: string;
    name: string | Record<string, string>;
    address: string;
    phone: string;
    lat: number | null;
    lng: number | null;
}

interface ContactContent {
    seo_description?: string | Record<string, string> | null;
    heading?: string | Record<string, string> | null;
    email?: string | null;
    map_embed_url?: string | null;
}

interface Props {
    content?: ContactContent;
    branches?: ContactBranch[];
}

function mapUrl(branch: ContactBranch): string {
    const query = branch.lat && branch.lng ? `${branch.lat},${branch.lng}` : branch.address;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export default function Contact({ content, branches = [] }: Props) {
    const { t } = useTranslation();
    const locale = useLocale();
    const { props } = usePage<SharedProps>();
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '', email: '', phone: '', subject: '', message: '',
    });
    const heading = tr(content?.heading, locale) || t('nav.contact');
    const seoDescription =
        tr(content?.seo_description, locale) ||
        `Liên hệ Mầm Spa. ${branches.map((branch) => tr(branch.name, locale)).filter(Boolean).join(', ')}.`;
    const email = content?.email || props.site?.email;

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/contact', { onSuccess: () => reset() });
    };

    return (
        <PublicLayout>
            <Seo
                title={t('nav.contact')}
                description={seoDescription}
            />
            <section className="bg-maha-50 py-12">
                <div className="mx-auto max-w-5xl px-4">
                    <h1 className="font-serif text-4xl text-maha-700">{heading}</h1>
                </div>
            </section>
            <section className="py-12">
                <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2">
                    <div className="space-y-4">
                        {branches.map((branch) => (
                            <div key={branch.slug}>
                                <h3 className="font-semibold text-maha-700">{tr(branch.name, locale)}</h3>
                                <p className="flex items-center gap-2 text-sm"><MapPin className="h-4 w-4" /> {branch.address}</p>
                                <p className="flex items-center gap-2 text-sm"><Phone className="h-4 w-4" /> {branch.phone}</p>
                                <a href={mapUrl(branch)} target="_blank" rel="noreferrer" className="mt-1 inline-block text-sm font-semibold text-maha-700">
                                    {t('footer.viewMap')}
                                </a>
                            </div>
                        ))}
                        {email && <p className="flex items-center gap-2 text-sm"><Mail className="h-4 w-4" /> {email}</p>}
                        {content?.map_embed_url && (
                            <iframe title="Mầm Spa map" className="h-64 w-full rounded-lg border"
                                src={content.map_embed_url}
                                loading="lazy" />
                        )}
                    </div>
                    <form onSubmit={submit} className="space-y-3 rounded-xl border border-maha-100 bg-white p-6">
                        {props.flash?.success && (
                            <p className="rounded bg-green-50 p-3 text-sm text-green-700">{props.flash.success}</p>
                        )}
                        <input className="w-full rounded-lg border px-4 py-2" placeholder={t('contact.form.name') + ' *'}
                            value={data.name} onChange={(e) => setData('name', e.target.value)} />
                        {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                        <input className="w-full rounded-lg border px-4 py-2" placeholder={t('contact.form.email') + ' *'}
                            value={data.email} onChange={(e) => setData('email', e.target.value)} />
                        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                        <input className="w-full rounded-lg border px-4 py-2" placeholder={t('contact.form.phone')}
                            value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
                        <input className="w-full rounded-lg border px-4 py-2" placeholder={t('contact.form.subject') + ' *'}
                            value={data.subject} onChange={(e) => setData('subject', e.target.value)} />
                        <textarea className="w-full rounded-lg border px-4 py-2" rows={5} placeholder={t('contact.form.message') + ' *'}
                            value={data.message} onChange={(e) => setData('message', e.target.value)} />
                        <button disabled={processing} className="rounded-full bg-maha-700 px-8 py-2 text-white disabled:bg-gray-300">
                            {processing ? t('common.processing') : t('common.submit')}
                        </button>
                    </form>
                </div>
            </section>
        </PublicLayout>
    );
}
