import { Instagram } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { useReveal } from '@/Hooks/useReveal';
import { tr, cn } from '@/Lib/utils';

interface InstagramImageItem {
    image?: string | null;
    image_alt?: unknown;
}

export interface InstagramStripData {
    title?: unknown;
    items: InstagramImageItem[];
    handle?: string;
    description?: unknown;
    url?: string;
}

/** "Theo dõi Mầm trên Instagram" — dải ảnh vuông cuộn ngang + thẻ thông tin tài khoản. */
export function InstagramStrip({ data }: { data: InstagramStripData }) {
    const locale = useLocale();
    const title = tr(data.title, locale);
    const description = tr(data.description, locale);
    const items = data.items ?? [];
    const { ref, className } = useReveal<HTMLElement>();

    if (!items.length && !data.handle) return null;

    return (
        <section ref={ref} className={cn(className, 'mt-[50px] bg-[#f5f2ed] px-5 pb-4 sm:px-10 lg:px-[60px]')}>
            {title && <h2 className="mb-5 font-serif text-lg uppercase tracking-wide text-heading">{title}</h2>}

            <div className="flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {items.map((item, index) => {
                    const alt = tr(item.image_alt, locale);

                    return (
                        <div key={index} className="aspect-square w-28 shrink-0 overflow-hidden rounded-[3px] bg-maha-200 sm:w-36">
                            {item.image && (
                                <img
                                    src={item.image}
                                    alt={alt}
                                    loading="lazy"
                                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                />
                            )}
                        </div>
                    );
                })}

                {data.handle && (
                    <a
                        href={data.url || undefined}
                        target="_blank"
                        rel="noreferrer"
                        className="flex aspect-square w-28 shrink-0 flex-col justify-center gap-1.5 rounded-[3px] bg-[#2F3E2E] p-4 text-white transition-opacity hover:opacity-90 sm:w-36"
                    >
                        <Instagram className="h-5 w-5" strokeWidth={1.3} />
                        <span className="text-sm font-semibold">{data.handle}</span>
                        {description && (
                            <span
                                className="rich-content text-xs leading-snug text-white/70"
                                dangerouslySetInnerHTML={{ __html: description }}
                            />
                        )}
                    </a>
                )}
            </div>
        </section>
    );
}
