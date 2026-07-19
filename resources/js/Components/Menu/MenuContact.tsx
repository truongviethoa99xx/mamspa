import { HeartHandshake } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { useReveal } from '@/Hooks/useReveal';
import { cn, tr } from '@/Lib/utils';

export interface MenuContactData {
    title?: unknown;
    text?: unknown;
    image?: string | null;
    image_alt?: unknown;
}

/** Dải liên hệ cuối trang — icon + tiêu đề/nội dung bên trái, ảnh minh hoạ bên phải. */
export function MenuContact({ data }: { data: MenuContactData }) {
    const locale = useLocale();
    const title = tr(data.title, locale);
    const text = tr(data.text, locale);
    const imageAlt = tr(data.image_alt, locale);
    const hasImage = !!data.image;
    const { ref, className } = useReveal<HTMLElement>();

    if (!title && !text) return null;

    return (
        <section ref={ref} className={cn(className, 'px-5 pb-16 pt-4 sm:px-10 lg:px-[60px]')}>
            <div className="mx-auto grid max-w-5xl grid-cols-1 overflow-hidden rounded-2xl border border-maha-200 bg-maha-50 md:grid-cols-2">
                <div className="flex items-center gap-6 p-8 sm:p-10">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-maha-300">
                        <HeartHandshake className="h-6 w-6 text-subheading" strokeWidth={1.4} />
                    </div>
                    <div>
                        {title && <h3 className="font-serif text-xl text-heading sm:text-2xl">{title}</h3>}
                        {text && (
                            <div
                                className="rich-content mt-2.5 text-sm leading-relaxed text-ink/65"
                                dangerouslySetInnerHTML={{ __html: text }}
                            />
                        )}
                    </div>
                </div>
                {hasImage && (
                    <div className="aspect-[4/3] w-full md:aspect-auto md:min-h-[190px]">
                        <img
                            src={data.image ?? undefined}
                            alt={imageAlt}
                            className="h-full w-full object-cover"
                            loading="lazy"
                        />
                    </div>
                )}
            </div>
        </section>
    );
}
