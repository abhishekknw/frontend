import createReducer from './../lib/createReducer';
import * as types from './../actions/types';

export const checklist = createReducer(
  {
    list: []
  },

  {
    [types.GET_SUPPLIER_CHECKLISTS_START](state) {
      return Object.assign({}, state, {
        list: []
      });
    },
    [types.GET_SUPPLIER_CHECKLISTS_SUCCESS](state, action) {
      return Object.assign({}, state, {
        list: action.checklists
      });
    },
    [types.GET_SUPPLIER_CHECKLISTS_FAIL](state) {
      return Object.assign({}, state, {
        list: []
      });
    }
  }
);

export { checklist as default };
