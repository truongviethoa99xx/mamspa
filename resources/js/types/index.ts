export interface User {
    id: number;
    name: string;
    email: string;
    roles?: string[];
    can_manage_content?: boolean;
    can_manage_site?: boolean;
    can_manage_staff?: boolean;
}

export interface FooterBranch {
    slug: string;
    name: string;
    address: string;
    phone?: string;
    open_hours: string;
    lat: number | null;
    lng: number | null;
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

export interface SharedProps {
    auth: { user: User | null };
    locale: 'vi' | 'en' | 'ja' | 'ko' | 'zh';
    availableLocales: string[];
    flash: { success?: string; error?: string; booking_code?: string };
    branches: FooterBranch[];
    site?: SiteSettings;
    gtm: { id?: string };
}

export type Locale = 'vi' | 'en' | 'ja' | 'ko' | 'zh';

export type Translatable = string | { vi: string; en: string };

export interface Branch {
    id: number;
    slug: string;
    name: string;
    address: string;
    phone: string;
    open_hours: string;
    lat: number | null;
    lng: number | null;
    images: string[];
}

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
    branches?: Branch[];
}
