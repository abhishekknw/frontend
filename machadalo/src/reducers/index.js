import { combineReducers } from 'redux';
import * as appearanceReducer from './appearance';
import * as authReducer from './auth';
import * as campaignReducer from './campaign';
import * as supplierReducer from './supplier';

const reducers = combineReducers(
  Object.assign(
    {},
    appearanceReducer,
    authReducer,
    campaignReducer,
    supplierReducer
  )
);

export default reducers;
