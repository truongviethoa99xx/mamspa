import { Link } from '@inertiajs/react';
import { type CSSProperties, useRef } from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin, Navigation, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PublicLayout from '@/Layouts/PublicLayout';
import { Seo } from '@/Components/Seo';
import { ReviewEmbed } from '@/Components/ReviewEmbed';
import { localBusinessSchema, breadcrumbSchema } from '@/Lib/buildSchema';
import { useLocale } from '@/Hooks/useLocale';
import { formatVND, tr } from '@/Lib/utils';

interface BranchService {
    id: number;
    slug: string;
    name: string | Record<string, string>;
    category: string;
    price: number;
    duration: number;
}

type TranslatableText = string | Record<string, string>;

interface BranchReview {
    country?: string;
    flag?: string;
    title?: TranslatableText;
    content?: TranslatableText;
}

interface BranchPageContent {
    hero_eyebrow?: TranslatableText;
    hero_heading?: TranslatableText;
    hero_body_1?: TranslatableText;
    hero_body_2?: TranslatableText;
    hero_cta_label?: TranslatableText;
    space_eyebrow?: TranslatableText;
    space_heading?: TranslatableText;
    space_image_1_label?: TranslatableText;
    space_image_2_label?: TranslatableText;
    space_image_3_label?: TranslatableText;
    reviews_eyebrow?: TranslatableText;
    reviews_heading?: TranslatableText;
    reviews?: BranchReview[];
    review_widget?: string;
    contact_eyebrow?: TranslatableText;
    contact_heading?: TranslatableText;
    address_heading?: TranslatableText;
    phone_heading?: TranslatableText;
    phone_note?: TranslatableText;
    hours_heading?: TranslatableText;
    hours_note?: TranslatableText;
    map_road_label?: TranslatableText;
    map_pin_label?: TranslatableText;
    map_cta_label?: TranslatableText;
    services_heading?: TranslatableText;
}

interface BranchImage {
    url: string;
    alt?: string | null;
}

interface Props {
    branch: {
        id: number;
        slug: string;
        name: string | Record<string, string>;
        address: string;
        phone: string;
        open_hours: string;
        lat: number | null;
        lng: number | null;
        page_content?: BranchPageContent;
        images?: BranchImage[];
        services: BranchService[];
    };
}

const INTERNATIONAL_REVIEWS = [
    {
        country: 'Australia',
        flag: '🇦🇺',
        title: '"The highlight of my trip!"',
        content: 'Gội đầu dưỡng sinh bằng thảo mộc tươi thực sự là một trải nghiệm tuyệt vời. Tóc tôi chưa bao giờ mềm và thơm đến thế.',
    },
    {
        country: 'South Korea',
        flag: '🇰🇷',
        title: '"완벽한 힐링 시간이었습니다"',
        content: 'Kỹ thuật massage cổ vai gáy rất chuyên nghiệp. Không gian phảng phất mùi tinh dầu khiến tôi dễ dàng chìm vào giấc ngủ.',
    },
    {
        country: 'United States',
        flag: '🇺🇸',
        title: '"Beautiful Indochine interior"',
        content: 'Tôi thực sự ấn tượng với kiến trúc Đông Dương tại đây. Nhân viên thân thiện và lực massage vừa vặn hoàn hảo.',
    },
    {
        country: 'Taiwan',
        flag: '🇹🇼',
        title: '"非常放松的体验"',
        content: 'Mọi thứ đều chỉn chu từ hương thơm đến âm nhạc. Chắc chắn tôi sẽ quay lại khi đến Việt Nam.',
    },
] as const;

