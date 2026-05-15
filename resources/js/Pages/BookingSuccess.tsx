import { Head, Link } from '@inertiajs/react';
import { CheckCircle2 } from 'lucide-react';
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
    return (
        <PublicLayout>
            <Head title={`Booking #${booking.code}`} />
            <section className="py-16">
                <div className="mx-auto max-w-xl rounded-xl border border-maha-100 bg-white p-8 text-center shadow">
                    <CheckCircle2 className="mx-auto h-14 w-14 text-green-500" />
                    <h1 className="mt-4 font-serif text-3xl text-maha-700">Đặt lịch thành công!</h1>
                    <p className="mt-2 text-gray-600">Mã booking: <span className="font-bold">{booking.code}</span></p>
                    <p className="text-sm text-gray-500">Chúng tôi đã gửi email xác nhận cho bạn.</p>

                    <dl className="mt-6 grid gap-2 rounded-lg bg-maha-50 p-4 text-left text-sm">
                        <div className="flex justify-between"><dt>Khách</dt><dd>{booking.guest_name}</dd></div>
                        <div className="flex justify-between"><dt>Chi nhánh</dt><dd>{tr(booking.branch.name, locale)}</dd></div>
                        <div className="flex justify-between"><dt>Dịch vụ</dt><dd>{tr(booking.service.name, locale)}</dd></div>
                        <div className="flex justify-between"><dt>Ngày & giờ</dt><dd>{booking.date} · {booking.time_slot}</dd></div>
                        <div className="flex justify-between border-t pt-2 font-semibold">
                            <dt>Tổng</dt><dd className="text-maha-700">{formatVND(booking.total_price)}</dd>
                        </div>
                    </dl>

                    <Link href="/" className="mt-6 inline-block text-sm text-maha-700 underline">Về trang chủ</Link>
                </div>
            </section>
        </PublicLayout>
    );
}
