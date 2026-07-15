import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import { useLocale } from '@/Hooks/useLocale';

export default function AuthLayout({ children }: PropsWithChildren) {
    useLocale();
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-maha-50 p-6">
            <Link href="/" className="mb-6 font-serif text-3xl text-maha-700">
                Mầm Spa
            </Link>
            <div className="w-full max-w-md rounded-xl border border-maha-100 bg-white p-8 shadow-sm">
                {children}
            </div>
        </div>
    );
}
