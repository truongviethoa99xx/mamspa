import { Link, usePage } from '@inertiajs/react';
import { publicAssetUrl, cn } from '@/Lib/utils';
import type { SharedProps } from '@/types';

const HEADER_HEIGHT = '100px';

const NAV_ITEMS = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Về Mầm', href: '/gioi-thieu/' },
    { label: 'Dịch vụ', href: '/dich-vu/' },
    { label: 'Blog', href: '/tin-tuc/' },
    { label: 'Liên hệ', href: '/lien-he/' },
];

/**
 * Header dùng chung cho toàn site — full width, cao cố định 100px.
 * Nền/màu chữ/logo/chế độ trong suốt quản lý ở /admin (Quản lý header).
 * Khi trong suốt, header nổi đè lên nội dung phía dưới thay vì chiếm khoảng riêng.
 */
export function Header() {
    const { props, url } = usePage<SharedProps>();
    const site = props.site ?? {};
    const brandName = site.brand_name || 'Mầm Spa';
    const logoUrl = publicAssetUrl(site.logo_path);
    const isTransparent = !!site.header_transparent;
    const textColor = site.header_text_color || '#2F3E2E';
    const configuredBackground = site.header_background_color || '#F6F3EF';
    const headerBackground = isTransparent ? 'transparent' : configuredBackground;
    const ctaText = site.header_cta_text || 'Đặt lịch ngay';
    const ctaBackground = site.header_cta_background_color || '#2F3E2E';
    const ctaTextColor = site.header_cta_text_color || '#FFFFFF';
    const currentPath = url.split('?')[0];

    return (
        <header
            className={cn(
                'flex w-full items-center justify-between gap-6 px-6 sm:px-10',
                isTransparent ? 'absolute inset-x-0 top-0 z-30' : 'relative shrink-0',
            )}
            style={{ height: HEADER_HEIGHT, backgroundColor: headerBackground, color: textColor }}
        >
            <Link href="/" className="flex shrink-0 items-center gap-3">
                {logoUrl && <img src={logoUrl} alt={brandName} className="h-14 w-14 object-contain" />}
                <span className="font-serif text-xl uppercase tracking-[0.12em]" style={{ color: textColor }}>
                    {brandName}
                </span>
            </Link>

            <nav className="hidden items-center gap-8 lg:flex">
                {NAV_ITEMS.map((item) => {
                    const active = item.href === '/' ? currentPath === '/' : currentPath.startsWith(item.href);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'pb-1 text-sm font-medium uppercase tracking-wide opacity-80 transition-opacity hover:opacity-100',
                                active && 'border-b-2 opacity-100',
                            )}
                            style={active ? { borderColor: textColor, color: textColor } : { color: textColor }}
                        >
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <Link
                href="/dat-lich/"
                className="shrink-0 rounded-md px-5 py-2.5 text-sm font-semibold uppercase tracking-wide transition-opacity hover:opacity-90"
                style={{ backgroundColor: ctaBackground, color: ctaTextColor }}
            >
                {ctaText}
            </Link>
        </header>
    );
}
