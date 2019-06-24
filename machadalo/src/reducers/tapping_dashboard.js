import createReducer from './../../lib/createReducer';
import * as types from './../../actions/types';

export const tapping = createReducer(
  {
    tappingList: [],
  },

  {
    [types.GET_TAPPING_DETAILS_START](state) {
      return Object.assign({}, state, {
        tappingList: [],
        isFetchingTappingList: true,
      });
    },
    [types.GET_TAPPING_DETAILS_SUCCESS](state, action) {
      return Object.assign({}, state, {
        tappingList: [],
        isFetchingTappingList: false,
      });
    },
    [types.GET_TAPPING_DETAILS_FAIL](state) {
      return Object.assign({}, state, {
        tappingList: [],
        isFetchingTappingList: false,
      });
    },
  }
);

export { tapping as default };
