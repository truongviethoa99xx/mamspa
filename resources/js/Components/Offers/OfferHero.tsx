import { useLocale } from '@/Hooks/useLocale';
import { tr, cn } from '@/Lib/utils';

export interface OfferHeroData {
    title?: unknown;
    subtitle?: unknown;
    body?: unknown;
    image?: string | null;
    image_alt?: unknown;
}

/** Banner đầu trang Ưu đãi — tiêu đề + mô tả bên trái, ảnh minh hoạ bên phải. */
export function OfferHero({ data }: { data: OfferHeroData }) {
    const locale = useLocale();
    const title = tr(data.title, locale);
    const subtitle = tr(data.subtitle, locale);
    const body = tr(data.body, locale);
    const imageAlt = tr(data.image_alt, locale);
    const hasImage = !!data.image;

    return (
        <section className="relative isolate bg-maha-50 px-5 pb-12 pt-32 sm:px-10 sm:pb-16 sm:pt-36 lg:px-16 lg:pb-20 lg:pt-40">
            {/* Header nổi trong suốt (chữ trắng) đè lên đầu section — dải tối mảnh này chỉ phủ
                vùng chiều cao header để menu vẫn đọc được. */}
            <div
                className="absolute inset-x-0 top-0 z-0 h-[160px]"
                style={{ background: 'linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0))' }}
                aria-hidden="true"
            />
            <div className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
                <div>
                    {title && (
                        <h1 className="font-serif text-4xl uppercase tracking-wide text-heading sm:text-5xl">{title}</h1>
                    )}
                    <span className="mt-4 block h-px w-14 bg-maha-300" aria-hidden="true" />
                    {subtitle && (
                        <div
                            className="rich-content mt-6 max-w-md font-serif text-2xl leading-snug text-heading sm:text-3xl"
                            dangerouslySetInnerHTML={{ __html: subtitle }}
                        />
                    )}
                    {body && (
                        <div
                            className="rich-content mt-5 max-w-md text-base leading-relaxed text-ink/75"
                            dangerouslySetInnerHTML={{ __html: body }}
                        />
                    )}
                </div>
                <div className={cn('aspect-[4/3] w-full overflow-hidden rounded-3xl', !hasImage && 'bg-maha-200')}>
                    {hasImage && (
                        <img
                            src={data.image ?? undefined}
                            alt={imageAlt || title}
                            className="h-full w-full object-cover"
                        />
                    )}
                </div>
            </div>
        </section>
    );
}
