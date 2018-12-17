import createReducer from './../lib/createReducer';
import * as types from './../actions/types';

export const entity = createReducer(
  {
    baseInventory: undefined
  },

  {
    [types.POST_BASE_INVENTORY_START](state) {
      return Object.assign({}, state, {
        entityType: undefined
      });
    },
    [types.POST_BASE_INVENTORY_SUCCESS](state, action) {
      return Object.assign({}, state, {
        entityType: action.data
      });
    },
    [types.POST_BASE_INVENTORY_FAIL](state) {
      return Object.assign({}, state, {
        entityType: undefined
      });
    }
  }
);

export { entity as default };
