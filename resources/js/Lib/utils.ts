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

/** Câu đầu tiên của một đoạn văn bản (tính đến dấu `.`, `!` hoặc `?` đầu tiên). */
export function firstSentence(text: string): string {
    const match = text.match(/^.*?[.!?](?=\s|$)/);
    return match ? match[0] : text;
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

/** Phân tích chuỗi giờ mở cửa dạng "09:00 - 21:00" thành giờ mở/đóng cửa. */
export function parseOpenHours(openHours: string | undefined): { open: string; close: string } {
    const match = openHours?.match(/(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})/);
    return match ? { open: match[1], close: match[2] } : { open: '09:00', close: '21:00' };
}

/** Danh sách các mốc giờ (HH:mm) từ giờ mở đến giờ đóng cửa, cách nhau `stepMinutes`. */
export function generateTimeOptions(open: string, close: string, stepMinutes = 30): string[] {
    const toMinutes = (time: string) => {
        const [h, m] = time.split(':').map(Number);
        return h * 60 + m;
    };
    const start = toMinutes(open);
    const end = toMinutes(close);
    const options: string[] = [];
    for (let mins = start; mins <= end; mins += stepMinutes) {
        const h = Math.floor(mins / 60);
        const m = mins % 60;
        options.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
    }
    return options;
}
