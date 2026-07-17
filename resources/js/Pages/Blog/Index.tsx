import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { CategoryHero, type CategoryHeroData } from '@/Components/Services/CategoryHero';
import { type BreadcrumbItem } from '@/Components/Breadcrumb';
import { BlogCategoryFilter, type BlogCategoryFilterItem } from '@/Components/Blog/BlogCategoryFilter';
import { BlogFeatured } from '@/Components/Blog/BlogFeatured';
import { BlogExploreGrid } from '@/Components/Blog/BlogExploreGrid';
import { BlogNewsletter } from '@/Components/Blog/BlogNewsletter';
import { BlogCommitments } from '@/Components/Blog/BlogCommitments';
import { type BlogPostCardData } from '@/Components/Blog/types';

interface BlogHeroData {
    title?: unknown;
    subtitle?: unknown;
    image: string | null;
    image_alt?: unknown;
}

interface Props {
    hero: BlogHeroData;
    featured: BlogPostCardData[];
    recentPosts: BlogPostCardData[];
    posts: {
        data: BlogPostCardData[];
        next_page_url: string | null;
    };
    categories: BlogCategoryFilterItem[];
    activeCategory: string | null;
    sectionVisibility: {
        hero: boolean;
    };
}

const HERO_BREADCRUMB: BreadcrumbItem[] = [{ name: 'Trang chủ', url: '/' }, { name: 'Blog' }];

export default function BlogIndex({
    hero,
    featured,
    recentPosts,
    posts,
    categories,
    activeCategory,
    sectionVisibility,
}: Props) {
    const heroData: CategoryHeroData = {
        heading: hero.title,
        subtitle: hero.subtitle,
        image: hero.image,
        imageAlt: hero.image_alt,
    };

    return (
        <PublicLayout mainClassName="bg-white">
            <Head title="Blog" />

            {/* Cùng kiểu banner full-bleed với trang chi tiết dịch vụ (CategoryHero) — quản lý
                tiêu đề/ảnh tại /admin/blog-page-settings. Blog không có CTA đặt lịch theo đúng
                thiết kế gốc. */}
            {sectionVisibility.hero && <CategoryHero data={heroData} breadcrumb={HERO_BREADCRUMB} showCta={false} />}
            <BlogCategoryFilter categories={categories} activeCategory={activeCategory} />

            {featured.length > 0 ? (
                <BlogFeatured featured={featured} recentPosts={recentPosts} />
            ) : (
                <p className="mx-auto max-w-7xl px-5 py-16 text-center text-sm text-ink/60 sm:px-10 lg:px-16">
                    Chưa có bài viết nào được đăng tải.
                </p>
            )}

            <BlogExploreGrid posts={posts} />
            <BlogNewsletter />
            <BlogCommitments />
        </PublicLayout>
    );
}
