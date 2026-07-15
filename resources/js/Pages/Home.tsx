import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Hero } from '@/Components/Hero';

interface HeroCta {
    text: string;
    link: string;
    background_color: string;
    text_color: string;
    border_color: string;
}

interface HeroContent {
    heading: unknown;
    subtitle: unknown;
    image: string | null;
    cta: HeroCta;
    secondary_cta: HeroCta;
}

interface Props {
    hero: HeroContent;
    sectionVisibility: {
        hero: boolean;
    };
}

export default function Home({ hero, sectionVisibility }: Props) {
    return (
        <PublicLayout>
            <Head title="Trang chủ" />
            {sectionVisibility.hero && <Hero data={hero} />}
        </PublicLayout>
    );
}
