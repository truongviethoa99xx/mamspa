import { Link } from '@inertiajs/react';
import { Droplet, Flower2, HeartHandshake, Leaf, type LucideIcon } from 'lucide-react';
import { cn } from '@/Lib/utils';

const ICONS: LucideIcon[] = [Leaf, Flower2, Droplet, HeartHandshake];

export interface BlogCategoryFilterItem {
    name: string;
    count: number;
}

/** Dải danh mục bài viết dạng icon, lấy trực tiếp từ danh mục thật của các bài đã xuất bản (không hardcode). */
export function BlogCategoryFilter({
    categories,
    activeCategory,
}: {
    categories: BlogCategoryFilterItem[];
    activeCategory: string | null;
}) {
    if (!categories.length) {
        return null;
    }

    return (
        <section className="relative z-10 px-5 sm:px-10 lg:px-16">
            <div className="mx-auto -mt-8 max-w-7xl rounded-lg bg-white px-4 py-5 shadow-[0_10px_40px_-15px_rgba(47,62,46,0.25)] sm:-mt-10 sm:px-8 sm:py-6">
                <div className="grid grid-cols-1 gap-5 divide-y divide-maha-100 sm:grid-cols-2 sm:gap-6 sm:divide-y-0 lg:grid-cols-4">
                    {categories.map((item, index) => {
                        const Icon = ICONS[index % ICONS.length];
                        const isActive = activeCategory === item.name;
                        const href = isActive ? '/tin-tuc/' : `/tin-tuc/?category=${encodeURIComponent(item.name)}`;

                        return (
                            <Link
                                key={item.name}
                                href={href}
                                className={cn(
                                    'flex items-center gap-3 pt-5 transition-colors first:pt-0 sm:pt-0',
                                    isActive ? 'text-subheading' : 'text-heading',
                                )}
                            >
                                <span
                                    className={cn(
                                        'flex h-11 w-11 shrink-0 items-center justify-center rounded-full',
                                        isActive ? 'bg-subheading text-white' : 'bg-maha-100 text-subheading',
                                    )}
                                >
                                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                                </span>
                                <span>
                                    <span className="block text-sm font-semibold uppercase tracking-wide">{item.name}</span>
                                    <span className="mt-0.5 block text-xs text-ink/60">{item.count} bài viết</span>
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
