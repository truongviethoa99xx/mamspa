import { Head, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Hero, type HeroData } from '@/Components/Hero';
import { CustomPageBody, type CustomPageBodyData } from '@/Components/CustomPageBody';
import { useLocale } from '@/Hooks/useLocale';
import { stripTags, tr, truncate } from '@/Lib/utils';
import type { SharedProps } from '@/types';

interface Props {
    banner: HeroData;
    bannerVisible: boolean;
    metaDescription?: unknown;
    body: CustomPageBodyData;
}

export default function CustomPageShow({ banner, bannerVisible, metaDescription, body }: Props) {
    const { props } = usePage<SharedProps>();
    const locale = useLocale();
    const title = stripTags(tr(banner.heading, locale)) || undefined;
    // Ưu tiên: mô tả riêng trang này (nếu admin điền) → mô tả mặc định ở Thiết lập chung →
    // cuối cùng mới suy ra từ nội dung body_html, để không bao giờ để trống hoàn toàn.
    const description = truncate(
        stripTags(tr(metaDescription, locale)) || props.site?.meta_description || stripTags(body.html ?? ''),
        160,
    );

    return (
        <PublicLayout>
            <Head title={title}>{description && <meta name="description" content={description} />}</Head>
            {bannerVisible && <Hero data={banner} />}
            <CustomPageBody {...body} />
        </PublicLayout>
    );
}
