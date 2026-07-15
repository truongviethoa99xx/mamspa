import { Link, usePage } from '@inertiajs/react';
import { publicAssetUrl } from '@/Lib/utils';
import type { SharedProps } from '@/types';

const HEADER_HEIGHT = '150px';

/** Header dùng chung cho toàn site — full width, cao cố định 150px. Nền/màu chữ/logo quản lý ở /admin (Quản lý header). */
export function Header() {
    const { props } = usePage<SharedProps>();
    const site = props.site ?? {};
    const brandName = site.brand_name || 'Mầm Spa';
    const logoUrl = publicAssetUrl(site.logo_path);
    const backgroundColor = site.header_background_color || '#F6F3EF';
    const textColor = site.header_text_color || '#2F3E2E';

    return (
        <header
            className="flex w-full shrink-0 items-center justify-center"
            style={{ height: HEADER_HEIGHT, backgroundColor, color: textColor }}
        >
            <Link href="/" className="flex items-center gap-4">
                {logoUrl && <img src={logoUrl} alt={brandName} className="h-20 w-20 object-contain" />}
                <span className="font-serif text-2xl uppercase tracking-[0.12em]" style={{ color: textColor }}>
                    {brandName}
                </span>
            </Link>
        </header>
    );
}
