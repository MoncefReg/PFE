import { Reducer } from 'react';
import { Cluster } from 'src/models';
import ApiEvent from 'src/utils/ApiEvent';
import {
  CREATE_CLUSTER,
  CREATE_CLUSTER_FAILED,
  CREATE_CLUSTER_SUCCESS,
  DELETE_CLUSTER,
  DELETE_CLUSTER_FAILED,
  DELETE_CLUSTER_SUCCESS,
  FETCH_CLUSTERS,
  FETCH_CLUSTERS_FAILED,
  FETCH_CLUSTERS_SUCCESS,
  UPDATE_CLUSTER,
  UPDATE_CLUSTER_FAILED,
  UPDATE_CLUSTER_SUCCESS
} from './const';

export interface ClustersReducerState {
  loading: boolean;
  error: any;
  createSuccess?: ApiEvent;
  updateSuccess?: ApiEvent;
  deleteSuccess?: ApiEvent;
  data?: { count: number; results: Cluster[] };
}

const initState = {
  loading: false,
  error: null
};

const ClustersManagementReducer: Reducer<ClustersReducerState, any> = (
  state = initState,
  { type, payload }
) => {
  switch (type) {
    case FETCH_CLUSTERS:
    case CREATE_CLUSTER:
    case UPDATE_CLUSTER:
    case DELETE_CLUSTER:
      return {
        ...state,
        loading: true
      };

    case FETCH_CLUSTERS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload
      };
    case CREATE_CLUSTER_SUCCESS:
      return {
        ...state,
        loading: false,
        createSuccess: payload
      };
    case UPDATE_CLUSTER_SUCCESS:
      return {
        ...state,
        loading: false,
        updateSuccess: payload
      };
    case DELETE_CLUSTER_SUCCESS:
      return {
        ...state,
        loading: false,
        deleteSuccess: payload
      };

    case FETCH_CLUSTERS_FAILED:
    case CREATE_CLUSTER_FAILED:
    case UPDATE_CLUSTER_FAILED:
    case DELETE_CLUSTER_FAILED:
      return {
        ...state,
        loading: false,
        error: payload
      };
    default:
      return { ...state };
  }
};

export default ClustersManagementReducer;
