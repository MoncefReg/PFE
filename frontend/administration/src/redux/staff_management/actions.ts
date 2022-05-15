import { Employee } from 'src/models';
import ApiEvent from 'src/utils/ApiEvent';
import {
  CREATE_EMPLOYEE,
  CREATE_EMPLOYEE_FAILED,
  CREATE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE,
  DELETE_EMPLOYEE_FAILED,
  DELETE_EMPLOYEE_SUCCESS,
  FETCH_EMPLOYEES,
  FETCH_EMPLOYEES_FAILED,
  FETCH_EMPLOYEES_SUCCESS,
  UPDATE_EMPLOYEE,
  UPDATE_EMPLOYEE_FAILED,
  UPDATE_EMPLOYEE_SUCCESS
} from './const';

/**
 *
 * @param payload - request params
 * @returns
 */
export const fetchEmployees = (payload: any) => ({
  type: FETCH_EMPLOYEES,
  payload
});

/**
 *
 * @param payload - Server response
 * @returns
 */
export const fetchEmployeesSuccess = (payload: any) => ({
  type: FETCH_EMPLOYEES_SUCCESS,
  payload
});

/**
 *
 * @param payload - Request errors
 * @returns
 */
export const fetchEmployeesFailed = (payload: any) => ({
  type: FETCH_EMPLOYEES_FAILED,
  payload
});

/**
 *
 * @param payload - request params
 * @returns
 */
export const createEmployee = (payload: Employee) => ({
  type: CREATE_EMPLOYEE,
  payload
});

/**
 *
 * @param payload - Api Event
 * @returns
 */
export const createEmployeeSuccess = (payload: ApiEvent) => ({
  type: CREATE_EMPLOYEE_SUCCESS,
  payload
});

/**
 *
 * @param payload - Request errors
 * @returns
 */
export const createEmployeeFailed = (payload: any) => ({
  type: CREATE_EMPLOYEE_FAILED,
  payload
});
/**
 *
 * @param payload - request params
 * @returns
 */
export const updateEmployee = (payload: Employee) => ({
  type: UPDATE_EMPLOYEE,
  payload
});

/**
 *
 * @param payload - Success event
 * @returns
 */
export const updateEmployeeSuccess = (payload: ApiEvent) => ({
  type: UPDATE_EMPLOYEE_SUCCESS,
  payload
});

/**
 *
 * @param payload - Request errors
 * @returns
 */
export const updateEmployeesFailed = (payload: any) => ({
  type: UPDATE_EMPLOYEE_FAILED,
  payload
});
/**
 *
 * @param payload - request params
 * @returns
 */
export const deleteEmployee = (payload: any) => ({
  type: DELETE_EMPLOYEE,
  payload
});

/**
 *
 * @param payload - Success even
 * @returns
 */
export const deleteEmployeeSuccess = (payload: ApiEvent) => ({
  type: DELETE_EMPLOYEE_SUCCESS,
  payload
});

/**
 *
 * @param payload - Request errors
 * @returns
 */
export const deleteEmployeeFailed = (payload: any) => ({
  type: DELETE_EMPLOYEE_FAILED,
  payload
});
