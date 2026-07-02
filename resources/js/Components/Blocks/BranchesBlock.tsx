import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { tr, cn } from '@/Lib/utils';

interface BranchItem {
    id?: number | string;
    slug: string;
    name: unknown;
    intro_title?: unknown;
    eyebrow?: unknown;
    subheading?: unknown;
    heading?: unknown;
    body_1?: unknown;
    body_2?: unknown;
    cta?: unknown;
    caption?: unknown;
    images?: string[];
}

export function BranchesBlock({ data }: { data: { branches?: BranchItem[] } }) {
    const locale = useLocale();
    const { t } = useTranslation();
    const [active, setActive] = useState(0);

    const branches: BranchItem[] = data.branches ?? [];

    // Không có chi nhánh nào thì ẩn hẳn khối, không dựng dữ liệu mẫu.
    if (branches.length === 0) {
        return null;
    }

    const branch = branches[active] ?? branches[0];

    const name = tr(branch.name, locale);
    const title = tr(branch.intro_title, locale) || t('blocks.branches.title');
    const eyebrow = tr(branch.eyebrow, locale) || t('blocks.branches.eyebrow');
    const subheading = tr(branch.subheading, locale) || t('blocks.branches.subheading');
    const heading = tr(branch.heading, locale) || t('blocks.branches.heading');
    const description = [
        tr(branch.body_1, locale) || t('blocks.branches.p1'),
        tr(branch.body_2, locale) || t('blocks.branches.p2'),
    ]
        .filter(Boolean)
        .join('\n\n');
    const cta = tr(branch.cta, locale) || t('blocks.branches.cta');
    const caption = tr(branch.caption, locale) || t('blocks.branches.caption', { name });
    const paragraphs = description.split('\n').filter((p) => p.trim());

    const mainImage = branch.images?.[0];
    const detailImage = branch.images?.[1];

    return (
        <section id="main" className="bg-maha-50 pb-10 pt-6 sm:pb-14 sm:pt-8 md:pb-20 md:pt-12 lg:pb-24 lg:pt-12">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 2xl:max-w-[1440px]">
                {/* Section title */}
                <h2 className="text-center font-serif text-xl uppercase tracking-wide text-ink sm:text-3xl md:text-4xl">
                    {title}
                </h2>

                {/* Branch tabs */}
                <div className="mt-6 border-t border-maha-300/50 md:mt-12">
                    <div className="flex items-center gap-5 overflow-x-auto">
                        {branches.map((b, i) => (
                            <button
                                key={b.slug}
                                onClick={() => setActive(i)}
                                className={cn(
                                    '-mt-px shrink-0 border-t-2 py-3 font-serif text-xs uppercase tracking-[0.08em] transition-colors sm:text-base md:py-5 md:text-lg',
                                    i === active
                                        ? 'border-ink text-ink'
                                        : 'border-transparent text-maha-400 hover:text-maha-600',
                                )}
                            >
                                {tr(b.name, locale)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="mt-8 grid items-center gap-8 md:mt-16 md:grid-cols-2 md:gap-20">
                    {/* Left — arch image + overlapping detail card */}
                    <div className="relative mx-auto w-full max-w-[300px] pb-10 sm:max-w-[360px] md:max-w-[420px] md:pb-16">
                        <div className="aspect-[4/5] overflow-hidden rounded-t-full rounded-b-2xl bg-maha-200">
                            {mainImage && (
                                <img
                                    src={mainImage}
                                    alt={name}
                                    className="h-full w-full object-cover"
                                />
                            )}
                        </div>
                        <figure className="absolute bottom-0 left-[65%] w-1/2 max-w-[300px] overflow-hidden rounded-2xl border-8 border-white bg-maha-100 shadow-2xl shadow-maha-900/10">
                            <div className="aspect-square">
                                {detailImage && (
                                    <img
                                        src={detailImage}
                                        alt=""
                                        className="h-full w-full object-cover"
                                    />
                                )}
                            </div>
                            <figcaption className="px-3 py-3 text-center font-serif text-xs italic text-maha-600 sm:text-sm">
                                {caption.replace('{{name}}', name)}
                            </figcaption>
                        </figure>
                    </div>

                    {/* Right — editorial copy */}
                    <div>
                        <p className="font-serif text-sm italic text-[#556B3F] md:text-lg">{eyebrow}</p>
                        <h3 className="mt-2 font-serif text-lg uppercase tracking-wide text-ink sm:text-2xl md:mt-3 md:text-3xl">
                            {subheading}
                        </h3>
                        <p className="mt-3 font-serif text-2xl leading-[1.12] text-ink sm:text-4xl md:mt-6 md:text-5xl">
                            {heading}
                        </p>

                        <div className="mt-5 space-y-3 text-sm leading-relaxed text-ink/80 sm:text-base md:mt-8 md:space-y-5 md:text-lg">
                            {paragraphs.map((p, i) => (
                                <p key={i}>{p}</p>
                            ))}
                        </div>

                        <Link
                            href={`/chi-nhanh/${branch.slug}`}
                            className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-ink sm:text-base md:mt-10"
                        >
                            <span>{cta}</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
