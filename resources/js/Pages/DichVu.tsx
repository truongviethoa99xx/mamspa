import { Link, router } from '@inertiajs/react';
import { type CSSProperties, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CalendarDays, MapPin, Search, X } from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Seo } from '@/Components/Seo';
import { ServiceCard, type ServiceCardData } from '@/Components/ServiceCard';
import { useLocale } from '@/Hooks/useLocale';
import { tr } from '@/Lib/utils';

const CATEGORIES = ['Body Massage', 'Head Spa', 'Facial Care', 'Mother Care'];

type Service = ServiceCardData & { branches: string[] };

interface Branch {
    slug: string;
    name: Record<string, string> | string;
}

interface Props {
    filters: { branch: string | null; q: string };
    combos: Service[];
    services: Service[];
    branches: Branch[];
    content?: ServiceListingContent;
}

interface MassageCard {
    title: string;
    description?: string;
    image?: string;
    key?: string;
}

interface HeadSpaService {
    name: string;
    duration?: string;
    description?: string;
}

interface HeadSpaCard {
    title: string;
    image?: string;
    services?: HeadSpaService[];
}

interface OtherCareItem {
    title: string;
    eyebrow?: string;
    paragraphs?: string[];
    image?: string;
}

interface ServiceListingContent {
    listing_categories?: string[];
    massage_eyebrow?: string | null;
    massage_cards?: MassageCard[];
    head_spa_eyebrow?: string | null;
    head_spa_title?: string | null;
    head_spa_cards?: HeadSpaCard[];
    other_care_eyebrow?: string | null;
    other_care_title?: string | null;
    other_care_items?: OtherCareItem[];
}

const MASSAGE = [
    { title: 'Head - Neck - Shoulder', key: '1' },
    { title: 'Foot Work', key: '2' },
    { title: 'Body Work', key: '3' },
] as const;

const HEAD_SPA_CARDS = [
    {
        title: 'HEAD SPA THƯ GIÃN',
        services: [
            {
                name: 'Gội Thư Giãn',
                duration: '45 Phút',
                description: 'Làm sạch nhẹ nhàng, kết hợp massage đầu và cổ vai gáy. Giúp xua tan áp lực, mang lại sự nhẹ nhõm tức thì.',
            },
            {
                name: 'Đặc Trưng Mầm',
                duration: '60 Phút',
                description: 'Gội dưỡng sinh chuyên sâu, ấn huyệt cổ vai gáy, kết hợp chườm mắt thảo dược giúp đả thông kinh lạc.',
            },
            {
                name: 'Chuyên Sâu',
                duration: '60 Phút',
                description: 'Liệu pháp đặc trị cho vùng đầu, kết hợp chườm đá nóng và massage ấn huyệt gáy giúp giấc ngủ sâu hơn.',
            },
        ],
    },
    {
        title: 'SCALP CARE PHỤC HỒI',
        services: [
            {
                name: 'Phục Hồi Da Đầu',
                duration: '45 Phút',
                description: 'Làm sạch sâu bã nhờn, tẩy tế bào chết và phục hồi nang tóc. Kích thích mọc tóc tự nhiên và giảm gãy rụng.',
            },
            {
                name: 'Tái Tạo Da Đầu & Làn Da',
                duration: '75 Phút',
                description: 'Cân bằng độ ẩm da đầu, cải thiện nang tóc kết hợp đắp mặt nạ thư giãn và massage nâng cơ mặt.',
            },
            {
                name: 'Soi Da Đầu (Tặng kèm)',
                duration: 'Before / After',
                description: 'Kiểm tra tình trạng nang tóc trước và sau liệu trình bằng máy soi chuyên dụng để thấy rõ sự thay đổi.',
            },
        ],
    },
] as const;

const OTHER_CARE_ITEMS = [
    {
        title: 'Mother Care',
        eyebrow: 'Nâng niu hành trình thiêng liêng',
        paragraphs: [
            'Giai đoạn thai kỳ mang đến nhiều thay đổi khiến cơ thể mẹ dễ mệt mỏi. Liệu trình Mother Care tại Mầm Spa sử dụng dầu massage 100% hữu cơ, kết hợp kỹ thuật ấn huyệt nhẹ nhàng, an toàn tuyệt đối cho cả mẹ và bé.',
            'Giúp giảm đau nhức cơ xương khớp, hạn chế tình trạng chuột rút và mang lại giấc ngủ sâu, an lành cho mẹ bầu.',
        ],
    },
    {
        title: 'Facial Care',
        eyebrow: 'Đánh thức vẻ rạng rỡ tự nhiên',
        paragraphs: [
            'Chăm sóc chuyên sâu với các dòng sản phẩm chiết xuất từ thảo mộc thiên nhiên, an toàn và lành tính.',
            'Kết hợp liệu pháp massage nâng cơ bằng đá nóng giúp trẻ hoá làn da và xoá mờ dấu vết thời gian.',
        ],
    },
] as const;

