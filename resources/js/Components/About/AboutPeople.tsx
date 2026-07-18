import { useLocale } from '@/Hooks/useLocale';
import { useReveal } from '@/Hooks/useReveal';
import { tr, cn } from '@/Lib/utils';
import { SectionHeading } from './SectionHeading';

export interface AboutPeopleData {
    title?: unknown;
    p1?: unknown;
    image?: string | null;
    image_alt?: unknown;
}

const stripTags = (html: string) => html.replace(/<[^>]+>/g, '');

/** Our People — ảnh nhóm bên trái, tiêu đề + đoạn giới thiệu đội ngũ bên phải. */
export function AboutPeople({ data }: { data: AboutPeopleData }) {
    const locale = useLocale();
    const title = tr(data.title, locale);
    const p1 = tr(data.p1, locale);
    const imageAlt = tr(data.image_alt, locale);
    const hasImage = !!data.image;
    const { ref, className } = useReveal<HTMLElement>();

    return (
        <section ref={ref} className={cn(className, 'mt-[50px] bg-[#f4eae1] px-5 py-12 sm:px-10 lg:px-[60px]')}>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
                <div className={cn('aspect-[21/10] w-full overflow-hidden rounded-sm', !hasImage && 'bg-maha-200')}>
                    {hasImage && (
                        <img
                            src={data.image ?? undefined}
                            alt={imageAlt || stripTags(title)}
                            className="h-full w-full object-cover"
                            loading="lazy"
                        />
                    )}
                </div>
                <div>
                    <SectionHeading heading={title} />
                    {p1 && (
                        <div
                            className="rich-content mt-6 max-w-md space-y-4 text-base leading-relaxed text-ink/80"
                            dangerouslySetInnerHTML={{ __html: p1 }}
                        />
                    )}
                </div>
            </div>
        </section>
    );
}
