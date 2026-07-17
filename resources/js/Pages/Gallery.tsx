import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { useLocale } from '@/Hooks/useLocale';
import { tr } from '@/Lib/utils';

interface GalleryImage {
    src: string;
    alt?: unknown;
    is_customer?: boolean;
}

interface Props {
    images: GalleryImage[];
}

export default function Gallery({ images }: Props) {
    const locale = useLocale();

    return (
        <PublicLayout>
            <Head title="Thư viện ảnh" />

            <section className="bg-maha-50 px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
                <div className="mx-auto max-w-7xl">
                    <p className="font-serif text-xs uppercase tracking-[0.2em] text-subheading">Gallery</p>
                    <h1 className="mt-3 font-serif text-3xl text-heading sm:text-4xl">Thư viện ảnh</h1>

                    {images.length ? (
                        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
                            {images.map((image, index) => {
                                const alt = tr(image.alt, locale) || 'Khách hàng trải nghiệm tại Mầm Spa';

                                return (
                                    <div key={index} className="aspect-square overflow-hidden rounded-[4px] bg-maha-200">
                                        <img
                                            src={image.src}
                                            alt={alt}
                                            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                            loading="lazy"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="mt-10 text-sm text-ink/70">Chưa có hình ảnh nào được đăng tải.</p>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
