import { useRef, useState } from 'react';
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

/**
 * "Four Healing Journeys" — tiêu đề lớn căn giữa + nhãn nhỏ, 4 dịch vụ nổi bật.
 * Dưới lg: hàng tab tên dịch vụ (tự vuốt/kéo ngang nếu tràn màn hình, KHÔNG phải vuốt thẻ
 * nội dung) — bấm 1 tab thì đổi thẻ hiển thị bên dưới, chỉ hiện 1 thẻ tại 1 thời điểm.
 * Từ lg trở lên: grid 4 cột tĩnh như cũ, không đổi.
 */
export function FeaturedServices({ data }: { data: FeaturedServicesData }) {
    const locale = useLocale();
    const heading = tr(data.heading, locale);
    const title = tr(data.title, locale);
    const { ref, className } = useReveal<HTMLElement>();

    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    if (!data.services?.length) {
        return null;
    }

    const selectTab = (index: number) => {
        setActiveIndex(index);
        tabRefs.current[index]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    };

    const renderCard = (service: FeaturedService) => {
        const name = tr(service.name, locale);
        const description = tr(service.description, locale);
        const imageAlt = tr(service.thumbnail_alt, locale);
        const image = service.images?.[0];

        return (
            <Link href={service.url} className="group flex h-full flex-col">
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
                    {/* Styled to look like a button, but stays a <span> — the whole card above
                        is already a <Link>, and nesting a real <button>/<a> inside it would be
                        invalid, non-focusable markup. */}
                    <span className="mt-5 inline-flex w-fit items-center gap-2 self-start rounded-md bg-heading px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-opacity group-hover:opacity-90">
                        Xem thêm
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                </div>
            </Link>
        );
    };

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

                {/* Dưới lg: hàng tab — vuốt/kéo NGAY TRÊN CÁC NÚT TAB (không phải trên thẻ nội
                    dung bên dưới). Bấm tab nào, thẻ bên dưới đổi sang dịch vụ đó. */}
                <div className="scrollbar-hide -mx-5 mt-6 flex gap-2 overflow-x-auto scroll-smooth px-5 pb-1 lg:hidden">
                    {data.services.map((service, index) => {
                        const label = stripTags(tr(service.name, locale));
                        const active = index === activeIndex;

                        return (
                            <button
                                key={service.id}
                                ref={(node) => {
                                    tabRefs.current[index] = node;
                                }}
                                type="button"
                                onClick={() => selectTab(index)}
                                aria-current={active}
                                className={cn(
                                    'shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                                    active
                                        ? 'border-heading bg-heading text-white'
                                        : 'border-maha-300 bg-white text-heading/70 hover:border-heading/50',
                                )}
                            >
                                {label}
                            </button>
                        );
                    })}
                </div>

                <div className="mt-4 lg:hidden">{renderCard(data.services[activeIndex])}</div>

                {/* Từ lg: grid 4 cột tĩnh như trước, không đổi. */}
                <div className="mt-1 hidden lg:grid lg:grid-cols-4 lg:gap-x-6 lg:gap-y-10">
                    {data.services.map((service) => (
                        <div key={service.id} className="h-full">
                            {renderCard(service)}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
