import { put, takeEvery } from 'redux-saga/effects';
import ApiEvent from 'src/utils/ApiEvent';
import fetcher from 'src/utils/fetcher';
import handleFailures from 'src/utils/handleFailures';
import { makeSession } from 'src/utils/helpers';
import {
  changeEmailFailed,
  changeEmailSuccess,
  changePasswordFailed,
  changePasswordSuccess,
  confirmEmailChangeFailed,
  confirmEmailChangeSuccess,
  fetchProfileInfosFailed,
  fetchProfileInfosSuccess,
  loginFailed,
  loginSuccess
} from './actions';
import {
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  CONFIRM_EMAIL_CHANGE,
  FETCH_PROFILE_INFOS,
  LOGIN
} from './const';

function* login({ payload: creds }: any): Generator<any> {
  try {
    const response: any = yield fetcher.post('/auth/login/', creds);
    const token = response.data.key;
    const { email, is_confirmed } = response.data.user;
    makeSession({ token, email, confirmed: is_confirmed });
    yield put(loginSuccess(new ApiEvent({})));
  } catch (error: any) {
    yield put(handleFailures(error.response, loginFailed));
  }
}

function* changePWD({ payload: data }: any) {
  try {
    yield fetcher.post('auth/password/change/', data);
    yield put(changePasswordSuccess(new ApiEvent({})));
  } catch (error: any) {
    yield put(handleFailures(error.response, changePasswordFailed));
  }
}

function* changeEmail({ payload: email }: any) {
  try {
    yield fetcher.post('auth/email/change/', { email });
    yield put(changeEmailSuccess(new ApiEvent({})));
  } catch (error: any) {
    yield put(handleFailures(error.response, changeEmailFailed));
  }
}

function* confirmEmailChange({ payload: code }: any) {
  try {
    yield fetcher.post('auth/email/verify-otp/', { key: code });
    yield put(confirmEmailChangeSuccess(new ApiEvent({})));
  } catch (error: any) {
    yield put(handleFailures(error.response, confirmEmailChangeFailed));
  }
}

function* fetchProfile(): Generator<any> {
  try {
    const response: any = yield fetcher.get('/auth/user/');
    yield put(fetchProfileInfosSuccess(response.data));
  } catch (error: any) {
    yield put(handleFailures(error.response, fetchProfileInfosFailed));
  }
}

function* watchLogin() {
  yield takeEvery(LOGIN, login);
}

function* watchChangePWD() {
  yield takeEvery(CHANGE_PASSWORD, changePWD);
}

function* watchChangeEmail() {
  yield takeEvery(CHANGE_EMAIL, changeEmail);
}

function* watchConfirmEmailChange() {
  yield takeEvery(CONFIRM_EMAIL_CHANGE, confirmEmailChange);
}

function* watchFetchProfile() {
  yield takeEvery(FETCH_PROFILE_INFOS, fetchProfile);
}

const AuthSagas = [
  watchLogin(),
  watchChangePWD(),
  watchChangeEmail(),
  watchConfirmEmailChange(),
  watchFetchProfile()
];

export default AuthSagas;
