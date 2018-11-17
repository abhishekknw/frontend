import request from 'superagent';

import * as types from './types';

import config from './../config';

export function postChecklistTemplateStart() {
  return {
    type: types.POST_CHECKLIST_TEMPLATE_START
  };
}

export function postChecklistTemplateSuccess() {
  return {
    type: types.POST_CHECKLIST_TEMPLATE_SUCCESS
  };
}

export function postChecklistTemplateFail() {
  return {
    type: types.POST_CHECKLIST_TEMPLATE_FAIL
  };
}

export function postChecklistTemplate({ campaignId, data }) {
  return (dispatch, getState) => {
    dispatch(postChecklistTemplateStart());

    const { auth } = getState();

    request
      .post(`${config.API_URL}/v0/ui/checklists/${campaignId}/create`)
      .set('Authorization', `JWT ${auth.token}`)
      .send(data)
      .then(resp => {
        dispatch(postChecklistTemplateSuccess());
      })
      .catch(ex => {
        console.log('Failed to create checklist template', ex);

        dispatch(postChecklistTemplateFail());
      });
  };
}

export function getChecklistsStart() {
  return {
    type: types.GET_CHECKLISTS_START
  };
}

export function getChecklistsSuccess({ checklists }) {
  return {
    type: types.GET_CHECKLISTS_SUCCESS,
    checklists
  };
}

export function getChecklistsFail() {
  return {
    type: types.GET_CHECKLISTS_FAIL
  };
}

export function getSupplierChecklists({ campaignId, supplierId }) {
  return (dispatch, getState) => {
    dispatch(getChecklistsStart());

    const { auth } = getState();

    request
      .get(
        `${
          config.API_URL
        }/v0/ui/checklists/${campaignId}/list_supplier_checklists/${supplierId}`
      )
      .set('Authorization', `JWT ${auth.token}`)
      .then(resp => {
        dispatch(getChecklistsSuccess({ checklists: resp.body.data }));
      })
      .catch(ex => {
        console.log('Failed to fetch supplier checklists', ex);

        dispatch(getChecklistsFail());
      });
  };
}

export function getCampaignChecklists({ campaignId }) {
  return (dispatch, getState) => {
    dispatch(getChecklistsStart());

    const { auth } = getState();

    request
      .get(
        `${
          config.API_URL
        }/v0/ui/checklists/${campaignId}/list_campaign_checklists`
      )
      .set('Authorization', `JWT ${auth.token}`)
      .then(resp => {
        let checklists = [];
        resp.body.data.forEach(checklist => {
          if (checklist.checklist_type === 'campaign') {
            checklists.push(checklist);
          }
        });
        dispatch(getChecklistsSuccess({ checklists }));
      })
      .catch(ex => {
        console.log('Failed to fetch supplier checklists', ex);

        dispatch(getChecklistsFail());
      });
  };
}

export function deleteChecklistStart() {
  return {
    type: types.DELETE_CHECKLIST_START
  };
}

export function deleteChecklistSuccess({ checklistId }) {
  return {
    type: types.DELETE_CHECKLIST_SUCCESS,
    checklistId
  };
}

export function deleteChecklistFail() {
  return {
    type: types.DELETE_CHECKLIST_FAIL
  };
}

export function deleteChecklist({ checklistId }, callback) {
  return (dispatch, getState) => {
    dispatch(deleteChecklistStart());

    const { auth } = getState();

    request
      .put(`${config.API_URL}/v0/ui/checklists/${checklistId}/delete_checklist`)
      .set('Authorization', `JWT ${auth.token}`)
      .then(resp => {
        dispatch(deleteChecklistSuccess({ checklistId }));
        callback();
      })
      .catch(ex => {
        console.log('Failed to delete checklist', ex);

        dispatch(deleteChecklistFail());
      });
  };
}

export function getSingleChecklistStart() {
  return {
    type: types.GET_SINGLE_CHECKLIST_START
  };
}

export function getSingleChecklistSuccess({ checklistId, checklist }) {
  return {
    type: types.GET_SINGLE_CHECKLIST_SUCCESS,
    checklistId,
    checklist
  };
}

export function getSingleChecklistFail() {
  return {
    type: types.GET_SINGLE_CHECKLIST_FAIL
  };
}

export function getSingleChecklist({ checklistId }) {
  return (dispatch, getState) => {
    dispatch(getSingleChecklistStart());

    const { auth } = getState();

    request
      .get(`${config.API_URL}/v0/ui/checklists/${checklistId}/get_data`)
      .set('Authorization', `JWT ${auth.token}`)
      .then(resp => {
        dispatch(
          getSingleChecklistSuccess({ checklistId, checklist: resp.body.data })
        );
      })
      .catch(ex => {
        console.log('Failed to fetch single checklist', ex);

        dispatch(getSingleChecklistFail());
      });
  };
}

export function postChecklistEntriesStart() {
  return {
    type: types.POST_CHECKLIST_ENTRIES_START
  };
}

export function postChecklistEntriesSuccess() {
  return {
    type: types.POST_CHECKLIST_ENTRIES_SUCCESS
  };
}

export function postChecklistEntriesFail() {
  return {
    type: types.POST_CHECKLIST_ENTRIES_FAIL
  };
}

export function postChecklistEntries({ checklistId, data }) {
  return (dispatch, getState) => {
    dispatch(postChecklistEntriesStart());

    const { auth } = getState();

    request
      .put(`${config.API_URL}/v0/ui/checklists/${checklistId}/enter_data`)
      .set('Authorization', `JWT ${auth.token}`)
      .send(data)
      .then(resp => {
        dispatch(postChecklistEntriesSuccess());
      })
      .catch(ex => {
        console.log('Failed to update checklist entries', ex);

        dispatch(postChecklistEntriesFail());
      });
  };
}
