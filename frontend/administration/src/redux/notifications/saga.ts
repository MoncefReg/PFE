import { put, takeEvery } from 'redux-saga/effects';
import fetcher from 'src/utils/fetcher';
import handleFailures from 'src/utils/handleFailures';
import {
  fetchNotificationsFailed,
  fetchNotificationsSuccess,
  markNotificationSeenFailed,
  markNotificationSeenSuccess
} from './actions';
import { FETCH_NOTIFICATIONS, MARK_NOTIFICATION_SEEN } from './const';

function* fetchItems(): Generator<any> {
  try {
    const response: any = yield fetcher.get('/staff/notifications/');
    yield put(fetchNotificationsSuccess(response.data));
  } catch (error: any) {
    yield put(handleFailures(error.response, fetchNotificationsFailed));
  }
}

function* markSeen({ payload: id }: any): Generator<any> {
  try {
    const response: any = yield fetcher.patch(
      `/staff/notifications/${id}/mark-seen/`
    );
    yield put(markNotificationSeenSuccess(response.data));
  } catch (error: any) {
    yield put(handleFailures(error.response, markNotificationSeenFailed));
  }
}

function* watchFetch(): Generator<any> {
  yield takeEvery(FETCH_NOTIFICATIONS as any, fetchItems);
}

function* watchMarkSeen(): Generator<any> {
  yield takeEvery(MARK_NOTIFICATION_SEEN as any, markSeen);
}

const NotificationsSaga = [watchFetch(), watchMarkSeen()];

export default NotificationsSaga;
