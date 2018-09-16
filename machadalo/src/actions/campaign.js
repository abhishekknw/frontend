import request from 'superagent';

import * as types from './types';

import config from './../config';

export function getCampaignsListStart() {
  return {
    type: types.GET_CAMPAIGNS_LIST_START
  };
}

export function getCampaignsListSuccess() {
  return {
    type: types.GET_CAMPAIGNS_LIST_SUCCESS
  };
}

export function getCampaignsListFail() {
  return {
    type: types.GET_CAMPAIGNS_LIST_FAIL
  };
}

export function getCampaignsList() {
  return (dispatch, getState) => {
    dispatch(getCampaignsListStart());

    const { auth } = getState();

    request
      .get(`${config.API_URL}/v0/ui/website/campaign-assignment`)
      .query({ include_assigned_by: 0, to: auth.userId, fetch_all: 0 })
      .set('Authorization', `JWT ${auth.token}`)
      .then(resp => {
        dispatch(getCampaignsListSuccess());
      })
      .catch(ex => {
        console.log('Failed to fetch list of campaigns', ex);

        dispatch(getCampaignsListFail());
      });
  };
}
