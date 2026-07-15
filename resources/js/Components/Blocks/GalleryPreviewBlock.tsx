import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

/** Dải ảnh xem trước, lấy từ thư viện ảnh chi nhánh — dẫn tới /gallery/. */
export function GalleryPreviewBlock({ data }: { data: string[] }) {
    const { t } = useTranslation();
    const images = data ?? [];

    if (images.length === 0) {
        return null;
    }

    return (
        <section className="bg-white py-10 sm:py-14 md:py-20">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 2xl:max-w-[1440px]">
                <p className="font-serif text-sm uppercase italic tracking-[0.12em] text-[#556B3F] md:text-base">
                    {t('blocks.gallery.eyebrow')}
                </p>

                <div className="mt-6 flex gap-3 overflow-x-auto pb-2 sm:mt-8 sm:gap-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {images.map((src, i) => (
                        <div
                            key={i}
                            className="aspect-square w-32 shrink-0 overflow-hidden rounded-xl bg-maha-200 sm:w-40 md:w-48"
                        >
                            <img src={src} alt="" className="h-full w-full object-cover" />
                        </div>
                    ))}
                </div>

                <Link
                    href="/gallery/"
                    className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-ink sm:mt-8"
                >
                    <span>{t('blocks.gallery.viewMore')}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>
        </section>
    );
}
