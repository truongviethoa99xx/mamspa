import type { SharedProps } from '@/types';

export interface BranchPhone {
    name?: string;
    phone: string;
}

/** Chuỗi `tel:` từ số hiển thị (bỏ khoảng trắng/dấu, giữ dấu +). */
export const toTelHref = (phone: string): string => `tel:${phone.replace(/[^\d+]/g, '')}`;

/**
 * Danh sách chi nhánh có số điện thoại — lấy từ CMS → Thiết lập chung → Chi nhánh
 * (nguồn duy nhất cho mọi chỗ gọi điện).
 */
export function getBranchPhones(site: SharedProps['site'] | undefined): BranchPhone[] {
    return (site?.branches ?? [])
        .filter((branch): branch is { name?: string; phone: string } => Boolean(branch.phone?.trim()))
        .map((branch) => ({ name: branch.name, phone: branch.phone.trim() }));
}
