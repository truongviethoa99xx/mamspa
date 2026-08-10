import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Hero, type HeroData } from '@/Components/Hero';
import { Story, type StoryData } from '@/Components/Story';
import { Philosophy, type PhilosophyData } from '@/Components/Philosophy';
import { FeaturedServices, type FeaturedService } from '@/Components/FeaturedServices';
import { ArtBanner, type ArtBannerData } from '@/Components/ArtBanner';
import { Spaces, type SpacesData } from '@/Components/Spaces';
import { WhyUs, type WhyUsData } from '@/Components/WhyUs';
import { Reviews, type ReviewsData } from '@/Components/Reviews';
import { GalleryPreview, type GalleryPreviewData } from '@/Components/GalleryPreview';
import { BookingStrip, type BookingStripData } from '@/Components/BookingStrip';

interface Props {
    hero: HeroData;
    story: StoryData;
    philosophy: PhilosophyData;
    serviceListHeading: unknown;
    serviceListTitle: unknown;
    featuredServices: FeaturedService[];
    artBanner: ArtBannerData;
    spaces: SpacesData;
    whyUs: WhyUsData;
    reviews: ReviewsData;
    galleryPreview: GalleryPreviewData;
    finalCta: BookingStripData;
    sectionVisibility: {
        hero: boolean;
        story: boolean;
        philosophy: boolean;
        featuredServices: boolean;
        artBanner: boolean;
        spaces: boolean;
        whyUs: boolean;
        reviews: boolean;
        gallery: boolean;
        finalCta: boolean;
    };
}

export default function Home({
    hero,
    story,
    philosophy,
    serviceListHeading,
    serviceListTitle,
    featuredServices,
    artBanner,
    spaces,
    whyUs,
    reviews,
    galleryPreview,
    finalCta,
    sectionVisibility,
}: Props) {
    return (
        <PublicLayout>
            <Head title="Trang chủ">
                <meta
                    name="description"
                    content="Mầm Spa — spa trị liệu tại Đà Nẵng với 2 chi nhánh Lê Văn Sỹ và Lê Thị Riêng. Massage body, chăm sóc da mặt, head spa và các liệu trình chăm sóc sức khoẻ theo giá trị trị liệu Việt."
                />
                {hero.image && (
                    <link
                        rel="preload"
                        as="image"
                        href={hero.image}
                        imageSrcSet={hero.image_mobile ? `${hero.image_mobile} 800w, ${hero.image} 1920w` : undefined}
                        imageSizes={hero.image_mobile ? '100vw' : undefined}
                        fetchPriority="high"
                    />
                )}
            </Head>
            {sectionVisibility.hero && <Hero data={hero} />}
            {sectionVisibility.story && <Story data={story} />}
            {sectionVisibility.philosophy && <Philosophy data={philosophy} />}
            {sectionVisibility.featuredServices && (
                <FeaturedServices data={{ heading: serviceListHeading, title: serviceListTitle, services: featuredServices }} />
            )}
            {sectionVisibility.artBanner && <ArtBanner data={artBanner} />}
            {sectionVisibility.spaces && <Spaces data={spaces} />}
            {sectionVisibility.whyUs && <WhyUs data={whyUs} />}
            {sectionVisibility.reviews && <Reviews data={reviews} />}
            {sectionVisibility.gallery && <GalleryPreview data={galleryPreview} />}
            {sectionVisibility.finalCta && <BookingStrip data={finalCta} />}
        </PublicLayout>
    );
}
