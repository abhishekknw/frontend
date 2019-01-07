import createReducer from './../../lib/createReducer';
import * as types from './../../actions/types';

export const entity = createReducer(
  {
    currentEntity: undefined,
    entityList: []
  },

  {
    [types.POST_ENTITY_START](state) {
      return Object.assign({}, state, {
        currentEntity: undefined
      });
    },
    [types.POST_ENTITY_SUCCESS](state, action) {
      return Object.assign({}, state, {
        currentEntity: action.data
      });
    },
    [types.POST_ENTITY_FAIL](state) {
      return Object.assign({}, state, {
        currentEntity: undefined
      });
    },
    [types.GET_ENTITY_LIST_START](state) {
      return Object.assign({}, state, {
        entityList: []
      });
    },
    [types.GET_ENTITY_LIST_SUCCESS](state, action) {
      return Object.assign({}, state, {
        entityList: action.data
      });
    },
    [types.GET_ENTITY_LIST_FAIL](state) {
      return Object.assign({}, state, {
        entityList: []
      });
    },
    [types.GET_CURRENT_ENTITY_START](state) {
      return Object.assign({}, state, {
        currentEntity: undefined
      });
    },
    [types.GET_CURRENT_ENTITY_SUCCESS](state, action) {
      return Object.assign({}, state, {
        currentEntity: action.data
      });
    },
    [types.GET_CURRENT_ENTITY_FAIL](state) {
      return Object.assign({}, state, {
        currentEntity: undefined
      });
    }
  }
);

export { entity as default };
