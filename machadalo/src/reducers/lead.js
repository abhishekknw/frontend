import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const leads = createReducer(
  {
    leadPermissionList: [],
    leadProfilePermission: [],
    currentProfilePermissionId: undefined
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

    [types.GET_LEAD_USER_PROFILE_PERMISSION_START](state) {
      return Object.assign({}, state, {
        leadProfilePermission: [],
        currentProfilePermissionId: undefined
      });
    },
    [types.GET_LEAD_USER_PROFILE_PERMISSION_SUCCESS](state, action) {
      return Object.assign({}, state, {
        leadProfilePermission: action.leadProfilePermission,
        currentProfilePermissionId: action.currentProfilePermissionId
      });
    },
    [types.GET_LEAD_USER_PROFILE_PERMISSION_FAIL](state) {
      return Object.assign({}, state, {
        leadProfilePermission: [],
        currentProfilePermissionId: undefined
      });
    }
  }
);

export { leads as default };
