import { Head, useForm, usePage } from '@inertiajs/react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PublicLayout from '@/Layouts/PublicLayout';
import type { SharedProps } from '@/types';

export default function Contact() {
    const { t } = useTranslation();
    const { props } = usePage<SharedProps>();
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '', email: '', phone: '', subject: '', message: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/contact', { onSuccess: () => reset() });
    };

    return (
        <PublicLayout>
            <Head title={t('nav.contact')} />
            <section className="bg-maha-50 py-12">
                <div className="mx-auto max-w-5xl px-4">
                    <h1 className="font-serif text-4xl text-maha-700">{t('nav.contact')}</h1>
                </div>
            </section>
            <section className="py-12">
                <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2">
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-maha-700">Maha Heritage</h3>
                            <p className="flex items-center gap-2 text-sm"><MapPin className="h-4 w-4" /> 26 Nguyễn Văn Thoại, Đà Nẵng</p>
                            <p className="flex items-center gap-2 text-sm"><Phone className="h-4 w-4" /> (+84) 934 743 026</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-maha-700">Maha Signature</h3>
                            <p className="flex items-center gap-2 text-sm"><MapPin className="h-4 w-4" /> 185 Hồ Nghinh, Đà Nẵng</p>
                            <p className="flex items-center gap-2 text-sm"><Phone className="h-4 w-4" /> (+84) 978 456 185</p>
                        </div>
                        <p className="flex items-center gap-2 text-sm"><Mail className="h-4 w-4" /> hello@mahaspa.vn</p>
                        <iframe title="Maha Spa map" className="h-64 w-full rounded-lg border"
                            src="https://www.google.com/maps/embed/v1/place?key=AIza_PLACEHOLDER&q=Maha+Spa+Da+Nang"
                            loading="lazy" />
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
