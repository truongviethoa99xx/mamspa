import { Link } from '@inertiajs/react';
import { Leaf } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { useReveal } from '@/Hooks/useReveal';
import { tr, cn } from '@/Lib/utils';
import { SectionHeading } from '@/Components/About/SectionHeading';
import { CUSTOMER_EXPERIENCE_ICON_MAP } from './icons';

interface ReasonFeature {
    icon?: string;
    title?: unknown;
    description?: unknown;
}

interface ReasonAvatar {
    image?: string | null;
    alt?: string;
}

interface ReasonCard {
    title?: unknown;
    description?: unknown;
    statText?: string;
    avatars: ReasonAvatar[];
    buttonText?: unknown;
    buttonUrl?: string;
}

export interface WhyGuestsReturnData {
    title?: unknown;
    features: ReasonFeature[];
    card: ReasonCard;
}

/** "Vì sao khách hàng quay lại Mầm" — 4 icon tính năng bên trái, thẻ "Lịch hẹn luôn đông!" bên phải. */
export function WhyGuestsReturn({ data }: { data: WhyGuestsReturnData }) {
    const locale = useLocale();
    const title = tr(data.title, locale);
    const features = data.features ?? [];
    const card = data.card;
    const cardTitle = tr(card?.title, locale);
    const cardDescription = tr(card?.description, locale);
    const cardButtonText = tr(card?.buttonText, locale);
    const { ref, className } = useReveal<HTMLElement>();

    return (
        <section ref={ref} className={cn(className, 'mt-[50px] bg-[#f5f2ed] px-5 sm:px-10 lg:px-[60px]')}>
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-8">
                    {title && <SectionHeading heading={title} />}

                    {!!features.length && (
                        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
                            {features.map((feature, index) => {
                                const Icon = CUSTOMER_EXPERIENCE_ICON_MAP[feature.icon ?? ''] ?? Leaf;
                                const featureTitle = tr(feature.title, locale);
                                const featureDescription = tr(feature.description, locale);

                                return (
                                    <div key={index} className="flex flex-col gap-3">
                                        <Icon className="h-7 w-7 text-heading/70" strokeWidth={1.5} />
                                        {featureTitle && (
                                            <p className="text-sm font-semibold uppercase tracking-wide text-heading">
                                                {featureTitle}
                                            </p>
                                        )}
                                        {featureDescription && (
                                            <div
                                                className="rich-content text-sm leading-relaxed text-ink/70"
                                                dangerouslySetInnerHTML={{ __html: featureDescription }}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {(cardTitle || cardDescription) && (
                    <div className="lg:col-span-4">
                        <div className="rounded-[4px] bg-[#2F3E2E] p-6 text-white">
                            {cardTitle && <p className="font-serif text-lg leading-snug">{cardTitle}</p>}
                            {cardDescription && (
                                <div
                                    className="rich-content mt-2 text-sm leading-relaxed text-white/80"
                                    dangerouslySetInnerHTML={{ __html: cardDescription }}
                                />
                            )}

                            {(!!card.avatars?.length || card.statText) && (
                                <div className="mt-5 flex items-center">
                                    <div className="flex -space-x-3">
                                        {card.avatars?.map((avatar, index) => (
                                            <img
                                                key={index}
                                                src={avatar.image ?? undefined}
                                                alt={avatar.alt ?? ''}
                                                className="h-9 w-9 rounded-full border-2 border-[#2F3E2E] object-cover"
                                                loading="lazy"
                                            />
                                        ))}
                                    </div>
                                    {card.statText && (
                                        <span className="ml-3 text-sm font-semibold text-white/90">{card.statText}</span>
                                    )}
                                </div>
                            )}

                            {cardButtonText && card.buttonUrl && (
                                <Link
                                    href={card.buttonUrl}
                                    className="mt-6 inline-flex items-center rounded-full bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-heading transition-opacity hover:opacity-90"
                                >
                                    {cardButtonText}
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
