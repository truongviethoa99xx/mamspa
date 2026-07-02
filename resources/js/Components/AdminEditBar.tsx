import { Edit3, ExternalLink, Languages, Settings, Users } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import type { SharedProps } from '@/types';

function editTarget(path: string) {
    if (path === '/') {
        return { label: 'Sửa trang chủ', href: '/admin/home-page-settings' };
    }

    if (path.startsWith('/gioi-thieu') || path.startsWith('/about-us')) {
        return { label: 'Sửa trang giới thiệu', href: '/admin/about-page-settings' };
    }

    if (path.startsWith('/contact')) {
        return { label: 'Sửa trang liên hệ', href: '/admin/contact-page-settings' };
    }

    if (path.startsWith('/dich-vu')) {
        return { label: 'Sửa trang dịch vụ', href: '/admin/service-page-settings' };
    }

    if (path.startsWith('/services')) {
        return { label: 'Sửa danh sách dịch vụ', href: '/admin/services' };
    }

    if (path.startsWith('/chi-nhanh')) {
        return { label: 'Sửa chi nhánh', href: '/admin/branches' };
    }

    if (path.startsWith('/tin-tuc') || path.startsWith('/blog')) {
        return { label: 'Sửa bài viết', href: '/admin/blog-posts' };
    }

    if (path.startsWith('/promotions')) {
        return { label: 'Sửa khuyến mãi', href: '/admin/promotions' };
    }

    return { label: 'Mở CMS', href: '/admin' };
}

export function AdminEditBar() {
    const page = usePage<SharedProps>();
    const user = page.props.auth?.user;

    if (!user?.can_manage_content && !user?.can_manage_site && !user?.can_manage_staff) {
        return null;
    }

    const path = page.url.split('?')[0] || '/';
    const target = editTarget(path);

    return (
        <div className="fixed bottom-6 left-6 z-50 flex max-w-[calc(100vw-2rem)] flex-wrap items-center gap-2 rounded-full border border-[#d8c7bb] bg-white/95 p-2 text-sm font-semibold text-[#5b4638] shadow-[0_10px_30px_rgba(69,52,40,0.18)] backdrop-blur">
            {user.can_manage_content && (
                <a
                    href={target.href}
                    className="inline-flex items-center gap-2 rounded-full bg-[#c1664a] px-4 py-2 text-white transition hover:bg-[#a8513a]"
                >
                    <Edit3 className="h-4 w-4" />
                    {target.label}
                    <ExternalLink className="h-3.5 w-3.5 opacity-80" />
                </a>
            )}
            {user.can_manage_content && (
                <a
                    href="/admin/translation-strings"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#e7d8cc] bg-[#fbf8f4] transition hover:bg-[#f2e7de]"
                    title="Sửa UI Translations"
                    aria-label="Sửa UI Translations"
                >
                    <Languages className="h-4 w-4" />
                </a>
            )}
            {user.can_manage_site && (
                <a
                    href="/admin/site-settings"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#e7d8cc] bg-[#fbf8f4] transition hover:bg-[#f2e7de]"
                    title="Thiết lập chung"
                    aria-label="Thiết lập chung"
                >
                    <Settings className="h-4 w-4" />
                </a>
            )}
            {user.can_manage_staff && (
                <a
                    href="/admin/users"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#e7d8cc] bg-[#fbf8f4] transition hover:bg-[#f2e7de]"
                    title="Nhân sự & phân quyền"
                    aria-label="Nhân sự & phân quyền"
                >
                    <Users className="h-4 w-4" />
                </a>
            )}
        </div>
    );
}
