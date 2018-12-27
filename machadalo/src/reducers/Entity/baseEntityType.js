import createReducer from './../../lib/createReducer';
import * as types from './../../actions/types';

export const baseEntityType = createReducer(
  {
    currentBaseEntityType: undefined,
    baseEntityTypeList: []
  },

  {
    [types.POST_BASE_ENTITY_TYPE_START](state) {
      return Object.assign({}, state, {
        currentBaseEntityType: undefined
      });
    },
    [types.POST_BASE_ENTITY_TYPE_SUCCESS](state, action) {
      return Object.assign({}, state, {
        currentBaseEntityType: action.data
      });
    },
    [types.POST_BASE_ENTITY_TYPE_FAIL](state) {
      return Object.assign({}, state, {
        currentBaseEntityType: undefined
      });
    },
    [types.GET_CURRENT_BASE_ENTITY_TYPE_START](state) {
      return Object.assign({}, state, {
        currentBaseEntityType: undefined
      });
    },
    [types.GET_CURRENT_BASE_ENTITY_TYPE_SUCCESS](state, action) {
      return Object.assign({}, state, {
        currentBaseEntityType: action.data
      });
    },
    [types.GET_CURRENT_BASE_ENTITY_TYPE_FAIL](state) {
      return Object.assign({}, state, {
        currentBaseEntityType: undefined
      });
    },
    [types.GET_BASE_ENTITY_TYPE_LIST_START](state) {
      return Object.assign({}, state, {
        baseEntityTypeList: []
      });
    },
    [types.GET_BASE_ENTITY_TYPE_LIST_SUCCESS](state, action) {
      return Object.assign({}, state, {
        baseEntityTypeList: action.data
      });
    },
    [types.GET_BASE_ENTITY_TYPE_LIST_FAIL](state) {
      return Object.assign({}, state, {
        baseEntityTypeList: []
      });
    }
  }
);

export { baseEntityType as default };
