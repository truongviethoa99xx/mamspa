import { Info } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { useReveal } from '@/Hooks/useReveal';
import { cn, tr } from '@/Lib/utils';

export interface OfferNoteData {
    text?: unknown;
    image?: string | null;
    image_alt?: unknown;
}

/** Dải thông tin nhỏ — icon info + danh sách lưu ý bên trái, ảnh minh hoạ bên phải. */
export function OfferNote({ data }: { data: OfferNoteData }) {
    const locale = useLocale();
    const text = tr(data.text, locale);
    const imageAlt = tr(data.image_alt, locale);
    const hasImage = !!data.image;
    const { ref, className } = useReveal<HTMLElement>();

    if (!text) return null;

    return (
        <section ref={ref} className={cn(className, 'bg-[#f5f2ed] px-5 pb-[50px] sm:px-10 lg:px-[60px]')}>
            <div className="mx-auto grid max-w-6xl grid-cols-1 overflow-hidden rounded-2xl bg-maha-100 md:grid-cols-2">
                <div className="flex items-center gap-5 p-7 sm:p-9">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-maha-300">
                        <Info className="h-5 w-5 text-subheading" strokeWidth={1.5} />
                    </div>
                    <div
                        className="rich-content text-sm leading-relaxed text-ink/75"
                        dangerouslySetInnerHTML={{ __html: text }}
                    />
                </div>
                {hasImage && (
                    <div className="aspect-[4/3] w-full md:aspect-auto md:min-h-[180px]">
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
