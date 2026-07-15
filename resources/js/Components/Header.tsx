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

/** Header dùng chung cho toàn site — full width, cao cố định 100px. Nền/màu chữ/logo quản lý ở /admin (Quản lý header). */
export function Header() {
    const { props, url } = usePage<SharedProps>();
    const site = props.site ?? {};
    const brandName = site.brand_name || 'Mầm Spa';
    const logoUrl = publicAssetUrl(site.logo_path);
    const backgroundColor = site.header_background_color || '#F6F3EF';
    const textColor = site.header_text_color || '#2F3E2E';
    const currentPath = url.split('?')[0];

    return (
        <header
            className="flex w-full shrink-0 items-center justify-between gap-6 px-6 sm:px-10"
            style={{ height: HEADER_HEIGHT, backgroundColor, color: textColor }}
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
                style={{ backgroundColor: textColor, color: backgroundColor }}
            >
                Đặt lịch ngay
            </Link>
        </header>
    );
}
