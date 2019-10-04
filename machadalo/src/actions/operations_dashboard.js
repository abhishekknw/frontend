import request from 'superagent';

import * as types from './types';

import config from '../config';

/* Operations Dashboard: Start */
export function getTappingDashboardStart() {
  return {
    type: types.GET_TAPPING_DETAILS_START,
  };
}

export function getTappingDashboardSuccess(response) {
  const data = { response };
  return {
    type: types.GET_TAPPING_DETAILS_SUCCESS,
    tappingData: data,
  };
}

export function getTappingDashboardFail() {
  return {
    type: types.GET_TAPPING_DETAILS_FAIL,
  };
}

export function getTappingDetails() {
  return (dispatch, getState) => {
    dispatch(getTappingDashboardStart());

    const { auth } = getState();

    request
      .get(`${config.API_URL}/v0/ui/ops/campaign-analytics/`)
      .set('Authorization', `JWT ${auth.token}`)
      .then((resp) => {
        dispatch(getTappingDashboardSuccess({ data: resp.body.data }));
      })
      .catch((ex) => {
        console.log('Failed to get tapping data', ex);

        dispatch(getTappingDashboardFail());
      });
  };
}

export function getSupplierCampaignDetailsStart() {
  return {
    type: types.GET_SUPPLIER_DETAILS_START,
  };
}

export function getSupplierCampaignDetailsSuccess(response) {
  const data = { response };
  return {
    type: types.GET_SUPPLIER_DETAILS_SUCCESS,
    supplierData: data,
  };
}

export function getSupplierCampaignDetailsFail() {
  return {
    type: types.GET_SUPPLIER_DETAILS_FAIL,
  };
}

export function getSupplierCampaignDetails(campaign_id) {
  return (dispatch, getState) => {
    dispatch(getSupplierCampaignDetailsStart());

    const { auth } = getState();

    request
      .get(`${config.API_URL}/v0/ui/campaign/supplier-analytics/?campaign_id=${campaign_id}`)
      .set('Authorization', `JWT ${auth.token}`)
      .then((resp) => {
        dispatch(getSupplierCampaignDetailsSuccess({ data: resp.body.data }));
      })
      .catch((ex) => {
        console.log('Failed to get data', ex);

        dispatch(getSupplierCampaignDetailsFail());
      });
  };
}
