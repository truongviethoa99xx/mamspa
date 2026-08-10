import { usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { loadRemoteTranslations } from '@/i18n';
import type { SharedProps } from '@/types';

const REMOTE_LOCALES = ['vi', 'en', 'ja', 'ko', 'zh'] as const;

export function useLocale() {
    const { props } = usePage<SharedProps>();
    const { i18n } = useTranslation();

    if (props.locale && i18n.language !== props.locale) {
        void i18n.changeLanguage(props.locale);
        // Đổi ngôn ngữ qua LanguageSwitcher là điều hướng SPA (không reload trang),
        // nên bundle remote translations của ngôn ngữ mới có thể chưa tải — xem
        // resources/js/i18n/index.ts (chỉ tải sẵn đúng 1 ngôn ngữ ban đầu).
        if ((REMOTE_LOCALES as readonly string[]).includes(props.locale)) {
            void loadRemoteTranslations(props.locale as (typeof REMOTE_LOCALES)[number]);
        }
    }

    return props.locale;
}
