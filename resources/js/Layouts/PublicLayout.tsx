import { PropsWithChildren } from 'react';
import { Navbar } from '@/Components/Navbar';
import { Footer } from '@/Components/Footer';
import { ChatWidget } from '@/Components/ChatWidget';
import { useLocale } from '@/Hooks/useLocale';

export default function PublicLayout({ children }: PropsWithChildren) {
    useLocale();
    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <ChatWidget />
        </div>
    );
}
