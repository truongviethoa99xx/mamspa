import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import { Instagram, Lock, Mail, MessageCircle, Phone } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { useReveal } from '@/Hooks/useReveal';
import { tr, cn } from '@/Lib/utils';

export interface ContactInfoData {
    title?: unknown;
    intro?: unknown;
    hotline?: string | null;
    hotline_note?: unknown;
    zalo?: string | null;
    zalo_note?: unknown;
    email?: string | null;
    email_note?: unknown;
    instagram?: string | null;
    instagram_note?: unknown;
}

export interface ContactFormData {
    title?: unknown;
    intro?: unknown;
    privacyNote?: unknown;
    branchOptions: { value: string; label: string }[];
}

interface ContactSubmitForm {
    name: string;
    phone: string;
    email: string;
    branch: string;
    message: string;
}

/** Khối 2 cột "Đặt lịch & Liên hệ" (thông tin liên hệ nhanh) + form "Gửi cho chúng tôi". */
export function ContactInfoForm({ info, form: formContent }: { info: ContactInfoData; form: ContactFormData }) {
    const locale = useLocale();
    const infoTitle = tr(info.title, locale);
    const infoIntro = tr(info.intro, locale);
    const formTitle = tr(formContent.title, locale);
    const formIntro = tr(formContent.intro, locale);
    const privacyNote = tr(formContent.privacyNote, locale);
    const { ref, className } = useReveal<HTMLElement>();

    const form = useForm<ContactSubmitForm>({
        name: '',
        phone: '',
        email: '',
        branch: '',
        message: '',
    });

    const submit = (event: FormEvent) => {
        event.preventDefault();
        form.post('/lien-he', {
            preserveScroll: true,
            onSuccess: () => form.reset(),
        });
    };

    const rows = [
        {
            icon: Phone,
            label: 'HOTLINE',
            value: info.hotline,
            note: tr(info.hotline_note, locale),
        },
        {
            icon: MessageCircle,
            label: 'ZALO',
            value: info.zalo,
            note: tr(info.zalo_note, locale),
        },
        {
            icon: Mail,
            label: 'EMAIL',
            value: info.email,
            note: tr(info.email_note, locale),
        },
        {
            icon: Instagram,
            label: 'INSTAGRAM',
            value: info.instagram,
            note: tr(info.instagram_note, locale),
        },
    ].filter((row) => row.value);

    return (
        <section ref={ref} className={cn(className, 'bg-maha-50 px-5 pb-14 pt-2 sm:px-10 sm:pb-16 lg:px-16 lg:pb-20')}>
            <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
                <div className="rounded-2xl bg-maha-100 p-6 sm:p-8 lg:p-10">
                    {infoTitle && (
                        <div
                            className="rich-content font-serif text-2xl text-heading sm:text-3xl"
                            dangerouslySetInnerHTML={{ __html: infoTitle }}
                        />
                    )}
                    {infoIntro && (
                        <div
                            className="rich-content mt-2 text-sm text-ink/70"
                            dangerouslySetInnerHTML={{ __html: infoIntro }}
                        />
                    )}

                    <div className="mt-8 divide-y divide-maha-300/60">
                        {rows.map((row) => (
                            <div key={row.label} className="flex items-start justify-between gap-4 py-5 first:pt-0 last:pb-0">
                                <div className="flex items-start gap-4">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-maha-400 text-subheading">
                                        <row.icon className="h-5 w-5" strokeWidth={1.5} />
                                    </span>
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wide text-subheading">{row.label}</p>
                                        <p className="mt-1 font-serif text-lg text-heading">{row.value}</p>
                                    </div>
                                </div>
                                {row.note && (
                                    <div
                                        className="rich-content max-w-[10rem] text-right text-xs leading-relaxed text-ink/60"
                                        dangerouslySetInnerHTML={{ __html: row.note }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-2xl bg-maha-100 p-6 sm:p-8 lg:p-10">
                    {formTitle && (
                        <div
                            className="rich-content font-serif text-2xl text-heading sm:text-3xl"
                            dangerouslySetInnerHTML={{ __html: formTitle }}
                        />
                    )}
                    {formIntro && (
                        <div
                            className="rich-content mt-2 text-sm text-ink/70"
                            dangerouslySetInnerHTML={{ __html: formIntro }}
                        />
                    )}

                    <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
                        <div>
                            <input
                                type="text"
                                value={form.data.name}
                                onChange={(e) => form.setData('name', e.target.value)}
                                placeholder="Họ và tên *"
                                className="w-full rounded-md border border-maha-200 bg-maha-50 px-4 py-3 text-sm text-ink placeholder:text-ink/50 focus:border-subheading focus:outline-none"
                            />
                            {form.errors.name && <p className="mt-1 text-xs text-red-600">{form.errors.name}</p>}
                        </div>

                        <div>
                            <input
                                type="tel"
                                value={form.data.phone}
                                onChange={(e) => form.setData('phone', e.target.value)}
                                placeholder="Số điện thoại *"
                                className="w-full rounded-md border border-maha-200 bg-maha-50 px-4 py-3 text-sm text-ink placeholder:text-ink/50 focus:border-subheading focus:outline-none"
                            />
                            {form.errors.phone && <p className="mt-1 text-xs text-red-600">{form.errors.phone}</p>}
                        </div>

                        <div>
                            <input
                                type="email"
                                value={form.data.email}
                                onChange={(e) => form.setData('email', e.target.value)}
                                placeholder="Email"
                                className="w-full rounded-md border border-maha-200 bg-maha-50 px-4 py-3 text-sm text-ink placeholder:text-ink/50 focus:border-subheading focus:outline-none"
                            />
                            {form.errors.email && <p className="mt-1 text-xs text-red-600">{form.errors.email}</p>}
                        </div>

                        {formContent.branchOptions.length > 0 && (
                            <div>
                                <select
                                    value={form.data.branch}
                                    onChange={(e) => form.setData('branch', e.target.value)}
                                    className="w-full rounded-md border border-maha-200 bg-maha-50 px-4 py-3 text-sm text-ink focus:border-subheading focus:outline-none"
                                >
                                    <option value="">Chi nhánh bạn quan tâm</option>
                                    {formContent.branchOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                {form.errors.branch && <p className="mt-1 text-xs text-red-600">{form.errors.branch}</p>}
                            </div>
                        )}

                        <div>
                            <textarea
                                value={form.data.message}
                                onChange={(e) => form.setData('message', e.target.value)}
                                placeholder="Nội dung (Yêu cầu dịch vụ, thời gian,...)"
                                rows={4}
                                className="w-full resize-none rounded-md border border-maha-200 bg-maha-50 px-4 py-3 text-sm text-ink placeholder:text-ink/50 focus:border-subheading focus:outline-none"
                            />
                            {form.errors.message && <p className="mt-1 text-xs text-red-600">{form.errors.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={form.processing}
                            className="w-full rounded-md bg-heading px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {form.processing ? 'Đang gửi...' : 'Gửi thông tin'}
                        </button>

                        {form.recentlySuccessful && (
                            <p className="text-center text-sm text-subheading">Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm.</p>
                        )}

                        {privacyNote && (
                            <p className="flex items-center justify-center gap-1.5 text-center text-xs text-ink/50">
                                <Lock className="h-3.5 w-3.5" strokeWidth={1.5} />
                                {privacyNote}
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
}
