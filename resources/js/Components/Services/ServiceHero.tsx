import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { tr, stripTags } from '@/Lib/utils';
import { Breadcrumb, type BreadcrumbItem } from '@/Components/Breadcrumb';

export interface ServiceHeroData {
    heading?: unknown;
    subtitle?: unknown;
    image?: string | null;
    imageAlt?: unknown;
}

const BOOKING_URL = '/dat-lich/';
const CTA_LABEL: Record<string, string> = { vi: 'Đặt lịch ngay', en: 'Book now' };

/**
 * Banner đầu trang chi tiết dịch vụ — cùng kiểu "Banner 2" dùng cho trang danh mục
 * (CategoryHero): ảnh full-bleed, khối chữ đè bên trái trên nền kem mờ dần sang phải.
 */
export function ServiceHero({ data, breadcrumb }: { data: ServiceHeroData; breadcrumb: BreadcrumbItem[] }) {
    const locale = useLocale();
    const heading = tr(data.heading, locale);
    const subtitle = tr(data.subtitle, locale);
    const imageAlt = tr(data.imageAlt, locale);
    const hasImage = !!data.image;
    const ctaLabel = CTA_LABEL[locale] ?? CTA_LABEL.vi;

    return (
        <section className="relative isolate h-[calc(85vh-40px)] min-h-[420px] overflow-hidden bg-[#ece1db] sm:h-[calc(75vh-40px)]">
            {hasImage && (
                <img
                    src={data.image ?? undefined}
                    alt={imageAlt || stripTags(heading)}
                    className="absolute inset-0 z-0 h-full w-full object-cover"
                />
            )}

            <div className="relative z-10 flex h-full w-full flex-col px-5 pb-10 pt-28 sm:px-10 sm:pt-32 md:w-1/2 md:px-12 md:pt-40 lg:w-1/3 lg:px-16">
                {hasImage && (
                    <div
                        className="absolute inset-0 -z-10"
                        style={{
                            background:
                                'linear-gradient(90deg, rgba(236,225,219,0.97) 0%, rgba(236,225,219,0.9) 55%, rgba(236,225,219,0) 100%)',
                        }}
                    />
                )}
                <Breadcrumb items={breadcrumb} variant="dark" className="text-sm" />

                <div className="mt-auto">
                    {heading && (
                        <h1
                            className="rich-content line-clamp-2 font-serif text-3xl leading-tight text-heading sm:text-4xl"
                            dangerouslySetInnerHTML={{ __html: heading }}
                        />
                    )}
                    {subtitle && (
                        <div
                            className="rich-content mt-4 text-base leading-relaxed text-ink/80 sm:text-lg"
                            dangerouslySetInnerHTML={{ __html: subtitle }}
                        />
                    )}

                    <Link
                        href={BOOKING_URL}
                        className="group mt-7 inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-wide text-heading md:mt-10"
                    >
                        <span>{ctaLabel}</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
