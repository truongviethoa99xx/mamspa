import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { MenuHero, type MenuHeroData } from '@/Components/Menu/MenuHero';
import { MenuIntro, type MenuIntroData } from '@/Components/Menu/MenuIntro';
import { MenuBranches, type MenuBranchesData } from '@/Components/Menu/MenuBranches';
import { MenuContact, type MenuContactData } from '@/Components/Menu/MenuContact';
import { useLocale } from '@/Hooks/useLocale';
import { tr, stripTags } from '@/Lib/utils';

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
    const locale = useLocale();
    const title = stripTags(tr(hero.title, locale)) || 'Menu';

    return (
        <PublicLayout mainClassName="bg-[#f5f2ed]">
            <Head title={title} />
            {sectionVisibility.hero && <MenuHero data={hero} />}
            {sectionVisibility.intro && <MenuIntro data={intro} />}
            {sectionVisibility.branches && <MenuBranches data={branches} />}
            {sectionVisibility.contact && <MenuContact data={contact} />}
        </PublicLayout>
    );
}
