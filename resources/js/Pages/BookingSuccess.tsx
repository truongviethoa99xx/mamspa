import { Head, Link } from '@inertiajs/react';
import { CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PublicLayout from '@/Layouts/PublicLayout';
import { useLocale } from '@/Hooks/useLocale';
import { formatVND, tr } from '@/Lib/utils';

interface Props {
    booking: {
        code: string;
        guest_name: string;
        date: string;
        time_slot: string;
        branch: { name: any; address: string };
        service: { name: any; duration: number };
        total_price: number;
        status: string;
    };
}

export default function BookingSuccess({ booking }: Props) {
    const locale = useLocale();
    const { t } = useTranslation();
    return (
        <PublicLayout>
            <Head title={`Booking #${booking.code}`} />
            <section className="py-16">
                <div className="mx-auto max-w-xl rounded-xl border border-maha-100 bg-white p-8 text-center shadow">
                    <CheckCircle2 className="mx-auto h-14 w-14 text-green-500" />
                    <h1 className="mt-4 font-serif text-3xl text-maha-700">{t('bookingSuccess.title')}</h1>
                    <p className="mt-2 text-gray-600">
                        {t('bookingSuccess.code')}: <span className="font-bold">{booking.code}</span>
                    </p>
                    <p className="text-sm text-gray-500">{t('bookingSuccess.emailSent')}</p>

                    <dl className="mt-6 grid gap-2 rounded-lg bg-maha-50 p-4 text-left text-sm">
                        <div className="flex justify-between"><dt>{t('booking.summary.guest')}</dt><dd>{booking.guest_name}</dd></div>
                        <div className="flex justify-between"><dt>{t('booking.summary.branch')}</dt><dd>{tr(booking.branch.name, locale)}</dd></div>
                        <div className="flex justify-between"><dt>{t('booking.summary.service')}</dt><dd>{tr(booking.service.name, locale)}</dd></div>
                        <div className="flex justify-between">
                            <dt>{t('booking.summary.date')} & {t('booking.summary.time')}</dt>
                            <dd>{booking.date} · {booking.time_slot}</dd>
                        </div>
                        <div className="flex justify-between border-t pt-2 font-semibold">
                            <dt>{t('booking.summary.total')}</dt>
                            <dd className="text-maha-700">{formatVND(booking.total_price)}</dd>
                        </div>
                    </dl>

                    <Link href="/" className="mt-6 inline-block text-sm text-maha-700 underline">
                        {t('bookingSuccess.backHome')}
                    </Link>
                </div>
            </section>
        </PublicLayout>
    );
}
