import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Hero, type HeroData } from '@/Components/Hero';
import { CustomPageBody, type CustomPageBodyData } from '@/Components/CustomPageBody';
import { useLocale } from '@/Hooks/useLocale';
import { stripTags, tr, truncate } from '@/Lib/utils';

interface Props {
    banner: HeroData;
    bannerVisible: boolean;
    metaDescription?: unknown;
    body: CustomPageBodyData;
}

export default function CustomPageShow({ banner, bannerVisible, metaDescription, body }: Props) {
    const locale = useLocale();
    const title = stripTags(tr(banner.heading, locale)) || undefined;
    // Trang chưa được admin điền meta description riêng (field mới thêm) → tạm suy ra
    // từ nội dung body_html admin tự nhập, thay vì để trống hoàn toàn.
    const description = truncate(stripTags(tr(metaDescription, locale)) || stripTags(body.html ?? ''), 160);

    return (
        <PublicLayout>
            <Head title={title}>{description && <meta name="description" content={description} />}</Head>
            {bannerVisible && <Hero data={banner} />}
            <CustomPageBody {...body} />
        </PublicLayout>
    );
}
