/** Thứ tự ưu tiên khi chọn PDF mặc định cho nút "Xem Menu" (khớp locale hiện tại trước) —
 *  dùng chung giữa thẻ chi nhánh (teaser) và trang chi tiết chi nhánh. */
export const PDF_LOCALE_ORDER = ['vi', 'en', 'zh', 'ko', 'ja'] as const;

export const PDF_LOCALE_LABELS: Record<string, string> = {
    vi: 'VI',
    en: 'EN',
    zh: '中文',
    ko: '한국어',
    ja: '日本語',
};

export type MenuPdfLocale = (typeof PDF_LOCALE_ORDER)[number];
export type MenuBranchPdfs = Partial<Record<MenuPdfLocale, string | null>>;

/** Chọn PDF phù hợp nhất để mở mặc định: ưu tiên locale hiện tại, sau đó theo PDF_LOCALE_ORDER. */
export function pickDefaultPdf(pdfs: MenuBranchPdfs, locale: string): string | null {
    if (pdfs[locale as MenuPdfLocale]) return pdfs[locale as MenuPdfLocale] ?? null;

    for (const code of PDF_LOCALE_ORDER) {
        if (pdfs[code]) return pdfs[code] ?? null;
    }

    return null;
}
