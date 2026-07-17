import { HeartHandshake, Leaf, GraduationCap, Flower2, Sparkles, Droplet, type LucideIcon } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { tr, cn, stripTags } from '@/Lib/utils';
import { SectionHeading } from './SectionHeading';

interface ApproachFeature {
    icon?: string;
    title?: unknown;
}

export interface AboutApproachData {
    title?: unknown;
    p1?: unknown;
    image?: string | null;
    image_alt?: unknown;
    features?: ApproachFeature[];
}

const ICON_MAP: Record<string, LucideIcon> = {
    'heart-hands': HeartHandshake,
    leaf: Leaf,
    'graduation-cap': GraduationCap,
    flower: Flower2,
    sparkles: Sparkles,
    droplet: Droplet,
};

/** "Our Approach" — ảnh full-bleed bên trái, tiêu đề + đoạn văn + hàng biểu tượng bên phải. */
export function AboutApproach({ data }: { data: AboutApproachData }) {
    const locale = useLocale();

    const title = tr(data.title, locale);
    const p1 = tr(data.p1, locale);
    const imageAlt = tr(data.image_alt, locale);
    const hasImage = !!data.image;
    const features = data.features ?? [];

    return (
        <section className="mt-[50px] bg-[#f5f2ed] px-5 sm:px-10 lg:px-[60px]">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div
                    className={cn(
                        'aspect-[4/3] overflow-hidden rounded-sm lg:aspect-[5/4]',
                        !hasImage && 'bg-maha-200',
                    )}
                >
                    {hasImage && (
                        <img
                            src={data.image ?? undefined}
                            alt={imageAlt || stripTags(title)}
                            className="h-full w-full object-cover"
                        />
                    )}
                </div>

                <div>
                    <SectionHeading heading={title} />
                    <div className="mt-5 h-px w-12 bg-heading/30" />
                    {p1 && (
                        <div
                            className="rich-content mt-5 space-y-4 text-base leading-relaxed text-ink/80"
                            dangerouslySetInnerHTML={{ __html: p1 }}
                        />
                    )}

                    {!!features.length && (
                        <div className="mt-9 grid grid-cols-3 divide-x divide-heading/15">
                            {features.map((feature, index) => {
                                const Icon = ICON_MAP[feature.icon ?? ''] ?? Leaf;
                                const label = tr(feature.title, locale);

                                return (
                                    <div key={index} className="flex flex-col items-center gap-3 px-2 text-center">
                                        <Icon className="h-7 w-7 text-heading/70" strokeWidth={1.5} />
                                        {label && (
                                            <span className="text-xs font-medium leading-snug text-ink/70 sm:text-sm">
                                                {label}
                                            </span>
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
