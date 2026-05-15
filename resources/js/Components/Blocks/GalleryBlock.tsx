import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { useLocale } from '@/Hooks/useLocale';
import { tr } from '@/Lib/utils';

export function GalleryBlock({ data }: { data: any }) {
    const locale = useLocale();
    const [index, setIndex] = useState(-1);
    const images: string[] = data.images ?? [];

    return (
        <section className="bg-maha-50 py-16">
            <div className="mx-auto max-w-7xl px-4">
                {data.title && (
                    <h2 className="mb-8 text-center font-serif text-3xl text-maha-700">{tr(data.title, locale)}</h2>
                )}
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    {images.map((src, i) => (
                        <button key={i} onClick={() => setIndex(i)} className="aspect-square overflow-hidden rounded-lg">
                            <img src={src} alt="" className="h-full w-full object-cover transition hover:scale-105" />
                        </button>
                    ))}
                </div>
            </div>
            <Lightbox
                open={index >= 0}
                close={() => setIndex(-1)}
                index={index}
                slides={images.map((src) => ({ src }))}
            />
        </section>
    );
}
