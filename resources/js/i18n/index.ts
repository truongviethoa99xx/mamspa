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

const loadedRemoteLocales = new Set<string>();

/**
 * Tải translations từ DB qua API và merge vào i18next.
 * Strings JSON tĩnh hoạt động như fallback nếu API fail. Bỏ qua nếu ngôn ngữ này
 * đã tải rồi — mỗi lượt xem trang chỉ cần đúng 1 ngôn ngữ đang hiển thị, không
 * cần tải trước cả 5 (từng khiến trang chờ 4 request /i18n/* thừa trước khi
 * render, làm LCP mobile vọt lên >10s theo PageSpeed).
 */
export async function loadRemoteTranslations(lang: 'vi' | 'en' | 'ja' | 'ko' | 'zh'): Promise<void> {
    if (loadedRemoteLocales.has(lang)) return;
    loadedRemoteLocales.add(lang);

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
    const initialLang = document.documentElement.lang.split('-')[0];
    void loadRemoteTranslations(['vi', 'en', 'ja', 'ko', 'zh'].includes(initialLang) ? (initialLang as 'vi' | 'en' | 'ja' | 'ko' | 'zh') : 'vi');
}

export default i18n;
