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
            <Head title="Dịch vụ">
                <meta
                    name="description"
                    content="Khám phá các liệu trình trị liệu tại Mầm Spa: massage body, chăm sóc da mặt, head spa và các gói combo — theo giá trị trị liệu Việt kết hợp chuyên môn hiện đại."
                />
            </Head>
            {sectionVisibility.hero && <Hero data={hero} />}
            {sectionVisibility.showcase && <ServicesShowcase data={showcase} />}
            {sectionVisibility.closing && <ServicesClosing data={closing} />}
        </PublicLayout>
    );
}
