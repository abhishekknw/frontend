import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const leads = createReducer(
  {
    leadPermissionList: [],
    leadUserPermission: [],
    currentUserPermissionId: undefined
  },

  {
    [types.GET_LEAD_PERMISSION_LIST_START](state) {
      return Object.assign({}, state, {
        leadPermissionList: []
      });
    },
    [types.GET_LEAD_PERMISSION_LIST_SUCCESS](state, action) {
      return Object.assign({}, state, {
        leadPermissionList: action.data
      });
    },
    [types.GET_LEAD_PERMISSION_LIST_FAIL](state) {
      return Object.assign({}, state, {
        leadPermissionList: []
      });
    },

    [types.GET_LEAD_USER_PERMISSION_START](state) {
      return Object.assign({}, state, {
        userPermission: [],
        currentUserPermissionId: undefined
      });
    },
    [types.GET_LEAD_USER_PERMISSION_SUCCESS](state, action) {
      return Object.assign({}, state, {
        userPermission: action.userPermission,
        currentUserPermissionId: action.currentUserPermissionId
      });
    },
    [types.GET_LEAD_USER_PERMISSION_FAIL](state) {
      return Object.assign({}, state, {
        userPermission: [],
        currentUserPermissionId: undefined
      });
    }
  }
);

export { leads as default };
