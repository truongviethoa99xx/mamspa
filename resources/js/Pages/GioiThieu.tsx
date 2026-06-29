import { usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Coffee, Flower2, Globe, HandHelping, Heart, Leaf, MapPin, MoreHorizontal, Phone, Play, Quote } from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Seo } from '@/Components/Seo';
import { useLocale } from '@/Hooks/useLocale';
import { tr } from '@/Lib/utils';
import type { SharedProps } from '@/types';

const GREEN = '#6e7a51';

const FEATURES = [
    { icon: Flower2, key: 'headSpa' },
    { icon: HandHelping, key: 'bodyMassage' },
    { icon: Leaf, key: 'herbal' },
    { icon: Coffee, key: 'tea' },
] as const;

interface TeamMember {
    name: string;
    role?: string;
    description?: string;
    photo?: string;
}

interface ReviewCard {
    handle: string;
    link?: string;
    image?: string;
}

interface AboutContent {
    contact_phone: string | null;
    contact_address: string | null;
    contact_website: string | null;
    hero_image: string | null;
    story_image: string | null;
    vision_image: string | null;
    value_images: (string | null)[];
    team: TeamMember[];
    instagram_handles: string[];
    review_video_url?: string | null;
    review_video_image?: string | null;
    review_cards?: ReviewCard[];
}

interface Props {
    content: AboutContent;
}

