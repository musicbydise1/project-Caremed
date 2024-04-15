// i18n.js (или как-то иначе названный)
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import English from "./assets/i18n/en.json"
import Russian from "./assets/i18n/ru.json"
import Kazakh from "./assets/i18n/kz.json"

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: English,
            },
            ru: {
                translation: Russian,
            },
            kz: {
                translation: Kazakh,
            },
        },
        lng: 'en', // язык по умолчанию
        fallbackLng: 'en', // язык для отката
        interpolation: {
            escapeValue: false,
        },
        backend: {
            loadPath: '/assets/i18n/{{lng}}.json'
        }
    });

export default i18n;
