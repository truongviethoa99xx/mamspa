import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { tr, cn, stripTags } from '@/Lib/utils';
import { SectionHeading } from './SectionHeading';

interface SpaceItem {
    image?: string | null;
    image_alt?: unknown;
    title?: unknown;
    description?: unknown;
    link_text?: unknown;
    link_url?: string | null;
}

export interface AboutSpacesData {
    title?: unknown;
    intro?: unknown;
    items: SpaceItem[];
}

const isExternalUrl = (url: string) => /^(https?:)?\/\/|^(mailto|tel):/i.test(url);

/** "Our Spaces" — tiêu đề chung + lưới thẻ không gian/chi nhánh. */
export function AboutSpaces({ data }: { data: AboutSpacesData }) {
    const locale = useLocale();

    const title = tr(data.title, locale);
    const intro = tr(data.intro, locale);

    return (
        <section className="mt-[50px] bg-[#f5f2ed] px-5 sm:px-10 lg:px-[60px]">
            <SectionHeading heading={title} />
            {intro && (
                <div
                    className="rich-content mt-4 max-w-2xl text-base leading-relaxed text-ink/80"
                    dangerouslySetInnerHTML={{ __html: intro }}
                />
            )}

            {!!data.items?.length && (
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                    {data.items.map((item, index) => {
                        const itemTitle = tr(item.title, locale);
                        const description = tr(item.description, locale);
                        const linkText = tr(item.link_text, locale);
                        const itemImageAlt = tr(item.image_alt, locale);
                        const hasImage = !!item.image;

                        return (
                            <article key={index} className="group flex h-full flex-col">
                                <div
                                    className={cn(
                                        'aspect-[4/3] w-full shrink-0 overflow-hidden rounded-t-[4px]',
                                        !hasImage && 'bg-maha-200',
                                    )}
                                >
                                    {hasImage && (
                                        <img
                                            src={item.image ?? undefined}
                                            alt={itemImageAlt || stripTags(itemTitle)}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    )}
                                </div>
                                <div className="flex flex-1 flex-col rounded-b-[4px] bg-[#f4eae1] p-5">
                                    {itemTitle && (
                                        <div
                                            className="rich-content font-serif text-lg text-heading"
                                            dangerouslySetInnerHTML={{ __html: itemTitle }}
                                        />
                                    )}
                                    {description && (
                                        <div
                                            className="rich-content mt-2 text-sm leading-relaxed text-ink/70"
                                            dangerouslySetInnerHTML={{ __html: description }}
                                        />
                                    )}
                                    {linkText && item.link_url && (
                                        isExternalUrl(item.link_url) ? (
                                            <a
                                                href={item.link_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group/link mt-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-heading"
                                            >
                                                <span>{linkText}</span>
                                                <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                                            </a>
                                        ) : (
                                            <Link
                                                href={item.link_url}
                                                className="group/link mt-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-heading"
                                            >
                                                <span>{linkText}</span>
                                                <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                                            </Link>
                                        )
                                    )}
                                </div>
                            </article>
                        );
                    })}
                </div>
            )}
        </section>
    );
}
