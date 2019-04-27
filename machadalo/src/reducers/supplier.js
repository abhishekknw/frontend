import createReducer from './../lib/createReducer';
import * as types from './../actions/types';

export const supplier = createReducer(
  {
    currentSupplier: undefined,
    currentSupplierType: undefined,
    supplierList: [],
    supplierTypeList: []
  },

  {
    [types.POST_SUPPLIER_TYPE_START](state) {
      return Object.assign({}, state, {
        currentSupplierType: undefined
      });
    },
    [types.POST_SUPPLIER_TYPE_SUCCESS](state, action) {
      return Object.assign({}, state, {
        currentSupplierType: action.data
      });
    },
    [types.POST_SUPPLIER_TYPE_FAIL](state) {
      return Object.assign({}, state, {
        currentSupplierType: undefined
      });
    },
    [types.POST_SUPPLIER_START](state) {
      return Object.assign({}, state, {
        currentSupplier: undefined
      });
    },
    [types.POST_SUPPLIER_SUCCESS](state, action) {
      return Object.assign({}, state, {
        currentSupplier: action.data
      });
    },
    [types.POST_SUPPLIER_FAIL](state) {
      return Object.assign({}, state, {
        currentSupplier: undefined
      });
    },
    [types.GET_SUPPLIER_LIST_START](state) {
      return Object.assign({}, state, {
        supplierList: []
      });
    },
    [types.GET_SUPPLIER_LIST_SUCCESS](state, action) {
      return Object.assign({}, state, {
        supplierList: action.data
      });
    },
    [types.GET_SUPPLIER_LIST_FAIL](state) {
      return Object.assign({}, state, {
        supplierList: []
      });
    },
    [types.GET_CURRENT_SUPPLIER_TYPE_START](state) {
      return Object.assign({}, state, {
        currentSupplierType: undefined
      });
    },
    [types.GET_CURRENT_SUPPLIER_TYPE_SUCCESS](state, action) {
      return Object.assign({}, state, {
        currentSupplierType: action.data
      });
    },
    [types.GET_CURRENT_SUPPLIER_TYPE_FAIL](state) {
      return Object.assign({}, state, {
        currentSupplierType: undefined
      });
    },
    [types.GET_CURRENT_SUPPLIER_START](state) {
      return Object.assign({}, state, {
        currentSupplier: undefined
      });
    },
    [types.GET_CURRENT_SUPPLIER_SUCCESS](state, action) {
      return Object.assign({}, state, {
        currentSupplier: action.data
      });
    },
    [types.GET_CURRENT_SUPPLIER_FAIL](state) {
      return Object.assign({}, state, {
        currentSupplier: undefined
      });
    },
    [types.GET_SUPPLIER_TYPE_LIST_START](state) {
      return Object.assign({}, state, {
        supplierTypeList: []
      });
    },
    [types.GET_SUPPLIER_TYPE_LIST_SUCCESS](state, action) {
      return Object.assign({}, state, {
        supplierTypeList: action.data
      });
    },
    [types.GET_SUPPLIER_TYPE_LIST_FAIL](state) {
      return Object.assign({}, state, {
        supplierTypeList: []
      });
    }
  }
);

export { supplier as default };
