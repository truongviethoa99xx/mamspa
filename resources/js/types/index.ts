export interface User {
    id: number;
    name: string;
    email: string;
    roles?: string[];
    can_manage_content?: boolean;
    can_manage_site?: boolean;
    can_manage_staff?: boolean;
}

export interface SiteSettings {
    brand_name?: string | null;
    logo_path?: string | null;
    header_background_color?: string | null;
    header_text_color?: string | null;
    header_transparent?: boolean | null;
    header_cta_text?: string | null;
    header_cta_background_color?: string | null;
    header_cta_text_color?: string | null;
    tagline?: string | null;
    meta_description?: string | null;
    hotline?: string | null;
    email?: string | null;
    chat_url?: string | null;
    address?: string | null;
    phone?: string | null;
    open_hours?: string | null;
    branches?: {
        name?: string;
        address?: string;
        phone?: string;
        open_hours?: string;
        map_link?: string;
    }[];
    lat?: number | null;
    lng?: number | null;
    floating_contact_buttons?: {
        enabled?: boolean;
        label?: string;
        type?: 'zalo' | 'map' | 'phone' | 'whatsapp' | 'kakao' | 'custom';
        icon?: string | null;
        href?: string;
        background?: string;
        color?: string;
    }[];
    social_links?: { label: string; href: string }[];
    service_menu?: { label: string; href: string; children?: { label: string; href: string }[] }[];
}

export type PromoPopupPosition = 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface PromoPopupData {
    id: number;
    /** Đổi khi admin sửa popup → hiện lại popup mà khách đã đóng trước đó. */
    version: number | null;
    title: Record<string, string> | null;
    description: Record<string, string> | null;
    button_text: Record<string, string> | null;
    button_url: string | null;
    button_background: string;
    button_text_color: string;
    image: string | null;
    position: PromoPopupPosition;
    delay_seconds: number;
    reshow_after_hours: number;
}

export interface SharedProps {
    auth: { user: User | null };
    locale: 'vi' | 'en' | 'ja' | 'ko' | 'zh';
    availableLocales: string[];
    flash: { success?: string; error?: string; booking_code?: string };
    site?: SiteSettings;
    promo_popup?: PromoPopupData | null;
    gtm: { id?: string };
}

export type Locale = 'vi' | 'en' | 'ja' | 'ko' | 'zh';

export type Translatable = string | { vi: string; en: string };

export interface Service {
    id: number;
    slug: string;
    name: string;
    description: string;
    category: 'massage' | 'facial' | 'head-spa' | 'foot-spa' | 'combo';
    duration: number;
    price: number;
    ingredients: string[];
    images: string[];
}
