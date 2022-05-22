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

/**
 * Fetch notifications
 * @returns
 */
export const fetchNotifications = () => ({
  type: FETCH_NOTIFICATIONS
});

/**
 *
 * @param payload - fetched notifications
 * @returns
 */
export const fetchNotificationsSuccess = (payload: any) => ({
  type: FETCH_NOTIFICATIONS_SUCCESS,
  payload
});

/**
 *
 * @param payload - Request errors
 * @returns
 */
export const fetchNotificationsFailed = (payload: any) => ({
  type: FETCH_NOTIFICATIONS_FAILED,
  payload
});

/**
 *
 * @param payload - Received notification
 * @returns
 */
export const updateNotificationsRealTime = (payload: INotification) => ({
  type: UPDATE_NOTIFICATIONS_REAL_TIME,
  payload
});

/**
 *
 * @param payload - Notification id
 * @returns
 */
export const markNotificationSeen = (payload: string) => ({
  type: MARK_NOTIFICATION_SEEN,
  payload
});

/**
 *
 * @returns
 */
export const markNotificationSeenSuccess = (payload: INotification) => ({
  type: MARK_NOTIFICATION_SEEN_SUCCESS,
  payload
});

/**
 *
 * @param payload - Request errors
 * @returns
 */
export const markNotificationSeenFailed = (payload: any) => ({
  type: MARK_NOTIFICATION_SEEN_FAILED,
  payload
});
