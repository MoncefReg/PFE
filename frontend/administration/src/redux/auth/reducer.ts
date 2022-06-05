import { Reducer } from 'react';
import { LOGIN, LOGIN_FAILED, LOGIN_SUCCESS } from './const';

interface State {
  error: any;
  loading: boolean;
  loginSuccess?: any;
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
      return { ...state, loading: true };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loginSuccess: payload
      };
    case LOGIN_FAILED:
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
