import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { useReveal } from '@/Hooks/useReveal';
import { tr, cn } from '@/Lib/utils';

export interface GalleryPreviewImage {
    src: string;
    alt?: unknown;
    is_customer?: boolean;
}

export interface GalleryPreviewData {
    images: GalleryPreviewImage[];
    link: string;
}

/** Dải ảnh xem trước thư viện ảnh, dẫn tới trang thư viện ảnh đầy đủ. */
export function GalleryPreview({ data }: { data: GalleryPreviewData }) {
    const locale = useLocale();
    const { ref, className } = useReveal<HTMLElement>();

    if (!data.images?.length) {
        return null;
    }

    return (
        <section
            ref={ref}
            className={cn(className, 'bg-maha-50 px-5 pb-16 pt-4 sm:px-10 sm:pb-20 sm:pt-6 lg:px-16 lg:pb-24 lg:pt-8')}
        >
            <div className="mx-auto max-w-7xl">
                <p className="font-serif text-xs uppercase tracking-[0.2em] text-subheading">Gallery</p>

                <div className="mt-6 flex gap-3 overflow-x-auto pb-2 sm:mt-8 sm:gap-4">
                    {data.images.map((image, index) => (
                        <div key={index} className="aspect-square w-40 shrink-0 overflow-hidden rounded-[4px] bg-maha-200 sm:w-48">
                            <img
                                src={image.src}
                                alt={tr(image.alt, locale) || 'Không gian Mầm Spa'}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    ))}
                </div>

                <div className="mt-6 text-center">
                    <Link
                        href={data.link}
                        className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-heading"
                    >
                        Xem thêm hình ảnh
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
