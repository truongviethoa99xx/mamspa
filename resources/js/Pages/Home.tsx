import { useTranslation } from 'react-i18next'
import PublicLayout from '@/Layouts/PublicLayout'
import { BlockRenderer } from '@/Components/Blocks/BlockRenderer'
import { Seo } from '@/Components/Seo'
import { tr } from '@/Lib/utils'
import { useLocale } from '@/Hooks/useLocale'
import type { Block, Page } from '@/types'

interface Props {
    page: Pick<Page, 'slug' | 'title' | 'seo_meta'>
    blocks: Block[]
}

export default function Home({ page, blocks }: Props) {
    const locale = useLocale()
    const { t } = useTranslation()
    const title = tr(page.title, locale) || 'Maha Spa'
    const description = page.seo_meta?.description || t('home.hero.subtitle')

    return (
        <PublicLayout>
            <Seo
                title="Maha Spa Đà Nẵng — Cân bằng Thân Tâm Trí"
                description={description}
            />
            <BlockRenderer blocks={blocks} />
        </PublicLayout>
    )
}
