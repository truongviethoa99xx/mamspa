import { Leaf } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { tr, stripTags } from '@/Lib/utils';

export interface OfferHeroData {
    title?: unknown;
    subtitle?: unknown;
    body?: unknown;
    image?: string | null;
    image_alt?: unknown;
}

/**
 * Banner đầu trang Ưu đãi — ảnh full-bleed bên phải, khối chữ đè bên trái trên nền
 * tối mờ dần sang phải để lộ ảnh (cùng kiểu banner "Banner 2" dùng ở Story/CategoryHero).
 */
export function OfferHero({ data }: { data: OfferHeroData }) {
    const locale = useLocale();
    const title = tr(data.title, locale);
    const subtitle = tr(data.subtitle, locale);
    const body = tr(data.body, locale);
    const imageAlt = tr(data.image_alt, locale);
    const hasImage = !!data.image;

    return (
        <section className="relative isolate min-h-[460px] overflow-hidden bg-maha-900">
            {hasImage && (
                <img
                    src={data.image ?? undefined}
                    alt={imageAlt || stripTags(title)}
                    className="absolute inset-0 z-0 h-full w-full object-cover"
                />
            )}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background:
                        'linear-gradient(90deg, rgba(36,48,35,0.97) 0%, rgba(36,48,35,0.94) 34%, rgba(36,48,35,0.55) 52%, rgba(36,48,35,0.05) 72%, rgba(36,48,35,0) 85%)',
                }}
                aria-hidden="true"
            />

            <div className="relative z-10 flex min-h-[460px] w-full max-w-xl flex-col justify-center px-5 pb-14 pt-32 sm:px-10 sm:pb-16 sm:pt-36 lg:px-16 lg:pt-40">
                {title && (
                    <h1 className="font-serif text-4xl uppercase tracking-wide text-maha-50 sm:text-5xl">{title}</h1>
                )}
                {subtitle && (
                    <div
                        className="rich-content mt-6 max-w-sm text-sm leading-relaxed text-maha-100/85"
                        dangerouslySetInnerHTML={{ __html: subtitle }}
                    />
                )}
                {body && (
                    <div className="mt-7 flex max-w-sm items-start gap-3">
                        <Leaf className="mt-0.5 h-5 w-5 shrink-0 text-maha-200" strokeWidth={1.4} />
                        <div
                            className="rich-content text-xs leading-relaxed text-maha-200/90"
                            dangerouslySetInnerHTML={{ __html: body }}
                        />
                    </div>
                )}
            </div>
        </section>
    );
}
