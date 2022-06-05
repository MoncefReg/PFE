import i18next from 'i18next';
import moment from 'moment';
import {
  ARABIC_DATE_FORMAT,
  ARABIC_DATE_FORMAT_HELPER,
  ARABIC_DATE_TIME_FORMAT,
  ARABIC_DATE_TIME_FORMAT_HELPER,
  ARABIC_FULL_DATE_TIME_FORMAT,
  ENGLISH_DATE_FORMAT,
  ENGLISH_DATE_FORMAT_HELPER,
  ENGLISH_DATE_TIME_FORMAT,
  ENGLISH_DATE_TIME_FORMAT_HELPER,
  ENGLISH_FULL_DATE_TIME_FORMAT,
  FULL_ARABIC_DATE_FORMAT,
  FULL_ENGLISH_DATE_FORMAT,
  LANGUAGES
} from 'src/constants';

export function getDateFormat() {
  let dateFormat,
    dateHelper,
    fullFormat,
    datetimeFormat,
    fullDatetimeFormat,
    datetimehelper;
  // eslint-disable-next-line
  switch (i18next.language) {
    case LANGUAGES.ENGLISH:
      dateFormat = ENGLISH_DATE_FORMAT;
      dateHelper = ENGLISH_DATE_FORMAT_HELPER;
      fullFormat = FULL_ENGLISH_DATE_FORMAT;
      datetimeFormat = ENGLISH_DATE_TIME_FORMAT;
      fullDatetimeFormat = ENGLISH_FULL_DATE_TIME_FORMAT;
      datetimehelper = ENGLISH_DATE_TIME_FORMAT_HELPER;
      break;
    case LANGUAGES.ARABIC:
      dateFormat = ARABIC_DATE_FORMAT;
      dateHelper = ARABIC_DATE_FORMAT_HELPER;
      fullFormat = FULL_ARABIC_DATE_FORMAT;
      datetimeFormat = ARABIC_DATE_TIME_FORMAT;
      fullDatetimeFormat = ARABIC_FULL_DATE_TIME_FORMAT;
      datetimehelper = ARABIC_DATE_TIME_FORMAT_HELPER;
  }
  return {
    dateFormat,
    dateHelper,
    fullFormat,
    fullDatetimeFormat,
    datetimeFormat,
    datetimehelper
  };
}

export const extractData = (
  item: any = {},
  fields: string[] = [],
  defaultValue: any,
  isDate: boolean | undefined = false
) => {
  let value = item || defaultValue;

  if (item) {
    fields.forEach((field) => {
      value = value[field];
    });
  }
  return isDate ? moment(value) : value;
};

export const makeSession = (data: any) => {
  if (data === null) localStorage.clear();
  else {
    Object.entries(data).forEach(([key, value]: any) => {
      localStorage.setItem(key, value);
    });
  }
};
