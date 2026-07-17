export interface BlogPostCardData {
    id: number;
    slug: string;
    category: string | null;
    title: unknown;
    excerpt?: unknown;
    cover_image: string | null;
    cover_image_alt?: unknown;
    published_at: string | null;
    reading_minutes: number;
}
