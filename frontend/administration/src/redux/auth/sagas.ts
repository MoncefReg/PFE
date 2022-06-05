import { put, takeEvery } from 'redux-saga/effects';
import ApiEvent from 'src/utils/ApiEvent';
import fetcher from 'src/utils/fetcher';
import handleFailures from 'src/utils/handleFailures';
import { makeSession } from 'src/utils/helpers';
import { loginFailed, loginSuccess } from './actions';
import { LOGIN } from './const';

function* login({ payload: creds }: any): Generator<any> {
  try {
    const response: any = yield fetcher.post('/auth/login/', creds);
    const token = response.data.key;
    makeSession({ token });
    yield put(loginSuccess(new ApiEvent({})));
  } catch (error: any) {
    yield put(handleFailures(error.response, loginFailed));
  }
}

function* watchLogin() {
  yield takeEvery(LOGIN, login);
}

const AuthSagas = [watchLogin()];

export default AuthSagas;
