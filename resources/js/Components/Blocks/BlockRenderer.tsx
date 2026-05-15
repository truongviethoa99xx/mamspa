import type { Block } from '@/types';
import { HeroBlock } from './HeroBlock';
import { ServiceListBlock } from './ServiceListBlock';
import { GalleryBlock } from './GalleryBlock';
import { TestimonialBlock } from './TestimonialBlock';
import { CtaBlock } from './CtaBlock';
import { TextBlock } from './TextBlock';
import { BranchesBlock } from './BranchesBlock';
import { PromoBannerBlock } from './PromoBannerBlock';

const MAP: Record<string, (props: { data: any }) => JSX.Element | null> = {
    hero: HeroBlock,
    service_list: ServiceListBlock,
    gallery: GalleryBlock,
    testimonial: TestimonialBlock,
    cta: CtaBlock,
    text: TextBlock,
    branches: BranchesBlock,
    promo_banner: PromoBannerBlock,
};

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
    return (
        <>
            {blocks.map((block) => {
                const Component = MAP[block.type];
                if (!Component) {
                    return null;
                }
                return <Component key={block.id} data={block.data as any} />;
            })}
        </>
    );
}
