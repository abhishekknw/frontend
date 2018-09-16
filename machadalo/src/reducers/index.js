import { combineReducers } from 'redux';
import * as appearanceReducer from './appearance';
import * as authReducer from './auth';

const reducers = combineReducers(
  Object.assign({}, appearanceReducer, authReducer)
);

export default reducers;
