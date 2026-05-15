import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { SharedProps } from '@/types';

export function useLocale() {
    const { props } = usePage<SharedProps>();
    const { i18n } = useTranslation();

    useEffect(() => {
        if (props.locale && i18n.language !== props.locale) {
            i18n.changeLanguage(props.locale);
        }
    }, [props.locale, i18n]);

    return props.locale;
}
