import { Log } from 'src/models';
import ApiEvent from 'src/utils/ApiEvent';
import {
  DELETE_LOG,
  DELETE_LOG_FAILED,
  DELETE_LOG_SUCCESS,
  FETCH_LOGS,
  FETCH_LOGS_FAILED,
  FETCH_LOGS_SUCCESS,
  UPDATE_LOG,
  UPDATE_LOG_FAILED,
  UPDATE_LOG_SUCCESS
} from './const';

/**
 *
 * @param payload - request params
 * @returns
 */
export const fetchLogs = (payload: any) => ({
  type: FETCH_LOGS,
  payload
});

/**
 *
 * @param payload - Server response
 * @returns
 */
export const fetchLogsSuccess = (payload: any) => ({
  type: FETCH_LOGS_SUCCESS,
  payload
});

/**
 *
 * @param payload - Request errors
 * @returns
 */
export const fetchLogsFailed = (payload: any) => ({
  type: FETCH_LOGS_FAILED,
  payload
});

/**
 *
 * @param payload - request params
 * @returns
 */
export const updateLog = (payload: Log) => ({
  type: UPDATE_LOG,
  payload
});

/**
 *
 * @param payload - Success event
 * @returns
 */
export const updateLogSuccess = (payload: ApiEvent) => ({
  type: UPDATE_LOG_SUCCESS,
  payload
});

/**
 *
 * @param payload - Request errors
 * @returns
 */
export const updateLogsFailed = (payload: any) => ({
  type: UPDATE_LOG_FAILED,
  payload
});
/**
 *
 * @param payload - request params
 * @returns
 */
export const deleteLog = (payload: any) => ({
  type: DELETE_LOG,
  payload
});

/**
 *
 * @param payload - Success even
 * @returns
 */
export const deleteLogSuccess = (payload: ApiEvent) => ({
  type: DELETE_LOG_SUCCESS,
  payload
});

/**
 *
 * @param payload - Request errors
 * @returns
 */
export const deleteLogFailed = (payload: any) => ({
  type: DELETE_LOG_FAILED,
  payload
});
