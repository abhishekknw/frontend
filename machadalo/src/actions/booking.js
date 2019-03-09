import request from 'superagent';

import * as types from './types';

import config from './../config';

/* Base Booking: Start */
export function postBaseBookingStart() {
  return {
    type: types.POST_BASE_BOOKING_START
  };
}

export function postBaseBookingSuccess() {
  return {
    type: types.POST_BASE_BOOKING_SUCCESS
  };
}

export function postBaseBookingFail() {
  return {
    type: types.POST_BASE_BOOKING_FAIL
  };
}

export function postBaseBooking({ data }) {
  return (dispatch, getState) => {
    dispatch(postBaseBookingStart());

    const { auth } = getState();

    request
      .post(`${config.API_URL}/v0/ui/dynamic-booking/base-booking-template/`)
      .set('Authorization', `JWT ${auth.token}`)
      .send(data)
      .then(resp => {
        dispatch(postBaseBookingSuccess());
      })
      .catch(ex => {
        console.log('Failed to create base booking', ex);

        dispatch(postBaseBookingFail());
      });
  };
}
/* Base Booking: End */
