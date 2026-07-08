import { Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import AuthLayout from '@/Layouts/AuthLayout';
import { Seo } from '@/Components/Seo';
import { GoogleIcon } from '@/Components/GoogleIcon';

export default function Register() {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors } = useForm({
        name: '', email: '', phone: '', password: '', password_confirmation: '',
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <AuthLayout>
            <Seo title={t('auth.register')} noIndex />
            <h1 className="mb-4 font-serif text-2xl text-maha-700">{t('auth.register')}</h1>
            <form onSubmit={submit} className="space-y-3">
                <input className="w-full rounded-lg border px-4 py-2" placeholder={t('auth.name')}
                    value={data.name} onChange={(e) => setData('name', e.target.value)} />
                {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                <input type="email" className="w-full rounded-lg border px-4 py-2" placeholder={t('auth.email')}
                    value={data.email} onChange={(e) => setData('email', e.target.value)} />
                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                <input className="w-full rounded-lg border px-4 py-2" placeholder={t('auth.phone')}
                    value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
                <input type="password" className="w-full rounded-lg border px-4 py-2" placeholder={t('auth.password')}
                    value={data.password} onChange={(e) => setData('password', e.target.value)} />
                {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                <input type="password" className="w-full rounded-lg border px-4 py-2" placeholder={t('auth.passwordConfirm')}
                    value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} />
                <button disabled={processing}
                    className="w-full rounded-full bg-maha-700 py-2.5 text-white disabled:bg-gray-300">
                    {t('auth.register')}
                </button>
                <div className="flex items-center gap-3 py-1">
                    <span className="h-px flex-1 bg-gray-200" />
                    <span className="text-xs text-gray-500">{t('auth.orContinueWith')}</span>
                    <span className="h-px flex-1 bg-gray-200" />
                </div>
                <a href="/auth/google/redirect/"
                    className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    <GoogleIcon />
                    {t('auth.loginWithGoogle')}
                </a>
                <p className="text-center text-sm text-gray-600">
                    {t('auth.haveAccount')} <Link href="/login/" className="text-maha-700 underline">{t('auth.login')}</Link>
                </p>
            </form>
        </AuthLayout>
    );
}
