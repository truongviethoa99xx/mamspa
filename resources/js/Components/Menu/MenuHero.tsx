import { useLocale } from '@/Hooks/useLocale';
import { tr, stripTags } from '@/Lib/utils';

export interface MenuHeroData {
    kicker?: unknown;
    title?: unknown;
    subtitle?: unknown;
    image?: string | null;
    image_alt?: unknown;
}

/** Banner đầu trang Menu — ảnh nền phủ mờ dần từ giữa, kicker + tiêu đề lớn + tiêu đề phụ căn giữa. */
export function MenuHero({ data }: { data: MenuHeroData }) {
    const locale = useLocale();
    const kicker = tr(data.kicker, locale);
    const title = tr(data.title, locale);
    const subtitle = tr(data.subtitle, locale);
    const imageAlt = tr(data.image_alt, locale);
    const hasImage = !!data.image;

    return (
        <section className="relative isolate flex min-h-[420px] items-center overflow-hidden bg-maha-100">
            {hasImage && (
                <img
                    src={data.image ?? undefined}
                    alt={imageAlt || stripTags(title)}
                    className="absolute inset-0 z-0 h-full w-full object-cover"
                />
            )}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background:
                        'radial-gradient(ellipse 55% 85% at 50% 48%, rgba(246,243,239,.65) 0%, rgba(246,243,239,.3) 50%, rgba(246,243,239,0) 78%)',
                }}
                aria-hidden="true"
            />

            <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center px-6 py-16 text-center sm:py-20">
                {kicker && (
                    <p className="text-xs font-medium tracking-[0.5em] text-subheading sm:text-sm">{kicker}</p>
                )}
                {title && (
                    <h1 className="mt-3 font-serif text-5xl uppercase tracking-[0.15em] text-heading sm:text-6xl">
                        {title}
                    </h1>
                )}
                {subtitle && <p className="mt-3 text-sm text-ink/70 sm:text-base">{subtitle}</p>}
            </div>
        </section>
    );
}
