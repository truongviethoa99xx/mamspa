import { router } from '@inertiajs/react';
import { Seo } from '@/Components/Seo';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import { useLocale } from '@/Hooks/useLocale';
import { tr } from '@/Lib/utils';

interface Branch { id: number; slug: string; name: Record<string, string> | string; address: string; phone: string }
interface Service { id: number; slug: string; name: Record<string, string> | string; category: string; duration: number; price: number; branch_ids: number[] }
interface SlotOption { start: string; end: string; capacity: number; available: number }
type Gender = 'male' | 'female';

interface Props {
    preselect: { service?: string | null; branch?: string | null };
    branches: Branch[];
    services: Service[];
}

const DATE_LOCALES: Record<string, string> = { en: 'en-US', ja: 'ja-JP', ko: 'ko-KR', zh: 'zh-CN', vi: 'vi-VN' };
const TODAY = new Date().toISOString().slice(0, 10);

const money = (n: number, suffix = 'đ') => `${n.toLocaleString('vi-VN')} ${suffix}`;
const periodOf = (start: string): 'morning' | 'afternoon' | 'evening' => {
    const h = parseInt(start.slice(0, 2), 10);
    if (h < 12) return 'morning';
    if (h < 18) return 'afternoon';
    return 'evening';
};

export default function Booking({ preselect, branches, services }: Props) {
    const { t } = useTranslation();
    const locale = useLocale();
    const dateLocale = DATE_LOCALES[locale] ?? 'vi-VN';

    const [branchId, setBranchId] = useState<number | null>(branches[0]?.id ?? null);
    const [maleCount, setMaleCount] = useState(1);
    const [femaleCount, setFemaleCount] = useState(0);
    const [serviceByKey, setServiceByKey] = useState<Record<string, number>>({});
    const [date, setDate] = useState<string>('');
    const [slots, setSlots] = useState<SlotOption[]>([]);
    const [timeSlot, setTimeSlot] = useState<string>('');
    const [contact, setContact] = useState({ name: '', phone: '', email: '', note: '', channel: 'zalo', value: '' });
    const [voucherCode, setVoucherCode] = useState('');
    const [voucherDiscount, setVoucherDiscount] = useState(0);
    const [voucherError, setVoucherError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (preselect.branch) {
            const b = branches.find((x) => x.slug === preselect.branch);
            if (b) setBranchId(b.id);
        }
    }, [preselect.branch, branches]);

    const availableServices = useMemo(
        () => (branchId ? services.filter((s) => s.branch_ids.includes(branchId)) : services),
        [services, branchId],
    );

    const guests = useMemo(() => {
        const arr: { key: string; gender: Gender; label: string }[] = [];
        for (let i = 0; i < maleCount; i++) arr.push({ key: `m${i}`, gender: 'male', label: t('bookingForm.guestMale') });
        for (let i = 0; i < femaleCount; i++) arr.push({ key: `f${i}`, gender: 'female', label: t('bookingForm.guestFemale') });
        return arr;
    }, [maleCount, femaleCount, t]);

    // Resolve each guest's service, falling back to the first available one.
    const serviceFor = (key: string): Service | null => {
        const chosen = availableServices.find((s) => s.id === serviceByKey[key]);
        return chosen ?? availableServices[0] ?? null;
    };

    // Preselect a service for the first guest when arriving from a service page.
    useEffect(() => {
        if (!preselect.service) return;
        const s = services.find((x) => x.slug === preselect.service);
        if (s) setServiceByKey((prev) => ({ ...prev, m0: s.id, f0: prev.f0 ?? s.id }));
    }, [preselect.service, services]);

    useEffect(() => {
        if (!branchId || !date) {
            setSlots([]);
            return;
        }
        axios
            .get('/dat-lich/slots', { params: { branch_id: branchId, date } })
            .then((r) => setSlots(r.data.data))
            .catch(() => setSlots([]));
        setTimeSlot('');
    }, [branchId, date]);

    const selectedBranch = useMemo(() => branches.find((b) => b.id === branchId) ?? null, [branches, branchId]);
    const subtotal = guests.reduce((sum, g) => sum + (serviceFor(g.key)?.price ?? 0), 0);
    const total = Math.max(0, subtotal - voucherDiscount);

    const groupedSlots = useMemo(() => {
        const groups: Record<'morning' | 'afternoon' | 'evening', SlotOption[]> = { morning: [], afternoon: [], evening: [] };
        slots.forEach((s) => groups[periodOf(s.start)].push(s));
        return groups;
    }, [slots]);

    const applyVoucher = async () => {
        setVoucherError(null);
        if (!voucherCode || subtotal <= 0) return;
        try {
            const { data } = await axios.post('/dat-lich/voucher', { code: voucherCode, order_value: subtotal });
            setVoucherDiscount(data.data.discount);
        } catch (e: any) {
            setVoucherDiscount(0);
            setVoucherError(e.response?.data?.message ?? '');
        }
    };

    const canSubmit =
        !!branchId && !!date && !!timeSlot && guests.length > 0 && guests.every((g) => serviceFor(g.key)) && contact.name.trim().length >= 2 && contact.phone.trim().length >= 8;

    const submit = () => {
        if (!canSubmit || submitting) return;
        setSubmitting(true);
        setError(null);
        router.post(
            '/dat-lich',
            {
                branch_id: branchId,
                items: guests.map((g) => ({ service_id: serviceFor(g.key)!.id, gender: g.gender })),
                date,
                time_slot: timeSlot,
                guest_name: contact.name,
                guest_phone: contact.phone,
                guest_email: contact.email || undefined,
                contact_channel: contact.channel || undefined,
                contact_value: contact.value || undefined,
                note: contact.note || undefined,
                voucher_code: voucherCode || undefined,
                payment_method: 'cash',
            },
            {
                onError: (errors) => setError(Object.values(errors).join(' ')),
                onFinish: () => setSubmitting(false),
            },
        );
    };

    const summaryDateLabel =
        date &&
        new Date(date).toLocaleDateString(dateLocale, { weekday: 'long' }) +
            ' - ' +
            new Date(date).toLocaleDateString('vi-VN');

    return (
        <PublicLayout>
            <Seo
                title={t('bookingForm.title')}
                description={t('bookingForm.metaDescription', 'Đặt lịch trị liệu online tại Mầm Spa Đà Nẵng — chọn chi nhánh, dịch vụ và khung giờ phù hợp chỉ trong vài bước.')}
            />

            <section className="bg-maha-50">
                <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
                    {/* Header */}
                    <header className="text-center">
                        <p className="font-serif text-base italic text-[#6b7a4f]">{t('bookingForm.eyebrow')}</p>
                        <h1 className="mt-1 font-serif text-4xl tracking-wide text-heading md:text-5xl">
                            {t('bookingForm.title')}
                        </h1>
                    </header>

                    {/* Thank-you banner */}
                    <div className="mx-auto mt-8 max-w-4xl rounded-2xl border border-[#cdd2b5] bg-[#eef0e3] px-6 py-5 text-center">
                        <p className="text-sm leading-relaxed text-ink/80">{t('bookingForm.thankYou')}</p>
                    </div>

                    <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
                        {/* ── Form column ── */}
                        <div className="space-y-12">
                            {/* 1. Location & services */}
                            <section>
                                <h2 className="font-serif text-2xl text-heading">1. {t('bookingForm.sectionLocation')}</h2>

                                <div className="relative mt-6">
                                    <select
                                        value={branchId ?? ''}
                                        onChange={(e) => setBranchId(Number(e.target.value))}
                                        className="w-full appearance-none rounded-2xl border border-maha-200 bg-white px-5 py-4 text-ink shadow-sm focus:border-[#6b7a4f] focus:outline-none"
                                    >
                                        {branches.map((b) => (
                                            <option key={b.id} value={b.id}>
                                                {tr(b.name, locale)}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-maha-500" />
                                </div>

                                {/* Guest counts */}
                                <p className="mt-7 text-sm font-semibold text-ink/80">
                                    {t('bookingForm.guestCount')} <span className="text-red-500">*</span>
                                </p>
                                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                                    <div className="flex items-center justify-between rounded-2xl border border-maha-200 bg-white px-5 py-3">
                                        <span className="text-sm text-maha-600">{t('bookingForm.guestTotal')}:</span>
                                        <span className="font-semibold text-ink">
                                            {maleCount + femaleCount} {t('bookingForm.people')}
                                        </span>
                                    </div>
                                    <Stepper label={t('bookingForm.male')} value={maleCount} min={0} onChange={setMaleCount} />
                                    <Stepper label={t('bookingForm.female')} value={femaleCount} min={0} onChange={setFemaleCount} />
                                </div>

                                {/* Per-guest service */}
                                {guests.length > 0 && (
                                    <div className="mt-5 rounded-2xl border border-maha-100 bg-white p-5">
                                        <p className="text-sm text-maha-600">{t('bookingForm.choosePerGuest')}</p>
                                        <ul className="mt-4 space-y-3">
                                            {guests.map((g, i) => (
                                                <li key={g.key} className="grid items-center gap-3 sm:grid-cols-[160px_1fr]">
                                                    <span className="flex items-center gap-2 text-sm text-ink/80">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-[#6b7a4f]" />
                                                        {i + 1}. {g.label}
                                                    </span>
                                                    <div className="relative">
                                                        <select
                                                            value={serviceFor(g.key)?.id ?? ''}
                                                            onChange={(e) =>
                                                                setServiceByKey((prev) => ({ ...prev, [g.key]: Number(e.target.value) }))
                                                            }
                                                            className="w-full appearance-none rounded-xl border border-maha-200 bg-maha-50 px-4 py-3 text-sm text-ink focus:border-[#6b7a4f] focus:outline-none"
                                                        >
                                                            {availableServices.map((s) => (
                                                                <option key={s.id} value={s.id}>
                                                                    {tr(s.name, locale)} ({s.duration} {t('common.minute')})
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-maha-500" />
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </section>

                            {/* 2. Date & time */}
                            <section>
                                <h2 className="font-serif text-2xl text-heading">2. {t('bookingForm.sectionDatetime')}</h2>
                                <div className="mt-6 grid gap-6 md:grid-cols-2">
                                    <Calendar value={date} min={TODAY} locale={dateLocale} onChange={setDate} />
                                    <div>
                                        {!date && <p className="text-sm text-maha-600">{t('bookingForm.pickDate')}</p>}
                                        {date && slots.length === 0 && (
                                            <p className="text-sm text-maha-600">{t('bookingForm.noSlots')}</p>
                                        )}
                                        {(['afternoon', 'evening', 'morning'] as const).map((period) =>
                                            groupedSlots[period].length > 0 ? (
                                                <div key={period} className="mb-6">
                                                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#6b7a4f]">
                                                        {t(`bookingForm.${period}`)}
                                                    </p>
                                                    <div className="flex flex-wrap gap-3">
                                                        {groupedSlots[period].map((s) => {
                                                            const disabled = s.available < guests.length || guests.length === 0;
                                                            const active = timeSlot === s.start;
                                                            return (
                                                                <button
                                                                    key={s.start}
                                                                    type="button"
                                                                    disabled={disabled}
                                                                    onClick={() => setTimeSlot(s.start)}
                                                                    className={
                                                                        'min-w-[88px] rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ' +
                                                                        (active
                                                                            ? 'border-ink bg-ink text-maha-50'
                                                                            : disabled
                                                                              ? 'cursor-not-allowed border-maha-100 bg-maha-50 text-maha-300'
                                                                              : 'border-maha-200 bg-white text-ink hover:border-[#6b7a4f]')
                                                                    }
                                                                >
                                                                    {s.start}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            ) : null,
                                        )}
                                    </div>
                                </div>
                            </section>

                            {/* 3. Contact */}
                            <section>
                                <h2 className="font-serif text-2xl text-heading">3. {t('bookingForm.sectionContact')}</h2>
                                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                                    <Field label={t('bookingForm.name')} required>
                                        <input
                                            value={contact.name}
                                            onChange={(e) => setContact({ ...contact, name: e.target.value })}
                                            placeholder={t('bookingForm.namePlaceholder')}
                                            className="input-base"
                                        />
                                    </Field>
                                    <Field label={t('bookingForm.phone')} required>
                                        <div className="flex overflow-hidden rounded-xl border border-maha-200 bg-white focus-within:border-[#6b7a4f]">
                                            <span className="flex items-center border-r border-maha-200 px-3 text-lg">🇻🇳</span>
                                            <input
                                                value={contact.phone}
                                                onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                                                placeholder={t('bookingForm.phonePlaceholder')}
                                                className="w-full bg-transparent px-4 py-3 text-ink focus:outline-none"
                                            />
                                        </div>
                                    </Field>
                                    <Field label={t('bookingForm.email')} required>
                                        <input
                                            value={contact.email}
                                            onChange={(e) => setContact({ ...contact, email: e.target.value })}
                                            placeholder={t('bookingForm.emailPlaceholder')}
                                            className="input-base"
                                        />
                                    </Field>
                                    <Field label={t('bookingForm.contactChannel')}>
                                        <div className="flex overflow-hidden rounded-xl border border-maha-200 bg-white focus-within:border-[#6b7a4f]">
                                            <div className="relative">
                                                <select
                                                    value={contact.channel}
                                                    onChange={(e) => setContact({ ...contact, channel: e.target.value })}
                                                    className="h-full appearance-none border-r border-maha-200 bg-maha-50 py-3 pl-4 pr-8 text-sm text-ink focus:outline-none"
                                                >
                                                    <option value="zalo">{t('bookingForm.channelZalo')}</option>
                                                    <option value="messenger">{t('bookingForm.channelMessenger')}</option>
                                                    <option value="whatsapp">{t('bookingForm.channelWhatsapp')}</option>
                                                    <option value="phone">{t('bookingForm.channelPhone')}</option>
                                                </select>
                                                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-maha-500" />
                                            </div>
                                            <input
                                                value={contact.value}
                                                onChange={(e) => setContact({ ...contact, value: e.target.value })}
                                                placeholder={t('bookingForm.contactValuePlaceholder')}
                                                className="w-full bg-transparent px-4 py-3 text-ink focus:outline-none"
                                            />
                                        </div>
                                    </Field>
                                </div>
                                <div className="mt-5">
                                    <Field label={t('bookingForm.note')}>
                                        <textarea
                                            value={contact.note}
                                            onChange={(e) => setContact({ ...contact, note: e.target.value })}
                                            placeholder={t('bookingForm.notePlaceholder')}
                                            rows={4}
                                            className="input-base resize-none"
                                        />
                                    </Field>
                                </div>
                            </section>
                        </div>

                        {/* ── Summary column ── */}
                        <aside className="lg:sticky lg:top-24 lg:self-start">
                            <div className="rounded-3xl border border-[#cdd2b5] bg-white p-7 shadow-xl shadow-maha-900/5">
                                <h2 className="text-center font-serif text-2xl text-heading">{t('bookingForm.summaryTitle')}</h2>
                                <span className="mx-auto mt-3 block h-px w-16 bg-[#6b7a4f]/50" />

                                <dl className="mt-6 space-y-5 text-sm">
                                    <div>
                                        <dt className="text-xs font-semibold uppercase tracking-wider text-[#6b7a4f]">
                                            {t('bookingForm.summaryPlace')}
                                        </dt>
                                        <dd className="mt-1 font-semibold text-ink">{tr(selectedBranch?.name, locale) || '—'}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-xs font-semibold uppercase tracking-wider text-[#6b7a4f]">
                                            {t('bookingForm.summaryDatetime')}
                                        </dt>
                                        <dd className="mt-1 font-semibold text-ink">
                                            {date && timeSlot ? `${timeSlot}, ${summaryDateLabel}` : '—'}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-xs font-semibold uppercase tracking-wider text-[#6b7a4f]">
                                            {t('bookingForm.summaryCustomers')} ({guests.length} {t('bookingForm.people')})
                                        </dt>
                                        <dd className="mt-2 space-y-3">
                                            {guests.map((g) => {
                                                const s = serviceFor(g.key);
                                                if (!s) return null;
                                                return (
                                                    <div key={g.key} className="flex items-start justify-between gap-3">
                                                        <div>
                                                            <p className="font-semibold text-ink">
                                                                1x {tr(s.name, locale)} ({s.duration} min)
                                                            </p>
                                                            <p className="text-xs italic text-maha-600">{g.label}</p>
                                                        </div>
                                                        <span className="whitespace-nowrap font-semibold text-ink">{money(s.price)}</span>
                                                    </div>
                                                );
                                            })}
                                        </dd>
                                    </div>
                                </dl>

                                <div className="my-5 border-t border-dashed border-maha-200" />

                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center justify-between text-maha-700">
                                        <span>{t('bookingForm.subtotal')}:</span>
                                        <span className="font-semibold text-ink">{money(subtotal, 'VNĐ')}</span>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between text-maha-700">
                                            <span>{t('bookingForm.voucher')}:</span>
                                            <span className="font-semibold text-ink">
                                                {voucherDiscount > 0 ? `- ${money(voucherDiscount, 'VNĐ')}` : '-'}
                                            </span>
                                        </div>
                                        <div className="mt-2 flex gap-2">
                                            <input
                                                value={voucherCode}
                                                onChange={(e) => setVoucherCode(e.target.value)}
                                                placeholder="Voucher"
                                                className="w-full rounded-lg border border-maha-200 bg-white px-3 py-2 text-sm focus:border-[#6b7a4f] focus:outline-none"
                                            />
                                            <button
                                                type="button"
                                                onClick={applyVoucher}
                                                className="rounded-lg bg-maha-100 px-4 text-sm font-semibold text-maha-700 hover:bg-maha-200"
                                            >
                                                {t('common.apply')}
                                            </button>
                                        </div>
                                        {voucherError && <p className="mt-1 text-xs text-red-500">{voucherError}</p>}
                                    </div>
                                </div>

                                <div className="mt-5 flex items-baseline justify-between">
                                    <span className="font-serif text-lg text-heading">{t('bookingForm.total')}:</span>
                                    <span className="font-serif text-2xl font-bold text-heading">{money(total, 'VNĐ')}</span>
                                </div>

                                {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

                                <button
                                    type="button"
                                    onClick={submit}
                                    disabled={!canSubmit || submitting}
                                    className="mt-5 w-full rounded-full bg-ink py-4 text-sm font-semibold uppercase tracking-wider text-maha-50 transition-colors hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {submitting ? t('bookingForm.processing') : t('bookingForm.confirm')}
                                </button>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}

function Stepper({ label, value, min, onChange }: { label: string; value: number; min: number; onChange: (v: number) => void }) {
    return (
        <div className="flex items-center justify-between rounded-2xl border border-maha-200 bg-white px-4 py-3">
            <span className="text-sm text-maha-600">{label}:</span>
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={() => onChange(Math.max(min, value - 1))}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-maha-100 text-maha-700 transition-colors hover:bg-maha-200"
                    aria-label="−"
                >
                    <Minus className="h-4 w-4" />
                </button>
                <span className="w-5 text-center font-semibold text-ink">{value}</span>
                <button
                    type="button"
                    onClick={() => onChange(value + 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-maha-100 text-maha-700 transition-colors hover:bg-maha-200"
                    aria-label="+"
                >
                    <Plus className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
    return (
        <label className="block">
            <span className="text-sm font-semibold text-ink/80">
                {label} {required && <span className="text-red-500">*</span>}
            </span>
            <div className="mt-2">{children}</div>
        </label>
    );
}

function Calendar({ value, min, locale, onChange }: { value: string; min: string; locale: string; onChange: (d: string) => void }) {
    const initial = value ? new Date(value) : new Date();
    const [view, setView] = useState({ year: initial.getFullYear(), month: initial.getMonth() });

    const monthLabel = new Date(view.year, view.month, 1).toLocaleDateString(locale, { month: 'long', year: 'numeric' });
    const firstDay = new Date(view.year, view.month, 1);
    // Monday-first offset.
    const offset = (firstDay.getDay() + 6) % 7;
    const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
    const weekdays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

    const cells: (number | null)[] = [...Array(offset).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

    const toIso = (day: number) =>
        `${view.year}-${String(view.month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    const shift = (delta: number) => {
        const m = view.month + delta;
        setView({ year: view.year + Math.floor(m / 12), month: ((m % 12) + 12) % 12 });
    };

    return (
        <div className="rounded-2xl border border-maha-200 bg-white p-5">
            <div className="mb-4 flex items-center justify-center gap-4">
                <button type="button" onClick={() => shift(-1)} className="text-maha-600 hover:text-[#6b7a4f]" aria-label="prev">
                    <ChevronLeft className="h-5 w-5" />
                </button>
                <span className="font-serif text-lg capitalize text-heading">{monthLabel}</span>
                <button type="button" onClick={() => shift(1)} className="text-maha-600 hover:text-[#6b7a4f]" aria-label="next">
                    <ChevronRight className="h-5 w-5" />
                </button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs text-maha-500">
                {weekdays.map((w) => (
                    <span key={w} className="py-1">{w}</span>
                ))}
            </div>
            <div className="mt-1 grid grid-cols-7 gap-1">
                {cells.map((day, i) => {
                    if (day === null) return <span key={`b${i}`} />;
                    const iso = toIso(day);
                    const disabled = iso < min;
                    const active = iso === value;
                    return (
                        <button
                            key={iso}
                            type="button"
                            disabled={disabled}
                            onClick={() => onChange(iso)}
                            className={
                                'aspect-square rounded-full text-sm transition-colors ' +
                                (active
                                    ? 'bg-ink font-semibold text-maha-50'
                                    : disabled
                                      ? 'cursor-not-allowed text-maha-200'
                                      : 'text-ink hover:bg-maha-100')
                            }
                        >
                            {day}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
