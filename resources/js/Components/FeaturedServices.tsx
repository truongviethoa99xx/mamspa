import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { useReveal } from '@/Hooks/useReveal';
import { tr, stripTags, cn } from '@/Lib/utils';

export interface FeaturedService {
    id: number;
    slug: string;
    url: string;
    name: unknown;
    description: unknown;
    thumbnail_alt?: unknown;
    images: string[];
}

export interface FeaturedServicesData {
    heading?: unknown;
    title?: unknown;
    services: FeaturedService[];
}

/** "Four Healing Journeys" — tiêu đề lớn căn giữa + nhãn nhỏ, grid 4 dịch vụ nổi bật, ảnh trên/chữ dưới. */
export function FeaturedServices({ data }: { data: FeaturedServicesData }) {
    const locale = useLocale();
    const heading = tr(data.heading, locale);
    const title = tr(data.title, locale);
    const { ref, className } = useReveal<HTMLElement>();

    if (!data.services?.length) {
        return null;
    }

    return (
        <section
            ref={ref}
            className={cn(className, 'bg-maha-50 px-5 pb-8 pt-4 sm:px-10 sm:pb-8 sm:pt-6 lg:px-16 lg:pb-8 lg:pt-8')}
        >
            <div className="mx-auto max-w-7xl">
                {heading && (
                    <div
                        className="rich-content text-center font-serif text-3xl font-semibold text-heading sm:text-4xl"
                        dangerouslySetInnerHTML={{ __html: heading }}
                    />
                )}
                {title && (
                    <p className="mt-8 font-serif text-xs uppercase tracking-[0.2em] text-subheading">{title}</p>
                )}

                <div className="mt-1 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                    {data.services.map((service) => {
                        const name = tr(service.name, locale);
                        const description = tr(service.description, locale);
                        const imageAlt = tr(service.thumbnail_alt, locale);
                        const image = service.images?.[0];

                        return (
                            <Link key={service.id} href={service.url} className="group flex h-full flex-col">
                                <div className="aspect-[4/3] shrink-0 overflow-hidden rounded-t-[4px] bg-maha-200">
                                    {image && (
                                        <img
                                            src={image}
                                            alt={imageAlt || stripTags(name)}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    )}
                                </div>
                                <div className="flex flex-1 flex-col rounded-b-[4px] bg-[#f4eae1] p-5">
                                    <h3
                                        className="rich-content featured-service-title font-serif text-xl leading-snug text-heading"
                                        dangerouslySetInnerHTML={{ __html: name }}
                                    />
                                    {description && (
                                        <div
                                            className="rich-content mt-2 text-sm leading-relaxed text-ink/70"
                                            dangerouslySetInnerHTML={{ __html: description }}
                                        />
                                    )}
                                    <span className="mt-auto inline-flex w-fit items-center gap-2 pt-3 text-sm font-medium text-heading">
                                        Xem thêm
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
