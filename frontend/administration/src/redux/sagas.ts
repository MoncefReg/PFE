import { all } from 'redux-saga/effects';
import ClustersSagas from './clusters_management/sagas';
import DevicesSagas from './devices_management/sagas';
import EmployeesSagas from './staff_management/sagas';

export default function* rootSaga(): Generator<any> {
  yield all([...DevicesSagas, ...ClustersSagas, ...EmployeesSagas]);
}
