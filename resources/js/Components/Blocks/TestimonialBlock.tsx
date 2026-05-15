import { Star } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { tr } from '@/Lib/utils';

interface TestimonialItem {
    name: string;
    avatar?: string;
    content: string;
    rating: number;
}

export function TestimonialBlock({ data }: { data: any }) {
    const locale = useLocale();
    const items: TestimonialItem[] = data.items ?? [];

    return (
        <section className="bg-white py-16">
            <div className="mx-auto max-w-5xl px-4">
                {data.title && (
                    <h2 className="mb-10 text-center font-serif text-3xl text-maha-700">{tr(data.title, locale)}</h2>
                )}
                <div className="grid gap-6 md:grid-cols-2">
                    {items.map((t, i) => (
                        <figure key={i} className="rounded-xl border border-maha-100 bg-maha-50 p-6">
                            <div className="mb-3 flex gap-0.5 text-maha-600">
                                {Array.from({ length: t.rating }).map((_, j) => (
                                    <Star key={j} className="h-4 w-4 fill-current" />
                                ))}
                            </div>
                            <blockquote className="italic text-gray-700">"{t.content}"</blockquote>
                            <figcaption className="mt-4 text-sm font-semibold text-maha-700">— {t.name}</figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
}
