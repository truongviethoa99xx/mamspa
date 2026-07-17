interface AuthorCardProps {
    name: string;
    avatar: string | null;
}

/** Thẻ giới thiệu tác giả cuối bài viết. */
export function AuthorCard({ name, avatar }: AuthorCardProps) {
    return (
        <div className="mt-12 flex items-center gap-4 rounded-lg border border-maha-100 bg-maha-50 p-5">
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-maha-200">
                {avatar && <img src={avatar} alt={name} className="h-full w-full object-cover" />}
            </div>
            <div>
                <p className="text-xs uppercase tracking-wide text-subheading">Người viết</p>
                <p className="mt-0.5 font-serif text-lg text-heading">{name}</p>
                <p className="mt-0.5 text-sm text-ink/60">Đội ngũ biên tập Mầm Spa</p>
            </div>
        </div>
    );
}
