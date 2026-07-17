import { ArrowRight, Clock, MapPin, Phone } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { tr, cn } from '@/Lib/utils';

interface BranchItem {
    name?: unknown;
    address?: unknown;
    phone?: string | null;
    open_hours?: string | null;
    hours_note?: unknown;
    image?: string | null;
    image_alt?: unknown;
    directions_url?: string | null;
    link_url?: string | null;
}

export interface ContactBranchesData {
    title?: unknown;
    intro?: unknown;
    directionsLabel?: unknown;
    moreLabel?: unknown;
    items: BranchItem[];
}

const stripTags = (html: string) => html.replace(/<[^>]+>/g, '');

/** Rút gọn tên chi nhánh thành nhãn ngắn cho badge trên ảnh (vd. "Mầm Spa Phú Nhuận" → "PHÚ NHUẬN"). */
const badgeLabel = (name: string) => name.replace(/^Mầm\s*Spa\s*/i, '').trim().toUpperCase() || name.toUpperCase();

/** "Hệ thống chi nhánh" — grid 2 cột thẻ chi nhánh, nội dung nhập tay riêng trong CMS (ảnh + badge, địa chỉ, giờ mở cửa, SĐT, 2 link tuỳ chọn). */
export function ContactBranches({ data }: { data: ContactBranchesData }) {
    const locale = useLocale();
    const title = tr(data.title, locale);
    const intro = tr(data.intro, locale);
    const directionsLabel = tr(data.directionsLabel, locale);
    const moreLabel = tr(data.moreLabel, locale);
    const items = data.items ?? [];

    if (!items.length) {
        return null;
    }

    return (
        <section className="bg-maha-50 px-5 pb-2 pt-8 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl">
                <div className="text-center">
                    {title && (
                        <div
                            className="rich-content font-serif text-2xl uppercase tracking-wide text-heading sm:text-3xl"
                            dangerouslySetInnerHTML={{ __html: title }}
                        />
                    )}
                    <span className="mx-auto mt-3 block h-px w-10 bg-maha-300" aria-hidden="true" />
                    {intro && (
                        <div
                            className="rich-content mt-3 text-sm text-ink/70"
                            dangerouslySetInnerHTML={{ __html: intro }}
                        />
                    )}
                </div>

                <div className="mt-10 grid grid-cols-1 gap-8 sm:mt-12 md:grid-cols-2">
                    {items.map((branch, index) => {
                        const name = tr(branch.name, locale);
                        const plainName = stripTags(name);
                        const displayName = plainName ? `Mầm Spa ${plainName}` : '';
                        const address = tr(branch.address, locale);
                        const imageAlt = tr(branch.image_alt, locale) || plainName;
                        const label = badgeLabel(plainName);
                        const hoursNote = tr(branch.hours_note, locale);

                        return (
                            <article key={index} className="overflow-hidden rounded-2xl bg-white shadow-sm">
                                <div className="relative aspect-[5/2] w-full bg-maha-200">
                                    {branch.image && (
                                        <img src={branch.image} alt={imageAlt} className="h-full w-full object-cover" />
                                    )}
                                    {label && (
                                        <span className="absolute bottom-4 left-4 rounded-md bg-[#2F3E2E]/95 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white">
                                            {label}
                                        </span>
                                    )}
                                </div>

                                <div className="p-6 sm:p-7">
                                    <div className="flex flex-col items-center text-center">
                                        {displayName && (
                                            <p className="flex items-center gap-2 font-serif text-base font-bold uppercase tracking-wide text-heading">
                                                <MapPin className="h-5 w-5 shrink-0 text-subheading" strokeWidth={1.5} />
                                                {displayName}
                                            </p>
                                        )}
                                        {address && (
                                            <div
                                                className="rich-content mt-1.5 text-sm leading-relaxed text-ink/60"
                                                dangerouslySetInnerHTML={{ __html: address }}
                                            />
                                        )}
                                    </div>

                                    {(branch.open_hours || branch.phone) && (
                                        <div className="mt-5 grid grid-cols-2">
                                            {branch.open_hours && (
                                                <span
                                                    className={cn(
                                                        'flex items-center justify-center gap-2 px-3 text-sm text-ink/80',
                                                        branch.phone && 'border-r border-maha-200',
                                                    )}
                                                >
                                                    <Clock className="h-5 w-5 shrink-0 text-subheading" strokeWidth={1.5} />
                                                    <span className="flex flex-col leading-snug">
                                                        <span>{branch.open_hours}</span>
                                                        {hoursNote && <span className="text-xs text-ink/50">{hoursNote}</span>}
                                                    </span>
                                                </span>
                                            )}
                                            {branch.phone && (
                                                <span className="flex items-center justify-center gap-2 px-3 text-sm text-ink/80">
                                                    <Phone className="h-5 w-5 shrink-0 text-subheading" strokeWidth={1.5} />
                                                    {branch.phone}
                                                </span>
                                            )}
                                        </div>
                                    )}

                                    {(branch.directions_url || branch.link_url) && (
                                        <div className="mt-4 flex items-center gap-6 border-t border-maha-200 pt-4">
                                            {directionsLabel && branch.directions_url && (
                                                <a
                                                    href={branch.directions_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-heading"
                                                >
                                                    {directionsLabel}
                                                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                                                </a>
                                            )}
                                            {directionsLabel && branch.directions_url && moreLabel && branch.link_url && (
                                                <span className="h-4 w-px bg-maha-200" aria-hidden="true" />
                                            )}
                                            {moreLabel && branch.link_url && (
                                                <a
                                                    href={branch.link_url}
                                                    className="group inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-subheading"
                                                >
                                                    {moreLabel}
                                                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
