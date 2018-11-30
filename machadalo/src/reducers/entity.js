import createReducer from './../lib/createReducer';
import * as types from './../actions/types';

export const entity = createReducer(
  {
    entity: undefined,
    entityType: undefined,
    entityList: []
  },

  {
    [types.POST_ENTITY_TYPE_START](state) {
      return Object.assign({}, state, {
        entityType: undefined
      });
    },
    [types.POST_ENTITY_TYPE_SUCCESS](state, action) {
      return Object.assign({}, state, {
        entityType: action.data
      });
    },
    [types.POST_ENTITY_TYPE_FAIL](state) {
      return Object.assign({}, state, {
        entityType: undefined
      });
    },
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
    },
    [types.GET_ENTITY_TYPE_LIST_START](state) {
      return Object.assign({}, state, {
        entityList: []
      });
    },
    [types.GET_ENTITY_TYPE_LIST_SUCCESS](state, action) {
      return Object.assign({}, state, {
        entityList: action.data
      });
    },
    [types.GET_ENTITY_TYPE_LIST_FAIL](state) {
      return Object.assign({}, state, {
        entityList: []
      });
    }
  }
);

export { entity as default };
