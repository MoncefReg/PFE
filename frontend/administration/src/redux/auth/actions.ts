import {
  CHANGE_EMAIL,
  CHANGE_EMAIL_FAILED,
  CHANGE_EMAIL_SUCCESS,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_FAILED,
  CHANGE_PASSWORD_SUCCESS,
  CONFIRM_EMAIL_CHANGE,
  CONFIRM_EMAIL_CHANGE_FAILED,
  CONFIRM_EMAIL_CHANGE_SUCCESS,
  FETCH_PROFILE_INFOS,
  FETCH_PROFILE_INFOS_FAILED,
  FETCH_PROFILE_INFOS_SUCCESS,
  LOGIN,
  LOGIN_FAILED,
  LOGIN_SUCCESS
} from './const';

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

/**
 *
 * @param {*} payload - New password data
 * @returns
 */
export const changePassword = (payload: any) => ({
  type: CHANGE_PASSWORD,
  payload
});

/**
 *
 * @param {*} payload - Redux success event
 * @returns
 */
export const changePasswordSuccess = (payload: any) => ({
  type: CHANGE_PASSWORD_SUCCESS,
  payload
});

/**
 *
 * @param {*} error - Redux error event
 * @returns
 */
export const changePasswordFailed = (payload: any) => ({
  type: CHANGE_PASSWORD_FAILED,
  payload
});

/**
 *
 * @param {*} email - user new email
 * @returns
 */
export const changeEmail = (payload: any) => ({
  type: CHANGE_EMAIL,
  payload
});

/**
 *
 * @param {*} event - Redux success event
 * @returns
 */
export const changeEmailSuccess = (payload: any) => ({
  type: CHANGE_EMAIL_SUCCESS,
  payload
});

/**
 *
 * @param {*} error - Request errors
 * @returns
 */
export const changeEmailFailed = (payload: any) => ({
  type: CHANGE_EMAIL_FAILED,
  payload
});

/**
 *
 * @param {*} code - OTP confirmation code
 * @returns
 */
export const confirmEmailChange = (payload: any) => ({
  type: CONFIRM_EMAIL_CHANGE,
  payload
});

/**
 *
 * @param {*} event - Redux success event
 * @returns
 */
export const confirmEmailChangeSuccess = (payload: any) => ({
  type: CONFIRM_EMAIL_CHANGE_SUCCESS,
  payload
});

/**
 *
 * @param {*} error - Request errors
 * @returns
 */
export const confirmEmailChangeFailed = (payload: any) => ({
  type: CONFIRM_EMAIL_CHANGE_FAILED,
  payload
});

/**
 *
 * @returns
 */
export const fetchProfileInfos = () => ({
  type: FETCH_PROFILE_INFOS
});

/**
 *
 * @param {*} data - Profile data
 * @returns
 */
export const fetchProfileInfosSuccess = (payload: any) => ({
  type: FETCH_PROFILE_INFOS_SUCCESS,
  payload
});

/**
 *
 * @param {*} error - Request errors
 * @returns
 */
export const fetchProfileInfosFailed = (payload: any) => ({
  type: FETCH_PROFILE_INFOS_FAILED,
  payload
});
