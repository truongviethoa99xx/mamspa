declare global {
    interface Window {
        dataLayer?: Record<string, unknown>[];
    }
}

export function trackEvent(event: string, params: Record<string, unknown> = {}) {
    if (typeof window === 'undefined') return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...params });
}

export const trackViewService = (service: { slug: string; price: number; category: string }) =>
    trackEvent('view_item', { item_id: service.slug, item_category: service.category, value: service.price, currency: 'VND' });

export const trackBeginCheckout = (booking: { service: string; total: number }) =>
    trackEvent('begin_checkout', { item_id: booking.service, value: booking.total, currency: 'VND' });

export const trackPurchase = (booking: { code: string; total: number }) =>
    trackEvent('purchase', { transaction_id: booking.code, value: booking.total, currency: 'VND' });

export const trackContactClick = (channel: string, location: string) =>
    trackEvent('contact_click', { contact_channel: channel, contact_location: location });
