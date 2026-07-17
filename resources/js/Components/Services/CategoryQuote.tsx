import { Quote } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { tr } from '@/Lib/utils';

export interface CategoryQuoteData {
    quote?: unknown;
}

/** Khối trích dẫn lớn chính giữa trang danh mục. */
export function CategoryQuote({ data }: { data: CategoryQuoteData }) {
    const locale = useLocale();
    const quote = tr(data.quote, locale);

    if (!quote) {
        return null;
    }

    return (
        <section className="mt-1 bg-maha-200 px-5 py-10 text-center sm:px-10 sm:py-14 lg:px-[60px]">
            <Quote className="mx-auto h-6 w-6 text-heading/50" strokeWidth={1.25} aria-hidden="true" />
            <div
                className="rich-content mx-auto mt-4 max-w-2xl font-serif text-xl leading-snug text-heading sm:text-2xl"
                dangerouslySetInnerHTML={{ __html: quote }}
            />
        </section>
    );
}
