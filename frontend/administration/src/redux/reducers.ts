import { combineReducers } from 'redux';
import AuthReducer from './auth/reducer';
import ClustersManagementReducer from './clusters_management/reducer';
import DevicesManagementReducer from './devices_management/reducer';
import LogsManagementReducer from './logs/reducer';
import NotificationsReducer from './notifications/reducer';
import EmployeesManagementReducer from './staff_management/reducer';

export default combineReducers({
  Devices: DevicesManagementReducer,
  Clusters: ClustersManagementReducer,
  Staff: EmployeesManagementReducer,
  Logs: LogsManagementReducer,
  Notifications: NotificationsReducer,
  Auth: AuthReducer
});
