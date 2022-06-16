import { Reducer } from 'react';
import ApiEvent from 'src/utils/ApiEvent';
import { FETCH_STATS, FETCH_STATS_FAILED, FETCH_STATS_SUCCESS } from './const';

export interface StatsState {
  error: ApiEvent<{ msgs: string[] }> | null;
  loading: boolean;
  data?: any;
}

const initialState: StatsState = {
  error: null,
  loading: false
};

const StatsReducer: Reducer<StatsState, any> = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case FETCH_STATS:
      return { ...state, loading: true };

    case FETCH_STATS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload
      };

    case FETCH_STATS_FAILED:
      return {
        ...state,
        loading: false,
        error: payload
      };
    default:
      return state;
  }
};

export default StatsReducer;
