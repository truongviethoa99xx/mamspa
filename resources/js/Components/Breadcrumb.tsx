import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/Lib/utils';

export interface BreadcrumbItem {
    name: string;
    /** Bỏ trống ở mục cuối cùng (trang hiện tại) — sẽ hiển thị dạng chữ thường, không phải link. */
    url?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    className?: string;
    /** 'light' dùng khi breadcrumb nằm đè trên ảnh nền tối (banner full-bleed). */
    variant?: 'dark' | 'light';
}

/** Breadcrumb dùng chung cho các trang danh mục/chi tiết dịch vụ (Trang chủ › Dịch vụ › ...). */
export function Breadcrumb({ items, className, variant = 'dark' }: BreadcrumbProps) {
    if (!items.length) return null;

    const isLight = variant === 'light';

    return (
        <nav aria-label="Breadcrumb" className={cn('text-xs', isLight ? 'text-white/70' : 'text-ink/60', className)}>
            <ol className="flex flex-nowrap items-center gap-x-1.5 whitespace-nowrap">
                {items.map((item, index) => (
                    <li key={index} className="flex shrink-0 items-center gap-x-1.5">
                        {index > 0 && (
                            <ChevronRight className={cn('h-3 w-3', isLight ? 'text-white/40' : 'text-ink/40')} aria-hidden="true" />
                        )}
                        {item.url ? (
                            <Link
                                href={item.url}
                                className={cn('transition-colors', isLight ? 'hover:text-white' : 'hover:text-heading')}
                            >
                                {item.name}
                            </Link>
                        ) : (
                            <span aria-current="page" className={isLight ? 'text-white' : 'text-heading'}>
                                {item.name}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
