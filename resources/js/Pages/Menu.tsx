import { Head, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { MenuHero, type MenuHeroData } from '@/Components/Menu/MenuHero';
import { MenuIntro, type MenuIntroData } from '@/Components/Menu/MenuIntro';
import { MenuBranches, type MenuBranchesData } from '@/Components/Menu/MenuBranches';
import { MenuContact, type MenuContactData } from '@/Components/Menu/MenuContact';
import { useLocale } from '@/Hooks/useLocale';
import { tr, stripTags, truncate } from '@/Lib/utils';
import type { SharedProps } from '@/types';

interface Props {
    hero: MenuHeroData;
    intro: MenuIntroData;
    branches: MenuBranchesData;
    contact: MenuContactData;
    sectionVisibility: {
        hero: boolean;
        intro: boolean;
        branches: boolean;
        contact: boolean;
    };
}

export default function Menu({ hero, intro, branches, contact, sectionVisibility }: Props) {
    const { props } = usePage<SharedProps>();
    const locale = useLocale();
    const title = stripTags(tr(hero.title, locale)) || 'Menu';
    // Mô tả SEO mặc định ở Thiết lập chung được ưu tiên trước; subtitle của chính trang này chỉ
    // dùng khi Thiết lập chung để trống — nhất quán với mọi trang khác trên site.
    const description = truncate(props.site?.meta_description || stripTags(tr(hero.subtitle, locale)) || '', 160);

    return (
        <PublicLayout mainClassName="bg-[#f5f2ed]">
            <Head title={title}>{description && <meta name="description" content={description} />}</Head>
            {sectionVisibility.hero && <MenuHero data={hero} />}
            {sectionVisibility.intro && <MenuIntro data={intro} />}
            {sectionVisibility.branches && <MenuBranches data={branches} />}
            {sectionVisibility.contact && <MenuContact data={contact} />}
        </PublicLayout>
    );
}
