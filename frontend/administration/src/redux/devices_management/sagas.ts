import { put, takeEvery } from 'redux-saga/effects';
import { Device } from 'src/models';
import ApiEvent from 'src/utils/ApiEvent';
import fetcher from 'src/utils/fetcher';
import handleFailures from 'src/utils/handleFailures';
import {
  createDeviceFailed,
  createDeviceSuccess,
  deleteDeviceFailed,
  deleteDeviceSuccess,
  fetchDevicesFailed,
  fetchDevicesSuccess,
  updateDevicesFailed,
  updateDeviceSuccess
} from './actions';
import {
  CREATE_DEVICE,
  DELETE_DEVICE,
  FETCH_DEVICES,
  UPDATE_DEVICE
} from './const';

function* fetchItems({ payload: params }: any): Generator<any> {
  try {
    const response: any = yield fetcher.get('/devices/nodes/', { params });
    yield put(fetchDevicesSuccess(response.data));
  } catch (error: any) {
    yield put(handleFailures(error.response, fetchDevicesFailed));
  }
}

function* createItem({ payload: data }: { payload: Device }): Generator<any> {
  try {
    yield fetcher.post(`/devices/nodes/`, data);
    yield put(createDeviceSuccess(new ApiEvent({})));
  } catch (error: any) {
    yield put(handleFailures(error.response, createDeviceFailed));
  }
}

function* updateItem({ payload: data }: { payload: Device }): Generator<any> {
  try {
    yield fetcher.put(`/devices/nodes/${data.id}/`, data);
    yield put(updateDeviceSuccess(new ApiEvent({})));
  } catch (error: any) {
    yield put(handleFailures(error.response, updateDevicesFailed));
  }
}

function* deleteItem({ payload: id }: { payload: any }): Generator<any> {
  try {
    yield fetcher.delete(`/devices/nodes/${id}/`);
    yield put(deleteDeviceSuccess(new ApiEvent({})));
  } catch (error: any) {
    yield put(handleFailures(error.response, deleteDeviceFailed));
  }
}

function* watchFetchItems(): Generator<any> {
  yield takeEvery<any>(FETCH_DEVICES, fetchItems);
}

function* watchCreateItem(): Generator<any> {
  yield takeEvery<any>(CREATE_DEVICE, createItem);
}
function* watchUpdateItems(): Generator<any> {
  yield takeEvery<any>(UPDATE_DEVICE, updateItem);
}
function* watchDeleteItems(): Generator<any> {
  yield takeEvery<any>(DELETE_DEVICE, deleteItem);
}

const DevicesSagas = [
  watchFetchItems(),
  watchCreateItem(),
  watchUpdateItems(),
  watchDeleteItems()
];

export default DevicesSagas;
