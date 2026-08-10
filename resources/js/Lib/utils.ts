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

/** Định dạng ngày ISO 8601 thành "dd.MM.yyyy" (dùng cho ngày đăng bài viết). */
export function formatDate(iso: string | null | undefined): string {
    if (!iso) return '';
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return '';

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}.${month}.${date.getFullYear()}`;
}

const NAMED_HTML_ENTITIES: Record<string, string> = {
    amp: '&',
    lt: '<',
    gt: '>',
    quot: '"',
    apos: "'",
    nbsp: ' ',
    hellip: '…',
    mdash: '—',
    ndash: '–',
    copy: '©',
    reg: '®',
    trade: '™',
};

/**
 * Giải mã HTML entity (&amp;, &#39;, &#x27;...) thành ký tự thật — không dùng DOM
 * (document.createElement) vì hàm này chạy cả ở Node.js lúc SSR, không có DOM.
 */
function decodeHtmlEntities(text: string): string {
    return text.replace(/&(#\d+|#x[0-9a-fA-F]+|[a-zA-Z]+);/g, (match, entity: string) => {
        if (/^#x/i.test(entity)) {
            const code = parseInt(entity.slice(2), 16);
            return Number.isNaN(code) ? match : String.fromCodePoint(code);
        }
        if (entity.startsWith('#')) {
            const code = parseInt(entity.slice(1), 10);
            return Number.isNaN(code) ? match : String.fromCodePoint(code);
        }
        return NAMED_HTML_ENTITIES[entity] ?? match;
    });
}

/** Bỏ toàn bộ thẻ HTML + giải mã entity — dùng khi nội dung Quill cần hiển thị dạng chữ
 *  thường (title, alt, breadcrumb, tab label...). Thay mỗi thẻ bằng 1 khoảng trắng (rồi gộp
 *  khoảng trắng thừa) thay vì xoá hẳn — nội dung nhiều block liền nhau trong HTML nguồn (vd.
 *  "</h2><div>") sẽ dính chữ làm một nếu chỉ xoá tag, VD "chăm sócda đầu" thay vì "chăm sóc da đầu". */
export function stripTags(html: string): string {
    return decodeHtmlEntities(html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
}

/** Cắt chữ về tối đa `maxLength` ký tự, dừng ở khoảng trắng gần nhất (không cắt giữa từ) — dùng cho meta description. */
export function truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;

    const cut = text.slice(0, maxLength);
    const lastSpace = cut.lastIndexOf(' ');

    return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd() + '…';
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
