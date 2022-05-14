import { all } from 'redux-saga/effects';
import DevicesSagas from './devices_management/sagas';

export default function* rootSaga(): Generator<any> {
  yield all([...DevicesSagas]);
}
