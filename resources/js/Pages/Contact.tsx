import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Hero, type HeroData } from '@/Components/Hero';
import { ContactBranches, type ContactBranchesData } from '@/Components/Contact/ContactBranches';
import { ContactAboutBanner, type ContactAboutBannerData } from '@/Components/Contact/ContactAboutBanner';
import { ContactInfoForm, type ContactFormData, type ContactInfoData } from '@/Components/Contact/ContactInfoForm';
import { ContactClosingBanner, type ContactClosingBannerData } from '@/Components/Contact/ContactClosingBanner';
import { ContactCommitments, type ContactCommitmentsData } from '@/Components/Contact/ContactCommitments';

interface Props {
    hero: HeroData;
    branches: ContactBranchesData;
    aboutBanner: ContactAboutBannerData;
    info: ContactInfoData;
    form: ContactFormData;
    closing: ContactClosingBannerData;
    commitments: ContactCommitmentsData;
    sectionVisibility: {
        hero: boolean;
        branches: boolean;
        aboutBanner: boolean;
        contactForm: boolean;
        closing: boolean;
        commitments: boolean;
    };
}

export default function Contact({
    hero,
    branches,
    aboutBanner,
    info,
    form,
    closing,
    commitments,
    sectionVisibility,
}: Props) {
    return (
        <PublicLayout>
            <Head title="Liên hệ" />
            {sectionVisibility.hero && (
                <Hero
                    data={hero}
                    heightClassName="h-[calc(85vh-100px)] min-h-[340px] sm:h-[calc(75vh-100px)]"
                    showDivider
                />
            )}
            {sectionVisibility.branches && <ContactBranches data={branches} />}
            {sectionVisibility.aboutBanner && <ContactAboutBanner data={aboutBanner} />}
            {sectionVisibility.contactForm && <ContactInfoForm info={info} form={form} />}
            {sectionVisibility.closing && <ContactClosingBanner data={closing} />}
            {sectionVisibility.commitments && <ContactCommitments data={commitments} />}
        </PublicLayout>
    );
}
