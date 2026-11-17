import { MapPin, MessageCircle, Phone } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePage } from '@inertiajs/react';
import type { SharedProps } from '@/types';
import { cn, publicAssetUrl } from '@/Lib/utils';
import { trackContactClick } from '@/Lib/analytics';
import { getBranchPhones, toTelHref, type BranchPhone } from '@/Lib/branchPhones';

type ContactButton = NonNullable<NonNullable<SharedProps['site']>['floating_contact_buttons']>[number];

const DEFAULT_BUTTONS: ContactButton[] = [
    {
        enabled: true,
        label: 'Zalo',
        type: 'zalo',
        href: 'https://zalo.me/0865806166',
        background: '#ffffff',
        color: '#028fe8',
    },
    {
        enabled: true,
        label: 'Google Maps',
        type: 'map',
        href: '/lien-he/',
        background: '#ffffff',
        color: '#4285f4',
    },
    {
        enabled: true,
        label: 'WhatsApp',
        type: 'whatsapp',
        href: 'https://wa.me/84865806166',
        background: '#19b83f',
        color: '#ffffff',
    },
    {
        enabled: true,
        label: 'KakaoTalk',
        type: 'kakao',
        href: '#',
        background: '#fee500',
        color: '#3b1f1f',
    },
    {
        enabled: true,
        label: 'Hotline',
        type: 'phone',
        href: 'tel:0865806166',
        background: '#0d8bff',
        color: '#ffffff',
    },
];

/** Every icon renders inside this same fixed box so circles look uniform regardless of image vs SVG vs text label. */
const ICON_BOX = 'flex h-6 w-6 items-center justify-center';

function ButtonIcon({ button }: { button: ContactButton }) {
    const iconUrl = publicAssetUrl(button.icon);
    if (iconUrl) {
        return (
            <span className="flex h-full w-full items-center justify-center">
                <img src={iconUrl} alt="" className="h-full w-full object-contain" loading="lazy" />
            </span>
        );
    }

    const type = button.type || 'custom';

    if (type === 'phone') {
        return <Phone className="h-6 w-6" strokeWidth={2.6} />;
    }

    if (type === 'map') {
        return <MapPin className="h-6 w-6" strokeWidth={2.4} />;
    }

    if (type === 'zalo') {
        return <span className={cn(ICON_BOX, 'text-[10px] font-extrabold leading-none')}>Zalo</span>;
    }

    if (type === 'whatsapp') {
        return <span className={cn(ICON_BOX, 'text-[14px] font-black leading-none')}>☎</span>;
    }

    if (type === 'kakao') {
        return <span className={cn(ICON_BOX, 'text-[8px] font-black leading-none')}>TALK</span>;
    }

    return <MessageCircle className="h-6 w-6" strokeWidth={2.4} />;
}

const ROUND_BUTTON =
    'flex items-center justify-center overflow-hidden rounded-full border border-black/10 shadow-[0_4px_14px_rgba(15,23,42,0.22)] ring-4 ring-white transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_22px_rgba(15,23,42,0.28)] h-12 w-12';

const usesBranchPhones = (button: ContactButton) => button.type === 'phone' || button.type === 'zalo';

/** Gọi điện → tel:, Zalo → zalo.me/<số chi nhánh>. */
const branchHref = (type: ContactButton['type'], phone: string) =>
    type === 'zalo' ? `https://zalo.me/${phone.replace(/\D/g, '')}` : toTelHref(phone);

/**
 * Nút điện thoại khi có từ 2 chi nhánh trở lên: bấm mở popup bên trái nút, mỗi dòng 1 chi
 * nhánh (link tel:). Bấm lại nút, bấm ra ngoài hoặc nhấn Esc thì đóng.
 */
