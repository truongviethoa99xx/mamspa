export interface BreadcrumbItem { name: string; url: string }

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function serviceSchema(params: {
  name: string
  description: string
  url: string
  price: number
  duration: number
  category: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: params.name,
    description: params.description,
    url: params.url,
    provider: {
      '@type': 'DaySpa',
      name: 'Maha Spa',
      url: window.location.origin,
    },
    serviceType: params.category,
    offers: {
      '@type': 'Offer',
      price: params.price,
      priceCurrency: 'VND',
      availability: 'https://schema.org/InStock',
      url: params.url,
    },
    ...(params.duration && {
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        duration: `PT${params.duration}M`,
      },
    }),
    ...(params.image && { image: params.image }),
  }
}

export function blogPostSchema(params: {
  title: string
  description: string
  url: string
  image?: string | null
  publishedAt?: string | null
  modifiedAt?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: params.title,
    description: params.description,
    url: params.url,
    publisher: {
      '@type': 'Organization',
      name: 'Maha Spa',
      logo: { '@type': 'ImageObject', url: window.location.origin + '/images/logo.png' },
    },
    ...(params.image && { image: params.image }),
    ...(params.publishedAt && { datePublished: params.publishedAt }),
    ...(params.modifiedAt && { dateModified: params.modifiedAt }),
  }
}

export function localBusinessSchema(params: {
  name: string
  address: string
  phone: string
  url: string
  lat?: number | null
  lng?: number | null
}) {
  return {
    '@context': 'https://schema.org',
    '@type': ['HealthAndBeautyBusiness', 'DaySpa'],
    name: params.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: params.address,
      addressLocality: 'Đà Nẵng',
      addressCountry: 'VN',
    },
    telephone: params.phone,
    url: params.url,
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
      opens: '09:00',
      closes: '21:00',
    }],
    ...(params.lat && params.lng && {
      geo: { '@type': 'GeoCoordinates', latitude: params.lat, longitude: params.lng },
    }),
    priceRange: '$$',
  }
}

export function itemListSchema(items: { name: string; url: string; image?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: item.url,
      ...(item.image && { image: item.image }),
    })),
  }
}

export function jsonLdScript(schema: object | object[]): string {
  return JSON.stringify(schema)
}
