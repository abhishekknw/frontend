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

const getBaseBookingListStart = () => {
  return {
    type: types.GET_BASE_BOOKING_LIST_START
  };
};

const getBaseBookingListSuccess = ({ list }) => {
  return {
    type: types.GET_BASE_BOOKING_LIST_SUCCESS,
    list
  };
};

const getBaseBookingListFail = () => {
  return {
    type: types.GET_BASE_BOOKING_LIST_FAIL
  };
};

export function getBaseBookingList() {
  return (dispatch, getState) => {
    dispatch(getBaseBookingListStart());

    const { auth } = getState();

    request
      .get(`${config.API_URL}/v0/ui/dynamic-booking/base-booking-template/`)
      .set('Authorization', `JWT ${auth.token}`)
      .then(resp => {
        dispatch(getBaseBookingListSuccess({ list: resp.body.data }));
      })
      .catch(ex => {
        console.log('Failed to fetch list of base bookings', ex);

        dispatch(getBaseBookingListFail());
      });
  };
}

/* Base Booking: End */
