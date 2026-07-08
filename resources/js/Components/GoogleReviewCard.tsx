import { BadgeCheck, Star } from 'lucide-react';

export interface GoogleReviewItem {
    name: string;
    content: string;
    rating?: number;
    time?: string;
}

const AVATAR_COLORS = ['#3b6f5e', '#1f6f8b', '#9a6b3f', '#718255', '#8b5e83', '#b0623a'];

function avatarColor(name: string): string {
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

/** Multi-colour Google "G" mark. */
export function GoogleG({ className = 'h-5 w-5' }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
            <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
            <path fill="#FBBC05" d="M11.69 28.18A13.7 13.7 0 0 1 10.96 24c0-1.45.25-2.86.69-4.18v-5.7H4.34A22 22 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z" />
            <path fill="#EA4335" d="M24 9.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 2.95 29.93 1 24 1 15.4 1 7.96 5.93 4.34 13.12l7.35 5.7C13.42 13.62 18.27 9.75 24 9.75z" />
        </svg>
    );
}

export function Stars({ count = 5 }: { count?: number }) {
    return (
        <div className="flex gap-0.5">
            {Array.from({ length: count }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-[#FBBC05] text-[#FBBC05]" />
            ))}
        </div>
    );
}

export function GoogleReviewCard({ item, className }: { item: GoogleReviewItem; className?: string }) {
    return (
        <article className={className ?? 'flex flex-col rounded-2xl border border-maha-100 bg-white p-4 shadow-sm sm:rounded-2xl sm:p-6'}>
            <header className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <span
                        className="flex h-10 w-10 items-center justify-center rounded-full font-semibold text-white sm:h-11 sm:w-11"
                        style={{ backgroundColor: avatarColor(item.name) }}
                    >
                        {item.name.trim().charAt(0).toUpperCase()}
                    </span>
                    <div>
                        <p className="font-semibold text-ink">{item.name}</p>
                        {item.time && <p className="text-sm text-maha-500">{item.time}</p>}
                    </div>
                </div>
                <GoogleG />
            </header>

            <div className="mt-4 flex items-center gap-2">
                <Stars count={item.rating ?? 5} />
                <BadgeCheck className="h-4 w-4 text-[#4285F4]" />
            </div>

            <p className="mt-4 line-clamp-4 leading-relaxed text-ink/80">{item.content}</p>
        </article>
    );
}
