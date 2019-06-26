import request from 'superagent';

import * as types from './types';

import config from './../config';

/* Tapping Dashboard: Start */
export function getTappingDashboardStart() {
  return {
    type: types.GET_TAPPING_DETAILS_START,
  };
}

export function getTappingDashboardSuccess(tappingData) {
  return {
    type: types.GET_TAPPING_DETAILS_SUCCESS,
    tappingData,
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
      .post(`${config.API_URL}/v0/ui/tapping-dashboard/tapping/`)
      .set('Authorization', `JWT ${auth.token}`)
      .send({})
      .then((resp) => {
        dispatch(getTappingDashboardSuccess({ data: resp.body.data }));
      })
      .catch((ex) => {
        console.log('Failed to get tapping data', ex);

        dispatch(getTappingDashboardFail());
      });
  };
}
