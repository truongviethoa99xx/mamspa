import PublicLayout from '@/Layouts/PublicLayout'
import { Seo } from '@/Components/Seo'
import { HeroBlock } from '@/Components/Blocks/HeroBlock'
import { StoryBlock } from '@/Components/Blocks/StoryBlock'
import { PhilosophyBlock } from '@/Components/Blocks/PhilosophyBlock'
import { ServiceListBlock } from '@/Components/Blocks/ServiceListBlock'
import { ArtBannerBlock } from '@/Components/Blocks/ArtBannerBlock'
import { BranchesBlock } from '@/Components/Blocks/BranchesBlock'
import { ServiceMenuBlock } from '@/Components/Blocks/ServiceMenuBlock'
import { BookingFormBlock } from '@/Components/Blocks/BookingFormBlock'
import { WhyUsBlock } from '@/Components/Blocks/WhyUsBlock'
import { TestimonialBlock } from '@/Components/Blocks/TestimonialBlock'
import { GalleryPreviewBlock } from '@/Components/Blocks/GalleryPreviewBlock'
import { FinalCtaBlock } from '@/Components/Blocks/FinalCtaBlock'
import type { Translatable } from '@/types'

interface HeroContent {
    title: Translatable
    subtitle: Translatable
    cta_text: string
    cta_link: string
    service_list_title: Translatable
}

interface StoryContent {
    eyebrow: Translatable
    body: Translatable
    cta_text: Translatable
    cta_link: string
    image: string | null
}

interface PhilosophyContent {
    eyebrow: Translatable
    quote: Translatable
}

interface ArtBannerContent {
    eyebrow: Translatable
    heading: Translatable
    body: Translatable
    cta_text: Translatable
    cta_link: string
    image: string | null
}

interface WhyUsItem {
    icon: string
    title: Translatable
    description: Translatable
}

interface FinalCtaContent {
    heading: Translatable
    cta_text: Translatable
    cta_link: string
    image: string | null
}

interface ServiceCategoryItem {
    slug: string
    name: Translatable
    root_slug: string
}

interface ServiceItem {
    id: number
    slug: string
    name: Translatable
    description: Translatable
    category: ServiceCategoryItem | null
    duration: number
    price?: number
}

interface MenuCategoryItem {
    slug: string
    name: Translatable
}

interface BranchItem {
    id: number
    slug: string
    name: Translatable
    address?: string
    phone?: string
    open_hours?: unknown
    intro_title?: Translatable
    eyebrow?: Translatable
    subheading?: Translatable
    heading?: Translatable
    body_1?: Translatable
    body_2?: Translatable
    cta?: Translatable
}

interface BookingBranch {
    id: number
    slug: string
    name: Translatable
}

interface BookingService {
    id: number
    slug: string
    name: Translatable
    duration: number
    branch_ids: number[]
}

interface Testimonials {
    rating: number
    review_count: number
    source: string
    items: { name: string; time?: string; rating?: number; content: string }[]
    widgets?: { name?: Translatable; html: string }[]
    video_url?: string | null
}

interface SectionVisibility {
    hero: boolean
    story: boolean
    philosophy: boolean
    artBanner: boolean
    whyUs: boolean
    featuredServices: boolean
    testimonials: boolean
    gallery: boolean
    finalCta: boolean
}

interface Props {
    hero: HeroContent
    story: StoryContent
    philosophy: PhilosophyContent
    artBanner: ArtBannerContent
    whyUs: WhyUsItem[]
    featuredServices: ServiceItem[]
    menuServices: ServiceItem[]
    menuCategories: MenuCategoryItem[]
    branches: BranchItem[]
    bookingBranches: BookingBranch[]
    bookingServices: BookingService[]
    testimonials: Testimonials
    galleryPreview: string[]
    finalCta: FinalCtaContent
    sectionVisibility: SectionVisibility
}

/**
 * Trang chủ tĩnh — thứ tự section cố định. Mỗi section là một component
 * trình bày dùng lại, nhận dữ liệu trực tiếp từ controller (không qua CMS).
 */
export default function Home({
    hero,
    story,
    philosophy,
    artBanner,
    whyUs,
    featuredServices,
    menuServices,
    menuCategories,
    branches,
    bookingBranches,
    bookingServices,
    testimonials,
    galleryPreview,
    finalCta,
    sectionVisibility,
}: Props) {
    return (
        <PublicLayout>
            <Seo
                title="Mầm Spa — Cân bằng Thân Tâm Trí"
                description="Mầm Spa — không gian trị liệu massage, chăm sóc da, gội đầu dưỡng sinh. Hành trình cân bằng Thân Tâm Trí. Đặt lịch online tại 2 chi nhánh."
            />

            {sectionVisibility.hero && <HeroBlock data={hero} />}
            {sectionVisibility.story && <StoryBlock data={story} />}
            {sectionVisibility.philosophy && <PhilosophyBlock data={philosophy} />}
            {sectionVisibility.featuredServices && (
                <ServiceListBlock data={{ title: hero.service_list_title, services: featuredServices }} />
            )}
            {sectionVisibility.artBanner && <ArtBannerBlock data={artBanner} />}
            <BranchesBlock data={{ branches }} />
            <ServiceMenuBlock data={{ services: menuServices, categories: menuCategories }} />
            <BookingFormBlock data={{ branches: bookingBranches, services: bookingServices }} />
            {sectionVisibility.whyUs && <WhyUsBlock data={whyUs} />}
            {sectionVisibility.testimonials && <TestimonialBlock data={testimonials} />}
            {sectionVisibility.gallery && <GalleryPreviewBlock data={galleryPreview} />}
            {sectionVisibility.finalCta && <FinalCtaBlock data={finalCta} />}
        </PublicLayout>
    )
}
