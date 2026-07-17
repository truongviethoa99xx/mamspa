import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { tr, cn } from '@/Lib/utils';

export interface ContactClosingBannerData {
    title?: unknown;
    image?: string | null;
    image_alt?: unknown;
    buttonText?: unknown;
    buttonUrl?: string | null;
}

/** Banner CTA đóng trang — ảnh nền + tiêu đề ngắn + 1 nút "Đặt lịch ngay". */
export function ContactClosingBanner({ data }: { data: ContactClosingBannerData }) {
    const locale = useLocale();
    const title = tr(data.title, locale);
    const buttonText = tr(data.buttonText, locale);
    const imageAlt = tr(data.image_alt, locale);
    const hasImage = !!data.image;

    return (
        <section className="bg-maha-50 px-5 py-4 sm:px-10 sm:py-6 lg:px-16">
            <div
                className={cn(
                    'relative isolate mx-auto flex min-h-[280px] max-w-7xl flex-col justify-end overflow-hidden rounded-2xl px-5 pb-10 pt-16 sm:min-h-[320px] sm:px-10 sm:pb-12 lg:px-16',
                    hasImage ? 'bg-[#2F3E2E]' : 'bg-maha-200',
                )}
            >
                {hasImage && <img src={data.image ?? undefined} alt={imageAlt} className="absolute inset-0 z-0 h-full w-full object-cover" />}
                {hasImage && (
                    <div
                        className="absolute inset-0 z-0"
                        style={{ background: 'linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.55))' }}
                    />
                )}

                <div className="relative z-10 flex w-full max-w-lg flex-col items-start gap-6">
                    {title && (
                        <div
                            className={cn(
                                'rich-content font-serif text-2xl leading-snug sm:text-3xl',
                                hasImage ? 'text-white' : 'text-heading',
                            )}
                            dangerouslySetInnerHTML={{ __html: title }}
                        />
                    )}
                    {buttonText && data.buttonUrl && (
                        <Link
                            href={data.buttonUrl}
                            className={cn(
                                'group inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-opacity hover:opacity-90',
                                hasImage ? 'bg-[#2F3E2E] text-white ring-1 ring-white/30' : 'bg-heading text-white',
                            )}
                        >
                            <span dangerouslySetInnerHTML={{ __html: buttonText }} />
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
}
