import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Hero, type HeroData } from '@/Components/Hero';
import { CustomPageBody, type CustomPageBodyData } from '@/Components/CustomPageBody';
import { useLocale } from '@/Hooks/useLocale';
import { stripTags, tr } from '@/Lib/utils';

interface Props {
    banner: HeroData;
    bannerVisible: boolean;
    body: CustomPageBodyData;
}

export default function CustomPageShow({ banner, bannerVisible, body }: Props) {
    const locale = useLocale();
    const title = stripTags(tr(banner.heading, locale)) || undefined;

    return (
        <PublicLayout>
            <Head title={title} />
            {bannerVisible && <Hero data={banner} />}
            <CustomPageBody {...body} />
        </PublicLayout>
    );
}
