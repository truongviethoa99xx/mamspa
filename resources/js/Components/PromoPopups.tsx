import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/Hooks/useLocale';
import { cn, tr } from '@/Lib/utils';
import type { PromoPopupData, PromoPopupPosition, SharedProps } from '@/types';

const SEEN_PREFIX = 'promo-popup:';

/** Mỗi phiên truy cập chỉ hiện 1 lần; sửa popup trong CMS (version đổi) thì hiện lại. */
const seenKey = (popup: PromoPopupData) => `${SEEN_PREFIX}${popup.id}:${popup.version ?? 0}`;

function wasSeen(popup: PromoPopupData): boolean {
    try {
        return window.sessionStorage.getItem(seenKey(popup)) === '1';
    } catch {
        return false;
    }
}

function markSeen(popup: PromoPopupData): void {
    try {
        window.sessionStorage.setItem(seenKey(popup), '1');
    } catch {
        // sessionStorage bị chặn (chế độ riêng tư…) — chấp nhận popup có thể hiện lại.
    }
}

/**
 * Vị trí góc: trên mobile chừa header ở trên và thanh CTA "Đặt lịch" ghim đáy (Header.tsx);
 * trên desktop bên phải chừa chỗ cho cột nút liên hệ nổi (ChatWidget) để không đè lên nhau.
 */
const CORNER_CLASSES: Record<Exclude<PromoPopupPosition, 'center'>, string> = {
    'top-left': 'left-4 top-24 lg:left-6 lg:top-28',
    'top-right': 'left-4 top-24 lg:left-auto lg:right-24 lg:top-28',
    'bottom-left': 'bottom-[4.5rem] left-4 lg:bottom-6 lg:left-6',
    'bottom-right': 'bottom-[4.5rem] left-4 lg:bottom-6 lg:left-auto lg:right-24',
};

function PopupCard({ popup, onClose }: { popup: PromoPopupData; onClose: () => void }) {
    const { t } = useTranslation();
    const locale = useLocale();
    const [entered, setEntered] = useState(false);
    const title = tr(popup.title, locale);
    const description = tr(popup.description, locale);
    const buttonText = tr(popup.button_text, locale);
    const isCenter = popup.position === 'center';

    useEffect(() => {
        const frame = window.requestAnimationFrame(() => setEntered(true));
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', onKeyDown);

        return () => {
            window.cancelAnimationFrame(frame);
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [onClose]);

    const card = (
        <div
            role="dialog"
            aria-modal={isCenter}
            aria-labelledby={`promo-popup-title-${popup.id}`}
            className={cn(
                'relative w-full overflow-hidden rounded-2xl bg-white text-[#2F3E2E] shadow-[0_18px_50px_rgba(15,23,42,0.35)] transition duration-300 motion-reduce:transition-none',
                isCenter ? 'max-w-md' : 'max-w-sm',
                entered ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
            )}
        >
            <button
                type="button"
                onClick={onClose}
                aria-label={t('common.close', 'Đóng')}
                className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/45 text-white transition-colors hover:bg-black/65"
            >
                <X className="h-4 w-4" />
            </button>
            {popup.image && (
                <img src={popup.image} alt="" className="aspect-video w-full object-cover" loading="lazy" />
            )}
            <div className="p-5 sm:p-6">
                <h2 id={`promo-popup-title-${popup.id}`} className="pr-8 font-serif text-xl leading-snug text-[#2F3E2E] sm:text-2xl">
                    {title}
                </h2>
                {description && <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-[#2F3E2E]/75">{description}</p>}
                {buttonText && popup.button_url && (
                    <a
                        href={popup.button_url}
                        onClick={onClose}
                        className="mt-5 inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-opacity hover:opacity-90"
                        style={{ backgroundColor: popup.button_background, color: popup.button_text_color }}
                    >
                        {buttonText}
                    </a>
                )}
            </div>
        </div>
    );

    if (popup.position === 'center') {
        return (
            <div
                className={cn(
                    'fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 transition-opacity duration-300 motion-reduce:transition-none',
                    entered ? 'opacity-100' : 'opacity-0',
                )}
                onClick={(event) => {
                    if (event.target === event.currentTarget) {
                        onClose();
                    }
                }}
            >
                {card}
            </div>
        );
    }

    return <div className={cn('fixed z-[60] w-[calc(100vw-2rem)] max-w-sm', CORNER_CLASSES[popup.position])}>{card}</div>;
}

/** Popup quảng cáo cấu hình ở CMS → Popup quảng cáo (nội dung, vị trí, khung thời gian). */
export function PromoPopups() {
    const { props } = usePage<SharedProps>();
    const popups = props.promo_popups ?? [];
    const [openIds, setOpenIds] = useState<number[]>([]);
    // Khoá theo nội dung popup (id + version + delay) để chỉ đặt lại timer khi thật sự có thay đổi.
    const signature = popups.map((popup) => `${popup.id}:${popup.version}:${popup.delay_seconds}`).join('|');

    useEffect(() => {
        const timers = popups
            .filter((popup) => !wasSeen(popup))
            .map((popup) =>
                window.setTimeout(() => {
                    markSeen(popup);
                    setOpenIds((ids) => (ids.includes(popup.id) ? ids : [...ids, popup.id]));
                }, Math.max(0, popup.delay_seconds) * 1000),
            );

        return () => timers.forEach((timer) => window.clearTimeout(timer));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [signature]);

    return (
        <>
            {popups
                .filter((popup) => openIds.includes(popup.id))
                .map((popup) => (
                    <PopupCard
                        key={popup.id}
                        popup={popup}
                        onClose={() => setOpenIds((ids) => ids.filter((id) => id !== popup.id))}
                    />
                ))}
        </>
    );
}
