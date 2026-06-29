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
      name: 'Mầm Spa',
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
      // ISO 8601 duration — how long the service takes.
      timeRequired: `PT${params.duration}M`,
    }),
    ...(params.image && { image: params.image }),
  }
}

export interface FaqItem {
  question: string
  answer: string
}

export function faqSchema(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}

export function blogPostSchema(params: {
  title: string
  description: string
  url: string
  image?: string | null
  publishedAt?: string | null
  modifiedAt?: string | null
  author?: string | null
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: params.title,
    description: params.description,
    url: params.url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': params.url },
    publisher: {
      '@type': 'Organization',
      name: 'Mầm Spa',
      logo: { '@type': 'ImageObject', url: window.location.origin + '/images/logo.svg' },
    },
    ...(params.author && { author: { '@type': 'Person', name: params.author } }),
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
  id?: string | null
}) {
  return {
    '@context': 'https://schema.org',
    '@type': ['HealthAndBeautyBusiness', 'DaySpa'],
    // Reuse the global @graph node id (#heritage / #signature) so Google
    // consolidates this page's entity with the site-wide Organization graph.
    ...(params.id && { '@id': window.location.origin + '/#' + params.id }),
    name: params.name,
    image: window.location.origin + '/images/banner.png',
    sameAs: [
      'https://www.facebook.com/mahaSpa.danang',
      'https://www.instagram.com/mahaspa.danang',
    ],
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
