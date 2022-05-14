import { combineReducers } from 'redux';
import DevicesManagementReducer from './devices_management/reducer';

export default combineReducers({
  Devices: DevicesManagementReducer
});
