import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export function Footer() {
    const { t } = useTranslation();
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-maha-100 bg-maha-50 text-maha-900">
            <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-4">
                <div>
                    <p className="font-serif text-xl text-maha-700">Maha Spa</p>
                    <p className="mt-2 text-sm">{t('footer.tagline')}</p>
                </div>
                <div>
                    <h4 className="mb-2 font-semibold">{t('footer.branches')}</h4>
                    <ul className="space-y-1 text-sm">
                        <li>
                            <Link href="/about-us/heritage">Maha Heritage — 26 Nguyễn Văn Thoại</Link>
                        </li>
                        <li>
                            <Link href="/about-us/signature">Maha Signature — 185 Hồ Nghinh</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className="mb-2 font-semibold">{t('footer.contact')}</h4>
                    <ul className="space-y-1 text-sm">
                        <li>(+84) 934 743 026</li>
                        <li>(+84) 978 456 185</li>
                        <li>hello@mahaspa.vn</li>
                    </ul>
                </div>
                <div>
                    <h4 className="mb-2 font-semibold">{t('footer.follow')}</h4>
                    <ul className="space-y-1 text-sm">
                        <li>
                            <a href="https://facebook.com/mahaSpa.danang" target="_blank" rel="noreferrer">Facebook</a>
                        </li>
                        <li>
                            <a href="https://instagram.com/mahaspa.danang" target="_blank" rel="noreferrer">Instagram</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-maha-100 px-4 py-4 text-center text-xs text-maha-700">
                {t('footer.rights', { year })}
            </div>
        </footer>
    );
}
