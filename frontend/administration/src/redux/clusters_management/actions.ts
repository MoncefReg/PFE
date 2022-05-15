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

/**
 *
 * @param payload - request params
 * @returns
 */
export const fetchClusters = (payload: any) => ({
  type: FETCH_CLUSTERS,
  payload
});

/**
 *
 * @param payload - Server response
 * @returns
 */
export const fetchClustersSuccess = (payload: any) => ({
  type: FETCH_CLUSTERS_SUCCESS,
  payload
});

/**
 *
 * @param payload - Request errors
 * @returns
 */
export const fetchClustersFailed = (payload: any) => ({
  type: FETCH_CLUSTERS_FAILED,
  payload
});

/**
 *
 * @param payload - request params
 * @returns
 */
export const createCluster = (payload: Cluster) => ({
  type: CREATE_CLUSTER,
  payload
});

/**
 *
 * @param payload - Api Event
 * @returns
 */
export const createClusterSuccess = (payload: ApiEvent) => ({
  type: CREATE_CLUSTER_SUCCESS,
  payload
});

/**
 *
 * @param payload - Request errors
 * @returns
 */
export const createClusterFailed = (payload: any) => ({
  type: CREATE_CLUSTER_FAILED,
  payload
});
/**
 *
 * @param payload - request params
 * @returns
 */
export const updateCluster = (payload: Cluster) => ({
  type: UPDATE_CLUSTER,
  payload
});

/**
 *
 * @param payload - Success event
 * @returns
 */
export const updateClusterSuccess = (payload: ApiEvent) => ({
  type: UPDATE_CLUSTER_SUCCESS,
  payload
});

/**
 *
 * @param payload - Request errors
 * @returns
 */
export const updateClustersFailed = (payload: any) => ({
  type: UPDATE_CLUSTER_FAILED,
  payload
});
/**
 *
 * @param payload - request params
 * @returns
 */
export const deleteCluster = (payload: any) => ({
  type: DELETE_CLUSTER,
  payload
});

/**
 *
 * @param payload - Success even
 * @returns
 */
export const deleteClusterSuccess = (payload: ApiEvent) => ({
  type: DELETE_CLUSTER_SUCCESS,
  payload
});

/**
 *
 * @param payload - Request errors
 * @returns
 */
export const deleteClusterFailed = (payload: any) => ({
  type: DELETE_CLUSTER_FAILED,
  payload
});
