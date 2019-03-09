import createReducer from './../lib/createReducer';
import * as types from './../actions/types';

export const booking = createReducer(
  {
    baseBookingList: []
  },
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
    },
    [types.GET_BASE_BOOKING_LIST_START](state) {
      return {
        ...state,
        isFetchingBaseBooking: true
      };
    },
    [types.GET_BASE_BOOKING_LIST_SUCCESS](state, action) {
      return {
        ...state,
        isFetchingBaseBooking: false,
        baseBookingList: action.list
      };
    },
    [types.GET_BASE_BOOKING_LIST_FAIL](state) {
      return {
        ...state,
        isFetchingBaseBooking: false,
        baseBookingList: []
      };
    }
  }
);

export { booking as default };
