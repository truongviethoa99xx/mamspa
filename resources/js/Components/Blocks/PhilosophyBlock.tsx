import { useLocale } from '@/Hooks/useLocale';
import { tr } from '@/Lib/utils';

interface PhilosophyData {
    eyebrow?: unknown;
    quote?: unknown;
}

/** "Our Philosophy" — trích dẫn triết lý trị liệu, căn giữa trang. */
export function PhilosophyBlock({ data }: { data: PhilosophyData }) {
    const locale = useLocale();
    const eyebrow = tr(data.eyebrow, locale);
    const quote = tr(data.quote, locale);
    const lines = quote.split('\n').filter((l) => l.trim());

    return (
        <section className="bg-[#F6F3EF] py-14 sm:py-20 md:py-28">
            <div className="mx-auto max-w-4xl px-5 text-center sm:px-6">
                <p className="font-serif text-sm uppercase italic tracking-[0.12em] text-[#556B3F] md:text-base">
                    {eyebrow}
                </p>
                <div className="mt-6 space-y-2 font-serif text-2xl leading-snug text-heading sm:text-3xl md:mt-8 md:text-4xl lg:text-5xl">
                    {lines.map((l, i) => (
                        <p key={i}>{l}</p>
                    ))}
                </div>
                <span className="mx-auto mt-8 block h-px w-16 bg-maha-300 md:mt-12" />
            </div>
        </section>
    );
}
