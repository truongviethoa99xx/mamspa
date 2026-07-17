import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { useLocale } from '@/Hooks/useLocale';
import { tr, stripTags } from '@/Lib/utils';
import { type BreadcrumbItem } from '@/Components/Breadcrumb';
import { CategoryHero } from '@/Components/Services/CategoryHero';
import { CategoryIntro, type CategoryPillar } from '@/Components/Services/CategoryIntro';
import { CategoryQuote } from '@/Components/Services/CategoryQuote';
import { CategoryExperienceNote, type CategoryChecklistItem } from '@/Components/Services/CategoryExperienceNote';
import { CategoryTherapyGrid, type CategoryTherapyItem } from '@/Components/Services/CategoryTherapyGrid';
import { CategoryClosing, type CategoryClosingData } from '@/Components/Services/CategoryClosing';

interface CategoryData {
    name: unknown;
    description?: unknown;
    image?: string | null;
    image_alt?: unknown;
    intro_heading?: unknown;
    intro_body?: unknown;
    intro_image?: string | null;
    intro_image_alt?: unknown;
    pillars?: CategoryPillar[];
    quote?: unknown;
    experience_note_title?: unknown;
    experience_checklist?: CategoryChecklistItem[];
    experience_note_body?: unknown;
    experience_note_image?: string | null;
    experience_note_image_alt?: unknown;
    therapy_heading?: unknown;
}

interface AncestorCrumb {
    name: string;
    url: string;
}

interface Props {
    category: CategoryData;
    breadcrumb: AncestorCrumb[];
    services: CategoryTherapyItem[];
    closing: CategoryClosingData;
}

const HOME_CRUMB: BreadcrumbItem = { name: 'Trang chủ', url: '/' };
const SERVICES_CRUMB: BreadcrumbItem = { name: 'Dịch vụ', url: '/dich-vu/' };

export default function DichVuCategory({ category, breadcrumb, services, closing }: Props) {
    const locale = useLocale();
    const categoryName = stripTags(tr(category.name, locale));

    const breadcrumbItems: BreadcrumbItem[] = [
        HOME_CRUMB,
        SERVICES_CRUMB,
        ...breadcrumb.map((item) => ({ name: item.name, url: item.url })),
        { name: categoryName },
    ];

    return (
        <PublicLayout mainClassName="bg-[#f5f2ed]">
            <Head title={categoryName || 'Dịch vụ'} />
            <CategoryHero
                breadcrumb={breadcrumbItems}
                data={{
                    heading: category.name,
                    subtitle: category.description,
                    image: category.image,
                    imageAlt: category.image_alt,
                }}
            />
            <CategoryIntro
                data={{
                    heading: category.intro_heading,
                    body: category.intro_body,
                    image: category.intro_image,
                    imageAlt: category.intro_image_alt,
                    pillars: category.pillars,
                }}
            />
            <CategoryQuote data={{ quote: category.quote }} />
            <CategoryExperienceNote
                data={{
                    title: category.experience_note_title,
                    checklist: category.experience_checklist,
                    body: category.experience_note_body,
                    image: category.experience_note_image,
                    imageAlt: category.experience_note_image_alt,
                }}
            />
            <CategoryTherapyGrid items={services} heading={category.therapy_heading} />
            <CategoryClosing data={closing} />
        </PublicLayout>
    );
}
