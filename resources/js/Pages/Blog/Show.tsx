import { Link } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { ChevronRight } from 'lucide-react'
import PublicLayout from '@/Layouts/PublicLayout'
import { Seo } from '@/Components/Seo'
import { useLocale } from '@/Hooks/useLocale'
import { tr } from '@/Lib/utils'
import { blogPostSchema, breadcrumbSchema } from '@/Lib/buildSchema'

interface RelatedPost {
    id: number
    slug: string
    title: Record<string, string> | string
    cover_image: string | null
    published_at: string | null
}

interface Props {
    post: {
        slug: string
        category: string | null
        title: Record<string, string> | string
        excerpt: Record<string, string> | string
        body: Record<string, string> | string
        cover_image: string | null
        seo_meta: { description?: string } | null
        author: string | null
        published_at: string | null
        updated_at: string | null
    }
    related: RelatedPost[]
}

const DATE_LOCALES: Record<string, string> = {
    en: 'en-US',
    ja: 'ja-JP',
    ko: 'ko-KR',
    zh: 'zh-CN',
    vi: 'vi-VN',
}

function formatDate(value: string | null, locale: string): string | null {
    if (!value) return null
    return new Date(value).toLocaleDateString(DATE_LOCALES[locale] ?? 'vi-VN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })
}

function readingMinutes(html: string, locale: string): number {
    const plain = html.replace(/<[^>]+>/g, ' ')
    const isCjk = ['ja', 'zh', 'ko'].includes(locale)
    const count = isCjk ? plain.replace(/\s/g, '').length : plain.trim().split(/\s+/).filter(Boolean).length
    return Math.max(1, Math.round(count / (isCjk ? 400 : 200)))
}

const BODY_CLASS = [
    'max-w-none text-ink/75',
    '[&_p]:mt-5 [&_p]:leading-[1.85]',
    '[&_h2]:mt-12 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:leading-snug [&_h2]:text-heading md:[&_h2]:text-3xl',
    '[&_h3]:mt-9 [&_h3]:font-serif [&_h3]:text-xl [&_h3]:text-heading',
    '[&_a]:text-[#6b7a4f] [&_a]:underline [&_a]:underline-offset-2',
    '[&_strong]:text-ink [&_strong]:font-semibold',
    '[&_ul]:mt-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6',
    '[&_ol]:mt-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6',
    '[&_img]:mt-8 [&_img]:w-full [&_img]:rounded-2xl',
    '[&_figure]:mt-8 [&_figure>img]:mt-0',
    '[&_figcaption]:mt-3 [&_figcaption]:text-center [&_figcaption]:font-serif [&_figcaption]:text-sm [&_figcaption]:italic [&_figcaption]:text-maha-600',
    '[&_blockquote]:my-8 [&_blockquote]:border-l-4 [&_blockquote]:border-[#6b7a4f] [&_blockquote]:pl-6 [&_blockquote]:font-serif [&_blockquote]:text-xl [&_blockquote]:italic [&_blockquote]:leading-relaxed [&_blockquote]:text-heading',
].join(' ')

export default function BlogShow({ post, related }: Props) {
    const locale = useLocale()
    const { t } = useTranslation()

    const title = tr(post.title, locale)
    const bodyHtml = tr(post.body, locale)
    const description = post.seo_meta?.description || tr(post.excerpt, locale)
    const url = window.location.href
    const date = formatDate(post.published_at, locale)
    const author = post.author || t('blog.author')
    const minutes = readingMinutes(bodyHtml, locale)

    const schema = [
        blogPostSchema({
            title,
            description,
            url,
            image: post.cover_image,
            publishedAt: post.published_at,
            modifiedAt: post.updated_at,
            author,
        }),
        breadcrumbSchema([
            { name: 'Mầm Spa', url: window.location.origin },
            { name: t('nav.blog'), url: window.location.origin + '/tin-tuc' },
            { name: title, url },
        ]),
    ]

    return (
        <PublicLayout>
            <Seo title={title} description={description} image={post.cover_image ?? undefined} type="article" schema={schema} />

            <div className="bg-maha-50">
                <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
                    {/* Breadcrumb */}
                    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-maha-600">
                        <Link href="/" className="transition-colors hover:text-[#6b7a4f]">
                            {t('nav.home')}
                        </Link>
                        <span className="text-maha-300">/</span>
                        <Link href="/tin-tuc" className="transition-colors hover:text-[#6b7a4f]">
                            {t('nav.blog')}
                        </Link>
                        <span className="text-maha-300">/</span>
                        <span className="truncate text-ink/50">{title}</span>
                    </nav>

                    {/* Title + meta */}
                    <header className="mt-7 max-w-3xl">
                        {post.category && (
                            <span className="mb-4 inline-block rounded-full bg-maha-100 px-3 py-1 text-xs font-semibold text-[#6b7a4f]">
                                {post.category}
                            </span>
                        )}
                        <h1 className="font-serif text-4xl leading-[1.1] text-heading md:text-5xl">{title}</h1>
                        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-ink/60">
                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-maha-200 font-serif text-sm text-maha-700">
                                {author.charAt(0)}
                            </span>
                            <span className="font-semibold text-ink/80">{author}</span>
                            {date && (
                                <>
                                    <span className="text-maha-300">•</span>
                                    <span>{date}</span>
                                </>
                            )}
                            <span className="text-maha-300">•</span>
                            <span>{t('blog.minRead', { count: minutes })}</span>
                        </div>
                    </header>

                    {/* Hero image */}
                    <div className="mt-8 aspect-[16/9] w-full overflow-hidden rounded-3xl bg-maha-200">
                        {post.cover_image && (
                            <img src={post.cover_image} alt={title} className="h-full w-full object-cover" />
                        )}
                    </div>

                    {/* Body + sidebar */}
                    <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
                        <article
                            className={BODY_CLASS}
                            dangerouslySetInnerHTML={{ __html: bodyHtml }}
                        />

                        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
                            {related.length > 0 && (
                                <section className="rounded-3xl border border-maha-100 bg-white p-7 shadow-sm">
                                    <h2 className="font-serif text-xl text-heading">{t('blog.related')}</h2>
                                    <ul className="mt-5 space-y-5">
                                        {related.map((p) => (
                                            <li key={p.id}>
                                                <Link href={`/tin-tuc/${p.slug}`} className="group flex gap-4">
                                                    <span className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-maha-200">
                                                        {p.cover_image && (
                                                            <img
                                                                src={p.cover_image}
                                                                alt=""
                                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                            />
                                                        )}
                                                    </span>
                                                    <span className="min-w-0">
                                                        <span className="line-clamp-2 font-serif text-[15px] leading-snug text-heading transition-colors group-hover:text-[#6b7a4f]">
                                                            {tr(p.title, locale)}
                                                        </span>
                                                        {p.published_at && (
                                                            <span className="mt-1 block text-xs text-maha-600">
                                                                {formatDate(p.published_at, locale)}
                                                            </span>
                                                        )}
                                                    </span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}

                            {/* Service CTA */}
                            <section className="overflow-hidden rounded-3xl bg-ink shadow-lg">
                                <div className="aspect-[4/3] w-full bg-maha-200" />
                                <div className="px-7 py-8 text-center">
                                    <p className="font-serif text-sm italic text-[#9aa97a]">{t('blog.ctaEyebrow')}</p>
                                    <h3 className="mt-1 font-serif text-2xl tracking-wide text-maha-50">
                                        {t('blog.ctaTitle')}
                                    </h3>
                                    <p className="mt-3 text-sm leading-relaxed text-maha-100/70">{t('blog.ctaDesc')}</p>
                                    <Link
                                        href="/dich-vu?category=head-spa"
                                        className="mt-6 inline-flex items-center gap-2 rounded-full bg-maha-50 px-7 py-3 text-sm font-semibold tracking-wide text-ink transition-colors hover:bg-white"
                                    >
                                        {t('blog.ctaButton')}
                                        <ChevronRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </section>
                        </aside>
                    </div>
                </div>
            </div>
        </PublicLayout>
    )
}
