import createReducer from './../lib/createReducer';
import * as types from './../actions/types';

export const auth = createReducer(
  {
    entity: undefined
  },

  {
    [types.POST_ENTITY_START](state) {
      return Object.assign({}, state, {
        entity: undefined
      });
    },
    [types.POST_ENTITY_SUCCESS](state, action) {
      return Object.assign({}, state, {
        entity: action.data
      });
    },
    [types.POST_ENTITY_FAIL](state) {
      return Object.assign({}, state, {
        entity: undefined
      });
    }
  }
);

export { auth as default };
