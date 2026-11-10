import { Leaf } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { useReveal } from '@/Hooks/useReveal';
import { cn, tr } from '@/Lib/utils';
import { PDF_LOCALE_ORDER, PDF_LOCALE_LABELS, type MenuBranchPdfs } from '@/Lib/menuPdf';

interface MenuBranchItem {
    slug: string;
    url: string;
    image?: string | null;
    image_alt?: unknown;
    name?: unknown;
    street?: unknown;
    pdfs?: MenuBranchPdfs;
}

export interface MenuBranchesData {
    items: MenuBranchItem[];
}

/** Danh sách thẻ chi nhánh — mỗi thẻ có sẵn các nút "Xem Menu" theo ngôn ngữ, mở thẳng file
 *  PDF tương ứng trong tab mới (không cần qua trang chi tiết). Trang riêng /menu/{slug}/
 *  (xem MenuBranch.tsx) vẫn tồn tại song song để dễ chia sẻ link/QR riêng cho từng chi nhánh. */
export function MenuBranches({ data }: { data: MenuBranchesData }) {
    const locale = useLocale();
    const items = data.items ?? [];
    const { ref, className } = useReveal<HTMLElement>();

    if (!items.length) return null;

    return (
        <section ref={ref} className={cn(className, 'px-5 py-10 sm:px-10 lg:px-[60px]')}>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
                {items.map((branch) => {
                    const name = tr(branch.name, locale);
                    const street = tr(branch.street, locale);
                    const imageAlt = tr(branch.image_alt, locale) || name;
                    const hasImage = !!branch.image;
                    const pdfs = branch.pdfs ?? {};
                    const availablePdfs = PDF_LOCALE_ORDER.filter((code) => pdfs[code]);

                    return (
                        <div
                            key={branch.slug}
                            className="flex flex-col overflow-hidden rounded-2xl border border-maha-200 bg-maha-50"
                        >
                            <div className="h-64 w-full shrink-0 bg-maha-200 sm:h-72 md:h-80">
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

                                {availablePdfs.length > 0 && (
                                    <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
                                        {availablePdfs.map((code) => (
                                            <a
                                                key={code}
                                                href={pdfs[code] ?? undefined}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center rounded-full border border-maha-300 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-heading transition-colors hover:border-subheading hover:bg-maha-100"
                                            >
                                                {PDF_LOCALE_LABELS[code] ?? code.toUpperCase()}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
