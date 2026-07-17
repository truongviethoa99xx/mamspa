import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { tr, cn, stripTags } from '@/Lib/utils';

export interface ServiceShowcaseItem {
    image?: string | null;
    title?: unknown;
    description?: unknown;
    url: string;
}

export interface ServicesShowcaseData {
    items: ServiceShowcaseItem[];
}

const EXPLORE_MORE: Record<string, string> = { vi: 'Khám phá thêm', en: 'Explore more' };

/** 4 khối dịch vụ nổi bật = danh mục dịch vụ cấp 1 thật (quản lý ở Danh mục dịch vụ) — ảnh và chữ xen kẽ trái/phải. */
export function ServicesShowcase({ data }: { data: ServicesShowcaseData }) {
    const locale = useLocale();

    if (!data.items?.length) {
        return null;
    }

    return (
        <section className="mt-[24px] bg-maha-50 px-5 pb-16 sm:px-10 sm:pb-20 lg:px-[60px] lg:pb-24">
            <div className="mx-auto flex max-w-6xl flex-col gap-6">
                {data.items.map((item, index) => {
                    const title = tr(item.title, locale);
                    const description = tr(item.description, locale);
                    const ctaText = EXPLORE_MORE[locale] ?? EXPLORE_MORE.vi;
                    const imageFirst = index % 2 === 0;

                    return (
                        <div key={index} className="grid grid-cols-1 overflow-hidden rounded-sm sm:grid-cols-2">
                            <div className={cn('relative aspect-[4/3] bg-maha-200 sm:aspect-auto', !imageFirst && 'sm:order-2')}>
                                {item.image && (
                                    <img
                                        src={item.image}
                                        alt={stripTags(title)}
                                        className="absolute inset-0 h-full w-full object-cover"
                                    />
                                )}
                            </div>
                            <div
                                className={cn(
                                    'flex flex-col justify-center bg-[#f4eae1] px-6 py-10 sm:px-10 sm:py-12 lg:px-14',
                                    !imageFirst && 'sm:order-1',
                                )}
                            >
                                <div className="flex items-start gap-4">
                                    <span className="relative bottom-[20px] shrink-0 font-serif text-4xl text-heading/25 sm:text-5xl">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <div className="flex-1">
                                        {title && (
                                            <h3
                                                className="rich-content font-serif text-2xl leading-snug text-heading sm:text-3xl"
                                                dangerouslySetInnerHTML={{ __html: title }}
                                            />
                                        )}
                                        <div className="mt-5 h-px w-16 bg-heading/30" />
                                        {description && (
                                            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink/70">{description}</p>
                                        )}
                                        <Link
                                            href={item.url}
                                            className="group mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-wide text-heading"
                                        >
                                            <span>{ctaText}</span>
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
