import {
    Flower2,
    GraduationCap,
    HandHeart,
    Heart,
    HeartHandshake,
    Leaf,
    ShieldCheck,
    Sparkles,
    Sprout,
    Users,
    type LucideIcon,
} from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { tr, cn, stripTags } from '@/Lib/utils';

const ICONS: Record<string, LucideIcon> = {
    HandHeart,
    Leaf,
    GraduationCap,
    Sprout,
    Flower2,
    HeartHandshake,
    Heart,
    Users,
    ShieldCheck,
    Sparkles,
};

export interface ServicePillar {
    icon?: string;
    title?: unknown;
}

export interface ServicePillarsData {
    heading?: unknown;
    image?: string | null;
    imageAlt?: unknown;
    pillars?: ServicePillar[];
}

/** "Phát triển từ tinh hoa trị liệu Việt..." — đoạn giới thiệu + các điểm nổi bật dạng icon của dịch vụ. */
export function ServicePillars({ data }: { data: ServicePillarsData }) {
    const locale = useLocale();
    const heading = tr(data.heading, locale);
    const imageAlt = tr(data.imageAlt, locale);
    const hasImage = !!data.image;
    const pillars = data.pillars ?? [];

    if (!heading && !pillars.length) {
        return null;
    }

    return (
        <section className="mb-2 mt-2 bg-[#f5f2ed]">
            <div className="grid items-center lg:grid-cols-2">
                <div className={cn('aspect-[4/3] lg:aspect-[5/4]', !hasImage && 'bg-maha-200')}>
                    {hasImage && (
                        <img
                            src={data.image ?? undefined}
                            alt={imageAlt || stripTags(heading)}
                            className="h-full w-full object-cover"
                        />
                    )}
                </div>
                <div className="px-5 py-10 sm:px-10 sm:py-14 lg:px-16">
                    {heading && (
                        <div
                            className="rich-content font-serif text-2xl leading-snug text-heading sm:text-3xl"
                            dangerouslySetInnerHTML={{ __html: heading }}
                        />
                    )}
                    <div className="mt-5 h-px w-10 bg-maha-300" aria-hidden="true" />

                    {!!pillars.length && (
                        <div className="mt-9 grid grid-cols-3 divide-x divide-heading/15">
                            {pillars.map((pillar, index) => {
                                const Icon = (pillar.icon && ICONS[pillar.icon]) || Leaf;
                                const title = tr(pillar.title, locale);

                                return (
                                    <div key={index} className="flex flex-col items-center gap-3 px-2 text-center">
                                        <Icon className="h-[56px] w-[56px] text-subheading" strokeWidth={1.25} aria-hidden="true" />
                                        {title && (
                                            <div
                                                className="rich-content text-sm leading-snug text-heading"
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
