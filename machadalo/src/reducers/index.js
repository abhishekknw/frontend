import { combineReducers } from 'redux';
import * as appearanceReducer from './appearance';
import * as authReducer from './auth';
import * as campaignReducer from './campaign';
import * as supplierReducer from './supplier';
import * as checklistReducer from './checklist';
import * as inventoryReducer from './inventory';
import * as entityReducer from './Entity/entity';
import * as entityTypeReducer from './Entity/entityType';
import * as baseEntityTypeReducer from './Entity/baseEntityType';
import * as settingReducer from './setting';
import * as userReducer from './user';
import * as userProfileReducer from './userProfile';
import * as leadReducer from './lead';
import * as bookingReducer from './booking';
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
    entityTypeReducer,
    baseEntityTypeReducer,
    settingReducer,
    userReducer,
    leadReducer,
    inventoryReducer,
    userProfileReducer,
    leadReducer,
    bookingReducer
  )
);

export default reducers;
