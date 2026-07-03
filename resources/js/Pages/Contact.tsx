import { useForm, usePage } from '@inertiajs/react';
import { Seo } from '@/Components/Seo';
import { MapPin, Phone, Mail, ArrowUpRight, Send } from 'lucide-react';
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

function mapEmbedUrl(branch: ContactBranch): string {
    const query = branch.lat && branch.lng ? `${branch.lat},${branch.lng}` : branch.address;
    return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
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
        post('/lien-he', { onSuccess: () => reset() });
    };

    return (
        <PublicLayout>
            <Seo
                title={t('nav.contact')}
                description={seoDescription}
                schema={{
                    '@context': 'https://schema.org',
                    '@type': 'ContactPage',
                    name: t('nav.contact'),
                    url: window.location.href,
                    mainEntityOfPage: { '@type': 'WebPage', '@id': window.location.href },
                    about: { '@type': 'Organization', '@id': window.location.origin + '/#organization' },
                }}
            />
            <section className="py-10 sm:py-14">
                <div className="mx-auto max-w-6xl px-4">
                    <h1 className="font-serif text-3xl text-heading sm:text-4xl">{heading}</h1>
                </div>
                <div className="mx-auto mt-8 grid max-w-6xl gap-8 px-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
                    <div className="space-y-6">
                        {branches.map((branch) => (
                            <div
                                key={branch.slug}
                                className="overflow-hidden rounded-2xl border border-maha-100 bg-white shadow-sm transition hover:shadow-md"
                            >
                                {(branch.lat || branch.address) && (
                                    <iframe
                                        title={`Bản đồ ${tr(branch.name, locale)}`}
                                        className="h-40 w-full grayscale-[15%]"
                                        src={mapEmbedUrl(branch)}
                                        loading="lazy"
                                    />
                                )}
                                <div className="space-y-3 p-5">
                                    <h3 className="font-serif text-xl text-heading">{tr(branch.name, locale)}</h3>
                                    <p className="flex items-start gap-3 text-sm text-ink/80">
                                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-maha-50 text-maha-700">
                                            <MapPin className="h-3.5 w-3.5" />
                                        </span>
                                        {branch.address}
                                    </p>
                                    <p className="flex items-center gap-3 text-sm text-ink/80">
                                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-maha-50 text-maha-700">
                                            <Phone className="h-3.5 w-3.5" />
                                        </span>
                                        <a href={`tel:${branch.phone}`} className="hover:text-maha-700">{branch.phone}</a>
                                    </p>
                                    <a
                                        href={mapUrl(branch)}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-1 text-sm font-semibold text-maha-700 underline-offset-4 hover:underline"
                                    >
                                        {t('footer.viewMap')}
                                        <ArrowUpRight className="h-3.5 w-3.5" />
                                    </a>
                                </div>
                            </div>
                        ))}

                        {email && (
                            <div className="flex items-center gap-3 rounded-2xl border border-maha-100 bg-white p-5 shadow-sm">
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-maha-50 text-maha-700">
                                    <Mail className="h-4 w-4" />
                                </span>
                                <a href={`mailto:${email}`} className="text-sm font-semibold text-ink hover:text-maha-700">
                                    {email}
                                </a>
                            </div>
                        )}
                    </div>

                    <form
                        onSubmit={submit}
                        className="space-y-4 self-start rounded-2xl border border-maha-100 bg-white p-6 shadow-sm sm:p-8"
                    >
                        <div>
                            <h2 className="font-serif text-2xl text-heading">{t('contact.form.title')}</h2>
                            <p className="mt-1 text-sm text-ink/60">{t('contact.form.subtitle')}</p>
                        </div>

                        {props.flash?.success && (
                            <p className="rounded-lg bg-green-50 p-3 text-sm text-green-700">{props.flash.success}</p>
                        )}

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <input
                                    className="w-full rounded-lg border border-maha-100 px-4 py-2.5 text-sm transition focus:border-maha-400 focus:outline-none focus:ring-2 focus:ring-maha-100"
                                    placeholder={t('contact.form.name') + ' *'}
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                            </div>
                            <div>
                                <input
                                    className="w-full rounded-lg border border-maha-100 px-4 py-2.5 text-sm transition focus:border-maha-400 focus:outline-none focus:ring-2 focus:ring-maha-100"
                                    placeholder={t('contact.form.email') + ' *'}
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                            </div>
                        </div>
                        <input
                            className="w-full rounded-lg border border-maha-100 px-4 py-2.5 text-sm transition focus:border-maha-400 focus:outline-none focus:ring-2 focus:ring-maha-100"
                            placeholder={t('contact.form.phone')}
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                        />
                        <div>
                            <input
                                className="w-full rounded-lg border border-maha-100 px-4 py-2.5 text-sm transition focus:border-maha-400 focus:outline-none focus:ring-2 focus:ring-maha-100"
                                placeholder={t('contact.form.subject') + ' *'}
                                value={data.subject}
                                onChange={(e) => setData('subject', e.target.value)}
                            />
                            {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject}</p>}
                        </div>
                        <div>
                            <textarea
                                className="w-full rounded-lg border border-maha-100 px-4 py-2.5 text-sm transition focus:border-maha-400 focus:outline-none focus:ring-2 focus:ring-maha-100"
                                rows={5}
                                placeholder={t('contact.form.message') + ' *'}
                                value={data.message}
                                onChange={(e) => setData('message', e.target.value)}
                            />
                            {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                        </div>
                        <button
                            disabled={processing}
                            className="inline-flex items-center gap-2 rounded-full bg-maha-700 px-8 py-3 text-sm font-semibold text-white transition hover:bg-maha-800 disabled:bg-gray-300"
                        >
                            <Send className="h-4 w-4" />
                            {processing ? t('common.processing') : t('common.submit')}
                        </button>
                    </form>
                </div>
            </section>
        </PublicLayout>
    );
}
