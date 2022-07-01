export const DEBUG = process.env.NODE_ENV === 'development';

export const UNAUTH_REDIRECT_DEFAULT = '/login';
export const AUTH_REDIRECT_DEFAULT = '/account';

export const LANGUAGES = {
  ENGLISH: 'en',
  ARABIC: 'ar'
};

export const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'http://localhost'
    : 'http://localhost';
export const WS_URL =
  process.env.NODE_ENV === 'production'
    ? 'ws://localhost:8888'
    : 'ws://localhost:8888';
export const STREAM_URL =
  process.env.NODE_ENV === 'production'
    ? 'http://localhost/video'
    : 'http://localhost/video';

export const PAGINATION_OPTIONS = [10, 25, 50];

export const ENGLISH_DATE_FORMAT = 'MM/DD/YYYY';
export const ENGLISH_DATE_FORMAT_HELPER = 'mm/dd/yyyy';
export const FULL_ENGLISH_DATE_FORMAT = 'MMMM DD YYYY';

export const ENGLISH_DATE_TIME_FORMAT = 'MM/DD/YYYY HH:mm';
export const ENGLISH_FULL_DATE_TIME_FORMAT = 'MMMM DD YYYY HH:mm a';
export const ENGLISH_DATE_TIME_FORMAT_HELPER = 'mm/dd/yyyy  hh:mm';

export const ARABIC_DATE_FORMAT = 'YYYY/MM/DD';
export const ARABIC_DATE_FORMAT_HELPER = 'yyyy/mm/dd';
export const FULL_ARABIC_DATE_FORMAT = 'YYYY MMMM DD';

export const ARABIC_DATE_TIME_FORMAT = 'YYYY/MM/DD HH:mm';
export const ARABIC_FULL_DATE_TIME_FORMAT = 'DD MMMM YYYY HH:mm';
export const ARABIC_DATE_TIME_FORMAT_HELPER = 'hh:mm yyyy/mm/dd';
