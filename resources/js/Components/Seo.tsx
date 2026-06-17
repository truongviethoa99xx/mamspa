import { Head } from '@inertiajs/react'

interface SeoProps {
  title: string
  description?: string
  image?: string
  type?: 'website' | 'article'
  schema?: object | object[]
  noIndex?: boolean
}

export function Seo({ title, description, image, type = 'website', schema, noIndex }: SeoProps) {
  const fullTitle = title.includes('Mầm Spa') ? title : `${title} | Mầm Spa`

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

      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(schema) ? schema : schema)}
        </script>
      )}
    </Head>
  )
}
