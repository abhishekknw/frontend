import createReducer from './../lib/createReducer';
import * as types from './../actions/types';

export const baseInventory = createReducer(
  {
    list: [],
    baseInventory: undefined
  },
  {
    [types.GET_BASE_INVENTORY_START](state) {
      return Object.assign({}, state, {
        list: []
      });
    },
    [types.GET_BASE_INVENTORY_SUCCESS](state, action) {
      return Object.assign({}, state, {
        list: action.baseInventory
      });
    },
    [types.GET_BASE_INVENTORY_FAIL](state) {
      return Object.assign({}, state, {
        list: []
      });
    },
    [types.POST_BASE_INVENTORY_START](state) {
      return Object.assign({}, state, {
        baseInventory: undefined
      });
    },
    [types.POST_BASE_INVENTORY_SUCCESS](state, action) {
      return Object.assign({}, state, {
        baseInventory: action.data
      });
    },
    [types.POST_BASE_INVENTORY_FAIL](state) {
      return Object.assign({}, state, {
        baseInventory: undefined
      });
    }
  }
);

export { baseInventory as default };
