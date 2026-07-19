import { useLocale } from '@/Hooks/useLocale';
import { tr, stripTags, cn } from '@/Lib/utils';

export interface CustomerExperienceHeroData {
    heading?: unknown;
    subtitle?: unknown;
    image?: string | null;
    image_alt?: unknown;
}

/** Banner đầu trang — ảnh full-bleed thiên bên phải, gradient kem mờ dần đè lên khối chữ bên trái (cùng kỹ thuật "Banner 2" với ServiceHero/CategoryHero). */
export function CustomerExperienceHero({ data }: { data: CustomerExperienceHeroData }) {
    const locale = useLocale();
    const heading = tr(data.heading, locale);
    const subtitle = tr(data.subtitle, locale);
    const imageAlt = tr(data.image_alt, locale);
    const hasImage = !!data.image;

    return (
        <section
            className={cn(
                'relative isolate overflow-hidden pt-20 sm:min-h-[460px] sm:pt-24',
                hasImage ? 'bg-[#efe8da]' : 'bg-maha-200',
            )}
        >
            {hasImage && (
                <img
                    src={data.image ?? undefined}
                    alt={imageAlt || stripTags(heading)}
                    className="relative z-0 h-56 w-full object-cover sm:absolute sm:inset-y-0 sm:right-0 sm:h-full sm:w-[64%]"
                />
            )}
            {hasImage && (
                <div
                    className="absolute inset-0 z-0 hidden sm:block"
                    style={{
                        background:
                            'linear-gradient(90deg, #efe8da 0%, #efe8da 36%, rgba(239,232,218,.6) 48%, rgba(239,232,218,0) 62%)',
                    }}
                />
            )}

            <div className="relative z-10 px-5 py-8 sm:py-14 sm:px-10 lg:px-[60px]">
                <div className="max-w-md">
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
            </div>
        </section>
    );
}
