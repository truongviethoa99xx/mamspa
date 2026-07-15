import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/Hooks/useLocale';
import { tr, firstSentence } from '@/Lib/utils';

interface BranchItem {
    id?: number | string;
    slug: string;
    name: unknown;
    intro_title?: unknown;
    body_1?: unknown;
    cta?: unknown;
    images?: string[];
}

/** "Our Spaces" — grid thẻ xem trước cho từng chi nhánh (thay cho tab đơn trước đây). */
export function BranchesBlock({ data }: { data: { branches?: BranchItem[] } }) {
    const locale = useLocale();
    const { t } = useTranslation();
    const branches: BranchItem[] = data.branches ?? [];

    // Không có chi nhánh nào thì ẩn hẳn khối, không dựng dữ liệu mẫu.
    if (branches.length === 0) {
        return null;
    }

    const title = tr(branches[0]?.intro_title, locale) || t('blocks.branches.title');
    const gridClass = branches.length > 1 ? 'sm:grid-cols-2' : 'sm:mx-auto sm:max-w-xl';

    return (
        <section id="main" className="bg-white pb-10 pt-6 sm:pb-14 sm:pt-8 md:pb-20 md:pt-12 lg:pb-24 lg:pt-12">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 2xl:max-w-[1440px]">
                <h2 className="text-center font-serif text-xl uppercase tracking-wide text-ink sm:text-3xl md:text-4xl">
                    {title}
                </h2>

                <div className={`mt-8 grid gap-6 sm:mt-12 md:gap-8 ${gridClass}`}>
                    {branches.map((b, i) => {
                        const name = tr(b.name, locale);
                        const teaser = firstSentence(tr(b.body_1, locale));
                        const cta = tr(b.cta, locale) || t('blocks.branches.cta');

                        return (
                            <Link
                                key={b.slug}
                                href={`/chi-nhanh/${b.slug}/`}
                                className="group flex flex-col overflow-hidden rounded-2xl bg-maha-50 shadow-sm transition-shadow hover:shadow-lg"
                            >
                                <div className="aspect-[4/3] overflow-hidden bg-maha-200">
                                    {b.images?.[0] && (
                                        <img
                                            src={b.images[0]}
                                            alt={name}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    )}
                                </div>

                                <div className="flex flex-1 flex-col p-6 md:p-8">
                                    <p className="font-serif text-xs uppercase tracking-[0.15em] text-[#556B3F]">
                                        {t('blocks.branches.spaceLabel', { index: String(i + 1).padStart(2, '0') })}
                                    </p>
                                    <h3 className="mt-2 font-serif text-2xl text-ink md:text-3xl">{name}</h3>
                                    {teaser && <p className="mt-2 text-sm leading-relaxed text-maha-600">{teaser}</p>}

                                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink md:mt-7">
                                        {cta}
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
