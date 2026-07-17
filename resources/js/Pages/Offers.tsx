import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { OfferHero, type OfferHeroData } from '@/Components/Offers/OfferHero';
import { OfferBenefits, type OfferBenefitsData } from '@/Components/Offers/OfferBenefits';
import { OfferBranchDeals, type OfferBranchDealsData } from '@/Components/Offers/OfferBranchDeals';
import { OfferNote, type OfferNoteData } from '@/Components/Offers/OfferNote';
import { OfferClosingBanner, type OfferClosingBannerData } from '@/Components/Offers/OfferClosingBanner';

interface Props {
    hero: OfferHeroData;
    benefits: OfferBenefitsData;
    branchOffers: OfferBranchDealsData;
    note: OfferNoteData;
    closing: OfferClosingBannerData;
    sectionVisibility: {
        hero: boolean;
        benefits: boolean;
        branchOffers: boolean;
        note: boolean;
        closing: boolean;
    };
}

export default function Offers({ hero, benefits, branchOffers, note, closing, sectionVisibility }: Props) {
    return (
        <PublicLayout mainClassName="bg-[#f5f2ed]">
            <Head title="Ưu đãi" />
            {sectionVisibility.hero && <OfferHero data={hero} />}
            {sectionVisibility.benefits && <OfferBenefits data={benefits} />}
            {sectionVisibility.branchOffers && <OfferBranchDeals data={branchOffers} />}
            {sectionVisibility.note && <OfferNote data={note} />}
            {sectionVisibility.closing && <OfferClosingBanner data={closing} />}
        </PublicLayout>
    );
}
