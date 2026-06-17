import { Link, router, usePage } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CalendarDays, Check, Clock, Minus, Plus } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { tr } from '@/Lib/utils';
import type { SharedProps } from '@/types';

interface BranchOption {
    id: number;
    slug: string;
    name: unknown;
}

interface ServiceOption {
    id: number;
    slug: string;
    name: unknown;
    duration: number;
    branch_ids: number[];
}

interface GuestService {
    gender: 'male' | 'female';
    serviceId: string;
}

const COUNTRY_CODES = [
    { code: '+84', flag: '🇻🇳' },
    { code: '+1', flag: '🇺🇸' },
    { code: '+82', flag: '🇰🇷' },
    { code: '+81', flag: '🇯🇵' },
    { code: '+86', flag: '🇨🇳' },
];
const CHANNELS = ['Zalo', 'WhatsApp', 'Messenger', 'Telegram'];

const labelCls = 'mb-2 block text-sm font-bold text-subheading';
const fieldCls =
    'w-full rounded-lg border border-maha-200 bg-white px-3 py-3 text-sm text-ink placeholder-maha-400 transition-colors focus:border-maha-500 focus:outline-none sm:px-4 sm:py-3.5 sm:text-base';

export function BookingFormBlock({
    data,
}: {
    data: { branches?: BranchOption[]; services?: ServiceOption[] };
}) {
    const locale = useLocale();
    const { t } = useTranslation();
    const { props } = usePage<SharedProps>();
    const branches = useMemo(() => data.branches ?? [], [data.branches]);
    const services = useMemo(() => data.services ?? [], [data.services]);

    // After an inline submit the server flashes the booking code → open the modal.
    const flashedCode = props.flash?.booking_code;
    const [successCode, setSuccessCode] = useState<string | null>(null);
    useEffect(() => {
        if (flashedCode) setSuccessCode(flashedCode);
    }, [flashedCode]);

    const [branchId, setBranchId] = useState('');
    const [name, setName] = useState('');
    const [countryCode, setCountryCode] = useState('+84');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [channel, setChannel] = useState('Zalo');
    const [channelId, setChannelId] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [male, setMale] = useState(1);
    const [female, setFemale] = useState(1);
    const [guestServices, setGuestServices] = useState<GuestService[]>([]);
    const [note, setNote] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const availableServices = useMemo(
        () =>
            branchId
                ? services.filter((s) => s.branch_ids.includes(Number(branchId)))
                : services,
        [services, branchId],
    );

    // Keep the per-guest service rows in sync with the male/female counts.
    useEffect(() => {
        setGuestServices((prev) => {
            const next: GuestService[] = [];
            for (let i = 0; i < male; i++) {
                next.push(prev.find((g, idx) => g.gender === 'male' && idx < prev.length) ?? { gender: 'male', serviceId: '' });
            }
            const males = next.filter((g) => g.gender === 'male');
            const prevFemales = prev.filter((g) => g.gender === 'female');
            const females: GuestService[] = [];
            for (let i = 0; i < female; i++) {
                females.push(prevFemales[i] ?? { gender: 'female', serviceId: '' });
            }
            return [...males, ...females];
        });
    }, [male, female]);

    const total = male + female;

    const setGuestService = (index: number, serviceId: string) => {
        setGuestServices((prev) => prev.map((g, i) => (i === index ? { ...g, serviceId } : g)));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const serviceName = (id: string) =>
            tr(services.find((s) => String(s.id) === id)?.name, locale) || '—';

        // Backend stores one service per booking → use the first selected service,
        // and capture the full breakdown in the note.
        const firstServiceId =
            guestServices.find((g) => g.serviceId)?.serviceId || String(availableServices[0]?.id ?? '');

        const guestLines = guestServices
            .map((g, i) => {
                const label = g.gender === 'male' ? t('blocks.bookingForm.guestMale') : t('blocks.bookingForm.guestFemale');
                return `${i + 1}. ${label}: ${serviceName(g.serviceId)}`;
            })
            .join('\n');

        const composedNote = [
            `${t('blocks.bookingForm.channel')}: ${channel} ${channelId}`.trim(),
            `${t('blocks.bookingForm.guests')}: ${total} (${t('blocks.bookingForm.male')} ${male}, ${t('blocks.bookingForm.female')} ${female})`,
            guestLines,
            note ? `---\n${note}` : '',
        ]
            .filter(Boolean)
            .join('\n');

        setSubmitting(true);
        router.post(
            '/dat-lich',
            {
                branch_id: Number(branchId),
                service_id: Number(firstServiceId),
                date,
                time_slot: time,
                guest_name: name,
                guest_phone: `${countryCode} ${phone}`.trim(),
                guest_email: email || null,
                note: composedNote,
                inline: 1,
            },
            { preserveScroll: true, onFinish: () => setSubmitting(false) },
        );
    };

    return (
        <>
        <section className="bg-maha-50 py-10 sm:py-14 md:py-20 lg:py-24">
            <div className="mx-auto max-w-3xl px-5 sm:px-6">
                <form
                    onSubmit={handleSubmit}
                    className="rounded-2xl bg-white p-4 shadow-xl shadow-maha-900/5 sm:p-6 md:rounded-3xl md:p-12"
                >
                    {/* Title */}
                    <div className="mb-6 rounded-xl border border-maha-100 bg-[#eef0e8] px-4 py-4 text-center md:mb-10 md:rounded-2xl md:px-6 md:py-8">
                        <h2 className="font-serif text-xl uppercase tracking-wide text-ink sm:text-3xl md:text-4xl">
                            {t('blocks.bookingForm.title')}
                        </h2>
                    </div>

                    {/* Branch */}
                    <div className="mb-6">
                        <label className={labelCls}>
                            {t('blocks.bookingForm.branch')} <span className="text-red-600">*</span>
                        </label>
                        <select
                            required
                            value={branchId}
                            onChange={(e) => setBranchId(e.target.value)}
                            className={fieldCls}
                        >
                            <option value="" disabled>
                                {t('blocks.bookingForm.branchPlaceholder')}
                            </option>
                            {branches.map((b) => (
                                <option key={b.id} value={b.id}>
                                    {tr(b.name, locale)}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Name + Phone */}
                    <div className="mb-5 grid gap-5 md:mb-6 md:grid-cols-2 md:gap-6">
                        <div>
                            <label className={labelCls}>
                                {t('blocks.bookingForm.name')} <span className="text-red-600">*</span>
                            </label>
                            <input
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder={t('blocks.bookingForm.namePlaceholder')}
                                className={fieldCls}
                            />
                        </div>
                        <div>
                            <label className={labelCls}>
                                {t('blocks.bookingForm.phone')} <span className="text-red-600">*</span>
                            </label>
                            <div className="flex gap-2">
                                <select
                                    value={countryCode}
                                    onChange={(e) => setCountryCode(e.target.value)}
                                    className="rounded-lg border border-maha-200 bg-white px-2.5 py-3 text-sm text-ink focus:border-maha-500 focus:outline-none sm:px-3 sm:py-3.5 sm:text-base"
                                >
                                    {COUNTRY_CODES.map((c) => (
                                        <option key={c.code} value={c.code}>
                                            {c.flag} {c.code}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    required
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder={t('blocks.bookingForm.phonePlaceholder')}
                                    className={fieldCls}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Email + Channel */}
                    <div className="mb-5 grid gap-5 md:mb-6 md:grid-cols-2 md:gap-6">
                        <div>
                            <label className={labelCls}>
                                {t('blocks.bookingForm.email')} <span className="text-red-600">*</span>
                            </label>
                            <input
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t('blocks.bookingForm.emailPlaceholder')}
                                className={fieldCls}
                            />
                        </div>
                        <div>
                            <label className={labelCls}>{t('blocks.bookingForm.channel')}</label>
                            <div className="flex gap-2">
                                <select
                                    value={channel}
                                    onChange={(e) => setChannel(e.target.value)}
                                    className="rounded-lg border border-maha-200 bg-white px-2.5 py-3 text-sm text-ink focus:border-maha-500 focus:outline-none sm:px-3 sm:py-3.5 sm:text-base"
                                >
                                    {CHANNELS.map((c) => (
                                        <option key={c} value={c}>
                                            {c}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    value={channelId}
                                    onChange={(e) => setChannelId(e.target.value)}
                                    placeholder={t('blocks.bookingForm.channelPlaceholder')}
                                    className={fieldCls}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Date + Time */}
                    <div className="mb-5 grid gap-5 md:mb-6 md:grid-cols-2 md:gap-6">
                        <div>
                            <label className={labelCls}>
                                {t('blocks.bookingForm.date')} <span className="text-red-600">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    required
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className={fieldCls}
                                />
                                <CalendarDays className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-maha-500" />
                            </div>
                        </div>
                        <div>
                            <label className={labelCls}>
                                {t('blocks.bookingForm.time')} <span className="text-red-600">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    required
                                    type="time"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    className={fieldCls}
                                />
                                <Clock className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-maha-500" />
                            </div>
                        </div>
                    </div>

                    {/* Guest counts */}
                    <div className="mb-6">
                        <label className={labelCls}>
                            {t('blocks.bookingForm.guests')} <span className="text-red-600">*</span>
                        </label>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="flex items-center gap-3 rounded-lg border border-maha-200 bg-white px-4 py-3">
                                <span className="text-sm font-medium text-maha-600">{t('blocks.bookingForm.total')}:</span>
                                <span className="font-semibold text-ink">
                                    {total} {t('blocks.bookingForm.people')}
                                </span>
                            </div>
                            <Stepper label={t('blocks.bookingForm.male')} value={male} min={0} onChange={setMale} />
                            <Stepper label={t('blocks.bookingForm.female')} value={female} min={0} onChange={setFemale} />
                        </div>
                    </div>

                    {/* Per-guest services */}
                    <div className="mb-6">
                        <label className={labelCls}>
                            {t('blocks.bookingForm.chooseService')} <span className="text-red-600">*</span>
                        </label>
                        <div className="space-y-3 rounded-xl bg-maha-50 p-3 sm:space-y-4 sm:rounded-2xl sm:p-5">
                            {guestServices.map((g, i) => (
                                <div key={i} className="grid items-center gap-4 md:grid-cols-[140px_1fr]">
                                    <span className="flex items-center gap-2 text-sm font-bold text-ink">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#5e6b45]" />
                                        {i + 1}.{' '}
                                        {g.gender === 'male'
                                            ? t('blocks.bookingForm.guestMale')
                                            : t('blocks.bookingForm.guestFemale')}
                                    </span>
                                    <select
                                        required
                                        value={g.serviceId}
                                        onChange={(e) => setGuestService(i, e.target.value)}
                                        className={fieldCls}
                                    >
                                        <option value="" disabled>
                                            {t('blocks.bookingForm.servicePlaceholder')}
                                        </option>
                                        {availableServices.map((s) => (
                                            <option key={s.id} value={s.id}>
                                                {tr(s.name, locale)} ({s.duration} {t('common.minute')})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Note */}
                    <div className="mb-6 md:mb-8">
                        <label className={labelCls}>{t('blocks.bookingForm.note')}</label>
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            rows={4}
                            placeholder={t('blocks.bookingForm.notePlaceholder')}
                            className={`${fieldCls} resize-none`}
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full rounded-lg bg-ink py-3.5 font-serif text-sm font-semibold uppercase tracking-wide text-maha-50 transition-colors hover:bg-[#1a1d18] disabled:opacity-60 sm:py-4 sm:text-base"
                    >
                        {submitting ? t('common.processing') : t('blocks.bookingForm.submit')}
                    </button>
                </form>
            </div>
        </section>

        {/* Success modal */}
        {successCode && (
            <div
                className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
                role="dialog"
                aria-modal="true"
                onClick={() => setSuccessCode(null)}
            >
                <div
                    className="w-full max-w-xl rounded-3xl bg-white p-8 text-center shadow-2xl md:p-12"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Check icon */}
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#eef0e8]">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#7d8b5a] text-white">
                            <Check className="h-7 w-7" strokeWidth={3} />
                        </span>
                    </div>

                    <h3 className="mt-6 font-serif text-2xl uppercase tracking-wide text-ink sm:text-3xl">
                        {t('blocks.bookingForm.success.title')}
                    </h3>

                    <div className="mt-6 space-y-4 rounded-2xl border border-maha-100 bg-maha-50/60 px-5 py-6 md:px-8">
                        <p className="font-serif text-sm italic leading-relaxed text-[#6e7a51] md:text-base">
                            {t('blocks.bookingForm.success.messageEn')}
                        </p>
                        <p className="text-sm font-semibold leading-relaxed text-ink md:text-base">
                            {t('blocks.bookingForm.success.messageVi')}
                        </p>
                    </div>

                    <p className="mt-6 text-sm text-maha-500">{t('blocks.bookingForm.success.codeLabel')}</p>
                    <p className="mt-1 font-serif text-2xl font-bold text-ink">
                        <span className="text-maha-400">#</span>
                        {successCode}
                    </p>

                    <Link
                        href="/"
                        className="mt-7 inline-block rounded-full bg-ink px-10 py-3.5 font-serif text-base font-semibold tracking-wide text-maha-50 transition-colors hover:bg-[#1a1d18]"
                    >
                        {t('blocks.bookingForm.success.home')}
                    </Link>
                </div>
            </div>
        )}
        </>
    );
}

function Stepper({
    label,
    value,
    min,
    onChange,
}: {
    label: string;
    value: number;
    min: number;
    onChange: (v: number) => void;
}) {
    return (
        <div className="flex items-center justify-between rounded-lg border border-maha-200 bg-white px-4 py-3">
            <span className="text-sm font-medium text-maha-600">{label}:</span>
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={() => onChange(Math.max(min, value - 1))}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-maha-200 text-ink hover:bg-maha-50"
                    aria-label={`${label} -`}
                >
                    <Minus className="h-4 w-4" />
                </button>
                <span className="w-5 text-center font-semibold text-ink">{value}</span>
                <button
                    type="button"
                    onClick={() => onChange(value + 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-maha-200 text-ink hover:bg-maha-50"
                    aria-label={`${label} +`}
                >
                    <Plus className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
