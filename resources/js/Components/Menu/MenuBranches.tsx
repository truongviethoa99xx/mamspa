import { FileText, Leaf } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { useReveal } from '@/Hooks/useReveal';
import { cn, tr } from '@/Lib/utils';

/** Thứ tự ưu tiên khi chọn PDF mặc định cho nút "Xem Menu" (khớp locale hiện tại trước). */
const PDF_LOCALE_ORDER = ['vi', 'en', 'zh', 'ko', 'ja'] as const;

const PDF_LOCALE_LABELS: Record<string, string> = {
    vi: 'VI',
    en: 'EN',
    zh: '中文',
    ko: '한국어',
    ja: '日本語',
};

type MenuBranchPdfs = Partial<Record<(typeof PDF_LOCALE_ORDER)[number], string | null>>;

interface MenuBranchItem {
    image?: string | null;
    image_alt?: unknown;
    name?: unknown;
    street?: unknown;
    desc?: unknown;
    pdfs?: MenuBranchPdfs;
}

export interface MenuBranchesData {
    items: MenuBranchItem[];
}

/** Chọn PDF phù hợp nhất cho nút "Xem Menu": ưu tiên locale hiện tại, sau đó theo PDF_LOCALE_ORDER. */
function pickDefaultPdf(pdfs: MenuBranchPdfs, locale: string): string | null {
    if (pdfs[locale as keyof MenuBranchPdfs]) return pdfs[locale as keyof MenuBranchPdfs] ?? null;

    for (const code of PDF_LOCALE_ORDER) {
        if (pdfs[code]) return pdfs[code] ?? null;
    }

    return null;
}

/** Danh sách chi nhánh — mỗi thẻ có ảnh, thông tin giới thiệu và menu PDF theo 5 ngôn ngữ. */
export function MenuBranches({ data }: { data: MenuBranchesData }) {
    const locale = useLocale();
    const items = data.items ?? [];
    const { ref, className } = useReveal<HTMLElement>();

    if (!items.length) return null;

    return (
        <section ref={ref} className={cn(className, 'px-5 py-10 sm:px-10 lg:px-[60px]')}>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
                {items.map((branch, index) => {
                    const name = tr(branch.name, locale);
                    const street = tr(branch.street, locale);
                    const desc = tr(branch.desc, locale);
                    const imageAlt = tr(branch.image_alt, locale) || name;
                    const hasImage = !!branch.image;
                    const pdfs = branch.pdfs ?? {};
                    const availableLocales = PDF_LOCALE_ORDER.filter((code) => pdfs[code]);
                    const defaultPdf = pickDefaultPdf(pdfs, locale);

                    return (
                        <article
                            key={index}
                            className="flex flex-col overflow-hidden rounded-2xl border border-maha-200 bg-maha-50"
                        >
                            <div className="aspect-[4/3] w-full bg-maha-200">
                                {hasImage && (
                                    <img
                                        src={branch.image ?? undefined}
                                        alt={imageAlt}
                                        className="h-full w-full object-cover"
                                        loading="lazy"
                                    />
                                )}
                            </div>

                            <div className="flex flex-1 flex-col items-center px-7 py-9 text-center sm:px-9">
                                <Leaf className="h-5 w-5 text-maha-300" strokeWidth={1.2} />
                                {name && (
                                    <h3 className="mt-4 font-serif text-2xl uppercase tracking-[0.1em] text-heading">
                                        {name}
                                    </h3>
                                )}
                                {street && (
                                    <p className="mt-1.5 text-xs tracking-[0.2em] text-ink/50">{street}</p>
                                )}
                                <span className="mt-5 h-px w-10 bg-maha-300" />
                                {desc && (
                                    <div
                                        className="rich-content mt-5 text-sm leading-relaxed text-ink/65"
                                        dangerouslySetInnerHTML={{ __html: desc }}
                                    />
                                )}

                                {defaultPdf && (
                                    <a
                                        href={defaultPdf}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group mt-7 inline-flex items-center gap-3 rounded border border-maha-300 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-heading transition-colors hover:border-subheading hover:bg-maha-100"
                                    >
                                        <FileText className="h-4 w-4" strokeWidth={1.5} />
                                        <span>Xem Menu</span>
                                    </a>
                                )}

                                {availableLocales.length > 1 && (
                                    <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                                        {availableLocales.map((code) => (
                                            <a
                                                key={code}
                                                href={pdfs[code] ?? undefined}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="rounded-full border border-maha-200 px-3 py-1 text-[11px] font-medium text-ink/60 transition-colors hover:border-subheading hover:text-subheading"
                                            >
                                                {PDF_LOCALE_LABELS[code] ?? code.toUpperCase()}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
