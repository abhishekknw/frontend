import createReducer from './../lib/createReducer';
import * as types from './../actions/types';

export const supplier = createReducer(
  {
    list: []
  },

  {
    [types.GET_SUPPLIERS_LIST_START](state) {
      return Object.assign({}, state, {
        list: []
      });
    },
    [types.GET_SUPPLIERS_LIST_SUCCESS](state, action) {
      return Object.assign({}, state, {
        list: action.suppliers
      });
    },
    [types.GET_SUPPLIERS_LIST_FAIL](state) {
      return Object.assign({}, state, {
        list: []
      });
    }
  }
);

export { supplier as default };
