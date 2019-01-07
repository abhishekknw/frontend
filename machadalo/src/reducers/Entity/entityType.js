import createReducer from './../../lib/createReducer';
import * as types from './../../actions/types';

export const entityType = createReducer(
  {
    currentEntityType: undefined,
    entityTypeList: []
  },

  {
    [types.POST_ENTITY_TYPE_START](state) {
      return Object.assign({}, state, {
        currentEntityType: undefined
      });
    },
    [types.POST_ENTITY_TYPE_SUCCESS](state, action) {
      return Object.assign({}, state, {
        currentEntityType: action.data
      });
    },
    [types.POST_ENTITY_TYPE_FAIL](state) {
      return Object.assign({}, state, {
        currentEntityType: undefined
      });
    },
    [types.GET_CURRENT_ENTITY_TYPE_START](state) {
      return Object.assign({}, state, {
        currentEntityType: undefined
      });
    },
    [types.GET_CURRENT_ENTITY_TYPE_SUCCESS](state, action) {
      return Object.assign({}, state, {
        currentEntityType: action.data
      });
    },
    [types.GET_CURRENT_ENTITY_TYPE_FAIL](state) {
      return Object.assign({}, state, {
        currentEntityType: undefined
      });
    },
    [types.GET_ENTITY_TYPE_LIST_START](state) {
      return Object.assign({}, state, {
        entityTypeList: []
      });
    },
    [types.GET_ENTITY_TYPE_LIST_SUCCESS](state, action) {
      return Object.assign({}, state, {
        entityTypeList: action.data
      });
    },
    [types.GET_ENTITY_TYPE_LIST_FAIL](state) {
      return Object.assign({}, state, {
        entityTypeList: []
      });
    }
  }
);

export { entityType as default };
