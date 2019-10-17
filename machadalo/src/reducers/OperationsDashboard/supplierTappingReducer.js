import createReducer from '../../lib/createReducer';
import * as types from '../../actions/types';

export const supplierTappingDetails = createReducer(
  {
    supplierTappingData: [],
    isFetchingSupplierTappingList: false,
  },

  {
    [types.GET_SUPPLIER_DETAILS_START](state) {
      return Object.assign({}, state, {
        supplierTappingData: [],
        isFetchingSupplierTappingList: true,
      });
    },
    [types.GET_SUPPLIER_DETAILS_SUCCESS](state, action) {
      return Object.assign({}, state, {
        supplierTappingData: action.payload.response,
        isFetchingSupplierTappingList: false,
      });
    },
    [types.GET_SUPPLIER_DETAILS_FAIL](state) {
      return Object.assign({}, state, {
        supplierTappingData: [],
        isFetchingSupplierTappingList: false,
      });
    },
  }
);

export { supplierTappingDetails as default };
