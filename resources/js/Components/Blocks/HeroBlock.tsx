import { Link } from '@inertiajs/react';
import { tr } from '@/Lib/utils';
import { useLocale } from '@/Hooks/useLocale';

export function HeroBlock({ data }: { data: any }) {
    const locale = useLocale();
    return (
        <section
            className="relative flex min-h-[500px] items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: data.image ? `url(${data.image})` : 'linear-gradient(135deg, #fbf7f2, #e6d3b3)' }}
        >
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10 max-w-3xl px-4 text-center text-white">
                <h1 className="font-serif text-4xl drop-shadow md:text-6xl">{tr(data.title, locale)}</h1>
                {data.subtitle && (
                    <p className="mt-4 text-lg drop-shadow md:text-xl">{tr(data.subtitle, locale)}</p>
                )}
                {data.cta_text && data.cta_link && (
                    <Link
                        href={data.cta_link}
                        className="mt-8 inline-block rounded-full bg-maha-600 px-8 py-3 font-semibold text-white shadow-lg hover:bg-maha-700"
                    >
                        {data.cta_text}
                    </Link>
                )}
            </div>
        </section>
    );
}
