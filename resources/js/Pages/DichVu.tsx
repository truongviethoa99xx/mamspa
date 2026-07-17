import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Hero, type HeroData } from '@/Components/Hero';
import { ServicesShowcase, type ServicesShowcaseData } from '@/Components/Services/ServicesShowcase';
import { ServicesClosing, type ServicesClosingData } from '@/Components/Services/ServicesClosing';

interface Props {
    hero: HeroData;
    showcase: ServicesShowcaseData;
    closing: ServicesClosingData;
    sectionVisibility: {
        hero: boolean;
        showcase: boolean;
        closing: boolean;
    };
}

export default function DichVu({ hero, showcase, closing, sectionVisibility }: Props) {
    return (
        <PublicLayout>
            <Head title="Dịch vụ" />
            {sectionVisibility.hero && <Hero data={hero} />}
            {sectionVisibility.showcase && <ServicesShowcase data={showcase} />}
            {sectionVisibility.closing && <ServicesClosing data={closing} />}
        </PublicLayout>
    );
}
