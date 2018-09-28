import createReducer from './../lib/createReducer';
import * as types from './../actions/types';

export const checklist = createReducer(
  {
    list: []
  },

  {
    [types.GET_SUPPLIER_CHECKLISTS_START](state) {
      return Object.assign({}, state, {
        list: []
      });
    },
    [types.GET_SUPPLIER_CHECKLISTS_SUCCESS](state, action) {
      return Object.assign({}, state, {
        list: action.checklists
      });
    },
    [types.GET_SUPPLIER_CHECKLISTS_FAIL](state) {
      return Object.assign({}, state, {
        list: []
      });
    },
    [types.DELETE_SUPPLIER_CHECKLIST_SUCCESS](state, action) {
      const newList = state.list.slice();

      for (let i = 0, l = newList.length; i < l; i += 1) {
        if (newList[i].id === action.checklistId) {
          newList.splice(i, 1);
          break;
        }
      }

      return Object.assign({}, state, {
        list: newList
      });
    },
    [types.POST_CHECKLIST_TEMPLATE_START](state) {
      const newState = Object.assign({}, state);

      if (newState.templateCreateStatus) {
        delete newState.templateCreateStatus;
      }

      return newState;
    },
    [types.POST_CHECKLIST_TEMPLATE_SUCCESS](state) {
      return Object.assign({}, state, {
        templateCreateStatus: 'success'
      });
    },
    [types.POST_CHECKLIST_TEMPLATE_FAIL](state) {
      return Object.assign({}, state, {
        templateCreateStatus: 'error'
      });
    }
  }
);

export { checklist as default };
