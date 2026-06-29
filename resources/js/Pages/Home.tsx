import PublicLayout from '@/Layouts/PublicLayout'
import { Seo } from '@/Components/Seo'
import { HeroBlock } from '@/Components/Blocks/HeroBlock'
import { BranchesBlock } from '@/Components/Blocks/BranchesBlock'
import { ServiceListBlock } from '@/Components/Blocks/ServiceListBlock'
import { ServiceMenuBlock } from '@/Components/Blocks/ServiceMenuBlock'
import { BookingFormBlock } from '@/Components/Blocks/BookingFormBlock'
import { TestimonialBlock } from '@/Components/Blocks/TestimonialBlock'
import type { Translatable } from '@/types'

interface HeroContent {
    title: Translatable
    subtitle: Translatable
    cta_text: string
    cta_link: string
    service_list_title: Translatable
}

interface ServiceItem {
    id: number
    slug: string
    name: Translatable
    description: Translatable
    category: 'massage' | 'facial' | 'head-spa' | 'foot-spa' | 'combo'
    duration: number
    price?: number
}

interface BranchItem {
    id: number
    slug: string
    name: Translatable
    address?: string
    phone?: string
    open_hours?: unknown
}

interface BranchIntro {
    title?: Translatable
    eyebrow?: Translatable
    subheading?: Translatable
    heading?: Translatable
    body_1?: Translatable
    body_2?: Translatable
    cta?: Translatable
    caption?: Translatable
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
}

interface Props {
    hero: HeroContent
    featuredServices: ServiceItem[]
    menuServices: ServiceItem[]
    branchIntro: BranchIntro
    branches: BranchItem[]
    bookingBranches: BookingBranch[]
    bookingServices: BookingService[]
    testimonials: Testimonials
}

/**
 * Trang chủ tĩnh — thứ tự section cố định. Mỗi section là một component
 * trình bày dùng lại, nhận dữ liệu trực tiếp từ controller (không qua CMS).
 */
export default function Home({
    hero,
    featuredServices,
    menuServices,
    branchIntro,
    branches,
    bookingBranches,
    bookingServices,
    testimonials,
}: Props) {
    return (
        <PublicLayout>
            <Seo
                title="Spa Đà Nẵng — Cân bằng Thân Tâm Trí"
                description="Mầm Spa Đà Nẵng — không gian trị liệu massage, chăm sóc da, gội đầu dưỡng sinh. Hành trình cân bằng Thân Tâm Trí. Đặt lịch online tại 2 chi nhánh."
            />

            <HeroBlock data={hero} />
            <BranchesBlock data={{ branches, content: branchIntro }} />
            <ServiceListBlock data={{ title: hero.service_list_title, services: featuredServices }} />
            <ServiceMenuBlock data={{ services: menuServices }} />
            <BookingFormBlock data={{ branches: bookingBranches, services: bookingServices }} />
            <TestimonialBlock data={testimonials} />
        </PublicLayout>
    )
}
