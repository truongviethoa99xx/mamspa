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
        <div
            className={cn(
                'flex min-h-screen flex-col bg-white',
                // Chừa chỗ cho thanh CTA "Đặt lịch" ghim cố định dưới đáy trên mobile (Header.tsx)
                // — nếu không, nó sẽ đè lên phần cuối Footer. Không cần khi header ở chế độ
                // minimal vì lúc đó Header không render thanh CTA đó.
                !minimalHeader && 'pb-[calc(3.5rem+env(safe-area-inset-bottom))] lg:pb-0',
            )}
        >
            <Header minimal={minimalHeader} />
            <main className={cn('flex-1', mainClassName ?? 'bg-white')}>{children}</main>
            <Footer />
            <ChatWidget />
            <BackToTop />
        </div>
    );
}
