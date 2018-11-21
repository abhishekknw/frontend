import { combineReducers } from 'redux';
import * as appearanceReducer from './appearance';
import * as authReducer from './auth';
import * as campaignReducer from './campaign';
import * as supplierReducer from './supplier';
import * as checklistReducer from './checklist';
import { reducer as toastrReducer } from 'react-redux-toastr';

const reducers = combineReducers(
  Object.assign(
    {},
    { toastr: toastrReducer },
    appearanceReducer,
    authReducer,
    campaignReducer,
    supplierReducer,
    checklistReducer
  )
);

export default reducers;
