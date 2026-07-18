import {
    Droplet,
    Flame,
    Flower2,
    Gem,
    GraduationCap,
    HandHeart,
    Heart,
    HeartHandshake,
    Layers,
    Leaf,
    PersonStanding,
    ShieldCheck,
    ShoppingBag,
    Soup,
    Sparkles,
    Sprout,
    Star,
    Sun,
    Users,
    type LucideIcon,
} from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { useReveal } from '@/Hooks/useReveal';
import { tr, cn } from '@/Lib/utils';

const ICONS: Record<string, LucideIcon> = {
    HandHeart,
    Leaf,
    GraduationCap,
    Sprout,
    Flower2,
    HeartHandshake,
    Heart,
    Users,
    ShieldCheck,
    Sparkles,
    Sun,
    Droplet,
    Flame,
    Soup,
    ShoppingBag,
    Gem,
    Layers,
    PersonStanding,
    Star,
};

const SCOPE_LABEL: Record<string, string> = { vi: 'Đặc điểm chung của liệu trình', en: 'Treatment scope' };
const TOOLS_LABEL: Record<string, string> = { vi: 'Sản phẩm & dụng cụ sử dụng', en: 'Products & tools used' };

export interface ServiceTool {
    icon?: string | null;
    label?: unknown;
}

export interface ServiceScopeAndToolsData {
    scopeIcon?: string | null;
    scopeNote?: unknown;
    tools?: ServiceTool[];
}

/** Khối 2 cột: vùng áp dụng chung của liệu trình (trái) và sản phẩm/dụng cụ sử dụng (phải). */
export function ServiceScopeAndTools({ data }: { data: ServiceScopeAndToolsData }) {
    const locale = useLocale();
    const scopeNote = tr(data.scopeNote, locale);
    const tools = data.tools ?? [];
    const showScope = !!scopeNote;
    const showTools = tools.length > 0;
    const { ref, className } = useReveal<HTMLElement>();

    if (!showScope && !showTools) {
        return null;
    }

    const ScopeIcon = (data.scopeIcon && ICONS[data.scopeIcon]) || PersonStanding;
    const scopeLabel = SCOPE_LABEL[locale] ?? SCOPE_LABEL.vi;
    const toolsLabel = TOOLS_LABEL[locale] ?? TOOLS_LABEL.vi;

    return (
        <section ref={ref} className={cn(className, 'mt-2 bg-[#f4eae1] px-5 py-10 sm:px-10 lg:px-[60px]')}>
            <div className={cn('grid gap-10', showScope && showTools && 'lg:grid-cols-[1fr_auto_2fr] lg:gap-10')}>
                {showScope && (
                    <div>
                        <h3 className="font-serif text-lg text-heading">{scopeLabel}</h3>
                        <div className="mt-6 flex items-start gap-4">
                            <ScopeIcon className="h-12 w-12 shrink-0 text-subheading" strokeWidth={1.25} aria-hidden="true" />
                            <div
                                className="rich-content text-sm leading-relaxed text-ink/75"
                                dangerouslySetInnerHTML={{ __html: scopeNote }}
                            />
                        </div>
                    </div>
                )}

                {showScope && showTools && <span className="hidden w-px bg-maha-300 lg:block" aria-hidden="true" />}

                {showTools && (
                    <div>
                        <h3 className="font-serif text-lg text-heading">{toolsLabel}</h3>
                        <div className="mt-6 grid grid-cols-3 gap-6 sm:grid-cols-5">
                            {tools.map((tool, index) => {
                                const Icon = (tool.icon && ICONS[tool.icon]) || Droplet;
                                const label = tr(tool.label, locale);

                                return (
                                    <div key={index} className="flex flex-col items-center text-center">
                                        <Icon className="h-12 w-12 text-subheading" strokeWidth={1.25} aria-hidden="true" />
                                        {label && (
                                            <div
                                                className="rich-content mt-3 text-xs leading-snug text-heading"
                                                dangerouslySetInnerHTML={{ __html: label }}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
