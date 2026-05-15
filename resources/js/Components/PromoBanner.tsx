import { useState } from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function PromoBanner({ text, link }: { text: string; link?: string }) {
    const [visible, setVisible] = useState(true);
    const { t } = useTranslation();
    if (!visible) return null;
    const Tag = link ? 'a' : 'div';
    return (
        <div className="relative bg-maha-700 px-4 py-2 text-center text-sm text-white">
            <Tag href={link ?? undefined} className="inline-block">{text}</Tag>
            <button onClick={() => setVisible(false)} className="absolute right-2 top-1/2 -translate-y-1/2"
                aria-label={t('common.closeBanner')}>
                <X className="h-4 w-4" />
            </button>
        </div>
    );
}
