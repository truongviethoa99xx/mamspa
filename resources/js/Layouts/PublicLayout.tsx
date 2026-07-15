import { PropsWithChildren } from 'react';
import { Header } from '@/Components/Header';
import { useLocale } from '@/Hooks/useLocale';

export default function PublicLayout({ children }: PropsWithChildren) {
    useLocale();

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Header />
            <main className="flex-1">{children}</main>
        </div>
    );
}
