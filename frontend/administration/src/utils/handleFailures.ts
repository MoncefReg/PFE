import i18next from 'i18next';
import { API_ERRORS } from 'src/models';
import ApiEvent from './ApiEvent';

export function extractErrorMsg(data: any) {
  if (typeof data == 'string') return [data];

  const msgs: string[] = [];
  Object.keys(data).forEach((key) => {
    if (Array.isArray(data[key])) {
      data[key].forEach((error: string) => {
        msgs.push(error);
      });
    } else {
      msgs.push(data[key]);
    }
  });
  return msgs;
}

type contentType = { msgs: string[]; type: API_ERRORS };

export function errorEvent(response: any) {
  if (response) {
    switch (response.status) {
      case 401:
        return new ApiEvent<contentType>({
          msgs: [i18next.t('API_ERRORS.INVALID_OR_EXPIRED_AUTH')],
          type: API_ERRORS.INVALID_OR_EXPIRED_AUTH
        });
      case 400:
        return new ApiEvent<contentType>({
          msgs: extractErrorMsg(response.data),
          type: API_ERRORS.BAD_REQUEST
        });
      case 404:
        return new ApiEvent<contentType>({
          msgs: [i18next.t('API_ERRORS.CONTENT_NOT_FOUND')],
          type: API_ERRORS.CONTENT_NOT_FOUND
        });
      case 500:
        return new ApiEvent<contentType>({
          msgs: [i18next.t('API_ERRORS.INTERNAL_SERVER_ERROR')],
          type: API_ERRORS.INTERNAL_SERVER_ERROR
        });
      default:
        return new ApiEvent<contentType>({
          msgs: [i18next.t('API_ERRORS.UNKNOW_ERROR')],
          type: API_ERRORS.UNKNOW_ERROR
        });
    }
  }
}

export default function handleFailures(response: any, failAction: any) {
  return failAction(errorEvent(response));
}
