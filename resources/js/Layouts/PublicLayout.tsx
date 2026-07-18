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
    /** Ẩn menu điều hướng + nút hamburger, chỉ giữ logo và CTA đặt lịch (vd. trang đọc bài). */
    minimalHeader?: boolean;
}

export default function PublicLayout({ children, mainClassName, minimalHeader }: PublicLayoutProps) {
    useLocale();

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Header minimal={minimalHeader} />
            <main className={cn('flex-1', mainClassName ?? 'bg-white')}>{children}</main>
            <Footer />
            <ChatWidget />
            <BackToTop />
        </div>
    );
}
