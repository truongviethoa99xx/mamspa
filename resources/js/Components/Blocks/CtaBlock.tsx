import { Link } from '@inertiajs/react';
import { useLocale } from '@/Hooks/useLocale';
import { tr } from '@/Lib/utils';

export function CtaBlock({ data }: { data: any }) {
    const locale = useLocale();
    return (
        <section className="bg-maha-700 py-16 text-white">
            <div className="mx-auto max-w-4xl px-4 text-center">
                <h2 className="font-serif text-3xl md:text-4xl">{tr(data.title, locale)}</h2>
                {data.description && <p className="mt-3 text-maha-100">{tr(data.description, locale)}</p>}
                {data.button_text && data.button_link && (
                    <Link
                        href={data.button_link}
                        className="mt-6 inline-block rounded-full bg-white px-8 py-3 font-semibold text-maha-700 hover:bg-maha-50"
                    >
                        {data.button_text}
                    </Link>
                )}
            </div>
        </section>
    );
}
