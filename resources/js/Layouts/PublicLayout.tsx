import { PropsWithChildren } from 'react';
import { Header } from '@/Components/Header';
import { Footer } from '@/Components/Footer';
import { ChatWidget } from '@/Components/ChatWidget';
import { BackToTop } from '@/Components/BackToTop';
import { useLocale } from '@/Hooks/useLocale';
import { cn } from '@/Lib/utils';

interface PublicLayoutProps extends PropsWithChildren {
    /** Màu nền của <main> — mặc định trắng, có thể ghi đè riêng theo trang. */
    mainClassName?: string;
}

export default function PublicLayout({ children, mainClassName }: PublicLayoutProps) {
    useLocale();

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Header />
            <main className={cn('flex-1', mainClassName ?? 'bg-white')}>{children}</main>
            <Footer />
            <ChatWidget />
            <BackToTop />
        </div>
    );
}
