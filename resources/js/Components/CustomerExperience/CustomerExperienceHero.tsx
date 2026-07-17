import { useLocale } from '@/Hooks/useLocale';
import { tr, stripTags, cn } from '@/Lib/utils';

export interface CustomerExperienceHeroData {
    heading?: unknown;
    subtitle?: unknown;
    image?: string | null;
    image_alt?: unknown;
}

/** Banner đầu trang — chữ trên nền cream bên trái, ảnh không gian spa bo góc bên phải (khác kiểu banner full-bleed của các trang khác). */
export function CustomerExperienceHero({ data }: { data: CustomerExperienceHeroData }) {
    const locale = useLocale();
    const heading = tr(data.heading, locale);
    const subtitle = tr(data.subtitle, locale);
    const imageAlt = tr(data.image_alt, locale);
    const hasImage = !!data.image;

    return (
        <section className="bg-[#f5f2ed] px-5 pb-12 pt-28 sm:px-10 sm:pt-32 lg:px-[60px]">
            <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-4">
                    {heading && (
                        <div
                            className="rich-content font-serif text-4xl uppercase leading-[1.1] tracking-tight text-heading sm:text-5xl"
                            dangerouslySetInnerHTML={{ __html: heading }}
                        />
                    )}
                    <div className="mt-5 h-px w-12 bg-heading/30" />
                    {subtitle && (
                        <div
                            className="rich-content mt-5 max-w-sm text-base leading-relaxed text-ink/80"
                            dangerouslySetInnerHTML={{ __html: subtitle }}
                        />
                    )}
                </div>

                <div className="lg:col-span-8">
                    <div className={cn('aspect-[16/9] overflow-hidden rounded-[4px]', !hasImage && 'bg-maha-200')}>
                        {hasImage && (
                            <img
                                src={data.image ?? undefined}
                                alt={imageAlt || stripTags(heading)}
                                className="h-full w-full object-cover"
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
