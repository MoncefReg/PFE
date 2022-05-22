import { INotification } from 'src/models';
import {
  FETCH_NOTIFICATIONS,
  FETCH_NOTIFICATIONS_FAILED,
  FETCH_NOTIFICATIONS_SUCCESS,
  MARK_NOTIFICATION_SEEN,
  MARK_NOTIFICATION_SEEN_FAILED,
  MARK_NOTIFICATION_SEEN_SUCCESS,
  UPDATE_NOTIFICATIONS_REAL_TIME
} from './const';

const initialState = {
  notifications: [],
  error: null
};

const NotificationsReducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case FETCH_NOTIFICATIONS:
    case MARK_NOTIFICATION_SEEN:
      return { ...state, loading: true };

    case FETCH_NOTIFICATIONS_SUCCESS:
      return { ...state, loading: false, notifications: payload };
    case MARK_NOTIFICATION_SEEN_SUCCESS:
      return {
        ...state,
        loading: false,
        notifications: state.notifications.filter(
          (notification: INotification) => notification.id !== payload?.id
        )
      };

    case FETCH_NOTIFICATIONS_FAILED:
    case MARK_NOTIFICATION_SEEN_FAILED:
      return { ...state, loading: false, error: payload };

    case UPDATE_NOTIFICATIONS_REAL_TIME:
      return {
        ...state,
        notifications: [payload as INotification, ...state.notifications]
      };

    default:
      return state;
  }
};

export default NotificationsReducer;
