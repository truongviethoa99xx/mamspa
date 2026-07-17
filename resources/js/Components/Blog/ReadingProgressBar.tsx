import { RefObject, useEffect, useState } from 'react';

/** Thanh tiến trình đọc cố định trên đầu trang, tỉ lệ theo phần nội dung bài viết đã cuộn qua. */
export function ReadingProgressBar({ targetRef }: { targetRef: RefObject<HTMLElement> }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const update = () => {
            const el = targetRef.current;
            if (!el) return;

            const rect = el.getBoundingClientRect();
            const total = rect.height - window.innerHeight;
            const scrolled = -rect.top;
            const ratio = total > 0 ? scrolled / total : 0;

            setProgress(Math.min(100, Math.max(0, ratio * 100)));
        };

        update();
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        return () => {
            window.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
        };
    }, [targetRef]);

    return (
        <div className="fixed inset-x-0 top-0 z-40 h-1 bg-transparent" aria-hidden="true">
            <div className="h-full bg-subheading transition-[width] duration-150 ease-out" style={{ width: `${progress}%` }} />
        </div>
    );
}
