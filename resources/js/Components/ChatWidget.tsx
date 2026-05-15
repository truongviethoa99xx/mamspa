import { MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function ChatWidget() {
    const { t } = useTranslation();
    return (
        <a
            href="https://zalo.me/0934743026"
            target="_blank"
            rel="noreferrer"
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-maha-600 text-white shadow-lg transition hover:bg-maha-700"
            aria-label={t('common.chat')}
        >
            <MessageCircle className="h-6 w-6" />
        </a>
    );
}
