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
      .get(`${config.API_URL}/v0/ui/leads/permissions/`)
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

export function getLeadPermissionStart() {
  return {
    type: types.GET_LEAD_USER_PERMISSION_START
  };
}

export function getLeadPermissionSuccess(
  userPermission,
  currentUserPermissionId
) {
  return {
    type: types.GET_LEAD_USER_PERMISSION_SUCCESS,
    userPermission: userPermission,
    currentUserPermissionId: currentUserPermissionId
  };
}

export function getLeadPermissionFail() {
  return {
    type: types.GET_LEAD_USER_PERMISSION_FAIL
  };
}

export function getLeadUserPermission(userId) {
  return (dispatch, getState) => {
    dispatch(getLeadPermissionStart());

    const { auth } = getState();

    request
      .get(`${config.API_URL}/v0/ui/leads/list_all_leads_forms_by_campaign/`)
      .set('Authorization', `JWT ${auth.token}`)
      .then(leadsFormResponse => {
        let leadsFormData = leadsFormResponse.body.data;
        request
          .get(`${config.API_URL}/v0/ui/leads/permissions/${userId}/`)
          .set('Authorization', `JWT ${auth.token}`)
          .then(permissionResponse => {
            let userPermission = [];
            let userPermissionData = permissionResponse.body.data;
            leadsFormData.forEach(campaignInfo => {
              let campaignPermissionType = 'None';
              if (
                userPermission !== 'no_permission_exists' &&
                userPermissionData.leads_permissions.campaigns[
                  campaignInfo.campaign_id
                ]
              ) {
                if (
                  userPermissionData.leads_permissions.campaigns[
                    campaignInfo.campaign_id
                  ].indexOf('EDIT') !== -1
                ) {
                  campaignPermissionType = 'Edit';
                } else if (
                  userPermissionData.leads_permissions.campaigns[
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
              if (campaignInfo.leads_forms.length) {
                campaignInfo.leads_forms.forEach(lead_form => {
                  let leadFormPermissionType = 'None';
                  if (
                    userPermission !== 'no_permission_exists' &&
                    userPermissionData.leads_permissions.leads_forms[
                      lead_form.lead_form_id
                    ]
                  ) {
                    if (
                      userPermissionData.leads_permissions.leads_forms[
                        lead_form.lead_form_id
                      ].indexOf('EDIT') !== -1
                    ) {
                      leadFormPermissionType = 'Edit';
                    } else if (
                      userPermissionData.leads_permissions.campaigns[
                        lead_form.lead_form_id
                      ].indexOf('FILL') !== -1
                    ) {
                      leadFormPermissionType = 'Fill';
                    }
                  }
                  let permissionLeadFormObject = {
                    entityName: lead_form.lead_form_name,
                    entityId: lead_form.lead_form_id,
                    type: 'lead_form',
                    permission: leadFormPermissionType
                  };
                  permissionObject.data.push(permissionLeadFormObject);
                });
              }
              userPermission.push(permissionObject);
            });
            dispatch(
              getLeadPermissionSuccess(userPermission, userPermissionData.id)
            );
          })
          .catch(ex => {
            console.log('Failed to fetch entity', ex);

            dispatch(getLeadPermissionFail());
          });
      })
      .catch(ex => {
        console.log('Failed to fetch entity', ex);

        dispatch(getLeadPermissionFail());
      });
  };
}

export function getAllLeadsFormData() {
  return (dispatch, getState) => {
    dispatch(getLeadPermissionStart());

    const { auth } = getState();

    request
      .get(`${config.API_URL}/v0/ui/leads/list_all_leads_forms_by_campaign/`)
      .set('Authorization', `JWT ${auth.token}`)
      .then(leadFormsResponse => {
        let leadFormData = leadFormsResponse.body.data;
        let userPermission = [];
        leadFormData.forEach(campaignInfo => {
          let campaignPermissionType = 'None';
          let permissionObject = {
            entityName: campaignInfo.campaign_name,
            entityId: campaignInfo.campaign_id,
            type: 'campaign',
            permission: campaignPermissionType,
            data: []
          };
          if (campaignInfo.leads_forms.length) {
            campaignInfo.leads_forms.forEach(lead_form => {
              let leadFormPermissionType = 'None';
              let permissionLeadFormObject = {
                entityName: lead_form.lead_form_name,
                entityId: lead_form.lead_form_id,
                type: 'lead_form',
                permission: leadFormPermissionType
              };
              permissionObject.data.push(permissionLeadFormObject);
            });
          }
          userPermission.push(permissionObject);
        });
        dispatch(getLeadPermissionSuccess(userPermission, undefined));
      })
      .catch(ex => {
        console.log('Failed to fetch entity', ex);

        dispatch(getLeadPermissionFail());
      });
  };
}

export function updateUserPermission(data, callback) {
  return (dispatch, getState) => {
    dispatch(getLeadPermissionStart());

    const { auth } = getState();

    request
      .put(`${config.API_URL}/v0/ui/checklists/permissions/`)
      .set('Authorization', `JWT ${auth.token}`)
      .send(data)
      .then(resp => {
        dispatch(getLeadPermissionList());
        if (callback) {
          callback();
        }
      })
      .catch(ex => {
        console.log('Failed to create checklist template', ex);

        dispatch(getLeadPermissionFail());
      });
  };
}

export function updateLeadsUserPermission(data, callback) {
  return (dispatch, getState) => {
    dispatch(getLeadPermissionStart());

    const { auth } = getState();

    request
      .put(`${config.API_URL}/v0/ui/leads/permissions/`)
      .set('Authorization', `JWT ${auth.token}`)
      .send(data)
      .then(resp => {
        dispatch(getLeadPermissionList());
        if (callback) {
          callback();
        }
      })
      .catch(ex => {
        console.log('Failed to create checklist template', ex);

        dispatch(getLeadPermissionFail());
      });
  };
}

export function createLeadsUserPermission(data, callback) {
  return (dispatch, getState) => {
    dispatch(getLeadPermissionStart());

    const { auth } = getState();

    request
      .post(`${config.API_URL}/v0/ui/leads/permissions/`)
      .set('Authorization', `JWT ${auth.token}`)
      .send(data)
      .then(resp => {
        dispatch(getLeadPermissionList());
        if (callback) {
          callback();
        }
      })
      .catch(ex => {
        console.log('Failed to create checklist template', ex);

        dispatch(getLeadPermissionFail());
      });
  };
}

export function deleteLeadsUserPermission(permissionId, callback) {
  return (dispatch, getState) => {
    dispatch(getLeadPermissionStart());

    const { auth } = getState();

    request
      .delete(`${config.API_URL}/v0/ui/leads/permissions/`)
      .set('Authorization', `JWT ${auth.token}`)
      .query({ permission_id: permissionId })
      .then(resp => {
        dispatch(getLeadPermissionList());
        if (callback) {
          callback();
        }
      })
      .catch(ex => {
        console.log('Failed to create checklist template', ex);

        dispatch(getLeadPermissionFail());
      });
  };
}
