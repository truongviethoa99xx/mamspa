import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Hero, type HeroData } from '@/Components/Hero';
import { Story, type StoryData } from '@/Components/Story';

interface Props {
    hero: HeroData;
    story: StoryData;
    sectionVisibility: {
        hero: boolean;
        story: boolean;
    };
}

export default function Home({ hero, story, sectionVisibility }: Props) {
    return (
        <PublicLayout>
            <Head title="Trang chủ" />
            {sectionVisibility.hero && <Hero data={hero} />}
            {sectionVisibility.story && <Story data={story} />}
        </PublicLayout>
    );
}
