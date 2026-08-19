import { Head, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { useLocale } from '@/Hooks/useLocale';
import { tr, stripTags, truncate } from '@/Lib/utils';
import type { SharedProps } from '@/types';
import { type BreadcrumbItem } from '@/Components/Breadcrumb';
import { ServiceHero } from '@/Components/Services/ServiceHero';
import { ServicePillars, type ServicePillar } from '@/Components/Services/ServicePillars';
import { ServiceScopeAndTools, type ServiceTool } from '@/Components/Services/ServiceScopeAndTools';
import { ServiceTiers, type ServiceTier } from '@/Components/Services/ServiceTiers';
import { ServicesClosing, type ServicesClosingData } from '@/Components/Services/ServicesClosing';

interface ServiceDetailData {
    name: unknown;
    short_description?: unknown;
    thumbnail_alt?: unknown;
    images?: string[];
    hero_image?: string | null;
    pillars_heading?: unknown;
    pillars?: ServicePillar[];
    pillars_image?: string | null;
    pillars_image_alt?: unknown;
    treatment_scope_note?: unknown;
    treatment_scope_image?: string | null;
    tools_used?: ServiceTool[];
    tiers_heading?: unknown;
    tiers_subtitle?: unknown;
    tiers_intensity_label?: unknown;
    tiers?: ServiceTier[];
}

interface AncestorCrumb {
    name: string;
    url: string;
}

interface Props {
    service: ServiceDetailData;
    breadcrumb: AncestorCrumb[];
    closing: ServicesClosingData;
}

const HOME_CRUMB: BreadcrumbItem = { name: 'Trang chủ', url: '/' };
const SERVICES_CRUMB: BreadcrumbItem = { name: 'Dịch vụ', url: '/dich-vu/' };

export default function DichVuDetail({ service, breadcrumb, closing }: Props) {
    const { props } = usePage<SharedProps>();
    const locale = useLocale();
    const serviceName = stripTags(tr(service.name, locale));
    // Mô tả SEO mặc định ở Thiết lập chung được ưu tiên trước — admin sửa 1 chỗ áp dụng toàn
    // site; mô tả riêng của dịch vụ chỉ dùng khi Thiết lập chung để trống.
    const serviceDescription = truncate(props.site?.meta_description || stripTags(tr(service.short_description, locale)), 160);

    const breadcrumbItems: BreadcrumbItem[] = [
        HOME_CRUMB,
        SERVICES_CRUMB,
        ...breadcrumb.map((item) => ({ name: item.name, url: item.url })),
        { name: serviceName },
    ];

    return (
        <PublicLayout>
            <Head title={serviceName || 'Dịch vụ'}>
                {serviceDescription && <meta name="description" content={serviceDescription} />}
            </Head>
            <ServiceHero
                breadcrumb={breadcrumbItems}
                data={{
                    heading: service.name,
                    subtitle: service.short_description,
                    image: service.hero_image ?? null,
                    imageAlt: service.thumbnail_alt,
                }}
            />
            <ServicePillars
                data={{
                    heading: service.pillars_heading,
                    image: service.pillars_image,
                    imageAlt: service.pillars_image_alt,
                    pillars: service.pillars,
                }}
            />
            <ServiceScopeAndTools
                data={{
                    scopeIcon: service.treatment_scope_image,
                    scopeNote: service.treatment_scope_note,
                    tools: service.tools_used,
                }}
            />
            <ServiceTiers
                data={{
                    heading: service.tiers_heading,
                    subtitle: service.tiers_subtitle,
                    intensityLabel: service.tiers_intensity_label,
                    tiers: service.tiers ?? [],
                }}
            />
            <ServicesClosing data={closing} fixedHeight />
        </PublicLayout>
    );
}
