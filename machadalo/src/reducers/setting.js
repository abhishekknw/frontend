import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const settings = createReducer(
  {
    permissionList: [],
    userPermission: []
  },

  {
    [types.GET_PERMISSION_LIST_START](state) {
      return Object.assign({}, state, {
        permissionList: []
      });
    },
    [types.GET_PERMISSION_LIST_SUCCESS](state, action) {
      return Object.assign({}, state, {
        permissionList: action.data
      });
    },
    [types.GET_PERMISSION_LIST_FAIL](state) {
      return Object.assign({}, state, {
        permissionList: []
      });
    },
    [types.GET_USER_PERMISSION_START](state) {
      return Object.assign({}, state, {
        userPermission: []
      });
    },
    [types.GET_USER_PERMISSION_SUCCESS](state, action) {
      return Object.assign({}, state, {
        userPermission: action.data
      });
    },
    [types.GET_USER_PERMISSION_FAIL](state) {
      return Object.assign({}, state, {
        userPermission: []
      });
    }
  }
);

export { settings as default };
