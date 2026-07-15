import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Hero, type HeroData } from '@/Components/Hero';

interface Props {
    hero: HeroData;
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
