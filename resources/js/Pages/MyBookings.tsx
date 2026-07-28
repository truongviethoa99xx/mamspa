import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { CalendarDays, Clock, Search } from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import { formatVND } from '@/Lib/utils';
import type { SharedProps } from '@/types';

interface BookingListItem {
    id: number;
    code: string;
    date: string;
    time_slot: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    total_price: number;
    payment_status: string;
    service: { slug: string; name: string; duration: number };
}

interface Props {
    bookings: BookingListItem[];
}

const STATUS_STYLES: Record<BookingListItem['status'], string> = {
    pending: 'bg-amber-100 text-amber-700',
    confirmed: 'bg-emerald-100 text-emerald-700',
    completed: 'bg-emerald-100 text-emerald-700',
    cancelled: 'bg-red-100 text-red-700',
};

function formatBookingDate(iso: string): string {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return iso;

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}/${date.getFullYear()}`;
}

export default function MyBookings({ bookings }: Props) {
    const { t } = useTranslation();
    const { props } = usePage<SharedProps>();
    const flash = props.flash;

    const lookupForm = useForm({ phone: '', code: '' });

    const submitLookup = (event: FormEvent) => {
        event.preventDefault();
        lookupForm.post('/my-bookings/lookup', { preserveScroll: true });
    };

    const cancelBooking = (booking: BookingListItem) => {
        if (!window.confirm(t('myBookings.confirmCancel', { code: booking.code }))) return;
        router.post(`/my-bookings/${booking.id}/cancel`, {}, { preserveScroll: true });
    };

    return (
        <PublicLayout mainClassName="bg-maha-50">
            <Head title={t('nav.myBookings')} />

            <div className="mx-auto max-w-4xl px-4 pb-16 pt-10 md:pt-14">
                <h1 className="font-serif text-3xl text-heading md:text-4xl">{t('nav.myBookings')}</h1>

                {flash.success && (
                    <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                        {flash.success}
                    </div>
                )}
                {flash.error && (
                    <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{flash.error}</div>
                )}

                <div className="mt-8 space-y-4">
                    {bookings.length === 0 && (
                        <div className="rounded-2xl border border-maha-200 bg-white px-6 py-10 text-center">
                            <p className="text-ink/70">{t('myBookings.empty')}</p>
                            <Link
                                href="/dat-lich"
                                className="mt-4 inline-block rounded-lg bg-maha-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-maha-700"
                            >
                                {t('myBookings.bookOne')}
                            </Link>
                        </div>
                    )}

                    {bookings.map((booking) => (
                        <div key={booking.id} className="rounded-2xl border border-maha-200 bg-white p-5 shadow-sm md:p-6">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-maha-500">{booking.code}</p>
                                    <p className="mt-1 text-lg font-semibold text-ink">{booking.service.name}</p>
                                    <p className="text-sm text-ink/60">{booking.service.duration} phút</p>
                                </div>
                                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[booking.status]}`}>
                                    {t(`myBookings.status.${booking.status}`)}
                                </span>
                            </div>

                            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-ink/70">
                                <span className="flex items-center gap-1.5">
                                    <CalendarDays className="h-4 w-4 text-maha-500" />
                                    {formatBookingDate(booking.date)}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Clock className="h-4 w-4 text-maha-500" />
                                    {booking.time_slot}
                                </span>
                                <span className="font-semibold text-ink">{formatVND(booking.total_price)}</span>
                            </div>

                            {(booking.status === 'pending' || booking.status === 'confirmed') && (
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {booking.payment_status === 'unpaid' && (
                                        <a
                                            href={`/payment/vnpay/${booking.id}`}
                                            className="rounded-lg bg-maha-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-maha-700"
                                        >
                                            {t('myBookings.payVnpay')}
                                        </a>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => cancelBooking(booking)}
                                        className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
                                    >
                                        {t('myBookings.cancelBooking')}
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-10 rounded-2xl border border-maha-200 bg-white p-6">
                    <h2 className="flex items-center gap-2 text-lg font-semibold text-heading">
                        <Search className="h-5 w-5 text-maha-500" />
                        {t('myBookings.lookupTitle')}
                    </h2>
                    <p className="mt-1 text-sm text-ink/60">{t('myBookings.lookupDesc')}</p>

                    <form onSubmit={submitLookup} className="mt-4 flex flex-col gap-3 sm:flex-row">
                        <input
                            value={lookupForm.data.phone}
                            onChange={(e) => lookupForm.setData('phone', e.target.value)}
                            placeholder={t('myBookings.lookupPhonePlaceholder')}
                            className="input-base flex-1"
                        />
                        <input
                            value={lookupForm.data.code}
                            onChange={(e) => lookupForm.setData('code', e.target.value)}
                            placeholder={t('myBookings.lookupCodePlaceholder')}
                            className="input-base flex-1"
                        />
                        <button
                            type="submit"
                            disabled={lookupForm.processing}
                            className="rounded-lg bg-maha-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-maha-700 disabled:opacity-60"
                        >
                            {t('myBookings.lookupButton')}
                        </button>
                    </form>
                </div>
            </div>
        </PublicLayout>
    );
}
