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

export function getPermissionSuccess(userPermission, currentUserPermissionId) {
  return {
    type: types.GET_USER_PERMISSION_SUCCESS,
    userPermission: userPermission,
    currentUserPermissionId: currentUserPermissionId
  };
}

export function getPermissionFail() {
  return {
    type: types.GET_USER_PERMISSION_FAIL
  };
}

export function getUserPermission(userId) {
  return (dispatch, getState) => {
    dispatch(getPermissionStart());

    const { auth } = getState();

    request
      .get(`${config.API_URL}/v0/ui/checklists/list_all_checklists/`)
      .set('Authorization', `JWT ${auth.token}`)
      .then(checklistResponse => {
        let checklistData = checklistResponse.body.data;
        request
          .get(`${config.API_URL}/v0/ui/checklists/permissions/${userId}/`)
          .set('Authorization', `JWT ${auth.token}`)
          .then(permissionResponse => {
            let userPermission = [];
            let userPermissionData = permissionResponse.body.data;
            checklistData.forEach(campaignInfo => {
              let campaignPermissionType = 'None';
              if (
                userPermission !== 'no_permission_exists' &&
                userPermissionData.checklist_permissions.campaigns[
                  campaignInfo.campaign_id
                ]
              ) {
                if (
                  userPermissionData.checklist_permissions.campaigns[
                    campaignInfo.campaign_id
                  ].indexOf('EDIT') !== -1
                ) {
                  campaignPermissionType = 'Edit';
                } else if (
                  userPermissionData.checklist_permissions.campaigns[
                    campaignInfo.campaign_id
                  ].indexOf('FILL') !== -1
                ) {
                  campaignPermissionType = 'Fill';
                }
              }
              let permissionObject = {
                entityName: campaignInfo.campaign_name,
                entityId: campaignInfo.campaign_id,
                type: 'campaign',
                permission: campaignPermissionType,
                data: []
              };
              if (campaignInfo.checklists.length) {
                campaignInfo.checklists.forEach(checklist => {
                  let checklistPermissionType = 'None';
                  if (
                    userPermission !== 'no_permission_exists' &&
                    userPermissionData.checklist_permissions.checklists[
                      checklist.checklist_id
                    ]
                  ) {
                    if (
                      userPermissionData.checklist_permissions.checklists[
                        checklist.checklist_id
                      ].indexOf('EDIT') !== -1
                    ) {
                      checklistPermissionType = 'Edit';
                    } else if (
                      userPermissionData.checklist_permissions.campaigns[
                        checklist.checklist_id
                      ].indexOf('FILL') !== -1
                    ) {
                      checklistPermissionType = 'Fill';
                    }
                  }
                  let permissionChecklistObject = {
                    entityName: checklist.checklist_name,
                    entityId: checklist.checklist_id,
                    type: 'checklist',
                    permission: checklistPermissionType
                  };
                  permissionObject.data.push(permissionChecklistObject);
                });
              }
              userPermission.push(permissionObject);
            });
            dispatch(
              getPermissionSuccess(userPermission, userPermissionData.id)
            );
          })
          .catch(ex => {
            console.log('Failed to fetch entity', ex);

            dispatch(getPermissionFail());
          });
      })
      .catch(ex => {
        console.log('Failed to fetch entity', ex);

        dispatch(getPermissionFail());
      });
  };
}

export function getAllChecklistData() {
  return (dispatch, getState) => {
    dispatch(getPermissionStart());

    const { auth } = getState();

    request
      .get(`${config.API_URL}/v0/ui/checklists/list_all_checklists/`)
      .set('Authorization', `JWT ${auth.token}`)
      .then(checklistResponse => {
        let checklistData = checklistResponse.body.data;
        let userPermission = [];
        checklistData.forEach(campaignInfo => {
          let campaignPermissionType = 'None';
          let permissionObject = {
            entityName: campaignInfo.campaign_name,
            entityId: campaignInfo.campaign_id,
            type: 'campaign',
            permission: campaignPermissionType,
            data: []
          };
          if (campaignInfo.checklists.length) {
            campaignInfo.checklists.forEach(checklist => {
              let checklistPermissionType = 'None';
              let permissionChecklistObject = {
                entityName: checklist.checklist_name,
                entityId: checklist.checklist_id,
                type: 'checklist',
                permission: checklistPermissionType
              };
              permissionObject.data.push(permissionChecklistObject);
            });
          }
          userPermission.push(permissionObject);
        });
        dispatch(getPermissionSuccess(userPermission, undefined));
      })
      .catch(ex => {
        console.log('Failed to fetch entity', ex);

        dispatch(getPermissionFail());
      });
  };
}

export function updateUserPermission(data, callback) {
  return (dispatch, getState) => {
    dispatch(getPermissionStart());

    const { auth } = getState();

    request
      .put(`${config.API_URL}/v0/ui/checklists/permissions/`)
      .set('Authorization', `JWT ${auth.token}`)
      .send(data)
      .then(resp => {
        dispatch(getPermissionList());
        if (callback) {
          callback();
        }
      })
      .catch(ex => {
        console.log('Failed to create checklist template', ex);

        dispatch(getPermissionFail());
      });
  };
}

export function createUserPermission(data, callback) {
  return (dispatch, getState) => {
    dispatch(getPermissionStart());

    const { auth } = getState();

    request
      .post(`${config.API_URL}/v0/ui/checklists/permissions/`)
      .set('Authorization', `JWT ${auth.token}`)
      .send(data)
      .then(resp => {
        dispatch(getPermissionList());
        if (callback) {
          callback();
        }
      })
      .catch(ex => {
        console.log('Failed to create checklist template', ex);

        dispatch(getPermissionFail());
      });
  };
}

export function deleteUserPermission(permissionId, callback) {
  return (dispatch, getState) => {
    dispatch(getPermissionStart());

    const { auth } = getState();

    request
      .delete(`${config.API_URL}/v0/ui/checklists/permissions/`)
      .set('Authorization', `JWT ${auth.token}`)
      .query({ permission_id: permissionId })
      .then(resp => {
        dispatch(getPermissionList());
        if (callback) {
          callback();
        }
      })
      .catch(ex => {
        console.log('Failed to create checklist template', ex);

        dispatch(getPermissionFail());
      });
  };
}

export function getloggedInUserPermissionStart() {
  return {
    type: types.GET_LOGGED_IN_USER_PERMISSION_START
  };
}

export function getloggedInUserPermissionSuccess(loggedInChecklistPermission) {
  return {
    type: types.GET_LOGGED_IN_USER_PERMISSION_SUCCESS,
    loggedInChecklistPermission: loggedInChecklistPermission
  };
}

export function getloggedInUserPermissionFail() {
  return {
    type: types.GET_LOGGED_IN_USER_PERMISSION_FAIL
  };
}

export function getloggedInUserPermission() {
  return (dispatch, getState) => {
    dispatch(getloggedInUserPermissionStart());

    const { auth } = getState();
    request
      .get(`${config.API_URL}/v0/ui/checklists/permissions/self/`)
      .set('Authorization', `JWT ${auth.token}`)
      .then(resp => {
        let loggedInUserPermission = resp.body.data;
        if (loggedInUserPermission === 'no_permission_exists') {
          loggedInUserPermission = [];
        } else {
          loggedInUserPermission = loggedInUserPermission.checklist_permissions;
        }
        dispatch(getloggedInUserPermissionSuccess(loggedInUserPermission));
      })
      .catch(ex => {
        console.log('Failed to fetch entity', ex);

        dispatch(getloggedInUserPermissionFail());
      });
  };
}
