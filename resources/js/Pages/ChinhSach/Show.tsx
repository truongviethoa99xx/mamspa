import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Breadcrumb, type BreadcrumbItem } from '@/Components/Breadcrumb';
import { formatDate } from '@/Lib/utils';

interface PolicyPageData {
    slug: string;
    name: string;
    content: string | null;
    featured_image: string | null;
    updated_at: string | null;
}

interface OtherPage {
    slug: string;
    name: string;
}

interface Props {
    page: PolicyPageData;
    other: OtherPage[];
}

const HOME_CRUMB: BreadcrumbItem = { name: 'Trang chủ', url: '/' };

export default function ChinhSachShow({ page, other }: Props) {
    const title = page.name;

    return (
        <PublicLayout minimalHeader>
            <Head title={title} />

            <header className="px-5 pb-8 pt-28 sm:px-10 sm:pt-32 lg:px-16 lg:pt-36">
                <div className="mx-auto max-w-5xl">
                    <Breadcrumb items={[HOME_CRUMB, { name: title }]} className="mb-8" />
                    <p className="font-serif text-base italic text-subheading">Chính sách</p>
                    <h1 className="mt-1 font-serif text-3xl leading-snug tracking-wide text-heading sm:text-4xl lg:text-5xl">
                        {page.name}
                    </h1>
                    {page.updated_at && (
                        <p className="mt-4 text-sm text-ink/50">Cập nhật lần cuối: {formatDate(page.updated_at)}</p>
                    )}
                </div>
            </header>

            {page.featured_image && (
                <div className="px-5 sm:px-10 lg:px-16">
                    <div className="mx-auto aspect-[16/9] w-full max-w-5xl overflow-hidden rounded-3xl bg-maha-200">
                        <img src={page.featured_image} alt={title} className="h-full w-full object-cover" />
                    </div>
                </div>
            )}

            <article className="px-5 py-12 sm:px-10 sm:py-14 lg:px-16">
                <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[5fr_2fr] lg:gap-16">
                    <div className="min-w-0">
                        {page.content && <div className="blog-article" dangerouslySetInnerHTML={{ __html: page.content }} />}
                    </div>

                    {other.length > 0 && (
                        <aside className="lg:sticky lg:top-28 lg:self-start">
                            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-maha-500">Xem thêm</p>
                            <ul className="mt-4 space-y-3 border-t border-maha-200 pt-4">
                                {other.map((item) => (
                                    <li key={item.slug}>
                                        <Link
                                            href={`/${item.slug}/`}
                                            className="text-sm text-ink/70 underline-offset-4 transition-colors hover:text-maha-800 hover:underline"
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </aside>
                    )}
                </div>
            </article>
        </PublicLayout>
    );
}
