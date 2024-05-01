import  XHR from 'i18next-xhr-backend';
import i18n from 'i18next';
import { initReactI18next } from "react-i18next";

i18n.use(XHR).use(initReactI18next).init({
    fallbackLng: 'en',
    ns: ['trans'],
    defaultNS: 'trans',
    debug: true,
    interpolation: {
      escapeValue: false
    },

  })

export default i18n