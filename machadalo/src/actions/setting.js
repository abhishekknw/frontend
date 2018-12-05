import request from 'superagent';

import * as types from './types';

import config from './../config';

//Get Permission List
export function getPermissionListStart() {
  return {
    type: types.GET_PERMISSION_LIST_START
  };
}

export function getPermissionListSuccess(permissionList) {
  return {
    type: types.GET_PERMISSION_LIST_SUCCESS,
    data: permissionList
  };
}

export function getPermissionListFail() {
  return {
    type: types.GET_PERMISSION_LIST_FAIL
  };
}

export function getPermissionList() {
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

export function getPermissionStart() {
  return {
    type: types.GET_USER_PERMISSION_START
  };
}

export function getPermissionSuccess(userPermission) {
  return {
    type: types.GET_USER_PERMISSION_SUCCESS,
    data: userPermission
  };
}

export function getPermissionFail() {
  return {
    type: types.GET_USER_PERMISSION_FAIL
  };
}

export function getUserPermission() {
  return (dispatch, getState) => {
    dispatch(getPermissionStart());

    const { auth } = getState();

    request
      .get(`${config.API_URL}/v0/ui/checklists/list_all_checklists/`)
      .set('Authorization', `JWT ${auth.token}`)
      .then(checklistResponse => {
        let checklistData = checklistResponse.body.data;
        // request
        // .get(`${config.API_URL}/v0/ui/checklists/permissions/`)
        // .set('Authorization', `JWT ${auth.token}`)
        // .then(permissionResponse => {
        let userPermission = [];
        checklistData.forEach(campaignInfo => {
          let permissionObject = {
            entityName: campaignInfo.campaign_name,
            entityId: campaignInfo.campaign_id,
            type: 'campaign',
            permission: 'None',
            data: []
          };
          if (campaignInfo.checklists.length) {
            campaignInfo.checklists.forEach(checklist => {
              let permissionChecklistObject = {
                entityName: checklist.checklist_name,
                entityId: checklist.checklist_id,
                type: 'checklist',
                permission: 'None'
              };
              permissionObject.data.push(permissionChecklistObject);
            });
          }
          userPermission.push(permissionObject);
        });
        dispatch(getPermissionSuccess(userPermission));
        // })
        // .catch(ex => {
        //   console.log('Failed to fetch entity', ex);

        //   dispatch(getPermissionFail());
        // });
      })
      .catch(ex => {
        console.log('Failed to fetch entity', ex);

        dispatch(getPermissionFail());
      });
  };
}
