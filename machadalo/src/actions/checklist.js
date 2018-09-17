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

export function postChecklistTemplate(data) {
  return (dispatch, getState) => {
    dispatch(postChecklistTemplateStart());

    const { auth } = getState();

    request
      .post(`${config.API_URL}/v0/ui/checklists/BYJMAC1394/create`)
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
