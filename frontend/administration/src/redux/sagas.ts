import { all } from 'redux-saga/effects';
import AuthSagas from './auth/sagas';
import ClustersSagas from './clusters_management/sagas';
import DevicesSagas from './devices_management/sagas';
import LogsSagas from './logs/sagas';
import NotificationsSaga from './notifications/saga';
import EmployeesSagas from './staff_management/sagas';

export default function* rootSaga(): Generator<any> {
  yield all([
    ...DevicesSagas,
    ...ClustersSagas,
    ...EmployeesSagas,
    ...LogsSagas,
    ...NotificationsSaga,
    ...AuthSagas
  ]);
}
