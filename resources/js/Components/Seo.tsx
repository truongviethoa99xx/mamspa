import { Head } from '@inertiajs/react'

interface SeoProps {
  title: string
  description?: string
  image?: string
  type?: 'website' | 'article'
  schema?: object | object[]
  noIndex?: boolean
}

const BRAND_SUFFIX = ' | Mầm Spa'

export function Seo({ title, description, image, type = 'website', schema, noIndex }: SeoProps) {
  const fullTitle = title.endsWith(BRAND_SUFFIX) ? title : `${title}${BRAND_SUFFIX}`
  const schemas = schema ? (Array.isArray(schema) ? schema : [schema]) : []

  return (
    <Head title={fullTitle}>
      {description && <meta name="description" content={description} />}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      {image && <meta property="og:image" content={image} />}
      <meta property="og:type" content={type} />

      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      {image && <meta name="twitter:image" content={image} />}

      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Head>
  )
}
