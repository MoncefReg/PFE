import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { DEBUG } from 'src/constants';
import en_common from './en/common.json';
import en_errors from './en/errors.json';

export const resources = {
  en: {
    common: en_common,
    errors: en_errors
  }
};

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  debug: DEBUG,
  ns: ['common', 'errors'],
  supportedLngs: ['en'],
  resources,
  returnEmptyString: false,
  defaultNS: 'common'
});
