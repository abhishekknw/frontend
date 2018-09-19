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
    }
  }
);

export { checklist as default };
