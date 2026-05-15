export interface User {
    id: number;
    name: string;
    email: string;
}

export interface SharedProps {
    auth: { user: User | null };
    locale: 'vi' | 'en';
    availableLocales: string[];
    flash: { success?: string; error?: string };
    gtm: { id?: string };
}

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

export type BlockType =
    | 'hero'
    | 'service_list'
    | 'gallery'
    | 'testimonial'
    | 'cta'
    | 'text'
    | 'branches'
    | 'promo_banner';

export interface Block {
    id: number;
    type: BlockType;
    order: number;
    data: Record<string, unknown>;
    is_active: boolean;
}

export interface Page {
    id: number;
    slug: string;
    title: string;
    is_published: boolean;
    seo_meta: { description?: string; keywords?: string } | null;
    blocks: Block[];
}