export default function GioiThieu({ content }: Props) {
    const { t } = useTranslation();
    const locale = useLocale();
    const { props } = usePage<SharedProps>();
    const branches = props.branches ?? [];

    const phone = content.contact_phone ?? '';
    const address = content.contact_address ?? '';
    const website = content.contact_website ?? '';
    const team = content.team ?? [];
    const reviewCards =
        content.review_cards && content.review_cards.length > 0
            ? content.review_cards
            : (content.instagram_handles ?? []).map((handle) => ({ handle }));
    const bullets = [
        { name: branches[0] ? tr(branches[0].name, locale) : 'Mầm Spa Lê Văn Sỹ', desc: t('about.vision.b1') },
        { name: branches[1] ? tr(branches[1].name, locale) : 'Mầm Spa Lê Thị Riêng', desc: t('about.vision.b2') },
    ];

    return (
        <PublicLayout>
            <Seo
                title={`${t('nav.about')} | Mầm Spa`}
                description={t('about.metaDescription', 'Câu chuyện thương hiệu Mầm Spa — không gian Indochine, đội ngũ trị liệu tận tâm, hành trình cân bằng Thân Tâm Trí tại Đà Nẵng.')}
                schema={{
                    '@context': 'https://schema.org',
                    '@type': 'AboutPage',
                    name: t('nav.about'),
                    url: window.location.href,
                    mainEntityOfPage: { '@type': 'WebPage', '@id': window.location.href },
                    about: { '@type': 'Organization', '@id': window.location.origin + '/#organization' },
                }}
            />

            <section className="relative overflow-hidden bg-[#f3ece0]">
                <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 md:py-24 2xl:max-w-[1440px]">
                    {/* Hero: photo + intro */}
                    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                        {/* Photo */}
                        <div className="aspect-[4/3] overflow-hidden rounded-[2rem] bg-maha-200 shadow-xl shadow-maha-900/10">
                            <img
                                src={content.hero_image ?? '/images/about-spa.jpg'}
                                alt={t('about.title')}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                        </div>

                        {/* Intro text */}
                        <div>
                            <p className="font-serif text-lg italic" style={{ color: GREEN }}>
                                {t('about.hero.eyebrow')}
                            </p>
                            <h1 className="mt-3 font-serif text-4xl uppercase leading-[1.1] text-ink sm:text-5xl md:text-6xl">
                                {t('about.title')}
                            </h1>
                            <p className="mt-5 max-w-md text-base leading-relaxed text-ink/70 md:text-lg">
                                {t('about.subtitle')}
                            </p>
                        </div>
                    </div>

                    {/* Feature pillars */}
                    <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                        {FEATURES.map(({ icon: Icon, key }) => (
                            <div key={key} className="flex flex-col items-center text-center">
                                <span
                                    className="flex h-14 w-14 items-center justify-center rounded-full border"
                                    style={{ borderColor: GREEN, color: GREEN }}
                                >
                                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                                </span>
                                <h3 className="mt-4 font-serif text-base font-bold uppercase tracking-wide text-ink">
                                    {t(`about.featureTitles.${key}`)}
                                </h3>
                                <p className="mt-2 max-w-[15rem] text-sm leading-relaxed text-ink/70">
                                    {t(`about.features.${key}`)}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Retreat line */}
                    <p className="mt-14 text-center font-serif text-xl italic text-ink/70 md:text-2xl">
                        {t('about.hero.retreat')}
                    </p>

                    {/* Contact bar */}
                    <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-maha-300/60 pt-8 text-sm text-ink/80">
                        {phone && (
                            <a
                                href={`tel:${phone.replace(/[^\d+]/g, '')}`}
                                className="inline-flex items-center gap-2 transition-colors hover:text-ink"
                            >
                                <Phone className="h-4 w-4" style={{ color: GREEN }} />
                                {phone}
                            </a>
                        )}
                        {address && (
                            <span className="inline-flex items-center gap-2">
                                <MapPin className="h-4 w-4" style={{ color: GREEN }} />
                                {address}
                            </span>
                        )}
                        {website && (
                            <a
                                href={`https://${website}`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 transition-colors hover:text-ink"
                            >
                                <Globe className="h-4 w-4" style={{ color: GREEN }} />
                                {website}
                            </a>
                        )}
                    </div>
                </div>
            </section>

            {/* Brand story */}
            <section className="bg-maha-50 py-16 md:py-24">
                <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-16 2xl:max-w-[1440px]">
                    {/* Image */}
                    <div className="aspect-[4/3] overflow-hidden rounded-[2rem] bg-maha-200 shadow-lg shadow-maha-900/10">
                        <img
                            src={content.story_image ?? '/images/about-story.jpg'}
                            alt={t('about.story.heading')}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                            }}
                        />
                    </div>

                    {/* Text */}
                    <div className="rounded-[2rem] bg-white/50 p-6 md:p-10">
                        <p className="font-serif text-base font-bold" style={{ color: GREEN }}>
                            {t('about.story.eyebrow')}
                        </p>
                        <h2 className="mt-4 font-serif text-3xl leading-snug text-ink sm:text-4xl">
                            {t('about.story.heading')}
                        </h2>
                        <span className="mt-5 block h-px w-16" style={{ backgroundColor: GREEN }} />
                        <div className="mt-6 space-y-5 leading-relaxed text-ink/70 md:text-lg">
                            <p>{t('about.story.p1')}</p>
                            <p>{t('about.story.p2')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="bg-[#f3ece0] py-16 md:py-24">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 2xl:max-w-[1440px]">
                    {/* Header */}
                    <p className="font-serif text-base italic md:text-lg" style={{ color: GREEN }}>
                        {t('about.vision.eyebrow')}
                    </p>
                    <h2 className="mt-2 font-serif text-3xl uppercase tracking-wide text-ink sm:text-4xl md:text-5xl">
                        {t('about.vision.title')}
                    </h2>

                    <div className="mt-10 grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
                        {/* Text card */}
                        <div className="rounded-[2rem] bg-white/60 p-7 md:p-10">
                            <div className="space-y-5 leading-relaxed text-ink/75">
                                <p>{t('about.vision.p1')}</p>
                                <p>{t('about.vision.p2')}</p>
                            </div>
                            <ul className="mt-7 space-y-4 text-ink/75">
                                {bullets.map((b) => (
                                    <li key={b.name} className="leading-relaxed">
                                        <span className="font-bold text-ink">• {b.name}:</span> {b.desc}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Image with offset frame */}
                        <div className="relative">
                            <div
                                className="absolute -right-4 -top-4 hidden h-full w-full rounded-[2rem] border lg:block"
                                style={{ borderColor: `${GREEN}80` }}
                                aria-hidden="true"
                            />
                            <div className="relative z-10 aspect-square overflow-hidden rounded-[2rem] bg-maha-200 shadow-lg shadow-maha-900/10">
                                <img
                                    src={content.vision_image ?? '/images/about-vision.jpg'}
                                    alt={t('about.vision.title')}
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core values */}
            <section className="bg-maha-50 py-16 md:py-24">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 2xl:max-w-[1440px]">
                    {/* Header */}
                    <p className="font-serif text-base italic md:text-lg" style={{ color: GREEN }}>
                        {t('about.values.eyebrow')}
                    </p>
                    <h2 className="mt-2 font-serif text-3xl uppercase tracking-wide text-ink sm:text-4xl md:text-5xl">
                        {t('about.values.title')}
                    </h2>

                    <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {(['1', '2', '3'] as const).map((n) => (
                            <div key={n} className="rounded-[2rem] bg-white p-4 shadow-md shadow-maha-900/5">
                                <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-maha-200">
                                    <img
                                        src={content.value_images?.[Number(n) - 1] ?? `/images/about-value-${n}.jpg`}
                                        alt={t(`about.values.t${n}`)}
                                        className="h-full w-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                        }}
                                    />
                                </div>
                                <div className="px-3 pb-4 pt-6">
                                    <h3 className="font-serif text-xl text-ink md:text-2xl">
                                        {t(`about.values.t${n}`)}
                                    </h3>
                                    <p className="mt-3 leading-relaxed text-ink/70">
                                        {t(`about.values.d${n}`)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="bg-[#f3ece0] py-16 md:py-24">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 2xl:max-w-[1440px]">
                    {/* Header */}
                    <p className="text-center font-serif text-base italic md:text-lg" style={{ color: GREEN }}>
                        {t('about.team.eyebrow')}
                    </p>
                    <h2 className="mt-2 text-center font-serif text-3xl uppercase tracking-wide text-ink sm:text-4xl md:text-5xl">
                        {t('about.team.title')}
                    </h2>

                    <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                        {team.map((m, i) => (
                            <div key={`${m.name}-${i}`} className="flex flex-col items-center text-center">
                                <div className="mx-auto aspect-[3/4] w-full max-w-[240px] overflow-hidden rounded-t-full rounded-b-2xl bg-maha-200">
                                    {m.photo && (
                                        <img
                                            src={m.photo}
                                            alt={m.name}
                                            className="h-full w-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                            }}
                                        />
                                    )}
                                </div>
                                <h3 className="mt-6 font-serif text-lg font-bold uppercase tracking-wide text-ink">
                                    {m.name}
                                </h3>
                                {m.role && (
                                    <p className="mt-1 font-serif italic" style={{ color: GREEN }}>
                                        {m.role}
                                    </p>
                                )}
                                <span className="my-4 block h-px w-10 bg-maha-300" />
                                {m.description && (
                                    <p className="max-w-xs text-sm leading-relaxed text-ink/70">
                                        {m.description}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Customer reviews — media wall */}
            <section className="bg-maha-50 py-16 md:py-24">
                <div className="mx-auto max-w-5xl px-5 sm:px-6">
                    {/* Header */}
                    <p className="font-serif text-base italic md:text-lg" style={{ color: GREEN }}>
                        {t('about.reviews.eyebrow')}
                    </p>
                    <h2 className="mt-2 font-serif text-3xl uppercase tracking-wide text-ink sm:text-4xl md:text-5xl">
                        {t('about.reviews.title')}
                    </h2>

                    <div className="mt-12 grid gap-6 lg:grid-cols-[1.5fr_0.85fr_0.85fr]">
                        {/* Left: video + quote */}
                        <div className="flex flex-col gap-6">
                            <a
                                href={content.review_video_url || undefined}
                                target={content.review_video_url ? '_blank' : undefined}
                                rel={content.review_video_url ? 'noreferrer' : undefined}
                                className="group relative aspect-video overflow-hidden rounded-3xl bg-maha-300 text-left"
                            >
                                {content.review_video_image && (
                                    <img
                                        src={content.review_video_image}
                                        alt={t('about.reviews.videoCaption')}
                                        className="h-full w-full object-cover"
                                    />
                                )}
                                <span className="absolute inset-0 flex items-center justify-center">
                                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-ink text-white transition-transform group-hover:scale-110">
                                        <Play className="ml-1 h-6 w-6 fill-white" />
                                    </span>
                                </span>
                                <span className="absolute bottom-5 left-5 font-serif text-lg font-semibold text-white drop-shadow">
                                    {t('about.reviews.videoCaption')}
                                </span>
                            </a>

                            <figure className="rounded-3xl bg-white p-7 shadow-md shadow-maha-900/5 md:p-9">
                                <Quote className="h-8 w-8 fill-maha-200 text-maha-200" />
                                <blockquote className="mt-3 font-serif text-lg italic leading-relaxed text-ink/80">
                                    &ldquo;{t('about.reviews.quote')}&rdquo;
                                </blockquote>
                                <figcaption className="mt-4 font-serif font-bold text-ink">
                                    {t('about.reviews.author')}
                                </figcaption>
                            </figure>
                        </div>

                        {/* Instagram-style cards */}
                        {reviewCards.map((card) => {
                            const Tag = card.link ? 'a' : 'div';

                            return (
                            <Tag
                                key={card.handle}
                                href={card.link}
                                target={card.link ? '_blank' : undefined}
                                rel={card.link ? 'noreferrer' : undefined}
                                className="flex min-h-[360px] flex-col rounded-3xl bg-maha-300 p-5"
                            >
                                {card.image && (
                                    <img
                                        src={card.image}
                                        alt={card.handle}
                                        className="-mx-5 -mt-5 mb-5 h-56 rounded-t-3xl object-cover"
                                    />
                                )}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <span className="h-9 w-9 rounded-full bg-white/70" />
                                        <span className="text-sm font-medium text-ink/80">{card.handle}</span>
                                    </div>
                                    <MoreHorizontal className="h-5 w-5 text-ink/50" />
                                </div>
                                <button className="mt-auto inline-flex items-center justify-center gap-2 self-center rounded-full bg-white px-7 py-2.5 text-sm font-bold text-ink shadow-sm transition-transform hover:scale-105">
                                    <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                                    {t('about.reviews.like')}
                                </button>
                            </Tag>
                            );
                        })}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
