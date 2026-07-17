import { useEffect, useState } from 'react';
import { List } from 'lucide-react';
import { cn } from '@/Lib/utils';
import { type TocItem } from '@/Lib/toc';

/** Mục lục bám cuộn (sticky) cho bài viết dài — tự làm nổi bật heading đang đọc bằng IntersectionObserver. */
export function TableOfContents({ items }: { items: TocItem[] }) {
    const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);

    useEffect(() => {
        if (!items.length) return;

        const elements = items.map((item) => document.getElementById(item.id)).filter((el): el is HTMLElement => !!el);
        if (!elements.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((entry) => entry.isIntersecting);
                if (visible.length > 0) {
                    setActiveId(visible[0].target.id);
                }
            },
            { rootMargin: '-96px 0px -70% 0px', threshold: 0 },
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [items]);

    if (!items.length) {
        return null;
    }

    return (
        <nav aria-label="Mục lục bài viết" className="sticky top-28 hidden max-h-[calc(100vh-8rem)] overflow-y-auto lg:block">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-subheading">
                <List className="h-4 w-4" strokeWidth={1.5} />
                Mục lục
            </div>
            <ul className="mt-4 space-y-1 border-l border-maha-200 text-sm">
                {items.map((item) => (
                    <li key={item.id}>
                        <a
                            href={`#${item.id}`}
                            className={cn(
                                'block border-l-2 py-1.5 pl-4 -ml-px transition-colors',
                                item.level === 3 && 'pl-7',
                                activeId === item.id
                                    ? 'border-heading font-semibold text-heading'
                                    : 'border-transparent text-ink/60 hover:text-heading',
                            )}
                        >
                            {item.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
