import createReducer from './../lib/createReducer';
import * as types from './../actions/types';

export const user = createReducer(
  {
    userList: []
  },

  {
    [types.GET_USERS_LIST_START](state) {
      return Object.assign({}, state, {
        userList: []
      });
    },
    [types.GET_USERS_LIST_SUCCESS](state, action) {
      return Object.assign({}, state, {
        userList: action.data
      });
    },
    [types.GET_USERS_LIST_FAIL](state) {
      return Object.assign({}, state, {
        userList: []
      });
    }
  }
);

export { user as default };
