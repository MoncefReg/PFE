import { combineReducers } from 'redux';
import ClustersManagementReducer from './clusters_management/reducer';
import DevicesManagementReducer from './devices_management/reducer';

export default combineReducers({
  Devices: DevicesManagementReducer,
  Clusters: ClustersManagementReducer
});
