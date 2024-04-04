import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpApi) // загружает переводы с сервера
  .use(LanguageDetector) // определяет язык пользователя
  .use(initReactI18next) // инициализирует react-i18next
  .init({
    fallbackLng: 'en',
    detection: {
      order: ['queryString', 'cookie', 'localStorage', 'path', 'subdomain'],
      caches: ['cookie'],
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // путь к файлам локализации
    },
  });

export default i18n;
