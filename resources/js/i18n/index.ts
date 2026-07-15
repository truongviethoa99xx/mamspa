import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import vi from './vi.json';
import en from './en.json';
import ja from './ja.json';
import ko from './ko.json';
import zh from './zh.json';

function unflatten(obj: Record<string, string>): Record<string, unknown> {
    const out: Record<string, any> = {};
    for (const [k, v] of Object.entries(obj)) {
        const parts = k.split('.');
        let curr = out;
        for (let i = 0; i < parts.length - 1; i++) {
            curr[parts[i]] = curr[parts[i]] ?? {};
            curr = curr[parts[i]];
        }
        curr[parts[parts.length - 1]] = v;
    }
    return out;
}

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            vi: { translation: vi },
            en: { translation: en },
            ja: { translation: ja },
            ko: { translation: ko },
            zh: { translation: zh },
        },
        fallbackLng: 'vi',
        supportedLngs: ['vi', 'en', 'ja', 'ko', 'zh'],
        interpolation: { escapeValue: false },
        detection: {
            order: ['querystring', 'localStorage', 'navigator'],
            lookupQuerystring: 'lang',
            caches: ['localStorage'],
        },
    });

/**
 * Tải translations từ DB qua API và merge vào i18next.
 * Strings JSON tĩnh hoạt động như fallback nếu API fail.
 */
export async function loadRemoteTranslations(lang: 'vi' | 'en' | 'ja' | 'ko' | 'zh'): Promise<void> {
    try {
        const res = await fetch(`/i18n/${lang}/`, { headers: { Accept: 'application/json' } });
        if (!res.ok) return;
        const flat = (await res.json()) as Record<string, string>;
        i18n.addResourceBundle(lang, 'translation', unflatten(flat), true, true);
    } catch {
        // dùng fallback JSON đã load sẵn
    }
}

if (typeof window !== 'undefined') {
    void loadRemoteTranslations('vi');
    void loadRemoteTranslations('en');
    void loadRemoteTranslations('ja');
    void loadRemoteTranslations('ko');
    void loadRemoteTranslations('zh');
}

export default i18n;