function mapUrl(branch: Props['branch']): string {
    const query = branch.lat && branch.lng ? `${branch.lat},${branch.lng}` : branch.address;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/** Google Maps embed không cần API key (?output=embed). */
function mapEmbedUrl(branch: Props['branch']): string {
    const query = branch.lat && branch.lng ? `${branch.lat},${branch.lng}` : branch.address;
    return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=16&hl=vi&output=embed`;
}

function branchLabel(name: string): string {
    return name.replace(/^Mầm Spa\s*-?\s*/i, '').trim() || name;
}

function branchInitials(label: string): string {
    return label
        .split(/\s+/)
        .map((word) => word[0])
        .join('')
        .toUpperCase();
}

function imageStyle(image?: BranchImage): CSSProperties | undefined {
    return image ? { backgroundImage: `url(${image.url})` } : undefined;
}

export default function AboutUs({ branch }: Props) {
    const locale = useLocale();
    const { t } = useTranslation();
    const reviewsRef = useRef<HTMLDivElement>(null);
    const name = tr(branch.name, locale);
    const label = branchLabel(name);
    const content = branch.page_content ?? {};
    const images = branch.images ?? [];
    const text = (value: TranslatableText | undefined, fallback: string) => tr(value, locale) || fallback;
    const reviews = content.reviews && content.reviews.length > 0 ? content.reviews : INTERNATIONAL_REVIEWS;
    const heroHeading = text(content.hero_heading, `Mầm Spa - ${label}`);
    const heroCta = text(content.hero_cta_label, `Đến với Mầm ${branchInitials(label)}`);
    const heroBody1 = text(
        content.hero_body_1,
        `Bỏ lại sau lưng tiếng còi xe và sự nhộn nhịp của con phố ${label}, bước qua cánh cửa gỗ của Mầm, bạn sẽ bước vào một thế giới hoàn toàn khác. Không gian được khơi nguồn cảm hứng từ kiến trúc Đông Dương (Indochine) cổ kính, giao thoa cùng mảng xanh thực vật và hương thảo mộc nồng ấm.`,
    );
    const heroBody2 = text(
        content.hero_body_2,
        'Từng viên gạch bông, chiếc ghế mây hay ánh đèn vàng dịu nhẹ đều được chăm chút tỉ mỉ, tạo nên một "ngôi nhà" ấm áp để bạn ẩn mình, gác lại mọi âu lo và quay về chăm sóc chính bản thân.',
    );

    const scrollReviews = (direction: 'prev' | 'next') => {
        const container = reviewsRef.current;
        if (!container) return;

        const card = container.querySelector<HTMLElement>('[data-review-card]');
        const step = card ? card.offsetWidth + 24 : 340;
        container.scrollBy({
            left: direction === 'next' ? step : -step,
            behavior: 'smooth',
        });
    };

    return (
        <PublicLayout>
            <Seo
                title={name}
                description={`${name} — ${branch.address}. ${branch.open_hours}`}
                schema={[
                    localBusinessSchema({ name, address: branch.address, phone: branch.phone, url: window.location.href, lat: branch.lat, lng: branch.lng, id: branch.slug }),
                    breadcrumbSchema([
                        { name: 'Mầm Spa', url: window.location.origin },
                        { name, url: window.location.href },
                    ]),
                ]}
            />
            <section className="bg-maha-50 py-16 md:py-20">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 2xl:max-w-[1440px]">
                    <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-20">
                        <div>
                            <nav className="flex flex-wrap items-center gap-3 text-sm font-semibold text-[#556B3F] md:text-base">
                                <Link href="/" className="transition-colors hover:text-ink">
                                    Trang chủ
                                </Link>
                                <span className="text-[#8C9A6B]">/</span>
                                <Link href="/gioi-thieu" className="transition-colors hover:text-ink">
                                    Chi nhánh
                                </Link>
                                <span className="text-[#8C9A6B]">/</span>
                                <span className="font-medium text-[#475934]">{label}</span>
                            </nav>

                            <p className="mt-16 font-serif text-xl italic leading-relaxed text-[#475934] md:text-2xl">
                                {text(content.hero_eyebrow, 'Trạm dừng chân bình yên giữa lòng Sài Gòn')}
                            </p>
                            <h1 className="mt-4 font-serif text-5xl uppercase tracking-wide text-ink md:text-6xl">
                                {heroHeading}
                            </h1>

                            <div className="mt-12 max-w-xl space-y-9 text-base leading-8 text-[#475934] md:text-lg md:leading-9">
                                <p>{heroBody1}</p>
                                <p>{heroBody2}</p>
                            </div>

                            <a
                                href={mapUrl(branch)}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-14 inline-flex min-w-56 items-center justify-center rounded-full bg-ink px-9 py-4 font-serif text-base font-semibold tracking-wide text-maha-50 transition-colors hover:bg-[#243023]"
                            >
                                {heroCta}
                            </a>
                        </div>

                        <div className="relative mx-auto aspect-[1/1.08] w-full max-w-[620px] bg-cover bg-center" style={imageStyle(images[0])}>
                            <div className="absolute inset-x-[3%] bottom-[2%] top-[10%] rounded-[1.5rem] border-2 border-dashed border-[#8C9A6B]" />
                            {!images[0] && <div className="absolute inset-x-[6%] bottom-0 top-0 rounded-b-[1.75rem] rounded-t-full bg-[#CDBCA3]" />}
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-maha-50 pb-14 md:pb-16">
                <div className="mx-auto max-w-6xl px-5 sm:px-6">
                    <p className="text-center font-serif text-sm italic text-[#556B3F]">
                        {text(content.space_eyebrow, 'Vẻ đẹp của sự mộc mạc và tĩnh tại')}
                    </p>
                    <h2 className="mt-1.5 text-center font-serif text-2xl uppercase tracking-wide text-ink md:text-3xl">
                        {text(content.space_heading, 'Không gian kiến trúc Indochine')}
                    </h2>

                    <div className="mt-9 grid gap-6 lg:grid-cols-[1.85fr_1fr]">
                        <div className="relative min-h-[340px] rounded-3xl bg-[#CDBCA3] bg-cover bg-center md:min-h-[420px]" style={imageStyle(images[1])}>
                            <span className="absolute bottom-6 left-6 rounded-xl bg-white px-6 py-3.5 font-serif text-sm font-bold text-ink">
                                {text(content.space_image_1_label, 'Phòng trị liệu riêng tư')}
                            </span>
                        </div>

                        <div className="grid gap-6">
                            <div className="relative min-h-[165px] rounded-3xl bg-[#CDBCA3] bg-cover bg-center md:min-h-[197px]" style={imageStyle(images[2])}>
                                <span className="absolute bottom-6 left-6 rounded-xl bg-white px-6 py-3.5 font-serif text-sm font-bold text-ink">
                                    {text(content.space_image_2_label, 'Góc thưởng trà')}
                                </span>
                            </div>
                            <div className="relative min-h-[165px] rounded-3xl bg-[#CDBCA3] bg-cover bg-center md:min-h-[197px]" style={imageStyle(images[3])}>
                                <span className="absolute bottom-6 left-6 rounded-xl bg-white px-6 py-3.5 font-serif text-sm font-bold text-ink">
                                    {text(content.space_image_3_label, 'Chi tiết Đông Dương')}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 grid gap-6 md:grid-cols-3">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="rounded-3xl bg-[#CDBCA3] bg-cover bg-center p-4"
                                style={imageStyle(images[item + 3])}
                            >
                                <div className="aspect-[4/3.85] rounded-xl border-2 border-white/70" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="overflow-hidden bg-maha-50 pb-14 md:pb-20">
                <div className="mx-auto max-w-6xl px-5 sm:px-6">
                    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="font-serif text-sm italic text-[#556B3F] md:text-base">
                                {text(content.reviews_eyebrow, 'Hành trình chữa lành không biên giới')}
                            </p>
                            <h2 className="mt-2 font-serif text-3xl uppercase tracking-wide text-ink md:text-4xl">
                                {text(content.reviews_heading, 'Điểm đến yêu thích của bạn bè quốc tế')}
                            </h2>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => scrollReviews('prev')}
                                className="flex h-12 w-12 items-center justify-center rounded-full border border-maha-200 bg-white text-[#8C9A6B]"
                                aria-label="Previous review"
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </button>
                            <button
                                type="button"
                                onClick={() => scrollReviews('next')}
                                className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-maha-50"
                                aria-label="Next review"
                            >
                                <ChevronRight className="h-6 w-6" />
                            </button>
                        </div>
                    </div>

                    <div ref={reviewsRef} className="mt-10 flex gap-6 overflow-x-auto scroll-smooth pb-2">
                        {reviews.map((review, index) => (
                            <article
                                key={`${review.country ?? 'review'}-${index}`}
                                data-review-card
                                className="w-[280px] shrink-0 rounded-2xl border border-maha-100 bg-white p-4 shadow-sm shadow-maha-900/5 md:w-[310px]"
                            >
                                <div className="relative aspect-[16/10.4] rounded-xl bg-[#CDBCA3]">
                                    <span className="absolute left-4 top-4 rounded-full bg-white px-4 py-2 font-serif text-sm font-bold text-ink">
                                        {review.flag} {review.country}
                                    </span>
                                </div>
                                <div className="px-1 pt-6">
                                    <div className="text-lg tracking-[0.16em] text-[#e0a018]">
                                        ★★★★★
                                    </div>
                                    <h3 className="mt-4 font-serif text-xl font-bold leading-snug text-ink">
                                        {text(review.title, '')}
                                    </h3>
                                    <p className="mt-4 text-sm leading-7 text-[#475934]">
                                        {text(review.content, '')}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>

                    {content.review_widget && (
                        <ReviewEmbed html={content.review_widget} className="mt-10" />
                    )}
                </div>
            </section>
            <section className="bg-maha-50 pb-14 md:pb-20">
                <div className="mx-auto max-w-6xl px-5 sm:px-6">
                    <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
                        <div>
                            <p className="font-serif text-sm italic text-[#556B3F] md:text-base">
                                {text(content.contact_eyebrow, 'Ghé thăm không gian yên bình')}
                            </p>
                            <h2 className="mt-2 font-serif text-3xl uppercase tracking-wide text-ink md:text-4xl">
                                {text(content.contact_heading, 'Thông tin liên hệ')}
                            </h2>
                            <span className="mt-5 block h-px w-20 bg-[#8C9A6B]" />

                            <div className="mt-10 space-y-9">
                                <div className="flex gap-6">
                                    <MapPin className="mt-1 h-7 w-7 shrink-0 text-ink" />
                                    <div>
                                        <h3 className="font-serif text-xl font-bold text-ink">
                                            {text(content.address_heading, 'Địa chỉ chi nhánh')}
                                        </h3>
                                        <p className="mt-2 text-base leading-7 text-[#475934]">
                                            {branch.address}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-6">
                                    <Phone className="mt-1 h-7 w-7 shrink-0 text-ink" />
                                    <div>
                                        <h3 className="font-serif text-xl font-bold text-ink">
                                            {text(content.phone_heading, 'Hotline đặt lịch trước')}
                                        </h3>
                                        <p className="mt-2 text-base font-bold leading-7 text-ink">
                                            {branch.phone}
                                            <span className="ml-4 font-serif font-normal italic text-[#475934]">
                                                {text(content.phone_note, '(Hỗ trợ Zalo / WhatsApp / Line)')}
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-6">
                                    <Clock className="mt-1 h-7 w-7 shrink-0 text-ink" />
                                    <div>
                                        <h3 className="font-serif text-xl font-bold text-ink">
                                            {text(content.hours_heading, 'Giờ đón khách')}
                                        </h3>
                                        <p className="mt-2 text-base leading-7 text-[#475934]">
                                            {branch.open_hours}
                                            <span className="ml-4 font-serif italic text-[#8C9A6B]">
                                                {text(content.hours_note, '(Mở cửa tất cả các ngày trong tuần)')}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative min-h-[330px] overflow-hidden rounded-3xl bg-[#E9E2D5] md:min-h-[390px]">
                            <iframe
                                title={`Bản đồ ${branchLabel(tr(branch.name, locale))}`}
                                src={mapEmbedUrl(branch)}
                                className="absolute inset-0 h-full w-full border-0"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                allowFullScreen
                            />
                            <a
                                href={mapUrl(branch)}
                                target="_blank"
                                rel="noreferrer"
                                className="absolute bottom-8 left-8 z-10 inline-flex items-center gap-3 rounded-full bg-white px-7 py-3 font-serif text-sm font-bold text-ink shadow-lg transition-transform hover:-translate-y-0.5"
                            >
                                <Navigation className="h-4 w-4" />
                                {text(content.map_cta_label, 'Xem bản đồ lớn')}
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-12">
                <div className="mx-auto max-w-5xl px-4">
                    <h2 className="mb-6 font-serif text-2xl text-maha-700">{text(content.services_heading, t('about.servicesAtBranch'))}</h2>
                    <ul className="grid gap-3 md:grid-cols-2">
                        {branch.services.map((s) => (
                            <li key={s.id}>
                                <Link href={`/dich-vu/${s.slug}`}
                                    className="flex items-center justify-between rounded-lg border border-maha-100 p-4 hover:bg-maha-50">
                                    <div>
                                        <p className="font-semibold text-maha-700">{tr(s.name, locale)}</p>
                                        <p className="text-xs text-gray-500">{s.duration} {t('common.minute')} · {s.category}</p>
                                    </div>
                                    <span className="font-semibold">{formatVND(s.price)}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </PublicLayout>
    );
}
