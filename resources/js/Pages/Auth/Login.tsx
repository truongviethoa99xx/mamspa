import { Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import AuthLayout from '@/Layouts/AuthLayout';
import { Seo } from '@/Components/Seo';
import { GoogleIcon } from '@/Components/GoogleIcon';

export default function Login({ status }: { status?: string }) {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors } = useForm({
        email: '', password: '', remember: false,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <AuthLayout>
            <Seo title={t('auth.login')} noIndex />
            <h1 className="mb-4 font-serif text-2xl text-maha-700">{t('auth.login')}</h1>
            {status && <p className="mb-3 text-sm text-green-600">{status}</p>}
            <form onSubmit={submit} className="space-y-3">
                <input type="email" placeholder={t('auth.email')} autoFocus
                    className="w-full rounded-lg border px-4 py-2"
                    value={data.email} onChange={(e) => setData('email', e.target.value)} />
                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                <input type="password" placeholder={t('auth.password')}
                    className="w-full rounded-lg border px-4 py-2"
                    value={data.password} onChange={(e) => setData('password', e.target.value)} />
                {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={data.remember} onChange={(e) => setData('remember', e.target.checked)} />
                    {t('auth.remember')}
                </label>
                <button disabled={processing}
                    className="w-full rounded-full bg-maha-700 py-2.5 text-white disabled:bg-gray-300">
                    {t('auth.login')}
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
                    {t('auth.noAccount')} <Link href="/register/" className="text-maha-700 underline">{t('auth.register')}</Link>
                </p>
            </form>
        </AuthLayout>
    );
}