function PhonePopupButton({
    button,
    branches,
    visible,
    delay,
    onNavigate,
}: {
    button: ContactButton;
    branches: BranchPhone[];
    visible: boolean;
    delay: string;
    onNavigate: () => void;
}) {
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const isOpen = open && visible;

    useEffect(() => {
        if (!isOpen) {
            return;
        }
        const onPointerDown = (event: PointerEvent) => {
            if (!rootRef.current?.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setOpen(false);
            }
        };
        document.addEventListener('pointerdown', onPointerDown);
        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('pointerdown', onPointerDown);
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen]);

    return (
        <div ref={rootRef} className="relative">
            <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                className={cn(
                    ROUND_BUTTON,
                    visible ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-4 scale-90 opacity-0',
                )}
                style={{
                    backgroundColor: button.background || '#ffffff',
                    color: button.color || '#0d8bff',
                    transitionDelay: delay,
                }}
                aria-label={button.label}
                aria-haspopup="true"
                aria-expanded={isOpen}
                title={button.label}
                tabIndex={visible ? 0 : -1}
            >
                <ButtonIcon button={button} />
            </button>
            {isOpen && (
                <ul
                    role="menu"
                    className="absolute right-full top-1/2 mr-4 w-max max-w-[calc(100vw-7rem)] -translate-y-1/2 space-y-1 rounded-2xl border border-black/10 bg-white p-2 shadow-[0_8px_28px_rgba(15,23,42,0.25)]"
                >
                    {branches.map((branch, index) => (
                        <li key={`${branch.name}-${index}`} role="none">
                            <a
                                role="menuitem"
                                href={branchHref(button.type, branch.phone)}
                                target={button.type === 'zalo' ? '_blank' : undefined}
                                rel={button.type === 'zalo' ? 'noreferrer' : undefined}
                                onClick={() => {
                                    trackContactClick(button.type || 'phone', 'chat_widget');
                                    setOpen(false);
                                    onNavigate();
                                }}
                                className="flex items-start gap-2 rounded-xl px-3 py-2 text-sm text-[#2F3E2E] transition-colors hover:bg-[#556B3F]/10"
                            >
                                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#556B3F]" />
                                <span className="min-w-0">
                                    {branch.name && <span className="block font-semibold">{branch.name}</span>}
                                    <span className="block whitespace-nowrap">{branch.phone}</span>
                                </span>
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export function ChatWidget() {
    const { t } = useTranslation();
    const { props } = usePage<SharedProps>();
    const [isOpen, setIsOpen] = useState(false);
    const configuredButtons = props.site?.floating_contact_buttons?.length
        ? props.site.floating_contact_buttons
        : DEFAULT_BUTTONS;
    // Số điện thoại lấy từ CMS → Thiết lập chung → Chi nhánh (nguồn duy nhất).
    const branchPhones = getBranchPhones(props.site);
    const buttons = configuredButtons
        .map((button) =>
            // Đúng 1 chi nhánh có số → gọi thẳng số đó, bỏ href cũ hardcode trong cấu hình nút.
            usesBranchPhones(button) && branchPhones.length === 1
                ? { ...button, href: branchHref(button.type, branchPhones[0].phone) }
                : button,
        )
        .filter((button) => button.enabled !== false && button.href);

    if (!buttons.length) {
        return null;
    }

    return (
        // bottom-44 thay vì bottom-24 trên mobile — chừa chỗ vừa cho thanh CTA "Đặt lịch"
        // ghim đáy (Header.tsx) vừa cho nút "lên đầu trang" (BackToTop.tsx) đã dời lên
        // bottom-24, tránh 3 thứ chồng lên nhau.
        <div className="fixed bottom-44 right-6 z-50 flex flex-col items-center gap-4 lg:bottom-24">
            {buttons.map((button, index) => {
                if (usesBranchPhones(button) && branchPhones.length > 1) {
                    return (
                        <PhonePopupButton
                            key={`${button.label}-${index}`}
                            button={button}
                            branches={branchPhones}
                            visible={isOpen}
                            delay={isOpen ? `${Math.max(0, buttons.length - index - 1) * 25}ms` : '0ms'}
                            onNavigate={() => setIsOpen(false)}
                        />
                    );
                }

                return (
                    <a
                        key={`${button.label}-${index}`}
                        href={button.href}
                        target={button.href?.startsWith('http') ? '_blank' : undefined}
                        rel={button.href?.startsWith('http') ? 'noreferrer' : undefined}
                        className={cn(
                            'flex items-center justify-center overflow-hidden rounded-full border border-black/10 shadow-[0_4px_14px_rgba(15,23,42,0.22)] ring-4 ring-white transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_22px_rgba(15,23,42,0.28)]',
                            'h-12 w-12',
                            isOpen
                                ? 'translate-y-0 scale-100 opacity-100'
                                : 'pointer-events-none translate-y-4 scale-90 opacity-0',
                        )}
                        style={{
                            backgroundColor: button.background || '#ffffff',
                            color: button.color || '#0d8bff',
                            transitionDelay: isOpen ? `${Math.max(0, buttons.length - index - 1) * 25}ms` : '0ms',
                        }}
                        aria-label={button.label || t('common.chat')}
                        title={button.label || t('common.chat')}
                        tabIndex={isOpen ? 0 : -1}
                        onClick={() => {
                            trackContactClick(button.type || 'custom', 'chat_widget');
                            setIsOpen(false);
                        }}
                    >
                        <ButtonIcon button={button} />
                    </a>
                );
            })}
            <button
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#556B3F] text-white shadow-[0_8px_24px_rgba(85,107,63,0.36)] ring-4 ring-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#425436]"
                aria-expanded={isOpen}
                aria-label={isOpen ? 'Đóng nút liên hệ' : t('common.chat')}
                title={isOpen ? 'Đóng' : t('common.chat')}
            >
                <MessageCircle
                    className={cn('h-6 w-6 transition duration-200', isOpen && 'rotate-45')}
                    strokeWidth={2.6}
                />
            </button>
        </div>
    );
}
