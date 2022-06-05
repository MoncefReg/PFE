import { LOGIN, LOGIN_FAILED, LOGIN_SUCCESS } from './const';

/**
 *
 * @param payload - data
 * @returns
 */
export const login = (payload: any) => ({
  type: LOGIN,
  payload
});

/**
 *
 * @param payload - success event
 * @returns
 */
export const loginSuccess = (payload: any) => ({
  type: LOGIN_SUCCESS,
  payload
});

/**
 *
 * @param payload - request errors
 * @returns
 */
export const loginFailed = (payload: any) => ({
  type: LOGIN_FAILED,
  payload
});
