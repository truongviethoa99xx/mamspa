import { Info } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { useReveal } from '@/Hooks/useReveal';
import { cn, tr } from '@/Lib/utils';

export interface OfferNoteData {
    text?: unknown;
    image?: string | null;
    image_alt?: unknown;
}

/** Khối ghi chú nhỏ — icon info + đoạn lưu ý (thường là danh sách) + ảnh minh hoạ. */
export function OfferNote({ data }: { data: OfferNoteData }) {
    const locale = useLocale();
    const text = tr(data.text, locale);
    const imageAlt = tr(data.image_alt, locale);
    const hasImage = !!data.image;
    const { ref, className } = useReveal<HTMLElement>();

    if (!text) return null;

    return (
        <section ref={ref} className={cn(className, 'bg-[#f5f2ed] px-5 pb-[50px] sm:px-10 lg:px-[60px]')}>
            <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 rounded-2xl border border-maha-200 bg-white p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-8">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-maha-300">
                    <Info className="h-5 w-5 text-subheading" strokeWidth={1.5} />
                </div>
                <div
                    className="rich-content flex-1 text-sm leading-relaxed text-ink/75"
                    dangerouslySetInnerHTML={{ __html: text }}
                />
                {hasImage && (
                    <div className="aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl sm:w-56">
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
