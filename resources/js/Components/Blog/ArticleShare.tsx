import { useState } from 'react';
import { Check, Copy, Facebook, MessageCircle } from 'lucide-react';
import { cn } from '@/Lib/utils';

/** Nút chia sẻ bài viết (Facebook, Zalo, sao chép liên kết) — dùng URL trang hiện tại. */
export function ArticleShare({ title, className }: { title: string; className?: string }) {
    const [copied, setCopied] = useState(false);
    const url = typeof window !== 'undefined' ? window.location.href : '';

    const links = [
        {
            label: 'Chia sẻ lên Facebook',
            icon: Facebook,
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        },
        {
            label: 'Chia sẻ qua Zalo',
            icon: MessageCircle,
            href: `https://sp.zalo.me/share?u=${encodeURIComponent(url)}&t=${encodeURIComponent(title)}`,
        },
    ];

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard API có thể bị chặn (context không an toàn/quyền trình duyệt) — bỏ qua, không chặn người dùng.
        }
    };

    return (
        <div className={cn('flex items-center gap-2', className)}>
            {links.map((link) => (
                <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-maha-100 text-heading transition-colors hover:bg-maha-200"
                >
                    <link.icon className="h-4 w-4" strokeWidth={1.5} />
                </a>
            ))}
            <button
                type="button"
                onClick={copyLink}
                aria-label="Sao chép liên kết"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-maha-100 text-heading transition-colors hover:bg-maha-200"
            >
                {copied ? <Check className="h-4 w-4" strokeWidth={1.5} /> : <Copy className="h-4 w-4" strokeWidth={1.5} />}
            </button>
        </div>
    );
}
