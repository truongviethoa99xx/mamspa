import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { BlockRenderer } from '@/Components/Blocks/BlockRenderer';
import type { Block, Page } from '@/types';

interface Props {
    page: Pick<Page, 'slug' | 'title' | 'seo_meta'>;
    blocks: Block[];
}

export default function Home({ page, blocks }: Props) {
    const title = typeof page.title === 'string' ? page.title : (page.title as any)?.vi ?? 'Maha Spa';
    return (
        <PublicLayout>
            <Head title={title}>
                {page.seo_meta?.description && (
                    <meta name="description" content={page.seo_meta.description} />
                )}
            </Head>
            <BlockRenderer blocks={blocks} />
        </PublicLayout>
    );
}
