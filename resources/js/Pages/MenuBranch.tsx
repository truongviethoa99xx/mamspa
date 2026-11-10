import { Head, usePage } from '@inertiajs/react';
import { FileText } from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Breadcrumb, type BreadcrumbItem } from '@/Components/Breadcrumb';
import { MenuContact, type MenuContactData } from '@/Components/Menu/MenuContact';
import { useLocale } from '@/Hooks/useLocale';
import { stripTags, tr, truncate } from '@/Lib/utils';
import { PDF_LOCALE_LABELS, PDF_LOCALE_ORDER, pickDefaultPdf, type MenuBranchPdfs } from '@/Lib/menuPdf';
import type { SharedProps } from '@/types';

interface BranchData {
    slug: string;
    url: string;
    image?: string | null;
    image_alt?: unknown;
    name?: unknown;
    street?: unknown;
    desc?: unknown;
    pdfs?: MenuBranchPdfs;
}

interface Props {
    branch: BranchData;
    contact: MenuContactData;
    sectionVisibility: {
        contact: boolean;
    };
}

const HOME_CRUMB: BreadcrumbItem = { name: 'Trang chủ', url: '/' };
const MENU_CRUMB: BreadcrumbItem = { name: 'Menu', url: '/menu/' };

export default function MenuBranch({ branch, contact, sectionVisibility }: Props) {
    const { props } = usePage<SharedProps>();
    const locale = useLocale();

    const name = tr(branch.name, locale);
    const street = tr(branch.street, locale);
    const desc = tr(branch.desc, locale);
    const imageAlt = tr(branch.image_alt, locale) || name;
    const pdfs = branch.pdfs ?? {};
    const availableLocales = PDF_LOCALE_ORDER.filter((code) => pdfs[code]);
    const defaultPdf = pickDefaultPdf(pdfs, locale);

    const title = name || 'Menu';
    const description = truncate(props.site?.meta_description || stripTags(desc) || '', 160);

    return (
        <PublicLayout mainClassName="bg-[#f5f2ed]">
            <Head title={title}>{description && <meta name="description" content={description} />}</Head>

            <header className="px-5 pb-8 pt-28 sm:px-10 sm:pt-32 lg:px-16 lg:pt-36">
                <div className="mx-auto max-w-5xl">
                    <Breadcrumb items={[HOME_CRUMB, MENU_CRUMB, { name: title }]} className="mb-8" />
                    {name && (
                        <h1 className="font-serif text-3xl uppercase tracking-[0.1em] text-heading sm:text-4xl">
                            {name}
                        </h1>
                    )}
                    {street && <p className="mt-2 text-sm tracking-[0.15em] text-ink/50">{street}</p>}
                </div>
            </header>

            <article className="px-5 pb-16 sm:px-10 lg:px-16">
                <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:items-start">
                    {branch.image && (
                        <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-maha-200">
                            <img src={branch.image} alt={imageAlt} className="h-full w-full object-cover" />
                        </div>
                    )}

                    <div className={branch.image ? '' : 'md:col-span-2'}>
                        {desc && (
                            <div
                                className="rich-content text-sm leading-relaxed text-ink/70"
                                dangerouslySetInnerHTML={{ __html: desc }}
                            />
                        )}

                        {defaultPdf && (
                            <a
                                href={defaultPdf}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-8 inline-flex items-center gap-3 rounded border border-maha-300 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-heading transition-colors hover:border-subheading hover:bg-maha-100"
                            >
                                <FileText className="h-4 w-4" strokeWidth={1.5} />
                                <span>Xem Menu</span>
                            </a>
                        )}

                        {availableLocales.length > 1 && (
                            <div className="mt-4 flex flex-wrap items-center gap-2">
                                {availableLocales.map((code) => (
                                    <a
                                        key={code}
                                        href={pdfs[code] ?? undefined}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-full border border-maha-200 px-3 py-1 text-[11px] font-medium text-ink/60 transition-colors hover:border-subheading hover:text-subheading"
                                    >
                                        {PDF_LOCALE_LABELS[code] ?? code.toUpperCase()}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </article>

            {sectionVisibility.contact && <MenuContact data={contact} />}
        </PublicLayout>
    );
}
