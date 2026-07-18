import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { useReveal } from '@/Hooks/useReveal';
import { tr, cn } from '@/Lib/utils';

export interface SpaceItem {
    image?: string | null;
    image_alt?: unknown;
    title?: unknown;
    description?: unknown;
    link_text?: unknown;
    link_url?: string | null;
}

export interface SpacesData {
    title?: unknown;
    items: SpaceItem[];
}

/**
 * "Our Spaces" — grid thẻ không gian, 1 hàng tối đa 2 thẻ. 1 thẻ duy nhất (hoặc thẻ
 * cuối khi tổng số lẻ) chiếm full width, còn lại chia đôi 50/50. Mỗi thẻ full-bleed
 * ảnh + chữ đè bên trái trên nền mờ dần, cùng phong cách Banner 2 (Story); chiều cao
 * cố định như Art Banner.
 */
export function Spaces({ data }: { data: SpacesData }) {
    const locale = useLocale();
    const title = tr(data.title, locale);
    const items = data.items ?? [];
    const isOdd = items.length % 2 === 1;
    const { ref, className } = useReveal<HTMLElement>();

    if (!items.length) {
        return null;
    }

    return (
        <section
            ref={ref}
            className={cn(className, 'bg-maha-50 px-5 pb-4 pt-4 sm:px-10 sm:pb-6 sm:pt-6 lg:px-16 lg:pb-8 lg:pt-8')}
        >
            <div className="mx-auto max-w-7xl">
                {title && (
                    <p className="font-serif text-xs uppercase tracking-[0.2em] text-subheading">{title}</p>
                )}

                <div className="mt-1 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {items.map((item, index) => {
                        const itemTitle = tr(item.title, locale);
                        const imageAlt = tr(item.image_alt, locale) || itemTitle.replace(/<[^>]+>/g, '');
                        const description = tr(item.description, locale);
                        const linkText = tr(item.link_text, locale);
                        const isLastOdd = isOdd && index === items.length - 1;

                        return (
                            <Link
                                key={index}
                                href={item.link_url || '#'}
                                className={cn(
                                    'group relative isolate block h-[230px] overflow-hidden rounded-[4px] bg-maha-200 sm:h-[260px]',
                                    isLastOdd && 'sm:col-span-2',
                                )}
                            >
                                {item.image && (
                                    <img
                                        src={item.image}
                                        alt={imageAlt}
                                        className="absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                )}

                                <div className="relative z-10 flex h-full w-full flex-col justify-center px-6 py-8 sm:w-3/5 sm:px-8 lg:w-1/2 lg:px-10">
                                    <div
                                        className="absolute inset-0 -z-10"
                                        style={{
                                            background:
                                                'linear-gradient(90deg, rgba(236,225,219,0.97) 0%, rgba(236,225,219,0.9) 55%, rgba(236,225,219,0) 100%)',
                                        }}
                                    />
                                    {itemTitle && (
                                        <div
                                            className="rich-content font-serif text-xl leading-snug text-heading"
                                            dangerouslySetInnerHTML={{ __html: itemTitle }}
                                        />
                                    )}
                                    {description && (
                                        <div
                                            className="rich-content mt-2 text-sm leading-relaxed text-ink/70"
                                            dangerouslySetInnerHTML={{ __html: description }}
                                        />
                                    )}
                                    {linkText && (
                                        <span className="mt-4 inline-flex w-fit items-center gap-2 text-sm font-medium text-heading">
                                            {linkText}
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </span>
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
