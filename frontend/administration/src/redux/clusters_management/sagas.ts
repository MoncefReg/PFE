import { put, takeEvery } from 'redux-saga/effects';
import { Cluster } from 'src/models';
import ApiEvent from 'src/utils/ApiEvent';
import fetcher from 'src/utils/fetcher';
import handleFailures from 'src/utils/handleFailures';
import {
  createClusterFailed,
  createClusterSuccess,
  deleteClusterSuccess,
  fetchClustersFailed,
  fetchClustersSuccess,
  updateClusterSuccess
} from './actions';
import {
  CREATE_CLUSTER,
  DELETE_CLUSTER,
  FETCH_CLUSTERS,
  UPDATE_CLUSTER
} from './const';

function* fetchItems({ payload: params }: any): Generator<any> {
  try {
    const response: any = yield fetcher.get('/devices/clusters/', { params });
    yield put(fetchClustersSuccess(response.data));
  } catch (error: any) {
    yield put(handleFailures(error.response, fetchClustersFailed));
  }
}

function* createItem({ payload: data }: { payload: Cluster }): Generator<any> {
  try {
    yield fetcher.post(`/devices/clusters/`, data);
    yield put(createClusterSuccess(new ApiEvent({})));
  } catch (error: any) {
    yield put(handleFailures(error.response, createClusterFailed));
  }
}

function* updateItem({ payload: data }: { payload: Cluster }): Generator<any> {
  try {
    yield fetcher.put(`/devices/clusters/${data.id}/`, data);
    yield put(updateClusterSuccess(new ApiEvent({})));
  } catch (error: any) {
    yield put(handleFailures(error.response, createClusterFailed));
  }
}

function* deleteItem({ payload: id }: { payload: any }): Generator<any> {
  try {
    yield fetcher.delete(`/devices/clusters/${id}/`);
    yield put(deleteClusterSuccess(new ApiEvent({})));
  } catch (error: any) {
    yield put(handleFailures(error.response, createClusterFailed));
  }
}

function* watchFetchItems(): Generator<any> {
  yield takeEvery<any>(FETCH_CLUSTERS, fetchItems);
}

function* watchCreateItem(): Generator<any> {
  yield takeEvery<any>(CREATE_CLUSTER, createItem);
}
function* watchUpdateItems(): Generator<any> {
  yield takeEvery<any>(UPDATE_CLUSTER, updateItem);
}
function* watchDeleteItems(): Generator<any> {
  yield takeEvery<any>(DELETE_CLUSTER, deleteItem);
}

const ClustersSagas = [
  watchFetchItems(),
  watchCreateItem(),
  watchUpdateItems(),
  watchDeleteItems()
];

export default ClustersSagas;
