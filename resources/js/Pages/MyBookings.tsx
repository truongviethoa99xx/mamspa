import { Head, Link, router, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import PublicLayout from '@/Layouts/PublicLayout';
import { useLocale } from '@/Hooks/useLocale';
import { formatVND, tr } from '@/Lib/utils';
import type { SharedProps } from '@/types';

interface Booking {
    id: number;
    code: string;
    date: string;
    time_slot: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    payment_status: 'unpaid' | 'paid' | 'refunded';
    total_price: number;
    branch: { slug: string; name: any };
    service: { slug: string; name: any; duration: number };
}

const STATUS_LABEL: Record<string, string> = {
    pending: 'Chờ xác nhận', confirmed: 'Đã xác nhận',
    completed: 'Hoàn thành', cancelled: 'Đã huỷ',
};
const STATUS_COLOR: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    confirmed: 'bg-green-100 text-green-700',
    completed: 'bg-blue-100 text-blue-700',
    cancelled: 'bg-red-100 text-red-700',
};

export default function MyBookings({ bookings }: { bookings: Booking[] }) {
    const locale = useLocale();
    const { t } = useTranslation();
    const { props } = usePage<SharedProps>();

    const cancel = (b: Booking) => {
        if (!confirm(`Huỷ booking ${b.code}?`)) return;
        router.post(`/my-bookings/${b.id}/cancel`);
    };

    return (
        <PublicLayout>
            <Head title={t('nav.myBookings')} />
            <section className="bg-maha-50 py-12">
                <div className="mx-auto max-w-5xl px-4">
                    <h1 className="font-serif text-4xl text-maha-700">{t('nav.myBookings')}</h1>
                </div>
            </section>
            <section className="py-12">
                <div className="mx-auto max-w-5xl px-4">
                    {props.flash?.success && <p className="mb-4 rounded bg-green-50 p-3 text-sm text-green-700">{props.flash.success}</p>}
                    {props.flash?.error && <p className="mb-4 rounded bg-red-50 p-3 text-sm text-red-700">{props.flash.error}</p>}
                    {bookings.length === 0 && (
                        <div className="rounded-xl border border-maha-100 bg-white p-10 text-center text-gray-500">
                            Bạn chưa có booking nào.
                            <Link href="/booking" className="mt-3 block text-maha-700 underline">Đặt lịch ngay</Link>
                        </div>
                    )}
                    <ul className="space-y-3">
                        {bookings.map((b) => (
                            <li key={b.id} className="rounded-xl border border-maha-100 bg-white p-5">
                                <div className="flex flex-wrap items-start justify-between gap-3">
                                    <div>
                                        <p className="text-xs uppercase text-gray-500">{b.code}</p>
                                        <h3 className="font-serif text-xl text-maha-700">{tr(b.service.name, locale)}</h3>
                                        <p className="text-sm text-gray-600">
                                            {b.date} · {b.time_slot} · {b.service.duration} min · {tr(b.branch.name, locale)}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`rounded-full px-3 py-1 text-xs ${STATUS_COLOR[b.status]}`}>
                                            {STATUS_LABEL[b.status]}
                                        </span>
                                        <p className="mt-2 font-semibold text-maha-700">{formatVND(b.total_price)}</p>
                                    </div>
                                </div>
                                <div className="mt-3 flex flex-wrap gap-2 text-sm">
                                    {b.payment_status === 'unpaid' && b.status !== 'cancelled' && (
                                        <Link href={`/payment/vnpay/${b.id}`}
                                            className="rounded-full bg-maha-700 px-4 py-1 text-white">
                                            Thanh toán VNPay
                                        </Link>
                                    )}
                                    {['pending', 'confirmed'].includes(b.status) && (
                                        <button onClick={() => cancel(b)}
                                            className="rounded-full border border-red-300 px-4 py-1 text-red-600">
                                            {t('common.cancel')}
                                        </button>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </PublicLayout>
    );
}
