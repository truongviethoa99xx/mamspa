import { useLocale } from '@/Hooks/useLocale';
import { tr, cn } from '@/Lib/utils';
import { SectionHeading } from './SectionHeading';

export interface AboutStoryData {
    heading?: unknown;
    body?: unknown;
    image?: string | null;
    image_alt?: unknown;
}

const stripTags = (html: string) => html.replace(/<[^>]+>/g, '');

/** Our Story — chữ bên trái, ảnh bên phải. */
export function AboutStory({ data }: { data: AboutStoryData }) {
    const locale = useLocale();
    const heading = tr(data.heading, locale);
    const body = tr(data.body, locale);
    const imageAlt = tr(data.image_alt, locale);
    const hasImage = !!data.image;

    return (
        <section className="mt-[50px] bg-[#f5f2ed] px-5 py-12 sm:px-10 lg:h-[360px] lg:px-[60px] lg:py-0">
            <div className="grid gap-10 lg:h-full lg:grid-cols-[4fr_6fr] lg:items-stretch lg:gap-16">
                <div className="lg:flex lg:flex-col lg:justify-center">
                    <SectionHeading heading={heading} />
                    {body && (
                        <div
                            className="rich-content mt-6 max-w-md space-y-4 text-base leading-relaxed text-ink/80"
                            dangerouslySetInnerHTML={{ __html: body }}
                        />
                    )}
                </div>
                <div
                    className={cn(
                        'aspect-[4/3] w-full overflow-hidden rounded-sm lg:aspect-auto lg:h-full',
                        !hasImage && 'bg-maha-200',
                    )}
                >
                    {hasImage && (
                        <img
                            src={data.image ?? undefined}
                            alt={imageAlt || stripTags(heading)}
                            className="h-full w-full object-cover"
                        />
                    )}
                </div>
            </div>
        </section>
    );
}
