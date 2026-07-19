import { Leaf } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { useReveal } from '@/Hooks/useReveal';
import { cn, tr } from '@/Lib/utils';

export interface MenuIntroData {
    title?: unknown;
    note?: unknown;
}

/** Đoạn giới thiệu ngắn phía trên danh sách chi nhánh — tiêu đề + divider lá + ghi chú. */
export function MenuIntro({ data }: { data: MenuIntroData }) {
    const locale = useLocale();
    const title = tr(data.title, locale);
    const note = tr(data.note, locale);
    const { ref, className } = useReveal<HTMLElement>();

    if (!title && !note) return null;

    return (
        <section ref={ref} className={cn(className, 'mx-auto max-w-3xl px-6 pb-6 pt-16 text-center sm:pt-20')}>
            {title && (
                <h2
                    className="rich-content font-serif text-xl leading-relaxed text-heading sm:text-2xl"
                    dangerouslySetInnerHTML={{ __html: title }}
                />
            )}
            <div className="mt-7 flex items-center justify-center gap-3">
                <span className="h-px w-7 bg-maha-300" />
                <Leaf className="h-4 w-4 text-maha-300" strokeWidth={1.2} />
                <span className="h-px w-7 bg-maha-300" />
            </div>
            {note && (
                <div
                    className="rich-content mt-7 text-sm leading-loose text-ink/60"
                    dangerouslySetInnerHTML={{ __html: note }}
                />
            )}
        </section>
    );
}
