import { combineReducers } from 'redux';
import * as appearanceReducer from './appearance';
import * as authReducer from './auth';
import * as campaignReducer from './campaign';
import * as supplierReducer from './supplier';
import * as checklistReducer from './checklist';

const reducers = combineReducers(
  Object.assign(
    {},
    appearanceReducer,
    authReducer,
    campaignReducer,
    supplierReducer,
    checklistReducer
  )
);

export default reducers;
