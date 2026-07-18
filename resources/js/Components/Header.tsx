import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { publicAssetUrl, cn } from '@/Lib/utils';
import type { SharedProps } from '@/types';

const HEADER_HEIGHT = '100px';

const NAV_ITEMS = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Về Mầm', href: '/gioi-thieu/' },
    { label: 'Dịch vụ', href: '/dich-vu/' },
    // Tạm ẩn "Ưu đãi" khỏi menu header — trang vẫn truy cập được trực tiếp qua /uu-dai/.
    // { label: 'Ưu đãi', href: '/uu-dai/' },
    { label: 'Blog', href: '/tin-tuc/' },
    // Tạm ẩn "Customer Experience" khỏi menu header — trang vẫn truy cập được trực tiếp qua /trai-nghiem-khach-hang/.
    // { label: 'Customer Experience', href: '/trai-nghiem-khach-hang/' },
    { label: 'Liên hệ', href: '/lien-he/' },
];

/**
 * Header dùng chung cho toàn site — full width, cao cố định 100px.
 * Nền/màu chữ/logo/chế độ trong suốt quản lý ở /admin (Quản lý header).
 * Khi trong suốt, header nổi đè lên nội dung phía dưới thay vì chiếm khoảng riêng.
 * Dưới lg: menu chính thu vào nút hamburger, mở ra thành panel xổ xuống dưới header
 * (không đổi chiều cao header cố định). Hàng header dưới lg dùng grid 3 cột đều nhau
 * (hamburger trái, logo giữa tuyệt đối, CTA phải) để logo luôn nằm chính giữa dù 2 bên
 * lệch độ rộng; từ lg chuyển sang flex với thứ tự DOM gốc (logo, nav, CTA).
 */
export function Header({ minimal = false }: { minimal?: boolean }) {
    const { props, url } = usePage<SharedProps>();
    const [mobileOpen, setMobileOpen] = useState(false);
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
            className={cn('w-full', isTransparent ? 'absolute inset-x-0 top-0 z-30' : 'relative shrink-0')}
        >
            <div
                className="grid grid-cols-3 items-center gap-3 px-5 sm:gap-6 sm:px-10 lg:flex lg:justify-between"
                style={{ height: HEADER_HEIGHT, backgroundColor: headerBackground, color: textColor }}
            >
                {!minimal && (
                    <button
                        type="button"
                        onClick={() => setMobileOpen((open) => !open)}
                        aria-label={mobileOpen ? 'Đóng menu' : 'Mở menu'}
                        aria-expanded={mobileOpen}
                        className="col-start-1 flex h-10 w-10 items-center justify-center justify-self-start rounded-md lg:hidden"
                        style={{ color: textColor }}
                    >
                        {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                )}

                <Link
                    href="/"
                    className="col-start-2 flex shrink-0 items-center justify-self-center gap-2 sm:gap-3 lg:col-auto lg:justify-self-start"
                >
                    {logoUrl ? (
                        <img src={logoUrl} alt={brandName} className="h-16 w-16 object-contain sm:h-20 sm:w-20" />
                    ) : (
                        <span
                            className="font-serif text-base uppercase tracking-[0.1em] sm:text-xl sm:tracking-[0.12em]"
                            style={{ color: textColor }}
                        >
                            {brandName}
                        </span>
                    )}
                </Link>

                {!minimal && (
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
                )}

                <Link
                    href="/dat-lich/"
                    className="col-start-3 inline-block shrink-0 justify-self-end rounded-md px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-opacity hover:opacity-90 sm:px-5 sm:py-2.5 sm:text-sm lg:col-auto"
                    style={{ backgroundColor: ctaBackground, color: ctaTextColor }}
                >
                    {ctaText}
                </Link>
            </div>

            {!minimal && mobileOpen && (
                <div
                    className="flex flex-col gap-1 border-t px-5 py-4 shadow-lg lg:hidden"
                    style={{ backgroundColor: configuredBackground, borderColor: `${textColor}22` }}
                >
                    {NAV_ITEMS.map((item) => {
                        const active = item.href === '/' ? currentPath === '/' : currentPath.startsWith(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className={cn(
                                    'rounded-md px-3 py-3 text-sm font-medium uppercase tracking-wide transition-opacity',
                                    active ? 'opacity-100' : 'opacity-80',
                                )}
                                style={{ color: ctaBackground }}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                    <Link
                        href="/dat-lich/"
                        onClick={() => setMobileOpen(false)}
                        className="mt-2 rounded-md px-5 py-3 text-center text-sm font-semibold uppercase tracking-wide"
                        style={{ backgroundColor: ctaBackground, color: ctaTextColor }}
                    >
                        {ctaText}
                    </Link>
                </div>
            )}
        </header>
    );
}
