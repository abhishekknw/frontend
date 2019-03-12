import createReducer from './../lib/createReducer';
import * as types from './../actions/types';

export const booking = createReducer(
  {
    baseBookingList: [],
    bookingTemplateList: []
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
    },
    [types.GET_BOOKING_TEMPLATE_LIST_START](state) {
      return {
        ...state,
        isFetchingBookingTemplate: true
      };
    },
    [types.GET_BOOKING_TEMPLATE_LIST_SUCCESS](state, action) {
      return {
        ...state,
        isFetchingBookingTemplate: false,
        bookingTemplateList: action.list
      };
    },
    [types.GET_BOOKING_TEMPLATE_LIST_FAIL](state) {
      return {
        ...state,
        isFetchingBookingTemplate: false,
        bookingTemplateList: []
      };
    },
    [types.POST_BOOKING_TEMPLATE_START](state) {
      return {
        ...state,
        isCreatingBookingTemplate: true,
        postBookingTemplateSuccess: false,
        postBookingTemplateError: false
      };
    },
    [types.POST_BOOKING_TEMPLATE_SUCCESS](state) {
      return {
        ...state,
        isCreatingBookingTemplate: false,
        postBookingTemplateSuccess: true
      };
    },
    [types.POST_BOOKING_TEMPLATE_FAIL](state) {
      return {
        ...state,
        isCreatingBookingTemplate: false,
        postBookingTemplateError: true
      };
    }
  }
);

export { booking as default };
