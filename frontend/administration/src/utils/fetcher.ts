/* eslint-disable no-undef */
import Axios from 'axios';
import i18next from 'i18next';
import { API_URL, LANGUAGES } from 'src/constants';

const fetcher = Axios.create({
  baseURL: `${API_URL}/api/v1/`,
  timeout: 10000
});

fetcher.interceptors.request.use((config) => {
  const language = i18next.language;
  switch (language) {
    case LANGUAGES.ARABIC:
      Object.assign(config.headers, { 'Accept-Language': 'ar' });
      break;
    default:
      Object.assign(config.headers, { 'Accept-Language': 'en-us' });
      break;
  }

  const token = localStorage.getItem('token');
  if (token) Object.assign(config.headers, { Authorization: `Token ${token}` });

  Object.assign(config.headers, { 'Content-Type': 'application/json' });

  return config;
});

export default fetcher;
