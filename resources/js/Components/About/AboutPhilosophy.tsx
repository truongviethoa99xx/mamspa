import { Leaf } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { tr } from '@/Lib/utils';
import { LeafBranch } from '@/Components/decorative/LeafBranch';
import { SectionHeading } from './SectionHeading';

export interface AboutPhilosophyData {
    heading?: unknown;
    title?: unknown;
    body?: unknown;
    image?: string | null;
    image_alt?: unknown;
}

/** Our Philosophy — tiêu đề lớn bên trái, đoạn văn + icon lá bên phải, ảnh nền tuỳ chọn. */
export function AboutPhilosophy({ data }: { data: AboutPhilosophyData }) {
    const locale = useLocale();
    const title = tr(data.title, locale);
    const body = tr(data.body, locale);
    const imageAlt = tr(data.image_alt, locale);

    return (
        <section className="relative isolate mt-[50px] overflow-hidden rounded-3xl bg-[#f5f2ed] px-5 py-12 sm:px-10 lg:px-[60px]">
            {data.image && (
                <img
                    src={data.image}
                    alt={imageAlt}
                    aria-hidden={imageAlt ? undefined : 'true'}
                    className="absolute inset-0 -z-10 h-full w-full object-cover"
                />
            )}
            <div className="grid gap-10 lg:grid-cols-3 lg:gap-16">
                <div>
                    <SectionHeading label={tr(data.heading, locale)} heading={title} size="lg" />
                </div>
                <div className="relative">
                    <Leaf className="mb-4 h-8 w-8 text-maha-300" strokeWidth={1.25} aria-hidden="true" />
                    {body && (
                        <div
                            className="rich-content space-y-4 text-base leading-relaxed text-ink/80"
                            dangerouslySetInnerHTML={{ __html: body }}
                        />
                    )}
                </div>
                <div className="relative hidden lg:block" aria-hidden="true">
                    <LeafBranch className="pointer-events-none absolute inset-0 h-full w-full text-[#C2A274]/60" />
                </div>
            </div>
        </section>
    );
}
