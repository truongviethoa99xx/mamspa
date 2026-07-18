import { useEffect, useState } from 'react';

/** True nếu người dùng bật "prefers-reduced-motion" ở hệ điều hành/trình duyệt. */
export function useReducedMotion(): boolean {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const query = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(query.matches);

        const handleChange = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);
        query.addEventListener('change', handleChange);
        return () => query.removeEventListener('change', handleChange);
    }, []);

    return prefersReducedMotion;
}
