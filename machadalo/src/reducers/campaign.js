import createReducer from './../lib/createReducer';
import * as types from './../actions/types';

export const campaign = createReducer(
  {
    list: []
  },

  {
    [types.GET_CAMPAIGNS_LIST_START](state) {
      return Object.assign({}, state, {
        list: []
      });
    },
    [types.GET_CAMPAIGNS_LIST_SUCCESS](state, action) {
      return Object.assign({}, state, {
        list: action.campaigns
      });
    },
    [types.GET_CAMPAIGNS_LIST_FAIL](state) {
      return Object.assign({}, state, {
        list: []
      });
    }
  }
);

export { campaign as default };
