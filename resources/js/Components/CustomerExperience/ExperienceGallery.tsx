import { useMemo, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { useReveal } from '@/Hooks/useReveal';
import { tr, cn } from '@/Lib/utils';

interface GalleryImageItem {
    image?: string | null;
    image_alt?: unknown;
    category_tag?: string;
}

interface FeaturedStat {
    title?: unknown;
    description?: unknown;
    position: number;
}

export interface ExperienceGalleryData {
    title?: unknown;
    items: GalleryImageItem[];
    featuredStat: FeaturedStat;
}

const CATEGORY_TABS: { key: string; label: { vi: string; en: string } }[] = [
    { key: 'all', label: { vi: 'Tất cả', en: 'All' } },
    { key: 'massage-therapy', label: { vi: 'Massage Therapy', en: 'Massage Therapy' } },
    { key: 'head-spa', label: { vi: 'Head Spa', en: 'Head Spa' } },
    { key: 'facial-care', label: { vi: 'Facial Care', en: 'Facial Care' } },
    { key: 'signature-rituals', label: { vi: 'Signature Rituals', en: 'Signature Rituals' } },
    { key: 'khac', label: { vi: 'Khác', en: 'Other' } },
];

/** "Khoảng lặng mà khách hàng cảm nhận" — lưới ảnh lọc theo danh mục dịch vụ (state React thuần), 1 ô đặc biệt là thẻ số liệu nổi bật. */
export function ExperienceGallery({ data }: { data: ExperienceGalleryData }) {
    const locale = useLocale();
    const title = tr(data.title, locale);
    const [activeTab, setActiveTab] = useState('all');
    const items = data.items ?? [];

    const filteredItems = useMemo(
        () => (activeTab === 'all' ? items : items.filter((item) => item.category_tag === activeTab)),
        [items, activeTab],
    );

    const featuredTitle = tr(data.featuredStat?.title, locale);
    const featuredDescription = tr(data.featuredStat?.description, locale);
    const showFeaturedCard = activeTab === 'all' && !!(featuredTitle || featuredDescription);
    const featuredIndex = Math.max(0, Math.min((data.featuredStat?.position ?? 1) - 1, filteredItems.length));
    const { ref, className } = useReveal<HTMLElement>();

    if (!items.length) return null;

    const tiles: { key: string; node: React.ReactNode }[] = filteredItems.map((item, index) => {
        const alt = tr(item.image_alt, locale);

        return {
            key: `image-${index}`,
            node: (
                <div className="aspect-[4/3] overflow-hidden rounded-[3px] bg-maha-200">
                    {item.image && (
                        <img
                            src={item.image}
                            alt={alt}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                    )}
                </div>
            ),
        };
    });

    if (showFeaturedCard) {
        tiles.splice(featuredIndex, 0, {
            key: 'featured-stat',
            node: (
                <div className="flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-[3px] bg-[#2F3E2E] px-4 py-5 text-center text-white">
                    {featuredTitle && (
                        <div
                            className="rich-content font-serif text-lg uppercase leading-snug tracking-wide"
                            dangerouslySetInnerHTML={{ __html: featuredTitle }}
                        />
                    )}
                    {featuredDescription && (
                        <div
                            className="rich-content text-xs leading-relaxed text-white/75"
                            dangerouslySetInnerHTML={{ __html: featuredDescription }}
                        />
                    )}
                    <ArrowDown className="mt-1 h-4 w-4 text-white/50" strokeWidth={1.5} />
                </div>
            ),
        });
    }

    return (
        <section ref={ref} className={cn(className, 'mt-[50px] bg-[#f5f2ed] px-5 sm:px-10 lg:px-[60px]')}>
            {title && (
                <h2 className="text-center font-serif text-2xl uppercase tracking-wide text-heading sm:text-3xl">{title}</h2>
            )}

            <div className="mt-8 flex flex-wrap justify-center gap-2">
                {CATEGORY_TABS.map((tab) => (
                    <button
                        key={tab.key}
                        type="button"
                        onClick={() => setActiveTab(tab.key)}
                        className={cn(
                            'rounded-full px-4 py-2 text-xs font-medium uppercase tracking-wide transition-colors sm:text-sm',
                            activeTab === tab.key
                                ? 'bg-[#2F3E2E] text-white'
                                : 'bg-transparent text-ink/70 hover:bg-maha-100',
                        )}
                    >
                        {tr(tab.label, locale)}
                    </button>
                ))}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
                {tiles.map((tile) => (
                    <div key={tile.key}>{tile.node}</div>
                ))}
            </div>
        </section>
    );
}
