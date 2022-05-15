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

/**
 *
 * @param payload - request params
 * @returns
 */
export const fetchDevices = (payload: any) => ({
  type: FETCH_DEVICES,
  payload
});

/**
 *
 * @param payload - Server response
 * @returns
 */
export const fetchDevicesSuccess = (payload: any) => ({
  type: FETCH_DEVICES_SUCCESS,
  payload
});

/**
 *
 * @param payload - Request errors
 * @returns
 */
export const fetchDevicesFailed = (payload: any) => ({
  type: FETCH_DEVICES_FAILED,
  payload
});

/**
 *
 * @param payload - request params
 * @returns
 */
export const createDevice = (payload: Device) => ({
  type: CREATE_DEVICE,
  payload
});

/**
 *
 * @param payload - Api Event
 * @returns
 */
export const createDeviceSuccess = (payload: ApiEvent) => ({
  type: CREATE_DEVICE_SUCCESS,
  payload
});

/**
 *
 * @param payload - Request errors
 * @returns
 */
export const createDeviceFailed = (payload: any) => ({
  type: CREATE_DEVICE_FAILED,
  payload
});
/**
 *
 * @param payload - request params
 * @returns
 */
export const updateDevice = (payload: Device) => ({
  type: UPDATE_DEVICE,
  payload
});

/**
 *
 * @param payload - Success event
 * @returns
 */
export const updateDeviceSuccess = (payload: ApiEvent) => ({
  type: UPDATE_DEVICE_SUCCESS,
  payload
});

/**
 *
 * @param payload - Request errors
 * @returns
 */
export const updateDevicesFailed = (payload: any) => ({
  type: UPDATE_DEVICE_FAILED,
  payload
});
/**
 *
 * @param payload - request params
 * @returns
 */
export const deleteDevice = (payload: any) => ({
  type: DELETE_DEVICE,
  payload
});

/**
 *
 * @param payload - Success even
 * @returns
 */
export const deleteDeviceSuccess = (payload: ApiEvent) => ({
  type: DELETE_DEVICE_SUCCESS,
  payload
});

/**
 *
 * @param payload - Request errors
 * @returns
 */
export const deleteDeviceFailed = (payload: any) => ({
  type: DELETE_DEVICE_FAILED,
  payload
});
