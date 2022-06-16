import { put, takeEvery } from 'redux-saga/effects';
import fetcher from 'src/utils/fetcher';
import handleFailures from 'src/utils/handleFailures';
import { fetchStatsFailed, fetchStatsSuccess } from './actions';
import { FETCH_STATS } from './const';

function* fetchData({ payload: params }: any): Generator<any> {
  try {
    const response: any = yield fetcher.get('/devices/stats/', { params });
    yield put(fetchStatsSuccess(response.data));
  } catch (error: any) {
    yield put(handleFailures(error.response, fetchStatsFailed));
  }
}

function* watchFetchData() {
  yield takeEvery(FETCH_STATS, fetchData);
}

const StatsSagas = [watchFetchData()];

export default StatsSagas;
