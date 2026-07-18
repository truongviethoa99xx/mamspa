import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/Hooks/useReducedMotion';
import { cn } from '@/Lib/utils';

interface UseRevealOptions {
    /** Tỉ lệ (0-1) phần section phải lộ ra trong viewport trước khi kích hoạt hiệu ứng. */
    threshold?: number;
}

/**
 * Gắn `ref`/`className` vào section để nó fade + trượt lên nhẹ khi cuộn tới lần đầu.
 * Tự bỏ qua hiệu ứng nếu người dùng bật "prefers-reduced-motion". Chỉ dùng cho section
 * nằm dưới màn hình đầu (không dùng cho Hero/banner đầu trang — nội dung đó cần hiện
 * ngay khi tải trang, không đợi cuộn tới).
 */
export function useReveal<T extends HTMLElement = HTMLElement>(options: UseRevealOptions = {}) {
    const { threshold = 0.15 } = options;
    const ref = useRef<T>(null);
    const [isVisible, setIsVisible] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion) {
            setIsVisible(true);
            return;
        }

        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold, rootMargin: '0px 0px -10% 0px' },
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [prefersReducedMotion, threshold]);

    return { ref, className: cn('reveal', isVisible && 'reveal-visible') } as const;
}
