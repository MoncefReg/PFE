import { Reducer } from 'react';
import { Log } from 'src/models';
import ApiEvent from 'src/utils/ApiEvent';
import {
  DELETE_LOG,
  DELETE_LOG_FAILED,
  DELETE_LOG_SUCCESS,
  FETCH_LOG,
  FETCH_LOGS,
  FETCH_LOGS_FAILED,
  FETCH_LOGS_SUCCESS,
  FETCH_LOG_FAILED,
  FETCH_LOG_SUCCESS,
  UPDATE_LOG,
  UPDATE_LOG_FAILED,
  UPDATE_LOG_SUCCESS
} from './const';

export interface LogsReducerState {
  loading: boolean;
  error: any;
  createSuccess?: ApiEvent;
  updateSuccess?: ApiEvent;
  deleteSuccess?: ApiEvent;
  data?: { count: number; results: Log[] };
  log?: Log;
}

const initState = {
  loading: false,
  error: null
};

const LogsManagementReducer: Reducer<LogsReducerState, any> = (
  state = initState,
  { type, payload }
) => {
  switch (type) {
    case FETCH_LOGS:
    case FETCH_LOG:
    case UPDATE_LOG:
    case DELETE_LOG:
      return {
        ...state,
        loading: true
      };

    case FETCH_LOGS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload
      };
    case UPDATE_LOG_SUCCESS:
      return {
        ...state,
        loading: false,
        updateSuccess: payload
      };
    case DELETE_LOG_SUCCESS:
      return {
        ...state,
        loading: false,
        deleteSuccess: payload
      };
    case FETCH_LOG_SUCCESS:
      return {
        ...state,
        loading: false,
        log: payload
      };

    case FETCH_LOGS_FAILED:
    case UPDATE_LOG_FAILED:
    case DELETE_LOG_FAILED:
    case FETCH_LOG_FAILED:
      return {
        ...state,
        loading: false,
        error: payload
      };
    default:
      return { ...state };
  }
};

export default LogsManagementReducer;
