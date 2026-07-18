import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { useReveal } from '@/Hooks/useReveal';
import { tr, cn } from '@/Lib/utils';

export interface AboutInvitationData {
    title?: unknown;
    p1?: unknown;
    p2?: unknown;
    buttonText?: unknown;
    buttonUrl?: string | null;
    image?: string | null;
    image_alt?: unknown;
}

/** A Gentle Invitation — banner full-bleed khép lại trang, cùng kiểu ảnh nền như banner đầu trang nhưng chiều cao khác. */
export function AboutInvitation({ data }: { data: AboutInvitationData }) {
    const locale = useLocale();
    const title = tr(data.title, locale);
    const p1 = tr(data.p1, locale);
    const p2 = tr(data.p2, locale);
    const buttonText = tr(data.buttonText, locale);
    const imageAlt = tr(data.image_alt, locale);
    const hasImage = !!data.image;
    const { ref, className } = useReveal<HTMLElement>();

    return (
        <section
            ref={ref}
            className={cn(
                className,
                'relative isolate mt-[50px] flex min-h-[420px] flex-col justify-end overflow-hidden px-5 pb-12 pt-16 sm:min-h-[480px] sm:px-10 sm:pb-16 lg:px-[60px]',
                hasImage ? 'bg-[#2F3E2E]' : 'bg-maha-200',
            )}
        >
            {hasImage && (
                <img
                    src={data.image ?? undefined}
                    alt={imageAlt}
                    className="absolute inset-0 z-0 h-full w-full object-cover"
                    loading="lazy"
                />
            )}
            {hasImage && (
                <div
                    className="absolute inset-0 z-0"
                    style={{ background: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.6))' }}
                />
            )}

            <div className="relative z-10 max-w-2xl">
                {title && (
                    <div
                        className={cn(
                            'rich-content font-serif text-3xl leading-tight sm:text-4xl md:text-5xl',
                            hasImage ? 'text-white' : 'text-heading',
                        )}
                        dangerouslySetInnerHTML={{ __html: title }}
                    />
                )}
                {p1 && (
                    <div
                        className={cn(
                            'rich-content mt-6 space-y-4 text-base leading-relaxed',
                            hasImage ? 'text-white/85' : 'text-ink/80',
                        )}
                        dangerouslySetInnerHTML={{ __html: p1 }}
                    />
                )}
                {p2 && (
                    <div
                        className={cn('rich-content mt-4 text-base leading-relaxed', hasImage ? 'text-white/95' : 'text-ink/90')}
                        dangerouslySetInnerHTML={{ __html: p2 }}
                    />
                )}
                {buttonText && data.buttonUrl && (
                    <Link
                        href={data.buttonUrl}
                        className={cn(
                            'mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-opacity hover:opacity-90',
                            hasImage ? 'bg-white text-heading' : 'bg-[#2F3E2E] text-white',
                        )}
                    >
                        <span dangerouslySetInnerHTML={{ __html: buttonText }} />
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                )}
            </div>
        </section>
    );
}
