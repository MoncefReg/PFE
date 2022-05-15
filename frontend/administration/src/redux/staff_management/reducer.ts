import { Reducer } from 'react';
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

export interface EmployeesReducerState {
  loading: boolean;
  error: any;
  createSuccess?: ApiEvent;
  updateSuccess?: ApiEvent;
  deleteSuccess?: ApiEvent;
  data?: { count: number; results: Employee[] };
}

const initState = {
  loading: false,
  error: null
};

const EmployeesManagementReducer: Reducer<EmployeesReducerState, any> = (
  state = initState,
  { type, payload }
) => {
  switch (type) {
    case FETCH_EMPLOYEES:
    case CREATE_EMPLOYEE:
    case UPDATE_EMPLOYEE:
    case DELETE_EMPLOYEE:
      return {
        ...state,
        loading: true
      };

    case FETCH_EMPLOYEES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload
      };
    case CREATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        createSuccess: payload
      };
    case UPDATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        updateSuccess: payload
      };
    case DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        deleteSuccess: payload
      };

    case FETCH_EMPLOYEES_FAILED:
    case CREATE_EMPLOYEE_FAILED:
    case UPDATE_EMPLOYEE_FAILED:
    case DELETE_EMPLOYEE_FAILED:
      return {
        ...state,
        loading: false,
        error: payload
      };
    default:
      return { ...state };
  }
};

export default EmployeesManagementReducer;
