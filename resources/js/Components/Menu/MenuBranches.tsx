import { Link } from '@inertiajs/react';
import { ArrowRight, Leaf } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { useReveal } from '@/Hooks/useReveal';
import { cn, tr } from '@/Lib/utils';

interface MenuBranchItem {
    slug: string;
    url: string;
    image?: string | null;
    image_alt?: unknown;
    name?: unknown;
    street?: unknown;
}

export interface MenuBranchesData {
    items: MenuBranchItem[];
}

/** Danh sách thẻ chi nhánh — mỗi thẻ dẫn sang trang riêng của chi nhánh đó (/menu/{slug}/),
 *  nơi hiển thị đầy đủ thông tin + menu PDF theo ngôn ngữ (xem MenuBranch.tsx). */
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

                    return (
                        <Link
                            key={branch.slug}
                            href={branch.url}
                            className="group flex flex-col overflow-hidden rounded-2xl border border-maha-200 bg-maha-50 transition-colors hover:border-subheading"
                        >
                            <div className="h-64 w-full shrink-0 bg-maha-200 sm:h-72 md:h-80">
                                {hasImage && (
                                    <img
                                        src={branch.image ?? undefined}
                                        alt={imageAlt}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                                <span className="mt-7 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-heading">
                                    Xem Menu
                                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
