/**
 * Xây dựng query cho Google Maps từ tên + địa chỉ thay vì lat/lng thô.
 * Tọa độ nhập tay trong Filament chỉ chính xác ~11m, đủ để Google snap nhầm
 * sang một địa điểm lân cận khác trong khu vực đông đúc (hẻm, chung cư...).
 * Query dạng text (tên + địa chỉ) khớp đúng địa điểm doanh nghiệp hơn.
 */
function googleMapsQuery(name: string, address: string): string {
    return [name, address].filter(Boolean).join(', ');
}

export function googleMapsSearchUrl(name: string, address: string): string {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(googleMapsQuery(name, address))}`;
}

export function googleMapsEmbedUrl(name: string, address: string): string {
    return `https://www.google.com/maps?q=${encodeURIComponent(googleMapsQuery(name, address))}&z=16&hl=vi&output=embed`;
}
