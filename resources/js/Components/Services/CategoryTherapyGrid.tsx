import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { tr, stripTags } from '@/Lib/utils';

export interface CategoryTherapyItem {
    url: string;
    name: unknown;
    short_description?: unknown;
    thumbnail_alt?: unknown;
    images?: string[];
}

const HEADING_LABEL: Record<string, string> = { vi: 'NHÓM LIỆU PHÁP', en: 'THERAPY GROUPS' };
const SEE_MORE_LABEL: Record<string, string> = { vi: 'Xem thêm', en: 'See more' };

/** "NHÓM LIỆU PHÁP" — lưới các dịch vụ con thuộc danh mục, mỗi thẻ dẫn tới trang chi tiết. */
export function CategoryTherapyGrid({ items, heading }: { items: CategoryTherapyItem[]; heading?: unknown }) {
    const locale = useLocale();

    if (!items.length) {
        return null;
    }

    const customLabel = tr(heading, locale);
    const fallbackLabel = HEADING_LABEL[locale] ?? HEADING_LABEL.vi;
    const seeMoreLabel = SEE_MORE_LABEL[locale] ?? SEE_MORE_LABEL.vi;

    return (
        <section className="mt-1 bg-[#f5f2ed] px-5 pb-2 pt-4 sm:px-10 lg:px-[60px]">
            <div className="text-center">
                <h2 className="font-serif text-sm uppercase tracking-[0.25em] text-heading">
                    {customLabel ? (
                        <span
                            className="rich-content inline [&>p]:inline"
                            dangerouslySetInnerHTML={{ __html: customLabel }}
                        />
                    ) : (
                        fallbackLabel
                    )}
                </h2>
                <span className="mx-auto mt-3 block h-px w-10 bg-maha-300" aria-hidden="true" />
            </div>
            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
                {items.map((item) => {
                    const itemName = tr(item.name, locale);
                    const itemDescription = tr(item.short_description, locale);
                    const itemImageAlt = tr(item.thumbnail_alt, locale);

                    return (
                        <article
                            key={item.url}
                            className="group flex flex-col overflow-hidden rounded-[8px] border border-maha-200 bg-white"
                        >
                            <div className="aspect-square bg-maha-200">
                                {item.images?.[0] && (
                                    <img
                                        src={item.images[0]}
                                        alt={itemImageAlt || stripTags(itemName)}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                )}
                            </div>
                            <div className="flex flex-1 flex-col p-4">
                                <h3
                                    className="rich-content font-serif text-lg leading-snug text-heading"
                                    dangerouslySetInnerHTML={{ __html: itemName }}
                                />
                                {itemDescription && (
                                    <div
                                        className="rich-content mt-1 text-xs leading-relaxed text-ink/70"
                                        dangerouslySetInnerHTML={{ __html: itemDescription }}
                                    />
                                )}
                                <Link
                                    href={item.url}
                                    aria-label={stripTags(itemName)}
                                    className="mt-3 inline-flex w-fit items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-heading transition-transform hover:translate-x-1"
                                >
                                    <span>{seeMoreLabel}</span>
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </Link>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
