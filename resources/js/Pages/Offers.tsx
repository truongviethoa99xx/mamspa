import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { OfferHero, type OfferHeroData } from '@/Components/Offers/OfferHero';
import { OfferBranches, type OfferBranchesData } from '@/Components/Offers/OfferBranches';
import { OfferNote, type OfferNoteData } from '@/Components/Offers/OfferNote';
import { OfferClosing, type OfferClosingData } from '@/Components/Offers/OfferClosing';

interface Props {
    hero: OfferHeroData;
    branches: OfferBranchesData;
    note: OfferNoteData;
    closing: OfferClosingData;
    sectionVisibility: {
        hero: boolean;
        branches: boolean;
        note: boolean;
        closing: boolean;
    };
}

export default function Offers({ hero, branches, note, closing, sectionVisibility }: Props) {
    return (
        <PublicLayout mainClassName="bg-[#f5f2ed]">
            <Head title="Ưu đãi">
                <meta
                    name="description"
                    content="Cập nhật ưu đãi, khuyến mãi mới nhất tại Mầm Spa — tiết kiệm hơn khi trải nghiệm các liệu trình massage, chăm sóc da mặt, head spa tại 2 chi nhánh Hồ Chí Minh."
                />
            </Head>
            {sectionVisibility.hero && <OfferHero data={hero} />}
            {sectionVisibility.branches && <OfferBranches data={branches} />}
            {sectionVisibility.note && <OfferNote data={note} />}
            {sectionVisibility.closing && <OfferClosing data={closing} />}
        </PublicLayout>
    );
}
