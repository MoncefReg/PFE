import { put, takeEvery } from 'redux-saga/effects';
import ApiEvent from 'src/utils/ApiEvent';
import fetcher from 'src/utils/fetcher';
import handleFailures from 'src/utils/handleFailures';
import {
  createEmployeeFailed,
  createEmployeeSuccess,
  deleteEmployeeSuccess,
  fetchEmployeesFailed,
  fetchEmployeesSuccess,
  updateEmployeeSuccess
} from './actions';
import {
  CREATE_EMPLOYEE,
  DELETE_EMPLOYEE,
  FETCH_EMPLOYEES,
  UPDATE_EMPLOYEE
} from './const';

function* fetchItems({ payload: params }: any): Generator<any> {
  try {
    const response: any = yield fetcher.get('/staff/employees/', { params });
    yield put(fetchEmployeesSuccess(response.data));
  } catch (error: any) {
    yield put(handleFailures(error.response, fetchEmployeesFailed));
  }
}

function* createItem({ payload: data }: any): Generator<any> {
  const formdata = new FormData();
  Object.entries(data).forEach(([key, value]: any) => {
    formdata.append(key, value);
  });
  try {
    yield fetcher.post(`/staff/employees/`, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    yield put(createEmployeeSuccess(new ApiEvent({})));
  } catch (error: any) {
    yield put(handleFailures(error.response, createEmployeeFailed));
  }
}

function* updateItem({ payload: data }: any): Generator<any> {
  const formdata = new FormData();
  Object.entries(data).forEach(([key, value]: any) => {
    formdata.append(key, value);
  });
  try {
    yield fetcher.put(`/staff/employees/${data.id}/`, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    yield put(updateEmployeeSuccess(new ApiEvent({})));
  } catch (error: any) {
    yield put(handleFailures(error.response, createEmployeeFailed));
  }
}

function* deleteItem({ payload: id }: { payload: any }): Generator<any> {
  try {
    yield fetcher.delete(`/staff/employees/${id}/`);
    yield put(deleteEmployeeSuccess(new ApiEvent({})));
  } catch (error: any) {
    yield put(handleFailures(error.response, createEmployeeFailed));
  }
}

function* watchFetchItems(): Generator<any> {
  yield takeEvery<any>(FETCH_EMPLOYEES, fetchItems);
}

function* watchCreateItem(): Generator<any> {
  yield takeEvery<any>(CREATE_EMPLOYEE, createItem);
}
function* watchUpdateItems(): Generator<any> {
  yield takeEvery<any>(UPDATE_EMPLOYEE, updateItem);
}
function* watchDeleteItems(): Generator<any> {
  yield takeEvery<any>(DELETE_EMPLOYEE, deleteItem);
}

const EmployeesSagas = [
  watchFetchItems(),
  watchCreateItem(),
  watchUpdateItems(),
  watchDeleteItems()
];

export default EmployeesSagas;
