import request from 'superagent';

import * as types from './types';

import config from './../config';

//User List
export function getUsersListStart() {
  return {
    type: types.GET_USERS_LIST_START
  };
}

export function getUsersListSuccess(users) {
  return {
    type: types.GET_USERS_LIST_SUCCESS,
    data: users
  };
}

export function getUsersListFail() {
  return {
    type: types.GET_USERS_LIST_FAIL
  };
}

export function getUsersList() {
  return (dispatch, getState) => {
    dispatch(getUsersListStart());

    const { auth } = getState();

    request
      .get(`${config.API_URL}/v0/ui/users/`)
      .set('Authorization', `JWT ${auth.token}`)
      .then(resp => {
        dispatch(getUsersListSuccess(resp.body.data));
      })
      .catch(ex => {
        console.log('Failed to fetch list of users', ex);

        dispatch(getUsersListFail());
      });
  };
}
