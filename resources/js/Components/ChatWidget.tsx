import { MapPin, MessageCircle, Phone } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePage } from '@inertiajs/react';
import type { SharedProps } from '@/types';
import { cn } from '@/Lib/utils';

type ContactButton = NonNullable<SharedProps['site']>['floating_contact_buttons'][number];

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
        href: '/contact',
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

function publicIconUrl(path?: string | null) {
    if (!path) return null;
    if (path.startsWith('http') || path.startsWith('/')) return path;

    return `/storage/${path}`;
}

function ButtonIcon({ button }: { button: ContactButton }) {
    const iconUrl = publicIconUrl(button.icon);
    if (iconUrl) {
        return <img src={iconUrl} alt="" className="h-[58%] w-[58%] object-contain" loading="lazy" />;
    }

    const type = button.type || 'custom';

    if (type === 'phone') {
        return <Phone className="h-[48%] w-[48%]" strokeWidth={2.6} />;
    }

    if (type === 'map') {
        return <MapPin className="h-[52%] w-[52%]" strokeWidth={2.4} />;
    }

    if (type === 'zalo') {
        return <span className="text-[11px] font-extrabold leading-none">Zalo</span>;
    }

    if (type === 'whatsapp') {
        return <span className="text-[16px] font-black leading-none">☎</span>;
    }

    if (type === 'kakao') {
        return <span className="text-[9px] font-black leading-none">TALK</span>;
    }

    return <MessageCircle className="h-[50%] w-[50%]" strokeWidth={2.4} />;
}

export function ChatWidget() {
    const { t } = useTranslation();
    const { props } = usePage<SharedProps>();
    const [isOpen, setIsOpen] = useState(false);
    const configuredButtons = props.site?.floating_contact_buttons?.length
        ? props.site.floating_contact_buttons
        : DEFAULT_BUTTONS;
    const buttons = configuredButtons.filter((button) => button.enabled !== false && button.href);

    if (!buttons.length) {
        return null;
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-4">
            {buttons.map((button, index) => {
                return (
                    <a
                        key={`${button.label}-${index}`}
                        href={button.href}
                        target={button.href?.startsWith('http') ? '_blank' : undefined}
                        rel={button.href?.startsWith('http') ? 'noreferrer' : undefined}
                        className={cn(
                            'flex items-center justify-center rounded-full border border-black/10 shadow-[0_4px_14px_rgba(15,23,42,0.22)] ring-4 ring-white transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_22px_rgba(15,23,42,0.28)]',
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
                        onClick={() => setIsOpen(false)}
                    >
                        <ButtonIcon button={button} />
                    </a>
                );
            })}
            <button
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#c1664a] text-white shadow-[0_8px_24px_rgba(193,102,74,0.36)] ring-4 ring-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#a8513a]"
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
