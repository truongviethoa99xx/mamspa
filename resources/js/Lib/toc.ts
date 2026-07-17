export interface TocItem {
    id: string;
    text: string;
    level: 2 | 3;
}

// Dải Unicode combining diacritical marks (kết quả của String.normalize('NFD') trên nguyên âm có dấu).
const COMBINING_MARKS = /[̀-ͯ]/g;

function slugify(text: string, usedIds: Set<string>): string {
    const base =
        text
            .toLowerCase()
            .replace(/đ/g, 'd')
            .normalize('NFD')
            .replace(COMBINING_MARKS, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '') || 'section';

    let slug = base;
    let suffix = 2;
    while (usedIds.has(slug)) {
        slug = `${base}-${suffix++}`;
    }
    usedIds.add(slug);

    return slug;
}

/** Trích mục lục (h2/h3) từ HTML bài viết và gắn `id` vào từng heading để neo cuộn tới. */
export function extractToc(html: string): { html: string; toc: TocItem[] } {
    const usedIds = new Set<string>();
    const toc: TocItem[] = [];

    const withIds = html.replace(/<(h2|h3)([^>]*)>(.*?)<\/\1>/gis, (match, tag, attrs, inner) => {
        const text = inner.replace(/<[^>]+>/g, '').trim();
        if (!text) return match;

        const id = slugify(text, usedIds);
        toc.push({ id, text, level: tag.toLowerCase() === 'h2' ? 2 : 3 });

        const newAttrs = /\sid=/i.test(attrs) ? attrs : `${attrs} id="${id}"`;
        return `<${tag}${newAttrs}>${inner}</${tag}>`;
    });

    return { html: withIds, toc };
}
