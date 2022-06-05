import { Reducer } from 'react';
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

interface State {
  error: any;
  loading: boolean;
  loginSuccess?: any;
  updatePassSuccess?: any;
  updateEmailSuccess?: any;
  confirmEmailSuccess?: any;
  profileData?: any;
}

const initialState: State = {
  error: null,
  loading: false
};

const AuthReducer: Reducer<State, any> = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case LOGIN:
    case CHANGE_PASSWORD:
    case CHANGE_EMAIL:
    case CONFIRM_EMAIL_CHANGE:
    case FETCH_PROFILE_INFOS:
      return { ...state, loading: true };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loginSuccess: payload
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        updatePassSuccess: payload
      };
    case CHANGE_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        updateEmailSuccess: payload
      };
    case CONFIRM_EMAIL_CHANGE_SUCCESS:
      return {
        ...state,
        loading: false,
        confirmEmailSuccess: payload
      };
    case FETCH_PROFILE_INFOS_SUCCESS:
      return {
        ...state,
        loading: false,
        profileData: payload
      };

    case LOGIN_FAILED:
    case CHANGE_PASSWORD_FAILED:
    case CHANGE_EMAIL_FAILED:
    case CONFIRM_EMAIL_CHANGE_FAILED:
    case FETCH_PROFILE_INFOS_FAILED:
      return {
        ...state,
        loading: false,
        error: payload
      };
    default:
      return state;
  }
};

export default AuthReducer;
