import { Head, Link, router } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, ChevronLeft, ChevronRight, Clock, Minus, Plus, X } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { generateTimeOptions, tr, stripTags } from '@/Lib/utils';
import { FancySelect } from '@/Components/FancySelect';
import { COUNTRY_CODES } from '@/Lib/countryCodes';

interface Service { id: number; slug: string; name: Record<string, string> | string; duration: number }
type Gender = 'male' | 'female';

interface Props {
    preselect: { service?: string | null };
    openHours: { open: string; close: string };
    services: Service[];
}

const DATE_LOCALES: Record<string, string> = { en: 'en-US', ja: 'ja-JP', ko: 'ko-KR', zh: 'zh-CN', vi: 'vi-VN' };
const TODAY = new Date().toISOString().slice(0, 10);
const DEFAULT_CONTACT = { name: '', phone: '', email: '', note: '', channel: 'zalo', value: '', country: 'Việt Nam' };

export default function Booking({ preselect, openHours, services }: Props) {
    const { t } = useTranslation();
    const locale = useLocale();
    const dateLocale = DATE_LOCALES[locale] ?? 'vi-VN';

    const [maleCount, setMaleCount] = useState(1);
    const [femaleCount, setFemaleCount] = useState(0);
    const [serviceByKey, setServiceByKey] = useState<Record<string, number>>({});
    const [date, setDate] = useState<string>('');
    const [timeSlot, setTimeSlot] = useState<string>('');
    const [contact, setContact] = useState(DEFAULT_CONTACT);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successCode, setSuccessCode] = useState<string | null>(null);

    const availableServices = services;

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

    // Reset the chosen time whenever the date changes.
    useEffect(() => {
        setTimeSlot('');
    }, [date]);

    const timeOptions = useMemo(
        () => generateTimeOptions(openHours.open, openHours.close, 60).map((v) => ({ value: v, label: v })),
        [openHours],
    );
    const canSubmit =
        !!date && !!timeSlot && guests.length > 0 && guests.every((g) => serviceFor(g.key)) && contact.name.trim().length >= 2 && contact.phone.trim().length >= 8;

    const resetForm = () => {
        setMaleCount(1);
        setFemaleCount(0);
        setServiceByKey({});
        setDate('');
        setTimeSlot('');
        setContact(DEFAULT_CONTACT);
    };

    const submit = () => {
        if (!canSubmit || submitting) return;
        setSubmitting(true);
        setError(null);
        const dialCode = COUNTRY_CODES.find((c) => c.name === contact.country)?.code ?? '+84';
        router.post(
            '/dat-lich',
            {
                items: guests.map((g) => ({ service_id: serviceFor(g.key)!.id, gender: g.gender })),
                date,
                time_slot: timeSlot,
                guest_name: contact.name,
                guest_phone: `${dialCode} ${contact.phone}`.trim(),
                guest_email: contact.email || undefined,
                contact_channel: contact.channel || undefined,
                contact_value: contact.value || undefined,
                note: contact.note || undefined,
                payment_method: 'cash',
                inline: true,
            },
            {
                preserveScroll: true,
                onSuccess: (page) => {
                    const code = (page.props.flash as { booking_code?: string })?.booking_code;
                    if (code) {
                        setSuccessCode(code);
                        resetForm();
                    }
                },
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
        <div className="flex min-h-screen flex-col bg-maha-50">
            <Head title={t('bookingForm.title')}>
                <meta
                    name="description"
                    content={t(
                        'bookingForm.metaDescription',
                        'Đặt lịch trị liệu online tại Mầm Spa — chọn dịch vụ và khung giờ phù hợp chỉ trong vài bước.',
                    )}
                />
            </Head>

            {/* Thanh trên cùng tối giản — không có menu điều hướng, chỉ logo + nút đóng. */}
            <div className="flex items-center justify-between px-5 py-4 sm:px-10">
                <Link href="/" className="font-serif text-lg uppercase tracking-[0.12em] text-heading">
                    Mầm Spa
                </Link>
                <Link
                    href="/"
                    aria-label="Đóng"
                    className="flex h-9 w-9 items-center justify-center rounded-full text-ink/60 transition-colors hover:bg-maha-100 hover:text-ink"
                >
                    <X className="h-5 w-5" />
                </Link>
            </div>

            <section className="flex-1 bg-maha-50">
                <div className="mx-auto max-w-6xl px-4 pb-12 pt-4 md:pb-16 md:pt-6">
                    {/* Header */}
                    <header className="text-center">
                        <p className="font-serif text-base italic text-subheading">{t('bookingForm.eyebrow')}</p>
                        <h1 className="mt-1 font-serif text-4xl tracking-wide text-heading md:text-5xl">
                            {t('bookingForm.title')}
                        </h1>
                    </header>

                    {/* Thank-you banner */}
                    <div className="mx-auto mt-8 max-w-4xl rounded-2xl border border-[#CDBCA3] bg-[#E9E2D5] px-6 py-5 text-center">
                        <p className="text-sm leading-relaxed text-ink/80">{t('bookingForm.thankYou')}</p>
                    </div>

                    <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
                        {/* ── Form column ── */}
                        <div className="space-y-12">
                            {/* 1. Location & services */}
                            <section>
                                <h2 className="font-serif text-2xl text-heading">1. {t('bookingForm.sectionLocation')}</h2>

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
                                                        <span className="h-1.5 w-1.5 rounded-full bg-subheading" />
                                                        {i + 1}. {g.label}
                                                    </span>
                                                    <FancySelect
                                                        value={String(serviceFor(g.key)?.id ?? '')}
                                                        onChange={(v) => setServiceByKey((prev) => ({ ...prev, [g.key]: Number(v) }))}
                                                        placeholder={t('bookingForm.chooseService')}
                                                        options={availableServices.map((s) => ({
                                                            value: String(s.id),
                                                            label: `${stripTags(tr(s.name, locale))} (${s.duration} ${t('common.minute')})`,
                                                        }))}
                                                    />
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
                                        {date && (
                                            <>
                                                <div className="relative">
                                                    <input
                                                        type="time"
                                                        value={timeSlot}
                                                        onChange={(e) => setTimeSlot(e.target.value)}
                                                        min={openHours.open}
                                                        max={openHours.close}
                                                        step={3600}
                                                        className="w-full rounded-lg border border-maha-200 bg-white px-3 py-3 pr-10 text-sm text-ink transition-colors focus:border-subheading focus:outline-none focus:ring-2 focus:ring-maha-500/10 sm:px-4 sm:py-3.5 sm:text-base"
                                                    />
                                                    <Clock className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-maha-500 sm:right-4" />
                                                </div>
                                                <p className="mt-3 text-xs text-maha-500">
                                                    {t('bookingForm.timeHint', openHours)}
                                                </p>
                                                <div className="mt-4 flex flex-wrap gap-2">
                                                    {timeOptions.map((opt) => (
                                                        <button
                                                            key={opt.value}
                                                            type="button"
                                                            onClick={() => setTimeSlot(opt.value)}
                                                            className={
                                                                'rounded-full border px-4 py-2 text-sm font-medium transition-colors ' +
                                                                (timeSlot === opt.value
                                                                    ? 'border-heading bg-heading text-white'
                                                                    : 'border-maha-200 bg-white text-ink hover:border-subheading hover:text-subheading')
                                                            }
                                                        >
                                                            {opt.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            </>
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
                                        <div className="flex gap-2">
                                            <FancySelect
                                                value={contact.country}
                                                onChange={(v) => setContact({ ...contact, country: v })}
                                                className="w-[7.25rem] shrink-0"
                                                searchable
                                                searchPlaceholder={t('blocks.bookingForm.phoneCountrySearchPlaceholder')}
                                                emptyText={t('blocks.bookingForm.phoneCountryEmpty')}
                                                options={COUNTRY_CODES.map((c) => ({
                                                    value: c.name,
                                                    label: `${c.flag} ${c.name} (${c.code})`,
                                                    shortLabel: `${c.flag} ${c.code}`,
                                                }))}
                                            />
                                            <input
                                                value={contact.phone}
                                                onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                                                placeholder={t('bookingForm.phonePlaceholder')}
                                                className="input-base"
                                            />
                                        </div>
                                    </Field>
                                    <Field label={t('bookingForm.email')}>
                                        <input
                                            value={contact.email}
                                            onChange={(e) => setContact({ ...contact, email: e.target.value })}
                                            placeholder={t('bookingForm.emailPlaceholder')}
                                            className="input-base"
                                        />
                                    </Field>
                                    <Field label={t('bookingForm.contactChannel')}>
                                        <div className="flex gap-2">
                                            <FancySelect
                                                value={contact.channel}
                                                onChange={(v) => setContact({ ...contact, channel: v })}
                                                className="w-[8.5rem] shrink-0"
                                                options={[
                                                    { value: 'zalo', label: t('bookingForm.channelZalo') },
                                                    { value: 'whatsapp', label: t('bookingForm.channelWhatsapp') },
                                                    { value: 'phone', label: t('bookingForm.channelPhone') },
                                                ]}
                                            />
                                            <input
                                                value={contact.value}
                                                onChange={(e) => setContact({ ...contact, value: e.target.value })}
                                                placeholder={t('bookingForm.contactValuePlaceholder')}
                                                className="input-base"
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
                            <div className="rounded-3xl border border-[#CDBCA3] bg-white p-7 shadow-xl shadow-maha-900/5">
                                <h2 className="text-center font-serif text-2xl text-heading">{t('bookingForm.summaryTitle')}</h2>
                                <span className="mx-auto mt-3 block h-px w-16 bg-subheading/50" />

                                <dl className="mt-6 space-y-5 text-sm">
                                    <div>
                                        <dt className="text-xs font-semibold uppercase tracking-wider text-subheading">
                                            {t('bookingForm.summaryDatetime')}
                                        </dt>
                                        <dd className="mt-1 font-semibold text-ink">
                                            {date && timeSlot ? `${timeSlot}, ${summaryDateLabel}` : '—'}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-xs font-semibold uppercase tracking-wider text-subheading">
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
                                                                1x {stripTags(tr(s.name, locale))} ({s.duration} min)
                                                            </p>
                                                            <p className="text-xs italic text-maha-600">{g.label}</p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </dd>
                                    </div>
                                </dl>

                                {error && <p className="mt-5 text-sm text-red-500">{error}</p>}

                                <button
                                    type="button"
                                    onClick={submit}
                                    disabled={!canSubmit || submitting}
                                    className="mt-5 w-full rounded-md bg-[#2F3E2E] py-4 text-sm font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {submitting ? t('bookingForm.processing') : t('bookingForm.confirm')}
                                </button>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {successCode && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="booking-success-title"
                    className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 px-4 backdrop-blur-sm"
                >
                    <div className="relative w-full max-w-md rounded-3xl border border-[#CDBCA3] bg-white p-8 text-center shadow-2xl shadow-maha-900/20">
                        <button
                            type="button"
                            onClick={() => setSuccessCode(null)}
                            aria-label="Đóng"
                            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-ink/50 transition-colors hover:bg-maha-100 hover:text-ink"
                        >
                            <X className="h-4 w-4" />
                        </button>

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-maha-100 text-heading">
                            <CheckCircle2 className="h-7 w-7" />
                        </div>

                        <h2 id="booking-success-title" className="mt-5 font-serif text-2xl text-heading">
                            {t('blocks.bookingForm.success.title')}
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed text-ink/70">
                            {t('blocks.bookingForm.success.message')}
                        </p>

                        <div className="mt-6 rounded-xl border border-dashed border-maha-200 bg-maha-50 px-4 py-3">
                            <p className="text-xs font-semibold uppercase tracking-wider text-subheading">
                                {t('blocks.bookingForm.success.codeLabel')}
                            </p>
                            <p className="mt-1 font-mono text-lg font-semibold tracking-wide text-heading">{successCode}</p>
                        </div>

                        <Link
                            href="/"
                            className="mt-6 block w-full rounded-md bg-[#2F3E2E] py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
                        >
                            {t('blocks.bookingForm.success.home')}
                        </Link>
                    </div>
                </div>
            )}
        </div>
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
                <button type="button" onClick={() => shift(-1)} className="text-maha-600 hover:text-subheading" aria-label="prev">
                    <ChevronLeft className="h-5 w-5" />
                </button>
                <span className="font-serif text-lg capitalize text-heading">{monthLabel}</span>
                <button type="button" onClick={() => shift(1)} className="text-maha-600 hover:text-subheading" aria-label="next">
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
                                    ? 'bg-heading font-semibold text-white'
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
