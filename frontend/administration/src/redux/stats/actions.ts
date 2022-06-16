import { FETCH_STATS, FETCH_STATS_FAILED, FETCH_STATS_SUCCESS } from './const';

/**
 *
 * @returns
 */
export const fetchStats = (payload: any) => ({
  type: FETCH_STATS,
  payload
});

/**
 *
 * @param {*} data - Profile data
 * @returns
 */
export const fetchStatsSuccess = (payload: any) => ({
  type: FETCH_STATS_SUCCESS,
  payload
});

/**
 *
 * @param {*} error - Request errors
 * @returns
 */
export const fetchStatsFailed = (payload: any) => ({
  type: FETCH_STATS_FAILED,
  payload
});
