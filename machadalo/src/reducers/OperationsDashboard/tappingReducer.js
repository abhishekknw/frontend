import createReducer from '../../lib/createReducer';
import * as types from '../../actions/types';

export const tappingDetails = createReducer(
  {
    tappingData: [],
    isFetchingTappingList: false,
  },

  {
    [types.GET_TAPPING_DETAILS_START](state) {
      return Object.assign({}, state, {
        tappingData: [],
        isFetchingTappingList: true,
      });
    },
    [types.GET_TAPPING_DETAILS_SUCCESS](state, action) {
      return Object.assign({}, state, {
        tappingData: action.tappingData.response,
        isFetchingTappingList: false,
      });
    },
    [types.GET_TAPPING_DETAILS_FAIL](state) {
      return Object.assign({}, state, {
        tappingData: [],
        isFetchingTappingList: false,
      });
    },
  }
);

export { tappingDetails as default };
