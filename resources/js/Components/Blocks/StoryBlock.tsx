import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { tr } from '@/Lib/utils';

interface StoryData {
    eyebrow?: unknown;
    body?: unknown;
    cta_text?: unknown;
    cta_link?: string;
    image?: string | null;
}

/** "A Place To Pause" — đoạn giới thiệu thương hiệu ngắn, ảnh minh hoạ bên cạnh. */
export function StoryBlock({ data }: { data: StoryData }) {
    const locale = useLocale();
    const eyebrow = tr(data.eyebrow, locale);
    const body = tr(data.body, locale);
    const ctaText = tr(data.cta_text, locale);
    const paragraphs = body.split('\n').filter((p) => p.trim());

    return (
        <section className="bg-maha-50 py-10 sm:py-14 md:py-20 lg:py-24">
            <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 sm:px-6 md:grid-cols-2 md:gap-16 2xl:max-w-[1440px]">
                <div>
                    <p className="font-serif text-sm uppercase italic tracking-[0.12em] text-[#556B3F] md:text-base">
                        {eyebrow}
                    </p>
                    <div className="mt-5 space-y-1 font-serif text-xl leading-relaxed text-ink sm:text-2xl md:mt-8 md:text-3xl">
                        {paragraphs.map((p, i) => (
                            <p key={i}>{p}</p>
                        ))}
                    </div>
                    {data.cta_link && (
                        <Link
                            href={data.cta_link}
                            className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-ink md:mt-10"
                        >
                            <span>{ctaText}</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    )}
                </div>

                <div className="aspect-[6/5] overflow-hidden rounded-2xl bg-maha-200 md:aspect-[4/3]">
                    {data.image && <img src={data.image} alt="" className="h-full w-full object-cover" />}
                </div>
            </div>
        </section>
    );
}
