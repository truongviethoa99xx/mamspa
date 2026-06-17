import { Link } from '@inertiajs/react'
import { Clock, Tag } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import PublicLayout from '@/Layouts/PublicLayout'
import { Seo } from '@/Components/Seo'
import { useLocale } from '@/Hooks/useLocale'
import { formatVND, tr } from '@/Lib/utils'
import { serviceSchema, breadcrumbSchema } from '@/Lib/buildSchema'

interface Props {
    service: {
        id: number
        slug: string
        name: string | Record<string, string>
        description: string | Record<string, string>
        category: string
        duration: number
        price: number
        ingredients: string[]
        branches: { slug: string; name: string | Record<string, string> }[]
    }
}

export default function ServiceShow({ service }: Props) {
    const locale = useLocale()
    const { t } = useTranslation()
    const name = tr(service.name, locale)
    const description = tr(service.description, locale)
    const url = window.location.href

    const schema = [
        serviceSchema({ name, description, url, price: service.price, duration: service.duration, category: service.category }),
        breadcrumbSchema([
            { name: 'Mầm Spa', url: window.location.origin },
            { name: t('nav.services'), url: window.location.origin + '/services' },
            { name, url },
        ]),
    ]

    return (
        <PublicLayout>
            <Seo title={name} description={description} schema={schema} />
            <section className="bg-maha-50 py-12">
                <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2">
                    <div className="aspect-[4/3] rounded-xl bg-maha-200" />
                    <div>
                        <p className="text-sm uppercase tracking-wider text-maha-600">{service.category}</p>
                        <h1 className="mt-2 font-serif text-4xl text-maha-700">{name}</h1>
                        <p className="mt-4 text-gray-700">{description}</p>
                        <div className="mt-6 flex gap-6 text-sm text-gray-600">
                            <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {service.duration} {t('common.minute')}</span>
                            <span className="flex items-center gap-1"><Tag className="h-4 w-4" /> {formatVND(service.price)}</span>
                        </div>
                        {service.ingredients.length > 0 && (
                            <div className="mt-6">
                                <h3 className="text-sm font-semibold text-maha-700">{t('services.ingredients')}</h3>
                                <ul className="mt-2 flex flex-wrap gap-2">
                                    {service.ingredients.map((i, idx) => (
                                        <li key={idx} className="rounded-full bg-white px-3 py-1 text-xs text-maha-700">{i}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <Link href={`/dat-lich?service=${service.slug}`}
                            className="mt-8 inline-block rounded-full bg-maha-700 px-8 py-3 font-semibold text-white hover:bg-maha-800">
                            {t('common.bookNow')}
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    )
}
