import { Head, router } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PublicLayout from '@/Layouts/PublicLayout';
import { useLocale } from '@/Hooks/useLocale';
import { formatVND, tr } from '@/Lib/utils';

interface Branch { id: number; slug: string; name: any; address: string; phone: string; }
interface Service { id: number; slug: string; name: any; category: string; duration: number; price: number; branch_ids: number[]; }
interface SlotOption { start: string; end: string; capacity: number; available: number; }

interface Props {
    preselect: { service?: string | null; branch?: string | null };
    branches: Branch[];
    services: Service[];
}

export default function Booking({ preselect, branches, services }: Props) {
    const { t } = useTranslation();
    const locale = useLocale();

    const [step, setStep] = useState(1);
    const [branchId, setBranchId] = useState<number | null>(null);
    const [serviceId, setServiceId] = useState<number | null>(null);
    const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
    const [slots, setSlots] = useState<SlotOption[]>([]);
    const [timeSlot, setTimeSlot] = useState<string>('');
    const [guest, setGuest] = useState({ name: '', phone: '', email: '', note: '' });
    const [voucherCode, setVoucherCode] = useState('');
    const [voucherDiscount, setVoucherDiscount] = useState(0);
    const [voucherError, setVoucherError] = useState<string | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'vnpay' | 'momo'>('cash');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (preselect.branch) {
            const b = branches.find((x) => x.slug === preselect.branch);
            if (b) setBranchId(b.id);
        }
        if (preselect.service) {
            const s = services.find((x) => x.slug === preselect.service);
            if (s) setServiceId(s.id);
        }
    }, [preselect, branches, services]);

    const selectedService = useMemo(() => services.find((s) => s.id === serviceId) ?? null, [services, serviceId]);
    const selectedBranch = useMemo(() => branches.find((b) => b.id === branchId) ?? null, [branches, branchId]);

    const availableServices = useMemo(() => {
        return branchId ? services.filter((s) => s.branch_ids.includes(branchId)) : services;
    }, [services, branchId]);

    useEffect(() => {
        if (!branchId || !date) return;
        axios.get('/booking/slots', { params: { branch_id: branchId, date } })
            .then((r) => setSlots(r.data.data))
            .catch(() => setSlots([]));
    }, [branchId, date]);

    const totalPrice = (selectedService?.price ?? 0) - voucherDiscount;

    const applyVoucher = async () => {
        setVoucherError(null);
        if (!voucherCode || !selectedService) return;
        try {
            const { data } = await axios.post('/booking/voucher', {
                code: voucherCode,
                order_value: selectedService.price,
            });
            setVoucherDiscount(data.data.discount);
        } catch (e: any) {
            setVoucherDiscount(0);
            setVoucherError(e.response?.data?.message ?? 'Voucher không hợp lệ.');
        }
    };

    const submit = () => {
        if (!branchId || !serviceId || !date || !timeSlot) return;
        setSubmitting(true);
        setError(null);
        router.post('/booking', {
            branch_id: branchId,
            service_id: serviceId,
            date,
            time_slot: timeSlot,
            guest_name: guest.name,
            guest_phone: guest.phone,
            guest_email: guest.email || undefined,
            note: guest.note || undefined,
            voucher_code: voucherCode || undefined,
            payment_method: paymentMethod,
        }, {
            onError: (errors) => setError(Object.values(errors).join(' ')),
            onFinish: () => setSubmitting(false),
        });
    };

    return (
        <PublicLayout>
            <Head title={t('nav.booking')} />
            <section className="bg-maha-50 py-10">
                <div className="mx-auto max-w-3xl px-4">
                    <h1 className="mb-2 font-serif text-3xl text-maha-700">{t('nav.booking')}</h1>
                    <ol className="mt-4 flex flex-wrap gap-2 text-xs">
                        {['Chi nhánh', 'Dịch vụ', 'Ngày giờ', 'Thông tin', 'Xác nhận'].map((label, i) => (
                            <li
                                key={label}
                                className={`rounded-full px-3 py-1 ${step >= i + 1 ? 'bg-maha-700 text-white' : 'bg-white text-gray-500'}`}
                            >
                                {i + 1}. {label}
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            <section className="py-10">
                <div className="mx-auto max-w-3xl px-4">
                    {step === 1 && (
                        <div className="grid gap-4 md:grid-cols-2">
                            {branches.map((b) => (
                                <button
                                    key={b.id}
                                    onClick={() => { setBranchId(b.id); setStep(2); }}
                                    className={`rounded-xl border p-5 text-left transition ${branchId === b.id ? 'border-maha-700 bg-maha-50' : 'border-maha-100 hover:border-maha-300'}`}
                                >
                                    <p className="font-serif text-xl text-maha-700">{tr(b.name, locale)}</p>
                                    <p className="mt-1 text-sm text-gray-600">{b.address}</p>
                                    <p className="text-sm text-gray-500">{b.phone}</p>
                                </button>
                            ))}
                        </div>
                    )}

                    {step === 2 && (
                        <div>
                            <h2 className="mb-4 font-serif text-2xl text-maha-700">Chọn dịch vụ</h2>
                            <ul className="grid gap-3">
                                {availableServices.map((s) => (
                                    <li key={s.id}>
                                        <button
                                            onClick={() => { setServiceId(s.id); setStep(3); }}
                                            className={`flex w-full items-center justify-between rounded-xl border p-4 text-left ${serviceId === s.id ? 'border-maha-700 bg-maha-50' : 'border-maha-100 hover:border-maha-300'}`}
                                        >
                                            <div>
                                                <p className="font-semibold text-maha-700">{tr(s.name, locale)}</p>
                                                <p className="text-xs uppercase text-gray-500">{s.category} · {s.duration} min</p>
                                            </div>
                                            <span className="font-semibold">{formatVND(s.price)}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {step === 3 && (
                        <div>
                            <h2 className="mb-4 font-serif text-2xl text-maha-700">Chọn ngày & khung giờ</h2>
                            <input
                                type="date"
                                value={date}
                                min={new Date().toISOString().slice(0, 10)}
                                onChange={(e) => setDate(e.target.value)}
                                className="rounded-lg border border-maha-200 px-4 py-2"
                            />
                            <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-3">
                                {slots.map((s) => (
                                    <button
                                        key={s.start}
                                        disabled={s.available === 0}
                                        onClick={() => { setTimeSlot(s.start); setStep(4); }}
                                        className={`rounded-lg border p-3 text-sm ${
                                            timeSlot === s.start ? 'border-maha-700 bg-maha-700 text-white'
                                            : s.available === 0 ? 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400'
                                            : 'border-maha-200 hover:border-maha-400'
                                        }`}
                                    >
                                        {s.start} – {s.end}
                                        <span className="block text-xs">{s.available}/{s.capacity} còn trống</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="space-y-3">
                            <h2 className="mb-2 font-serif text-2xl text-maha-700">Thông tin liên hệ</h2>
                            <input className="w-full rounded-lg border px-4 py-2" placeholder="Họ và tên *"
                                value={guest.name} onChange={(e) => setGuest({ ...guest, name: e.target.value })} />
                            <input className="w-full rounded-lg border px-4 py-2" placeholder="Số điện thoại *"
                                value={guest.phone} onChange={(e) => setGuest({ ...guest, phone: e.target.value })} />
                            <input className="w-full rounded-lg border px-4 py-2" placeholder="Email"
                                value={guest.email} onChange={(e) => setGuest({ ...guest, email: e.target.value })} />
                            <textarea className="w-full rounded-lg border px-4 py-2" placeholder="Ghi chú"
                                value={guest.note} onChange={(e) => setGuest({ ...guest, note: e.target.value })} />
                            <button onClick={() => setStep(5)} disabled={!guest.name || !guest.phone}
                                className="rounded-full bg-maha-700 px-8 py-2 text-white disabled:bg-gray-300">
                                {t('common.next')}
                            </button>
                        </div>
                    )}

                    {step === 5 && (
                        <div className="space-y-4">
                            <h2 className="font-serif text-2xl text-maha-700">Xác nhận booking</h2>
                            <dl className="grid gap-2 rounded-xl bg-maha-50 p-4 text-sm">
                                <div className="flex justify-between"><dt>Chi nhánh</dt><dd>{tr(selectedBranch?.name, locale)}</dd></div>
                                <div className="flex justify-between"><dt>Dịch vụ</dt><dd>{tr(selectedService?.name, locale)}</dd></div>
                                <div className="flex justify-between"><dt>Ngày</dt><dd>{date}</dd></div>
                                <div className="flex justify-between"><dt>Giờ</dt><dd>{timeSlot}</dd></div>
                                <div className="flex justify-between"><dt>Khách</dt><dd>{guest.name} — {guest.phone}</dd></div>
                            </dl>
                            <div>
                                <label className="text-sm">Voucher</label>
                                <div className="flex gap-2">
                                    <input className="flex-1 rounded-lg border px-3 py-2"
                                        value={voucherCode} onChange={(e) => setVoucherCode(e.target.value)} />
                                    <button onClick={applyVoucher} className="rounded-lg bg-maha-100 px-4">Áp dụng</button>
                                </div>
                                {voucherError && <p className="text-xs text-red-500">{voucherError}</p>}
                                {voucherDiscount > 0 && <p className="text-xs text-green-600">Giảm {formatVND(voucherDiscount)}</p>}
                            </div>
                            <div>
                                <label className="text-sm">Phương thức thanh toán</label>
                                <select className="w-full rounded-lg border px-3 py-2" value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value as any)}>
                                    <option value="cash">Thanh toán tại spa</option>
                                    <option value="vnpay">VNPay</option>
                                    <option value="momo">MoMo</option>
                                    <option value="card">Thẻ Visa/Master</option>
                                </select>
                            </div>
                            <div className="flex items-center justify-between border-t pt-4 text-lg font-semibold">
                                <span>Tổng cộng</span>
                                <span className="text-maha-700">{formatVND(totalPrice)}</span>
                            </div>
                            {error && <p className="text-sm text-red-500">{error}</p>}
                            <button onClick={submit} disabled={submitting}
                                className="w-full rounded-full bg-maha-700 py-3 text-white disabled:bg-gray-300">
                                {submitting ? 'Đang xử lý...' : 'Xác nhận đặt lịch'}
                            </button>
                        </div>
                    )}

                    {step > 1 && (
                        <button onClick={() => setStep(step - 1)} className="mt-6 text-sm text-maha-700 underline">
                            ← {t('common.back')}
                        </button>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
