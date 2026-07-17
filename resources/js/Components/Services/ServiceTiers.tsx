import { useLocale } from '@/Hooks/useLocale';
import { tr, stripTags } from '@/Lib/utils';

export interface ServiceTier {
    image?: string | null;
    image_alt?: unknown;
    name?: unknown;
    description?: unknown;
    relaxation_percent?: number | null;
    acupressure_percent?: number | null;
    intensity_label?: unknown;
    duration_label?: unknown;
    suitable_for?: string[];
}

export interface ServiceTiersData {
    heading?: unknown;
    subtitle?: unknown;
    tiers: ServiceTier[];
}

const TIERS_LABEL: Record<string, string> = { vi: 'TẦNG TRẢI NGHIỆM', en: 'EXPERIENCE TIERS' };
const SUBTITLE_FALLBACK: Record<string, string> = {
    vi: 'Mỗi tầng trải nghiệm được thiết kế với tỷ lệ thư giãn, kỹ thuật day ấn huyệt và mức độ tác động khác nhau, giúp bạn dễ dàng lựa chọn liệu trình phù hợp.',
    en: 'Each tier is designed with its own balance of relaxation, acupressure technique and intensity, so you can easily choose the treatment that fits.',
};
const RELAX_LABEL: Record<string, string> = { vi: 'Thư giãn', en: 'Relaxation' };
const ACUPRESSURE_LABEL: Record<string, string> = { vi: 'Day ấn huyệt', en: 'Acupressure' };
const INTENSITY_LABEL: Record<string, string> = { vi: 'Mức độ tác động', en: 'Intensity' };
const SUITABLE_LABEL: Record<string, string> = { vi: 'Phù hợp với', en: 'Suitable for' };

/** "04 TẦNG TRẢI NGHIỆM" — các mức độ trị liệu của dịch vụ, mỗi tầng có ảnh, tỷ lệ thư giãn/day ấn huyệt và đối tượng phù hợp. */
export function ServiceTiers({ data }: { data: ServiceTiersData }) {
    const locale = useLocale();
    const tiers = data.tiers ?? [];

    if (!tiers.length) {
        return null;
    }

    const customLabel = tr(data.heading, locale);
    const fallbackLabel = TIERS_LABEL[locale] ?? TIERS_LABEL.vi;
    const subtitle = tr(data.subtitle, locale) || (SUBTITLE_FALLBACK[locale] ?? SUBTITLE_FALLBACK.vi);
    const relaxLabel = RELAX_LABEL[locale] ?? RELAX_LABEL.vi;
    const acupressureLabel = ACUPRESSURE_LABEL[locale] ?? ACUPRESSURE_LABEL.vi;
    const intensityLabel = INTENSITY_LABEL[locale] ?? INTENSITY_LABEL.vi;
    const suitableLabel = SUITABLE_LABEL[locale] ?? SUITABLE_LABEL.vi;

    return (
        <section className="mt-2 bg-white px-5 pb-16 sm:px-10 sm:pb-20 lg:px-[60px] lg:pb-24">
            <div className="text-center">
                <h2 className="font-serif text-sm uppercase tracking-[0.25em] text-heading">
                    {customLabel ? (
                        <span
                            className="rich-content inline [&>p]:inline"
                            dangerouslySetInnerHTML={{ __html: customLabel }}
                        />
                    ) : (
                        fallbackLabel
                    )}
                </h2>
                <span className="mx-auto mt-3 block h-px w-10 bg-maha-300" aria-hidden="true" />
                {subtitle && (
                    <div
                        className="rich-content mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-ink/70"
                        dangerouslySetInnerHTML={{ __html: subtitle }}
                    />
                )}
            </div>

            <div className="mt-10 flex flex-col gap-4">
                {tiers.map((tier, index) => {
                    const name = tr(tier.name, locale);
                    const description = tr(tier.description, locale);
                    const imageAlt = tr(tier.image_alt, locale);
                    const intensity = tr(tier.intensity_label, locale);
                    const duration = tr(tier.duration_label, locale);
                    const suitableFor = tier.suitable_for ?? [];
                    const hasStats = tier.relaxation_percent != null || tier.acupressure_percent != null;

                    return (
                        <article
                            key={index}
                            className="grid gap-5 rounded-sm bg-maha-50 p-5 sm:p-6 lg:grid-cols-3 lg:items-start lg:gap-6"
                        >
                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-maha-200 lg:aspect-auto lg:h-full lg:min-h-[180px]">
                                <span className="absolute left-3 top-3 z-10 flex h-8 w-8 items-center justify-center bg-[#2F3E2E] font-serif text-xs text-white">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                {tier.image && (
                                    <img
                                        src={tier.image}
                                        alt={imageAlt || stripTags(name)}
                                        className="h-full w-full object-cover"
                                    />
                                )}
                            </div>

                            <div>
                                {name && (
                                    <div
                                        className="rich-content font-serif text-2xl uppercase tracking-wide text-heading"
                                        dangerouslySetInnerHTML={{ __html: name }}
                                    />
                                )}
                                {description && (
                                    <div
                                        className="rich-content mt-1.5 text-base leading-relaxed text-ink/70"
                                        dangerouslySetInnerHTML={{ __html: description }}
                                    />
                                )}

                                {hasStats && (
                                    <div className="mt-3 space-y-2.5">
                                        {tier.relaxation_percent != null && (
                                            <div>
                                                <div className="flex items-center justify-between text-sm text-ink/75">
                                                    <span>{relaxLabel}</span>
                                                    <span>{tier.relaxation_percent}%</span>
                                                </div>
                                                <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-maha-200">
                                                    <div
                                                        className="h-full rounded-full bg-[#2F3E2E]"
                                                        style={{ width: `${tier.relaxation_percent}%` }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        {tier.acupressure_percent != null && (
                                            <div>
                                                <div className="flex items-center justify-between text-sm text-ink/75">
                                                    <span>{acupressureLabel}</span>
                                                    <span>{tier.acupressure_percent}%</span>
                                                </div>
                                                <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-maha-200">
                                                    <div
                                                        className="h-full rounded-full bg-[#2F3E2E]"
                                                        style={{ width: `${tier.acupressure_percent}%` }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {(intensity || duration) && (
                                    <ul className="mt-3 space-y-1 text-sm text-ink/75">
                                        {intensity && (
                                            <li className="flex gap-1">
                                                <span>{intensityLabel}:</span>
                                                <span
                                                    className="rich-content inline [&>p]:inline"
                                                    dangerouslySetInnerHTML={{ __html: intensity }}
                                                />
                                            </li>
                                        )}
                                        {duration && (
                                            <li
                                                className="rich-content [&>p]:inline"
                                                dangerouslySetInnerHTML={{ __html: duration }}
                                            />
                                        )}
                                    </ul>
                                )}
                            </div>

                            {!!suitableFor.length && (
                                <div>
                                    <p className="font-serif text-sm uppercase tracking-[0.15em] text-subheading">{suitableLabel}</p>
                                    <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-ink/75">
                                        {suitableFor.map((item, i) => (
                                            <li key={i} className="flex gap-2">
                                                <span aria-hidden="true">•</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
