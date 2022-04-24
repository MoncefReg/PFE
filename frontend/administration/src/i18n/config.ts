import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { DEBUG } from 'src/constants';
// English
import en_common from './en/common.json';
import en_errors from './en/errors.json';
// arabic
import ar_common from './ar/common.json';
import ar_errors from './ar/errors.json';

export const resources = {
  en: {
    common: en_common,
    errors: en_errors
  },
  ar: {
    common: ar_common,
    errors: ar_errors
  }
};

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  debug: DEBUG,
  ns: ['common', 'errors'],
  supportedLngs: ['en', 'ar'],
  resources,
  returnEmptyString: false,
  defaultNS: 'common'
});
