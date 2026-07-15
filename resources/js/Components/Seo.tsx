import { Head, usePage } from '@inertiajs/react'
import type { SharedProps } from '@/types'

interface SeoProps {
  title: string
  description?: string
  image?: string
  type?: 'website' | 'article'
  schema?: object | object[]
  noIndex?: boolean
}

const DEFAULT_BRAND_NAME = 'Mầm Spa'

export function Seo({ title, description, image, type = 'website', schema, noIndex }: SeoProps) {
  const { props } = usePage<SharedProps>()
  const brandName = props.site?.brand_name || DEFAULT_BRAND_NAME
  const brandSuffix = ` | ${brandName}`
  const fullTitle = title.endsWith(brandSuffix) ? title : `${title}${brandSuffix}`
  const metaDescription = description || props.site?.meta_description || undefined
  const schemas = schema ? (Array.isArray(schema) ? schema : [schema]) : []

  return (
    <Head title={fullTitle}>
      {metaDescription && <meta name="description" content={metaDescription} />}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:title" content={fullTitle} />
      {metaDescription && <meta property="og:description" content={metaDescription} />}
      {image && <meta property="og:image" content={image} />}
      <meta property="og:type" content={type} />

      <meta name="twitter:title" content={fullTitle} />
      {metaDescription && <meta name="twitter:description" content={metaDescription} />}
      {image && <meta name="twitter:image" content={image} />}

      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Head>
  )
}
