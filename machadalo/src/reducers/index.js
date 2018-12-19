import { combineReducers } from 'redux';
import * as appearanceReducer from './appearance';
import * as authReducer from './auth';
import * as campaignReducer from './campaign';
import * as supplierReducer from './supplier';
import * as checklistReducer from './checklist';
import * as inventoryReducer from './inventory';
import * as entityReducer from './entity';
import * as settingReducer from './setting';
import * as userReducer from './user';
import * as leadReducer from './lead';
import { reducer as toastrReducer } from 'react-redux-toastr';

const reducers = combineReducers(
  Object.assign(
    {},
    { toastr: toastrReducer },
    appearanceReducer,
    authReducer,
    campaignReducer,
    supplierReducer,
    checklistReducer,
    entityReducer,
    settingReducer,
    userReducer,
    leadReducer,
    inventoryReducer
  )
);

export default reducers;
