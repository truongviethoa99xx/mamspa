import { FormEvent } from 'react';
import { useForm } from '@inertiajs/react';
import { Mail } from 'lucide-react';

interface NewsletterForm {
    email: string;
    website: string;
}

/** Khối đăng ký nhận tin cuối trang Blog — input email đơn giản, không phải field CMS. */
export function BlogNewsletter() {
    const form = useForm<NewsletterForm>({ email: '', website: '' });

    const submit = (event: FormEvent) => {
        event.preventDefault();
        form.post('/newsletter', {
            preserveScroll: true,
            onSuccess: () => form.reset('email'),
        });
    };

    return (
        <section className="bg-maha-100 px-5 py-12 sm:px-10 lg:px-16">
            <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-subheading">
                        <Mail className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <div>
                        <h2 className="font-serif text-xl text-heading sm:text-2xl">Đăng ký nhận thông tin từ Mầm</h2>
                        <p className="mt-1 max-w-md text-sm text-ink/70">
                            Nhận những bài viết hữu ích, ưu đãi đặc biệt và cập nhật mới nhất từ Mầm Spa.
                        </p>
                    </div>
                </div>

                <form onSubmit={submit} noValidate className="w-full max-w-md lg:w-auto">
                    {/* Honeypot chống bot — ẩn khỏi người dùng thật bằng CSS, không dùng type="hidden" để bot khó phát hiện hơn. */}
                    <input
                        type="text"
                        name="website"
                        value={form.data.website}
                        onChange={(e) => form.setData('website', e.target.value)}
                        tabIndex={-1}
                        autoComplete="off"
                        className="absolute h-0 w-0 opacity-0"
                        aria-hidden="true"
                    />

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <input
                            type="email"
                            required
                            value={form.data.email}
                            onChange={(e) => form.setData('email', e.target.value)}
                            placeholder="Nhập email của bạn"
                            className="input-base text-sm sm:w-64"
                        />
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="shrink-0 rounded-md bg-heading px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {form.processing ? 'Đang gửi...' : 'Đăng ký'}
                        </button>
                    </div>

                    {form.errors.email && <p className="mt-2 text-xs text-red-600">{form.errors.email}</p>}
                    {form.recentlySuccessful && !form.errors.email && (
                        <p className="mt-2 text-xs text-subheading">Cảm ơn bạn đã đăng ký!</p>
                    )}
                    {!form.recentlySuccessful && !form.errors.email && (
                        <p className="mt-2 text-xs text-ink/50">Chúng tôi tôn trọng quyền riêng tư của bạn.</p>
                    )}
                </form>
            </div>
        </section>
    );
}
