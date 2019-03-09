import createReducer from './../lib/createReducer';
import * as types from './../actions/types';

export const booking = createReducer(
  {},
  {
    [types.POST_BASE_BOOKING_START](state) {
      return {
        ...state,
        isCreatingBaseBooking: true,
        postBaseBookingSuccess: false,
        postBaseBookingError: false
      };
    },
    [types.POST_BASE_BOOKING_SUCCESS](state) {
      return {
        ...state,
        isCreatingBaseBooking: false,
        postBaseBookingSuccess: true
      };
    },
    [types.POST_BASE_BOOKING_FAIL](state) {
      return {
        ...state,
        isCreatingBaseBooking: false,
        postBaseBookingError: true
      };
    }
  }
);

export { booking as default };
