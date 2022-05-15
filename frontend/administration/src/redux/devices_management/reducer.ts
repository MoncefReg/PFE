import { Reducer } from 'react';
import { Device } from 'src/models';
import ApiEvent from 'src/utils/ApiEvent';
import {
  CREATE_DEVICE,
  CREATE_DEVICE_FAILED,
  CREATE_DEVICE_SUCCESS,
  DELETE_DEVICE,
  DELETE_DEVICE_FAILED,
  DELETE_DEVICE_SUCCESS,
  FETCH_DEVICES,
  FETCH_DEVICES_FAILED,
  FETCH_DEVICES_SUCCESS,
  UPDATE_DEVICE,
  UPDATE_DEVICE_FAILED,
  UPDATE_DEVICE_SUCCESS
} from './const';

export interface DevicesReducerState {
  loading: boolean;
  error: any;
  createSuccess?: ApiEvent;
  updateSuccess?: ApiEvent;
  deleteSuccess?: ApiEvent;
  data?: { count: number; results: Device[] };
}

const initState = {
  loading: false,
  error: null
};

const DevicesManagementReducer: Reducer<DevicesReducerState, any> = (
  state = initState,
  { type, payload }
) => {
  switch (type) {
    case FETCH_DEVICES:
    case CREATE_DEVICE:
    case UPDATE_DEVICE:
    case DELETE_DEVICE:
      return {
        ...state,
        loading: true
      };

    case FETCH_DEVICES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload
      };
    case CREATE_DEVICE_SUCCESS:
      return {
        ...state,
        loading: false,
        createSuccess: payload
      };
    case UPDATE_DEVICE_SUCCESS:
      return {
        ...state,
        loading: false,
        updateSuccess: payload
      };
    case DELETE_DEVICE_SUCCESS:
      return {
        ...state,
        loading: false,
        deleteSuccess: payload
      };

    case FETCH_DEVICES_FAILED:
    case CREATE_DEVICE_FAILED:
    case UPDATE_DEVICE_FAILED:
    case DELETE_DEVICE_FAILED:
      return {
        ...state,
        loading: false,
        error: payload
      };
    default:
      return { ...state };
  }
};

export default DevicesManagementReducer;
