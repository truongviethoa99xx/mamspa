import { GraduationCap, HandHeart, Leaf, type LucideIcon } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { useReveal } from '@/Hooks/useReveal';
import { tr, cn } from '@/Lib/utils';

const ICONS: Record<string, LucideIcon> = {
    HandHeart,
    Leaf,
    GraduationCap,
};

export interface CategoryPillar {
    icon?: string;
    title?: unknown;
}

export interface CategoryIntroData {
    heading?: unknown;
    body?: unknown;
    image?: string | null;
    imageAlt?: unknown;
    pillars?: CategoryPillar[];
}

/** "Chăm sóc theo nhu cầu, không theo khuôn mẫu" — ảnh bên trái, đoạn giới thiệu + 3 điểm nổi bật bên phải. */
export function CategoryIntro({ data }: { data: CategoryIntroData }) {
    const locale = useLocale();
    const heading = tr(data.heading, locale);
    const body = tr(data.body, locale);
    const imageAlt = tr(data.imageAlt, locale);
    const hasImage = !!data.image;
    const pillars = data.pillars ?? [];
    const { ref, className } = useReveal<HTMLElement>();

    if (!heading && !body && !hasImage && !pillars.length) {
        return null;
    }

    return (
        <section ref={ref} className={cn(className, 'mt-1 bg-[#f5f2ed]')}>
            <div className="grid lg:h-[440px] lg:grid-cols-2">
                <div className={cn('aspect-[4/3] w-full lg:aspect-auto lg:h-[440px]', !hasImage && 'bg-maha-200')}>
                    {hasImage && (
                        <img
                            src={data.image ?? undefined}
                            alt={imageAlt || heading}
                            className="h-full w-full object-cover"
                            loading="lazy"
                        />
                    )}
                </div>
                <div className="flex flex-col justify-center overflow-y-auto px-5 pb-6 pt-10 sm:px-10 sm:pb-8 sm:pt-14 lg:h-[440px] lg:px-16 lg:pb-10">
                    {heading && (
                        <div
                            className="rich-content font-serif text-3xl leading-snug text-heading sm:text-4xl"
                            dangerouslySetInnerHTML={{ __html: heading }}
                        />
                    )}
                    <span className="mt-5 block h-px w-10 bg-maha-300" aria-hidden="true" />
                    {body && (
                        <div
                            className="rich-content mt-5 max-w-md text-sm leading-relaxed text-ink/75"
                            dangerouslySetInnerHTML={{ __html: body }}
                        />
                    )}

                    {!!pillars.length && (
                        <div className="mt-10 grid grid-cols-3 gap-4">
                            {pillars.map((pillar, index) => {
                                const Icon = (pillar.icon && ICONS[pillar.icon]) || Leaf;
                                const title = tr(pillar.title, locale);

                                return (
                                    <div key={index} className="flex flex-col items-center text-center">
                                        <Icon className="h-[56px] w-[56px] text-subheading" strokeWidth={1.25} aria-hidden="true" />
                                        {title && (
                                            <div
                                                className="rich-content mt-3 text-sm leading-snug text-heading"
                                                dangerouslySetInnerHTML={{ __html: title }}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
