import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { CustomerExperienceHero, type CustomerExperienceHeroData } from '@/Components/CustomerExperience/CustomerExperienceHero';
import { StatsStrip, type StatsStripData } from '@/Components/CustomerExperience/StatsStrip';
import { ExperienceGallery, type ExperienceGalleryData } from '@/Components/CustomerExperience/ExperienceGallery';
import { ExperienceTestimonials, type ExperienceTestimonialsData } from '@/Components/CustomerExperience/ExperienceTestimonials';
import { WhyGuestsReturn, type WhyGuestsReturnData } from '@/Components/CustomerExperience/WhyGuestsReturn';
import { InstagramStrip, type InstagramStripData } from '@/Components/CustomerExperience/InstagramStrip';
import { ExperienceClosingCta, type ExperienceClosingCtaData } from '@/Components/CustomerExperience/ExperienceClosingCta';

interface Props {
    hero: CustomerExperienceHeroData;
    stats: StatsStripData;
    gallery: ExperienceGalleryData;
    testimonials: ExperienceTestimonialsData;
    reasons: WhyGuestsReturnData;
    instagram: InstagramStripData;
    closing: ExperienceClosingCtaData;
    sectionVisibility: {
        hero: boolean;
        stats: boolean;
        gallery: boolean;
        testimonials: boolean;
        reasons: boolean;
        instagram: boolean;
        closing: boolean;
    };
}

export default function CustomerExperience({ hero, stats, gallery, testimonials, reasons, instagram, closing, sectionVisibility }: Props) {
    return (
        <PublicLayout mainClassName="bg-[#f5f2ed]">
            <Head title="Customer Experience" />
            {sectionVisibility.hero && <CustomerExperienceHero data={hero} />}
            {sectionVisibility.stats && <StatsStrip data={stats} />}
            {sectionVisibility.gallery && <ExperienceGallery data={gallery} />}
            {sectionVisibility.testimonials && <ExperienceTestimonials data={testimonials} />}
            {sectionVisibility.reasons && <WhyGuestsReturn data={reasons} />}
            {sectionVisibility.instagram && <InstagramStrip data={instagram} />}
            {sectionVisibility.closing && <ExperienceClosingCta data={closing} />}
        </PublicLayout>
    );
}
