import createReducer from './../lib/createReducer';
import * as types from './../actions/types';

export const booking = createReducer(
  {
    baseBookingList: [],
    bookingTemplateList: [],
    bookingList: []
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
    [types.PUT_BASE_BOOKING_START](state) {
      return {
        ...state,
        isUpdatingBaseBooking: true,
        putBaseBookingSuccess: false,
        putBaseBookingError: false
      };
    },
    [types.PUT_BASE_BOOKING_SUCCESS](state) {
      return {
        ...state,
        isUpdatingBaseBooking: false,
        putBaseBookingSuccess: true
      };
    },
    [types.PUT_BASE_BOOKING_FAIL](state) {
      return {
        ...state,
        isUpdatingBaseBooking: false,
        putBaseBookingError: true
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
    [types.DELETE_BASE_BOOKING_START](state) {
      return {
        ...state,
        isDeletingBaseBooking: true
      };
    },
    [types.DELETE_BASE_BOOKING_SUCCESS](state, action) {
      const { baseBookingList } = state;
      return {
        ...state,
        isDeletingBaseBooking: false,
        baseBookingList: baseBookingList.filter(item => item.id !== action.id)
      };
    },
    [types.DELETE_BASE_BOOKING_FAIL](state) {
      return {
        ...state,
        isDeletingBaseBooking: false
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
    },
    [types.PUT_BOOKING_TEMPLATE_START](state) {
      return {
        ...state,
        isUpdatingBookingTemplate: true,
        putBookingTemplateSuccess: false,
        putBookingTemplateError: false
      };
    },
    [types.PUT_BOOKING_TEMPLATE_SUCCESS](state) {
      return {
        ...state,
        isUpdatingBookingTemplate: false,
        putBookingTemplateSuccess: true
      };
    },
    [types.PUT_BOOKING_TEMPLATE_FAIL](state) {
      return {
        ...state,
        isUpdatingBookingTemplate: false,
        putBookingTemplateError: true
      };
    },
    [types.DELETE_BOOKING_TEMPLATE_START](state) {
      return {
        ...state,
        isDeletingBookingTemplate: true
      };
    },
    [types.DELETE_BOOKING_TEMPLATE_SUCCESS](state, action) {
      const { bookingTemplateList } = state;
      return {
        ...state,
        isDeletingBookingTemplate: false,
        bookingTemplateList: bookingTemplateList.filter(
          item => item.id !== action.id
        )
      };
    },
    [types.DELETE_BOOKING_TEMPLATE_FAIL](state) {
      return {
        ...state,
        isDeletingBookingTemplate: false
      };
    },
    [types.GET_BOOKING_START](state) {
      return {
        ...state,
        isFetchingBooking: true
      };
    },
    [types.GET_BOOKING_SUCCESS](state, action) {
      return {
        ...state,
        isFetchingBooking: false,
        bookingList: action.list
      };
    },
    [types.GET_BOOKING_FAIL](state) {
      return {
        ...state,
        isFetchingBooking: false,
        bookingList: []
      };
    },
    [types.POST_BOOKING_START](state) {
      return {
        ...state,
        isUpdatingBooking: true,
        postBookingSuccess: false,
        postBookingError: false
      };
    },
    [types.POST_BOOKING_SUCCESS](state) {
      return {
        ...state,
        isUpdatingBooking: false,
        postBookingSuccess: true
      };
    },
    [types.POST_BOOKING_FAIL](state) {
      return {
        ...state,
        isUpdatingBooking: false,
        postBookingError: true
      };
    },
    [types.DELETE_BOOKING_START](state) {
      return {
        ...state,
        isDeletingBooking: true
      };
    },
    [types.DELETE_BOOKING_SUCCESS](state, action) {
      const { bookingList } = state;
      return {
        ...state,
        isDeletingBooking: false,
        bookingList: bookingList.filter(item => item.id !== action.id)
      };
    },
    [types.DELETE_BOOKING_FAIL](state) {
      return {
        ...state,
        isDeletingBooking: false
      };
    }
  }
);

export { booking as default };
