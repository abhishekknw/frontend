import request from 'superagent';

import * as types from './types';

import config from './../config';

//Get Permission List
export function getPermissionListStart() {
  return {
    type: types.GET_LEAD_PERMISSION_LIST_START
  };
}

export function getPermissionListSuccess(permissionList) {
  return {
    type: types.GET_LEAD_PERMISSION_LIST_SUCCESS,
    data: permissionList
  };
}

export function getPermissionListFail() {
  return {
    type: types.GET_LEAD_PERMISSION_LIST_FAIL
  };
}

export function getLeadPermissionList() {
  return (dispatch, getState) => {
    dispatch(getPermissionListStart());

    const { auth } = getState();

    request
      .get(`${config.API_URL}/v0/ui/checklists/permissions/`)
      .set('Authorization', `JWT ${auth.token}`)
      .then(resp => {
        dispatch(getPermissionListSuccess(resp.body.data));
      })
      .catch(ex => {
        console.log('Failed to fetch entity', ex);

        dispatch(getPermissionListFail());
      });
  };
}
