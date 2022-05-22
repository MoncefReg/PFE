import { combineReducers } from 'redux';
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
  Notifications: NotificationsReducer
});
