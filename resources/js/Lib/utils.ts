import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatVND(value: number): string {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        maximumFractionDigits: 0,
    }).format(value);
}

export function publicAssetUrl(path?: string | null): string | null {
    if (!path) return null;
    if (path.startsWith('http') || path.startsWith('/')) return path;

    return `/storage/${path}`;
}

export function tr(value: unknown, locale: string = 'vi'): string {
    if (typeof value === 'string') return value;
    if (value && typeof value === 'object' && locale in value) {
        return (value as Record<string, string>)[locale] ?? '';
    }
    if (value && typeof value === 'object' && 'vi' in value) {
        return (value as Record<string, string>).vi ?? '';
    }
    return '';
}
