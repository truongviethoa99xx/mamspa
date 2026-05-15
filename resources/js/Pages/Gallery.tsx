import { Head } from '@inertiajs/react';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { useTranslation } from 'react-i18next';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Gallery({ images }: { images: { src: string; branch: string }[] }) {
    const { t } = useTranslation();
    const [index, setIndex] = useState(-1);
    return (
        <PublicLayout>
            <Head title={t('nav.gallery')} />
            <section className="bg-maha-50 py-12">
                <div className="mx-auto max-w-5xl px-4">
                    <h1 className="font-serif text-4xl text-maha-700">{t('nav.gallery')}</h1>
                </div>
            </section>
            <section className="py-12">
                <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 md:grid-cols-4">
                    {images.map((img, i) => (
                        <button key={i} onClick={() => setIndex(i)} className="aspect-square overflow-hidden rounded-lg">
                            <img src={img.src} alt="" className="h-full w-full object-cover transition hover:scale-105" />
                        </button>
                    ))}
                </div>
            </section>
            <Lightbox open={index >= 0} close={() => setIndex(-1)} index={index} slides={images.map((i) => ({ src: i.src }))} />
        </PublicLayout>
    );
}