function imageStyle(image?: string): CSSProperties | undefined {
    return image ? { backgroundImage: `url(${image})` } : undefined;
}

export default function DichVu({ filters, combos, services, branches, content }: Props) {
    const { t } = useTranslation();
    const locale = useLocale();
    const categories = content?.listing_categories && content.listing_categories.length > 0 ? content.listing_categories : CATEGORIES;
    const massageCards = content?.massage_cards && content.massage_cards.length > 0 ? content.massage_cards : MASSAGE;
    const headSpaCards = content?.head_spa_cards && content.head_spa_cards.length > 0 ? content.head_spa_cards : HEAD_SPA_CARDS;
    const otherCareItems = content?.other_care_items && content.other_care_items.length > 0 ? content.other_care_items : OTHER_CARE_ITEMS;

    const [branch, setBranch] = useState(filters.branch ?? branches[0]?.slug ?? '');
    const [query, setQuery] = useState(filters.q ?? '');
    const searchActive = filters.q.trim().length > 0;

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/dich-vu/', { branch, q: query }, { preserveState: true, preserveScroll: true });
    };

    const clearSearch = () => {
        setQuery('');
        router.get('/dich-vu/', { branch }, { preserveState: true, preserveScroll: true });
    };

    return (
        <PublicLayout>
            <Seo title={`${t('nav.services')} | Mầm Spa`} />

            {/* Search hero */}
            <section className="bg-[#8A8478] py-20 md:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 2xl:max-w-[1440px]">
                    <p className="font-serif text-lg italic text-maha-50/80 md:text-xl">
                        {t('dichvu.eyebrow')}
                    </p>
                    <h1 className="mt-3 font-serif text-4xl uppercase tracking-wide text-maha-50 sm:text-5xl md:text-6xl">
                        {t('dichvu.title')}
                    </h1>

                    <ul className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-maha-50/90">
                        {categories.map((c, i) => (
                            <li key={c} className="flex items-center gap-3">
                                {i > 0 && <span className="text-maha-50/50">•</span>}
                                {c}
                            </li>
                        ))}
                    </ul>

                    {/* Search bar */}
                    <form
                        onSubmit={submit}
                        className="mt-8 flex w-full max-w-3xl flex-col gap-2 rounded-3xl bg-white p-2 shadow-xl shadow-black/10 sm:flex-row sm:items-center sm:gap-0 sm:rounded-full sm:pl-5"
                    >
                        {/* Branch */}
                        <div className="flex items-center gap-2 px-3 py-2 sm:py-0 sm:pr-4">
                            <MapPin className="h-5 w-5 shrink-0 text-[#556B3F]" />
                            <select
                                value={branch}
                                onChange={(e) => setBranch(e.target.value)}
                                className="w-full cursor-pointer bg-transparent font-bold text-ink focus:outline-none"
                                aria-label={t('bookingForm.branch')}
                            >
                                {branches.map((b) => (
                                    <option key={b.slug} value={b.slug}>
                                        {tr(b.name, locale)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <span className="hidden h-7 w-px bg-maha-200 sm:block" />

                        {/* Query */}
                        <div className="flex flex-1 items-center gap-3 px-3 py-2 sm:py-0 sm:pl-4">
                            <Search className="h-5 w-5 shrink-0 text-[#556B3F]" />
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder={t('dichvu.searchPlaceholder')}
                                className="w-full bg-transparent italic text-ink placeholder-maha-400 focus:outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="rounded-full bg-ink px-8 py-3.5 font-serif text-base font-semibold tracking-wide text-maha-50 transition-colors hover:bg-[#243023]"
                        >
                            {t('dichvu.searchButton')}
                        </button>
                    </form>
                </div>
            </section>

            {searchActive ? (
                /* Search results — every matching service, across all categories */
                <section className="bg-maha-50 py-16 md:py-24">
                    <div className="mx-auto max-w-7xl px-5 sm:px-6 2xl:max-w-[1440px]">
                        <p className="text-center font-serif text-base italic text-[#556B3F] md:text-lg">
                            {t('dichvu.results.eyebrow')}
                        </p>
                        <h2 className="mt-2 text-center font-serif text-3xl uppercase tracking-wide text-ink sm:text-4xl md:text-5xl">
                            {filters.q.trim() ? t('dichvu.results.titleWithQuery', { query: filters.q }) : t('dichvu.results.title')}
                        </h2>
                        <p className="mt-4 text-center text-ink/60">
                            {t('dichvu.results.count', { count: services.length })}
                        </p>
                        <span className="mx-auto mt-5 block h-px w-20 bg-[#556B3F]" />

                        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {services.map((s) => (
                                <ServiceCard key={s.id} service={s} locale={locale} />
                            ))}
                            {services.length === 0 && (
                                <p className="col-span-full text-center text-ink/60">{t('dichvu.results.empty')}</p>
                            )}
                        </div>

                        <div className="mt-10 flex justify-center">
                            <button
                                type="button"
                                onClick={clearSearch}
                                className="inline-flex items-center gap-2.5 rounded-full border border-ink px-7 py-3 font-serif text-sm font-semibold tracking-wide text-ink transition-colors hover:bg-ink hover:text-maha-50"
                            >
                                <X className="h-4 w-4" />
                                {t('dichvu.results.clear')}
                            </button>
                        </div>
                    </div>
                </section>
            ) : (
                <>
            {/* Combo packages */}
            <section className="bg-maha-50 py-16 md:py-24">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 2xl:max-w-[1440px]">
                    {/* Header */}
                    <p className="text-center font-serif text-base italic text-[#556B3F] md:text-lg">
                        {t('dichvu.combos.eyebrow')}
                    </p>
                    <h2 className="mt-2 text-center font-serif text-3xl uppercase tracking-wide text-ink sm:text-4xl md:text-5xl">
                        {t('dichvu.combos.title')}
                    </h2>
                    <span className="mx-auto mt-5 block h-px w-20 bg-[#556B3F]" />

                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {combos.map((c) => (
                            <ServiceCard key={c.id} service={c} locale={locale} />
                        ))}
                        {combos.length === 0 && (
                            <p className="col-span-full text-center text-ink/60">{t('dichvu.empty', 'Chưa có gói combo nào.')}</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Therapeutic massage */}
            <section className="bg-maha-50 py-16 md:py-24">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 2xl:max-w-[1440px]">
                    {/* Header */}
                    <p className="text-center font-serif text-base italic text-[#556B3F] md:text-lg">
                        {content?.massage_eyebrow || 'Vietnamese Healing Therapy'}
                    </p>
                    <h2 className="mt-2 text-center font-serif text-3xl uppercase tracking-wide text-ink sm:text-4xl md:text-5xl">
                        {t('dichvu.massage.title')}
                    </h2>
                    <span className="mx-auto mt-5 block h-px w-20 bg-[#556B3F]" />

                    <div className="mt-14 grid gap-10 md:grid-cols-3">
                        {massageCards.map((m, index) => (
                            <div key={`${m.title}-${index}`} className="text-center">
                                <div className="relative mx-auto max-w-[300px]">
                                    <div className="aspect-square rounded-2xl bg-maha-200 bg-cover bg-center p-3" style={imageStyle(m.image)}>
                                        <div className="h-full w-full rounded-xl border border-white/70" />
                                    </div>
                                    <span className="absolute -bottom-6 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-ink">
                                        <span className="h-4 w-4 rounded-full bg-maha-50" />
                                    </span>
                                </div>
                                <h3 className="mt-12 font-serif text-xl font-bold uppercase tracking-wide text-ink">
                                    {m.title}
                                </h3>
                                <p className="mx-auto mt-3 max-w-xs leading-relaxed text-ink/70">
                                    {m.description || t(`dichvu.massage.d${m.key ?? index + 1}`)}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-14 flex justify-center">
                        <Link
                            href="/dat-lich/"
                            className="inline-flex items-center gap-3 rounded-full bg-ink px-9 py-4 font-serif text-base font-semibold tracking-wide text-maha-50 transition-colors hover:bg-[#243023]"
                        >
                            <CalendarDays className="h-5 w-5" />
                            {t('common.bookNow')}
                        </Link>
                    </div>
                </div>
            </section>

            {/* Head spa and scalp care */}
            <section className="bg-maha-50 pb-12 pt-1 md:pb-16 md:pt-2">
                <div className="mx-auto max-w-5xl px-5 sm:px-6">
                    <p className="text-center font-serif text-sm italic text-[#556B3F]">
                        {content?.head_spa_eyebrow || 'Nourish your roots, calm your mind'}
                    </p>
                    <h2 className="mt-1.5 text-center font-serif text-2xl uppercase tracking-wide text-ink md:text-3xl">
                        {content?.head_spa_title || 'Head Spa & Scalp Care'}
                    </h2>
                    <span className="mx-auto mt-3 block h-px w-14 bg-[#556B3F]" />

                    <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-8">
                        {headSpaCards.map((card) => (
                            <article
                                key={card.title}
                                className="rounded-2xl border border-maha-100 bg-white p-4 shadow-sm shadow-maha-900/5"
                            >
                                <div className="aspect-[16/6.4] rounded-xl bg-[#CDBCA3] bg-cover bg-center" style={imageStyle(card.image)} />

                                <div className="px-1 pb-1 pt-6">
                                    <h3 className="font-serif text-lg font-bold uppercase tracking-wide text-ink md:text-xl">
                                        {card.title}
                                    </h3>

                                    <div className="mt-5 divide-y divide-dashed divide-maha-100">
                                        {card.services.map((service) => (
                                            <div key={service.name} className="py-4 first:pt-0 last:pb-0">
                                                <div className="flex items-start justify-between gap-4">
                                                    <h4 className="text-base font-bold leading-snug text-ink md:text-lg">
                                                        {service.name}
                                                    </h4>
                                                    <span className="shrink-0 pt-0.5 font-serif text-base font-bold text-[#8C9A6B] md:text-lg">
                                                        {service.duration}
                                                    </span>
                                                </div>
                                                <p className="mt-2 text-sm leading-6 text-[#475934] md:text-base md:leading-7">
                                                    {service.description}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="mt-10 flex justify-center">
                        <Link
                            href="/dat-lich/"
                            className="inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-3 font-serif text-sm font-semibold tracking-wide text-maha-50 transition-colors hover:bg-[#243023]"
                        >
                            <CalendarDays className="h-4 w-4" />
                            {t('common.bookNow')}
                        </Link>
                    </div>
                </div>
            </section>

            {/* Other care services */}
            <section className="bg-maha-50 pb-14 pt-1 md:pb-20 md:pt-2">
                <div className="mx-auto max-w-5xl px-5 sm:px-6">
                    <p className="text-center font-serif text-sm italic text-[#556B3F]">
                        {content?.other_care_eyebrow || 'Beauty from within'}
                    </p>
                    <h2 className="mt-1.5 text-center font-serif text-2xl uppercase tracking-wide text-ink md:text-3xl">
                        {content?.other_care_title || 'Các dịch vụ chăm sóc khác'}
                    </h2>
                    <span className="mx-auto mt-3 block h-px w-14 bg-[#556B3F]" />

                    <div className="mt-10 space-y-14 md:mt-12 md:space-y-16">
                        {otherCareItems.map((item, index) => {
                            const text = (
                                <div className="flex flex-col justify-center">
                                    <h3 className="font-serif text-2xl font-bold text-ink md:text-3xl">
                                        {item.title}
                                    </h3>
                                    <p className="mt-2 font-serif text-sm italic text-[#8C9A6B]">
                                        {item.eyebrow}
                                    </p>
                                    <div className="mt-7 space-y-5 text-sm leading-7 text-[#475934] md:text-base md:leading-8">
                                        {item.paragraphs.map((paragraph) => (
                                            <p key={paragraph}>{paragraph}</p>
                                        ))}
                                    </div>
                                    <div className="mt-8">
                                        <Link
                                            href="/dat-lich/"
                                            className="inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-3 font-serif text-sm font-semibold tracking-wide text-maha-50 transition-colors hover:bg-[#243023]"
                                        >
                                            <CalendarDays className="h-4 w-4" />
                                            {t('common.bookNow')}
                                        </Link>
                                    </div>
                                </div>
                            );

                            const image = <div className="aspect-[16/12.5] rounded-2xl bg-[#CDBCA3] bg-cover bg-center" style={imageStyle(item.image)} />;

                            return (
                                <div key={item.title} className="grid gap-8 md:grid-cols-2 md:items-center md:gap-12">
                                    {index % 2 === 0 ? (
                                        <>
                                            {text}
                                            {image}
                                        </>
                                    ) : (
                                        <>
                                            <div className="md:order-1">{image}</div>
                                            <div className="md:order-2">{text}</div>
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
                </>
            )}
        </PublicLayout>
    );
}
