import { Check } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { tr } from '@/Lib/utils';

export interface CategoryChecklistItem {
    text?: unknown;
}

export interface CategoryExperienceNoteData {
    title?: unknown;
    checklist?: CategoryChecklistItem[];
    body?: unknown;
    image?: string | null;
    imageAlt?: unknown;
}

/**
 * "Mỗi tầng trải nghiệm được thiết kế khác nhau về" — banner full-bleed giống
 * CategoryHero, nhưng khối chữ đè bên PHẢI trên nền kem mờ dần sang trái.
 */
export function CategoryExperienceNote({ data }: { data: CategoryExperienceNoteData }) {
    const locale = useLocale();
    const title = tr(data.title, locale);
    const body = tr(data.body, locale);
    const imageAlt = tr(data.imageAlt, locale);
    const hasImage = !!data.image;
    const checklist = (data.checklist ?? []).map((item) => tr(item.text, locale)).filter(Boolean);

    if (!title && !body && !hasImage && !checklist.length) {
        return null;
    }

    return (
        <section className="relative isolate mt-1 h-[480px] overflow-hidden bg-[#ece1db]">
            {hasImage && (
                <img
                    src={data.image ?? undefined}
                    alt={imageAlt || title}
                    className="absolute inset-0 z-0 h-full w-full object-cover"
                />
            )}

            <div className="relative z-10 ml-auto flex h-full w-full flex-col justify-center overflow-y-auto px-5 py-10 sm:px-10 md:w-1/2 md:px-12 lg:w-1/2 lg:px-16">
                {hasImage && (
                    <div
                        className="absolute inset-0 -z-10"
                        style={{
                            background:
                                'linear-gradient(270deg, rgba(236,225,219,0.97) 0%, rgba(236,225,219,0.9) 55%, rgba(236,225,219,0) 100%)',
                        }}
                    />
                )}

                {title && (
                    <div
                        className="rich-content font-serif text-3xl leading-snug text-heading sm:text-4xl"
                        dangerouslySetInnerHTML={{ __html: title }}
                    />
                )}
                <span className="mt-5 block h-px w-10 bg-maha-300" aria-hidden="true" />

                {!!checklist.length && (
                    <ul className="mt-6 space-y-3 pl-3">
                        {checklist.map((text, index) => (
                            <li key={index} className="flex items-center gap-3 text-sm text-ink/85">
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-heading">
                                    <Check className="h-3 w-3 text-white" strokeWidth={3} aria-hidden="true" />
                                </span>
                                <span>{text}</span>
                            </li>
                        ))}
                    </ul>
                )}

                {body && (
                    <div
                        className="rich-content mt-6 max-w-md pl-3 text-sm leading-relaxed text-ink/75"
                        dangerouslySetInnerHTML={{ __html: body }}
                    />
                )}
            </div>
        </section>
    );
}
