import PublicLayout from '@/Layouts/PublicLayout'
import { Seo } from '@/Components/Seo'
import { useLocale } from '@/Hooks/useLocale'
import { tr } from '@/Lib/utils'
import { blogPostSchema, breadcrumbSchema } from '@/Lib/buildSchema'
import { useTranslation } from 'react-i18next'

interface Props {
    post: {
        slug: string; title: any; excerpt: any; body: any
        cover_image: string | null
        seo_meta: { description?: string } | null
        published_at: string | null
    }
}

export default function BlogShow({ post }: Props) {
    const locale = useLocale()
    const { t } = useTranslation()
    const title = tr(post.title, locale)
    const description = post.seo_meta?.description || tr(post.excerpt, locale)
    const url = window.location.href

    const schema = [
        blogPostSchema({ title, description, url, image: post.cover_image, publishedAt: post.published_at }),
        breadcrumbSchema([
            { name: 'Maha Spa', url: window.location.origin },
            { name: t('nav.blog'), url: window.location.origin + '/blog' },
            { name: title, url },
        ]),
    ]

    return (
        <PublicLayout>
            <Seo title={title} description={description} image={post.cover_image ?? undefined} type="article" schema={schema} />
            <article className="mx-auto max-w-3xl px-4 py-12">
                {post.published_at && (
                    <p className="text-xs uppercase tracking-wider text-maha-600">
                        {new Date(post.published_at).toLocaleDateString(
                            locale === 'vi' ? 'vi-VN' : locale === 'ja' ? 'ja-JP' : locale === 'ko' ? 'ko-KR' : locale === 'zh' ? 'zh-CN' : 'en-US'
                        )}
                    </p>
                )}
                <h1 className="mt-2 font-serif text-4xl text-maha-700">{title}</h1>
                {post.cover_image && <img src={post.cover_image} alt={title} className="mt-6 w-full rounded-xl" />}
                <div className="prose prose-stone mt-8" dangerouslySetInnerHTML={{ __html: tr(post.body, locale) }} />
            </article>
        </PublicLayout>
    )
}
