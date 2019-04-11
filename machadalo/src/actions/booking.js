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

export function putBaseBookingStart() {
  return {
    type: types.PUT_BASE_BOOKING_START
  };
}

export function putBaseBookingSuccess() {
  return {
    type: types.PUT_BASE_BOOKING_SUCCESS
  };
}

export function putBaseBookingFail() {
  return {
    type: types.PUT_BASE_BOOKING_FAIL
  };
}

export function putBaseBooking({ id, data }) {
  return (dispatch, getState) => {
    dispatch(putBaseBookingStart());

    const { auth } = getState();

    request
      .put(
        `${config.API_URL}/v0/ui/dynamic-booking/base-booking-template/${id}/`
      )
      .set('Authorization', `JWT ${auth.token}`)
      .send(data)
      .then(resp => {
        dispatch(putBaseBookingSuccess());
      })
      .catch(ex => {
        console.log('Failed to create base booking', ex);

        dispatch(putBaseBookingFail());
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

const deleteBaseBookingStart = () => {
  return {
    type: types.DELETE_BASE_BOOKING_START
  };
};

const deleteBaseBookingSuccess = ({ id }) => {
  return {
    type: types.DELETE_BASE_BOOKING_SUCCESS,
    id
  };
};

const deleteBaseBookingEnd = () => {
  return {
    type: types.DELETE_BASE_BOOKING_FAIL
  };
};

export function deleteBaseBooking({ id }) {
  return (dispatch, getState) => {
    dispatch(deleteBaseBookingStart());

    const { auth } = getState();

    request
      .delete(
        `${config.API_URL}/v0/ui/dynamic-booking/base-booking-template/${id}/`
      )
      .set('Authorization', `JWT ${auth.token}`)
      .then(() => {
        dispatch(deleteBaseBookingSuccess({ id }));
      })
      .catch(ex => {
        console.log('Failed to delete base booking', ex);

        dispatch(deleteBaseBookingEnd());
      });
  };
}
/* Base Booking: End */

/* Booking Template: Start */
const getBookingTemplateListStart = () => {
  return {
    type: types.GET_BOOKING_TEMPLATE_LIST_START
  };
};

const getBookingTemplateListSuccess = ({ list }) => {
  return {
    type: types.GET_BOOKING_TEMPLATE_LIST_SUCCESS,
    list
  };
};

const getBookingTemplateListFail = () => {
  return {
    type: types.GET_BOOKING_TEMPLATE_LIST_FAIL
  };
};

export function getBookingTemplateList() {
  return (dispatch, getState) => {
    dispatch(getBookingTemplateListStart());

    const { auth } = getState();

    request
      .get(`${config.API_URL}/v0/ui/dynamic-booking/booking-template/`)
      .set('Authorization', `JWT ${auth.token}`)
      .then(resp => {
        dispatch(getBookingTemplateListSuccess({ list: resp.body.data }));
      })
      .catch(ex => {
        console.log('Failed to fetch list of booking templates', ex);

        dispatch(getBookingTemplateListFail());
      });
  };
}

const postBookingTemplateStart = () => {
  return {
    type: types.POST_BOOKING_TEMPLATE_START
  };
};

const postBookingTemplateSuccess = () => {
  return {
    type: types.POST_BOOKING_TEMPLATE_SUCCESS
  };
};

const postBookingTemplateFail = () => {
  return {
    type: types.POST_BOOKING_TEMPLATE_FAIL
  };
};

export function postBookingTemplate({ data }) {
  return (dispatch, getState) => {
    dispatch(postBookingTemplateStart());

    const { auth } = getState();

    request
      .post(`${config.API_URL}/v0/ui/dynamic-booking/booking-template/`)
      .set('Authorization', `JWT ${auth.token}`)
      .send(data)
      .then(resp => {
        dispatch(postBookingTemplateSuccess());
      })
      .catch(ex => {
        console.log('Failed to fetch list of booking templates', ex);

        dispatch(postBookingTemplateFail());
      });
  };
}

const putBookingTemplateStart = () => {
  return {
    type: types.PUT_BOOKING_TEMPLATE_START
  };
};

const putBookingTemplateSuccess = () => {
  return {
    type: types.PUT_BOOKING_TEMPLATE_SUCCESS
  };
};

const putBookingTemplateFail = () => {
  return {
    type: types.PUT_BOOKING_TEMPLATE_FAIL
  };
};

export function putBookingTemplate({ id, data }) {
  return (dispatch, getState) => {
    dispatch(putBookingTemplateStart());

    const { auth } = getState();

    request
      .put(`${config.API_URL}/v0/ui/dynamic-booking/booking-template/${id}/`)
      .set('Authorization', `JWT ${auth.token}`)
      .send(data)
      .then(resp => {
        dispatch(putBookingTemplateSuccess());
      })
      .catch(ex => {
        console.log('Failed to update booking template', ex);

        dispatch(putBookingTemplateFail());
      });
  };
}

const deleteBookingTemplateStart = () => {
  return {
    type: types.DELETE_BOOKING_TEMPLATE_START
  };
};

const deleteBookingTemplateSuccess = ({ id }) => {
  return {
    type: types.DELETE_BOOKING_TEMPLATE_SUCCESS,
    id
  };
};

const deleteBookingTemplateEnd = () => {
  return {
    type: types.DELETE_BOOKING_TEMPLATE_FAIL
  };
};

export function deleteBookingTemplate({ id }) {
  return (dispatch, getState) => {
    dispatch(deleteBookingTemplateStart());

    const { auth } = getState();

    request
      .delete(`${config.API_URL}/v0/ui/dynamic-booking/booking-template/${id}/`)
      .set('Authorization', `JWT ${auth.token}`)
      .then(() => {
        dispatch(deleteBookingTemplateSuccess({ id }));
      })
      .catch(ex => {
        console.log('Failed to delete booking template', ex);

        dispatch(deleteBookingTemplateEnd());
      });
  };
}
/* Booking Template: End */

/*Booking: Start */
const postBookingStart = () => {
  return {
    type: types.POST_BOOKING_START
  };
};

const postBookingSuccess = () => {
  return {
    type: types.POST_BOOKING_SUCCESS
  };
};

const postBookingFail = () => {
  return {
    type: types.POST_BOOKING_FAIL
  };
};

export function postBooking({ data }) {
  return (dispatch, getState) => {
    dispatch(postBookingStart());

    const { auth } = getState();

    request
      .post(`${config.API_URL}/v0/ui/dynamic-booking/booking-data/`)
      .set('Authorization', `JWT ${auth.token}`)
      .send(data)
      .then(resp => {
        dispatch(postBookingSuccess());
      })
      .catch(ex => {
        console.log('Failed to create booking', ex);

        dispatch(postBookingFail());
      });
  };
}

const getBookingStart = () => {
  return {
    type: types.GET_BOOKING_START
  };
};

const getBookingSuccess = ({ list }) => {
  return {
    type: types.GET_BOOKING_SUCCESS,
    list
  };
};

const getBookingFail = () => {
  return {
    type: types.GET_BOOKING_FAIL
  };
};

export function getBookingList({ campaignId }) {
  return (dispatch, getState) => {
    dispatch(getBookingStart());

    const { auth } = getState();

    request
      .get(
        `${
          config.API_URL
        }/v0/ui/dynamic-booking/booking-data/campaign/${campaignId}/`
      )
      .set('Authorization', `JWT ${auth.token}`)
      .then(resp => {
        dispatch(getBookingSuccess({ list: resp.body.data }));
      })
      .catch(ex => {
        console.log('Failed to fetch list of bookings', ex);

        dispatch(getBookingFail());
      });
  };
}

const deleteBookingStart = () => {
  return {
    type: types.DELETE_BOOKING_START
  };
};

const deleteBookingSuccess = ({ id }) => {
  return {
    type: types.DELETE_BOOKING_SUCCESS,
    id
  };
};

const deleteBookingEnd = () => {
  return {
    type: types.DELETE_BOOKING_FAIL
  };
};

export function deleteBooking({ id }) {
  return (dispatch, getState) => {
    dispatch(deleteBookingStart());

    const { auth } = getState();

    request
      .delete(`${config.API_URL}/v0/ui/dynamic-booking/booking-data/${id}/`)
      .set('Authorization', `JWT ${auth.token}`)
      .then(() => {
        dispatch(deleteBookingSuccess({ id }));
      })
      .catch(ex => {
        console.log('Failed to delete booking', ex);

        dispatch(deleteBookingEnd());
      });
  };
}
/* Booking: End */
