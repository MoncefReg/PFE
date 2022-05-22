import { put, takeEvery } from 'redux-saga/effects';
import ApiEvent from 'src/utils/ApiEvent';
import fetcher from 'src/utils/fetcher';
import handleFailures from 'src/utils/handleFailures';
import {
  deleteLogFailed,
  deleteLogSuccess,
  fetchLogFailed,
  fetchLogsFailed,
  fetchLogsSuccess,
  fetchLogSuccess,
  updateLogsFailed,
  updateLogSuccess
} from './actions';
import { DELETE_LOG, FETCH_LOG, FETCH_LOGS, UPDATE_LOG } from './const';

function* fetchItems({ payload: params }: any): Generator<any> {
  try {
    const response: any = yield fetcher.get('/staff/logs/', { params });
    yield put(fetchLogsSuccess(response.data));
  } catch (error: any) {
    yield put(handleFailures(error.response, fetchLogsFailed));
  }
}

function* updateItem({ payload: data }: any): Generator<any> {
  try {
    yield fetcher.put(`/staff/logs/${data.id}/`, data);
    yield put(updateLogSuccess(new ApiEvent({})));
  } catch (error: any) {
    yield put(handleFailures(error.response, updateLogsFailed));
  }
}

function* deleteItem({ payload: id }: { payload: any }): Generator<any> {
  try {
    yield fetcher.delete(`/staff/logs/${id}/`);
    yield put(deleteLogSuccess(new ApiEvent({})));
  } catch (error: any) {
    yield put(handleFailures(error.response, deleteLogFailed));
  }
}

function* fetchItem({ payload: id }: any): Generator<any> {
  try {
    const response: any = yield fetcher.get(`/staff/logs/${id}/`);
    yield put(fetchLogSuccess(response.data));
  } catch (error: any) {
    yield put(handleFailures(error.response, fetchLogFailed));
  }
}

function* watchFetchItems(): Generator<any> {
  yield takeEvery<any>(FETCH_LOGS, fetchItems);
}

function* watchUpdateItems(): Generator<any> {
  yield takeEvery<any>(UPDATE_LOG, updateItem);
}

function* watchDeleteItems(): Generator<any> {
  yield takeEvery<any>(DELETE_LOG, deleteItem);
}

function* watchFetchItem(): Generator<any> {
  yield takeEvery<any>(FETCH_LOG, fetchItem);
}

const LogsSagas = [
  watchFetchItems(),
  watchUpdateItems(),
  watchDeleteItems(),
  watchFetchItem()
];

export default LogsSagas;
