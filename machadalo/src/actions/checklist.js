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

export function getSupplierChecklistsStart() {
  return {
    type: types.GET_SUPPLIER_CHECKLISTS_START
  };
}

export function getSupplierChecklistsSuccess({ checklists }) {
  return {
    type: types.GET_SUPPLIER_CHECKLISTS_SUCCESS,
    checklists
  };
}

export function getSupplierChecklistsFail() {
  return {
    type: types.GET_SUPPLIER_CHECKLISTS_FAIL
  };
}

export function getSupplierChecklists({ campaignId, supplierId }) {
  return (dispatch, getState) => {
    dispatch(getSupplierChecklistsStart());

    const { auth } = getState();

    request
      .get(
        `${
          config.API_URL
        }/v0/ui/checklists/${campaignId}/list_supplier_checklists/${supplierId}`
      )
      .set('Authorization', `JWT ${auth.token}`)
      .then(resp => {
        dispatch(getSupplierChecklistsSuccess({ checklists: resp.body.data }));
      })
      .catch(ex => {
        console.log('Failed to fetch supplier checklists', ex);

        dispatch(getSupplierChecklistsFail());
      });
  };
}

export function deleteSupplierChecklistStart() {
  return {
    type: types.DELETE_SUPPLIER_CHECKLIST_START
  };
}

export function deleteSupplierChecklistSuccess({ checklistId }) {
  return {
    type: types.DELETE_SUPPLIER_CHECKLIST_SUCCESS,
    checklistId
  };
}

export function deleteSupplierChecklistFail() {
  return {
    type: types.DELETE_SUPPLIER_CHECKLIST_FAIL
  };
}

export function deleteSupplierChecklist({ checklistId }) {
  return (dispatch, getState) => {
    dispatch(deleteSupplierChecklistStart());

    const { auth } = getState();

    request
      .put(`${config.API_URL}/v0/ui/checklists/${checklistId}/delete_checklist`)
      .set('Authorization', `JWT ${auth.token}`)
      .then(resp => {
        dispatch(deleteSupplierChecklistSuccess({ checklistId }));
      })
      .catch(ex => {
        console.log('Failed to delete supplier checklist', ex);

        dispatch(deleteSupplierChecklistFail());
      });
  };
}
