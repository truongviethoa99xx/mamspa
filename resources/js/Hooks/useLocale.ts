import { usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import type { SharedProps } from '@/types';

export function useLocale() {
    const { props } = usePage<SharedProps>();
    const { i18n } = useTranslation();

    if (props.locale && i18n.language !== props.locale) {
        void i18n.changeLanguage(props.locale);
    }

    return props.locale;
}
