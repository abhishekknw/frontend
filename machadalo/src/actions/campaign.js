import request from 'superagent';

import * as types from './types';

import config from './../config';

export function getCampaignsListStart() {
  return {
    type: types.GET_CAMPAIGNS_LIST_START
  };
}

export function getCampaignsListSuccess({ campaigns }) {
  return {
    type: types.GET_CAMPAIGNS_LIST_SUCCESS,
    campaigns
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
      .get(`${config.API_URL}/v0/ui/website/campaign-assignment/`)
      .query({ include_assigned_by: 0, to: 19, fetch_all: 0 })
      .set('Authorization', `JWT ${auth.token}`)
      .then(resp => {
        dispatch(getCampaignsListSuccess({ campaigns: resp.body.data }));
      })
      .catch(ex => {
        console.log('Failed to fetch list of campaigns', ex);

        dispatch(getCampaignsListFail());
      });
  };
}
