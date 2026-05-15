import { useLocale } from '@/Hooks/useLocale';
import { tr } from '@/Lib/utils';

export function TextBlock({ data }: { data: any }) {
    const locale = useLocale();
    const body = tr(data.body, locale);
    return (
        <section className="bg-white py-12">
            <article
                className="prose prose-stone mx-auto max-w-3xl px-4"
                dangerouslySetInnerHTML={{ __html: body }}
            />
        </section>
    );
}
